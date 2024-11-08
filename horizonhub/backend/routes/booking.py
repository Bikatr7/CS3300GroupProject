## Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## built-in imports
from uuid import UUID
import random
import string

## third-party imports
from fastapi import APIRouter, HTTPException, Request, Depends, status
from sqlalchemy import and_

## custom imports
from db.base import get_db
from db.models import Booking, User, Room
from auth.func import get_current_user
from auth.util import check_internal_request
from routes.models import BookingCreate, BookingUpdate, CheckAvailabilityRequest

router = APIRouter()

def generate_confirmation_code():
    """Generate a random 6-digit confirmation code"""
    return ''.join(random.choices(string.digits, k=6))

@router.post("/booking/create")
async def create_booking(request:Request, booking_data:BookingCreate, current_user:str = Depends(get_current_user), db = Depends(get_db)):
    """
    Create a new booking for a user
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

    ## Check if room exists
    room = db.query(Room).filter(Room.id == booking_data.room_id).first()
    if(not room):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Room not found"
        )

    ## Check if room is available for the requested dates
    booking_count = db.query(Booking).filter(
        and_(
            Booking.room_id == booking_data.room_id,
            Booking.check_out > booking_data.check_in,
            Booking.check_in < booking_data.check_out
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

    ## Create new booking
    new_booking = Booking(
        user_id=user.id,
        room_id=booking_data.room_id,
        check_in=booking_data.check_in,
        check_out=booking_data.check_out,
        confirmation_code=confirmation_code
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
    
    origin = request.headers.get('origin')
    check_internal_request(origin)

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

