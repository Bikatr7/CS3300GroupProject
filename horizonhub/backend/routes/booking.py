## Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## built-in imports
from datetime import datetime
from uuid import UUID

## third-party imports
from fastapi import APIRouter, HTTPException, Request, Depends, status
from sqlalchemy import and_

## custom imports
from db.base import get_db
from db.models import Booking, User
from auth.func import get_current_user
from auth.util import check_internal_request
from routes.models import BookingCreate, BookingUpdate

router = APIRouter()

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

    ## Check if room is available for the requested dates
    existing_booking = db.query(Booking).filter(
        and_(
            Booking.room_id == booking_data.room_id,
            Booking.check_out > booking_data.check_in,
            Booking.check_in < booking_data.check_out
        )
    ).first()

    if(existing_booking):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Room is not available for the selected dates"
        )

    ## Create new booking
    new_booking = Booking(
        user_id=user.id,
        room_id=booking_data.room_id,
        check_in=booking_data.check_in,
        check_out=booking_data.check_out
    )

    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)

    return {"message": "Booking created successfully", "booking_id": str(new_booking.id)}

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

