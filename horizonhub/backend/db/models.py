## Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## built-in imports
from datetime import datetime

## third-party imports
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean

## custom imports
from db.base import Base


class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    credits = Column(Integer, default=0)

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(String, primary_key=True, index=True)
    room_id = Column(String, ForeignKey("rooms.id"))
    email = Column(String, nullable=True)
    check_in = Column(DateTime)
    check_out = Column(DateTime)
    confirmation_code = Column(String(6), unique=True, nullable=False)
    status = Column(String, nullable=False, default="pending")
    checkout_code = Column(String, unique=True, nullable=True)
    room_number = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    def to_dict(self, db=None):
        """Convert the booking object to a dictionary with related data"""
        data = {
            "id": self.id,
            "confirmation_code": self.confirmation_code,
            "check_in_date": self.check_in.isoformat() if getattr(self, 'check_in', None) else None,
            "check_out_date": self.check_out.isoformat() if getattr(self, 'check_out', None) else None,
            "status": self.status,
            "room_number": self.room_number,
            "created_at": getattr(self, 'created_at', None).isoformat() if getattr(self, 'created_at', None) is not None else None,
            "customer_email": self.email
        }
        
        if db:
            # Get room details
            room = db.query(Room).filter(Room.id == self.room_id).first()
            if room:
                ## Calculate total price based on number of nights
                ## Add 1 to include both check-in and check-out days
                nights = ((self.check_out - self.check_in).days + 1) if self.check_out and self.check_in else 1
                total_price = room.price * nights
                
                data.update({
                    "room_type": room.name,
                    "room_description": room.description,
                    "room_price": total_price,
                    "price_per_night": room.price,
                    "nights": nights 
                })
        
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
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    capacity = Column(Integer, nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    number = Column(String, nullable=False)
