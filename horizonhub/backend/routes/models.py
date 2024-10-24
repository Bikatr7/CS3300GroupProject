## Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## third-party imports
from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

class LoginModel(BaseModel):
    username:str
    password:str

class LoginToken(BaseModel):
    access_token:str
    token_type:str
    refresh_token:str

class TokenData(BaseModel):
    email:str

class BookingVerification(BaseModel):
    email:str
    code:str

## Add these new models
class VerificationCode(BaseModel):
    email:str
    code:str
    created_at:datetime
    expires_at:datetime
    used:bool = False

class VerifyCodeRequest(BaseModel):
    email:str
    code:str

class BookingCreate(BaseModel):
    room_id:UUID
    check_in:datetime
    check_out:datetime

class BookingUpdate(BaseModel):
    check_in:datetime
    check_out:datetime
