## Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## built-in imports
from uuid import uuid4
from datetime import datetime

## third-party imports
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import UUID as modelUUID

## custom imports
from db.base import Base

## going to need a lot of work as we add more functionality

class User(Base):
    __tablename__ = "users"
    id = Column(modelUUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    email = Column(String, unique=True, index=True)
    credits = Column(Integer, default=0)

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(modelUUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    user_id = Column(modelUUID(as_uuid=True), ForeignKey("users.id"))
    room_id = Column(modelUUID(as_uuid=True), ForeignKey("rooms.id"))
    check_in = Column(DateTime)
    check_out = Column(DateTime)
    confirmation_code = Column(String(6), unique=True, nullable=False)
    status = Column(String, nullable=False, default="pending")  ## pending, confirmed, cancelled
    checkout_code = Column(String, unique=True, nullable=True)
    room_number = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    def to_dict(self, db=None):
        """Convert the booking object to a dictionary with related data"""
        data = {
            "id": str(self.id),
            "confirmation_code": self.confirmation_code,
            "check_in_date": self.check_in.isoformat() if self.check_in else None,
            "check_out_date": self.check_out.isoformat() if self.check_out else None,
            "status": self.status,
            "room_number": self.room_number,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
        
        if db:
            # Get user email
            user = db.query(User).filter(User.id == self.user_id).first()
            if user:
                data["customer_email"] = user.email
            
            # Get room details
            room = db.query(Room).filter(Room.id == self.room_id).first()
            if room:
                data["room_type"] = room.name
                data["room_description"] = room.description
                data["room_price"] = room.price
        
        return data

class VerificationCode(Base):
    __tablename__ = "verification_codes"
    
    email = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=False)
    used = Column(Boolean, default=False)

class Room(Base):
    __tablename__ = "rooms"
    id = Column(modelUUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    capacity = Column(Integer, nullable=False)
    quantity = Column(Integer, nullable=False, default=2)
    number = Column(String, nullable=False)
