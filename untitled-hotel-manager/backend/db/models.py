## Copyright [name placeholder] (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## built-in imports
from uuid import uuid4

## third-party imports
from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import UUID as modelUUID

## custom imports
from db.base import Base

## going to need a lot of work

class User(Base):
    __tablename__ = "users"
    id = Column(modelUUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    email = Column(String, unique=True, index=True)
    credits = Column(Integer, default=0)