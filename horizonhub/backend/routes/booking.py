## Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## built-in imports
from uuid import UUID
from asyncio import Lock
import random
import stripe
import string
from datetime import datetime, timedelta

## third-party imports
from fastapi import APIRouter, HTTPException, Request, Depends, status, BackgroundTasks
from sqlalchemy import and_, String, or_
from sqlalchemy.orm import Session

## custom imports
from db.base import get_db
from db.models import Booking, User, Room
from auth.func import get_current_user
from auth.util import check_internal_request
from constants import ADMIN_USER
from routes.models import BookingCreate, BookingUpdate, CheckAvailabilityRequest, PaymentConfirmation

router = APIRouter()

booking_locks = {}

def generate_six_digit_code():
    return ''.join(random.choices(string.digits, k=6))

async def cleanup_pending_bookings(db: Session):
    """
    Cleanup bookings that have been in pending state for more than 30 minutes
    """
    timeout = datetime.utcnow() - timedelta(minutes=5)
    
    pending_bookings = db.query(Booking).filter(
        and_(
            Booking.status == "pending",
            Booking.created_at <= timeout
        )
    ).all()
    
    for booking in pending_bookings:
        booking.status = "cancelled" ## type: ignore
    
    db.commit()

@router.post("/booking/create")
async def create_booking(
    request:Request, 
    booking_data:BookingCreate, 
    background_tasks: BackgroundTasks,
    db = Depends(get_db)
):
    """
    Create a new booking in pending state with locking to prevent double bookings
    """
    
    await check_internal_request(request)

    try:
        ## Convert string UUID to UUID object if needed
        room_id = booking_data.room_id if isinstance(booking_data.room_id, UUID) else UUID(str(booking_data.room_id))

        ## Get or create lock for this room
        lock = booking_locks.setdefault(str(room_id), Lock())
        
        async with lock:
            room = db.query(Room).filter(Room.id.cast(String) == str(room_id)).first()

            if(not room):
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Room not found"
                )

            ## Check if room is available for the requested dates
            booking_count = db.query(Booking).filter(
                and_(
                    Booking.room_id == room_id,
                    Booking.check_out > booking_data.check_in,
                    Booking.check_in < booking_data.check_out,
                    or_(
                        Booking.status == "confirmed",
                        Booking.status == "checked_in",
                        and_(
                            Booking.status == "pending",
                            Booking.created_at >= datetime.utcnow() - timedelta(minutes=5)
                        )
                    )
                )
            ).count()

            if(booking_count >= room.quantity):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Room is not available for the selected dates"
                )

            ## Check for existing pending booking with same parameters
            existing_pending = db.query(Booking).filter(
                and_(
                    Booking.room_id == room_id,
                    Booking.check_in == booking_data.check_in,
                    Booking.check_out == booking_data.check_out,
                    Booking.status == "pending",
                    Booking.created_at >= datetime.utcnow() - timedelta(minutes=5)
                )
            ).first()

            if existing_pending:
                return {
                    "message": "Booking already exists",
                    "booking_id": existing_pending.confirmation_code
                }

            ## Generate unique confirmation code
            while True:
                confirmation_code = generate_six_digit_code()
                existing_code = db.query(Booking).filter(
                    Booking.confirmation_code == confirmation_code
                ).first()
                if(not existing_code):
                    break

            ## Create new booking in pending state
            new_booking = Booking(
                room_id=room_id,
                check_in=booking_data.check_in,
                check_out=booking_data.check_out,
                confirmation_code=confirmation_code,
                status="pending",
                room_number=room.number,
                created_at=datetime.utcnow()
            )

            db.add(new_booking)
            db.commit()
            db.refresh(new_booking)

            ## Schedule cleanup task
            background_tasks.add_task(cleanup_pending_bookings, db)

            return {
                "message": "Booking created successfully", 
                "booking_id": confirmation_code
            }

    except ValueError as e:
        print(f"Invalid UUID format: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid room ID format"
        )

@router.put("/booking/modify/{booking_id}")
async def modify_booking(
    request:Request, 
    booking_id:UUID, 
    booking_update:BookingUpdate, 
    current_user:str = Depends(get_current_user), 
    db = Depends(get_db)
):
    """
    Modify an existing booking
    """
    
    await check_internal_request(request)

    ## Get user from database
    user = db.query(User).filter(User.email == current_user).first()
    if(not user):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    ## Get existing booking
    booking = db.query(Booking).filter(
        and_(
            Booking.id == booking_id,
            Booking.user_id == user.id
        )
    ).first()

    if(not booking):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found or you don't have permission to modify it"
        )

    ## Check if the new dates conflict with other bookings
    conflicting_booking = db.query(Booking).filter(
        and_(
            Booking.room_id == booking.room_id,
            Booking.id != booking_id,
            Booking.check_out > booking_update.check_in,
            Booking.check_in < booking_update.check_out
        )
    ).first()

    if(conflicting_booking):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Room is not available for the selected dates"
        )

    ## Update booking
    booking.check_in = booking_update.check_in
    booking.check_out = booking_update.check_out

    db.commit()
    db.refresh(booking)

    return {"message": "Booking modified successfully", "booking_id": str(booking.id)}

@router.post("/booking/check-availability")
async def check_availability(request:Request, availability_data:CheckAvailabilityRequest, db = Depends(get_db)):
    """
    Check room availability for given dates
    """
    
    await check_internal_request(request)

    available_rooms = []
    all_rooms = db.query(Room).all()

    for room in all_rooms:
        ## Count existing bookings for this room in the date range
        booking_count = db.query(Booking).filter(
            and_(
                Booking.room_id == room.id,
                Booking.check_out > availability_data.check_in,
                Booking.check_in < availability_data.check_out,
                Booking.status != "cancelled"
            )
        ).count()

        ## If bookings are less than room quantity, room is available
        if(booking_count < room.quantity):
            available_rooms.append({
                "id": str(room.id),  ## Convert UUID to string here
                "name": room.name,
                "description": room.description,
                "price": room.price,
                "capacity": room.capacity,
                "available_quantity": room.quantity - booking_count,
                "number": room.number  ## Include room number
            })

    return available_rooms

@router.post("/booking/confirm-payment")
async def confirm_booking_payment(request:Request, data:PaymentConfirmation, db = Depends(get_db)):
    """
    Confirm booking after successful payment
    """
    
    await check_internal_request(request)

    booking = db.query(Booking).filter(Booking.confirmation_code == data.booking_id).first()
    if(not booking):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )

    # Verify payment with Stripe
    try:
        session = stripe.checkout.Session.retrieve(data.session_id)
        
        # First check if payment was successful
        if(session.payment_status != "paid"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Payment not completed"
            )
            
        # Check if this is the correct booking
        if(session.metadata.get("booking_id") != data.booking_id): ## type: ignore
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Payment verification failed"
            )
            
        ## If already confirmed, just return success - prevents duplicate confirmations
        if(booking.status == "confirmed"):
            return {
                "message": "Booking already confirmed", 
                "booking_id": data.booking_id
            }
            
        booking.status = "confirmed"
        db.commit()

        return {
            "message": "Booking confirmed successfully", 
            "booking_id": data.booking_id
        }
            
    except stripe.error.StripeError as e: ## type: ignore
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Stripe error: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/booking/check-in")
async def check_in(request:Request, db = Depends(get_db)):
    """
    Process check-in with confirmation code and generate checkout code
    """
    
    await check_internal_request(request)
    
    data = await request.json()
    check_in_code = data.get('check_in_code')
    
    if(not check_in_code):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Check-in code is required"
        )
    
    try:
        ## Find the booking with this confirmation code
        booking = db.query(Booking).filter(
            and_(
                Booking.confirmation_code == check_in_code,
                Booking.status == "confirmed"
            )
        ).first()
        
        print(f"Found booking: {booking}")  ## Debug log
        print(f"Booking room_id: {booking.room_id if booking else 'No booking found'}")  ## Debug log
        
        if(not booking):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Invalid check-in code or booking already checked in"
            )
        
        ## Check if it's too early to check in
        today = datetime.now().date()
        if(today < booking.check_in.date()):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="It's too early to check in. Please come back on your check-in date."
            )
        
        ## Generate checkout code
        while True:
            checkout_code = generate_six_digit_code()
            existing_code = db.query(Booking).filter(Booking.checkout_code == checkout_code).first()
            if(not existing_code):
                break
        
        ## Get a fresh session
        db.expire_all()
        
        ## Get room with a new query
        room = db.query(Room).filter(Room.id.cast(String) == str(booking.room_id)).first()
        print(f"Room query result: {room}")  ## Debug log
        
        if(not room):
            ## List all rooms for debugging
            all_rooms = db.query(Room).all()
            print("All rooms in database:")
            for r in all_rooms:
                print(f"Room ID: {r.id}, Number: {r.number}")
            
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Room not found for this booking. Please contact support."
            )
        
        ## Update booking status and add checkout code
        booking.status = "checked_in"
        booking.checkout_code = checkout_code
        
        ## Use the room number we already have stored
        if(not booking.room_number):
            booking.room_number = room.number
        
        ## Commit the changes
        db.commit()
        
        return {
            "message": "Check-in successful",
            "room_number": booking.room_number,
            "check_out_code": checkout_code
        }
        
    except Exception as e:
        db.rollback()
        print(f"Error during check-in: {str(e)}")
        
        if(isinstance(e, HTTPException)):
            raise e
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during check-in. Please try again."
        )

@router.post("/booking/cleanup-pending")
async def manual_cleanup_pending(request:Request, current_user:str = Depends(get_current_user), db = Depends(get_db)):
    """
    Manually trigger cleanup of pending bookings (admin only)
    """

    try:
        is_admin = current_user == ADMIN_USER

        assert is_admin

    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You are not authorized to perform this action"
        )

    await check_internal_request(request)
    
    await cleanup_pending_bookings(db)

    return {"message": "Cleanup completed"}

@router.post("/booking/check-out")
async def check_out(request:Request, db = Depends(get_db)):
    """
    Process check-out with checkout code
    """
    
    await check_internal_request(request)
    
    data = await request.json()
    check_out_code = data.get('check_out_code')
    
    if(not check_out_code):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Check-out code is required"
        )
    
    try:
        ## Find the booking with this checkout code
        booking = db.query(Booking).filter(
            and_(
                Booking.checkout_code == check_out_code,
                Booking.status == "checked_in"
            )
        ).first()
        
        if(not booking):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Invalid check-out code or booking already checked out"
            )
        
        ## Update booking status
        booking.status = "completed"
        
        ## Commit the changes
        db.commit()
        
        return {
            "message": "Check-out successful",
            "room_number": booking.room_number
        }
        
    except Exception as e:
        db.rollback()
        print(f"Error during check-out: {str(e)}")
        
        if(isinstance(e, HTTPException)):
            raise e
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during check-out. Please try again."
        )

