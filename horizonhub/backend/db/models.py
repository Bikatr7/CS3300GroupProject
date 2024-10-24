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


class VerificationCode(Base):
    __tablename__ = "verification_codes"
    
    email = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=False)
    used = Column(Boolean, default=False)
