## Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## built-in imports
from uuid import UUID
import random
import stripe
import string

## third-party imports
from fastapi import APIRouter, HTTPException, Request, Depends, status
from sqlalchemy import and_

## custom imports
from db.base import get_db
from db.models import Booking, User, Room
from auth.func import get_current_user
from auth.util import check_internal_request
from routes.models import BookingCreate, BookingUpdate, CheckAvailabilityRequest, PaymentConfirmation

router = APIRouter()

def generate_confirmation_code():
    """Generate a random 6-digit confirmation code"""
    return ''.join(random.choices(string.digits, k=6))

@router.post("/booking/create")
async def create_booking(request:Request, booking_data:BookingCreate, db = Depends(get_db)):
    """
    Create a new booking in pending state
    """
    
    await check_internal_request(request)

    
    ## Convert string UUID to UUID object
    try:
        room_id = booking_data.room_id if isinstance(booking_data.room_id, UUID) else UUID(booking_data.room_id)
        room = db.query(Room).filter(Room.id == room_id).first()
        
        ## Debug print the actual query
        print(f"Room query result: {room}")
        print(f"Room ID type: {type(room_id)}")
        
        ## Try direct comparison
        all_rooms = db.query(Room).all()
        for r in all_rooms:
            print(f"Comparing {str(r.id)} ({type(r.id)}) with {str(room_id)} ({type(room_id)})")
            if str(r.id) == str(room_id):
                room = r
                break
                
    except ValueError as e:
        print(f"Invalid UUID format: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid room ID format"
        )
    
    if(not room):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Room not found"
        )

    ## Check if room is available for the requested dates
    booking_count = db.query(Booking).filter(
        and_(
            Booking.room_id == room_id,      ## Use the UUID object here
            Booking.check_out > booking_data.check_in,
            Booking.check_in < booking_data.check_out,
            Booking.status != "cancelled"  ## Ignore cancelled bookings
        )
    ).count()

    if(booking_count >= room.quantity):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Room is not available for the selected dates"
        )

    ## Generate unique confirmation code
    while True:
        confirmation_code = generate_confirmation_code()
        existing_code = db.query(Booking).filter(Booking.confirmation_code == confirmation_code).first()
        if(not existing_code):
            break

    ## Create new booking in pending state
    new_booking = Booking(
        room_id=room_id,  # Use the UUID object here
        check_in=booking_data.check_in,
        check_out=booking_data.check_out,
        confirmation_code=confirmation_code,
        status="pending"  # Initial state before payment
    )

    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)

    return {
        "message": "Booking created successfully", 
        "booking_id": confirmation_code
    }

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
    
    origin = request.headers.get('origin')
    check_internal_request(origin)

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
                Booking.check_in < availability_data.check_out
            )
        ).count()

        ## If bookings are less than room quantity, room is available
        if(booking_count < room.quantity):
            available_rooms.append({
                "id": str(room.id),
                "name": room.name,
                "description": room.description,
                "price": room.price,
                "capacity": room.capacity,
                "available_quantity": room.quantity - booking_count
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
        if(session.metadata.get("booking_id") != data.booking_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Payment verification failed"
            )
            
        # If already processed, just return the confirmation
        if(session.metadata.get("processed") == "true"):
            return {
                "message": "Booking already confirmed", 
                "booking_id": data.booking_id
            }
            
        # If we get here, payment is valid and not yet processed
        booking.status = "confirmed"
        db.commit()

        # Mark Stripe session as processed
        stripe.checkout.Session.modify(
            data.session_id,
            metadata={"processed": "true"}
        )

        return {
            "message": "Booking confirmed successfully", 
            "booking_id": data.booking_id
        }
            
    except stripe.error.StripeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Stripe error: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

