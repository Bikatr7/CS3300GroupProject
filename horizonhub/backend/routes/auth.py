## Copyright [name placeholder] (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## built-in imports
from datetime import timedelta, datetime
import random

## third-party imports
from fastapi import APIRouter, HTTPException, Request, status, Cookie, Depends
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBasicCredentials

## custom imports
from db.base import get_db
from db.models import VerificationCode

from routes.models import LoginModel, LoginToken, VerifyCodeRequest


from auth.func import create_access_token, create_refresh_token, func_verify_token, get_current_user, verify_credentials
from auth.util import check_internal_request

from constants import ADMIN_USER, TOKEN_EXPIRE_MINUTES

import typing

router = APIRouter()

@router.post("/auth/login", response_model=LoginToken)
def login(data:LoginModel, request:Request) -> typing.Dict[str, str]:
    
    """
    
    Login endpoint for the API

    Args:
    data (LoginModel): The data required to login

    Returns:
    typing.Dict[str, str]: The access token and token type

    """

    origin = request.headers.get('origin')

    check_internal_request(origin)

    credentials = HTTPBasicCredentials(username=data.username, password=data.password)
    verify_credentials(credentials)

    access_token_expires = timedelta(minutes=TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": data.username}, expires_delta=access_token_expires
    )
    refresh_token_expires = timedelta(minutes=TOKEN_EXPIRE_MINUTES)
    refresh_token = create_refresh_token(
        data={"sub": data.username}, expires_delta=refresh_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer", "refresh_token": refresh_token}


@router.post("/auth/refresh-access-token", response_model=LoginToken)
def refresh_token(request:Request, refresh_token: str = Cookie(None)) -> JSONResponse:
    
    """

    Refresh the access token using the refresh token

    Args:
    refresh_token (str): The refresh token

    Returns:
    typing.Dict[str, str]: The access token and token type

    """

    origin = request.headers.get('origin')

    check_internal_request(origin)

    if(refresh_token is None):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No refresh token provided")

    token_data = func_verify_token(refresh_token)
    access_token_expires = timedelta(minutes=TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": token_data.email}, expires_delta=access_token_expires
    )
    refresh_token_expires = timedelta(minutes=TOKEN_EXPIRE_MINUTES)
    new_refresh_token = create_refresh_token(
        data={"sub": token_data.email}, expires_delta=refresh_token_expires
    )

    response = JSONResponse(content={"access_token": access_token, "token_type": "bearer"})
    response.set_cookie(
        key="refresh_token",
        value=new_refresh_token,
        httponly=True,
        secure=True,
        samesite="strict",
        max_age=TOKEN_EXPIRE_MINUTES
    )
    return response
    
@router.post("/auth/verify-token")
async def verify_token_endpoint(request: Request):

    origin = request.headers.get('origin')

    check_internal_request(origin)

    auth_header = request.headers.get("Authorization")
    
    if(not auth_header or not auth_header.startswith("Bearer ")):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or missing token")
    
    token = auth_header.split(" ")[1]

    try:
        token_data = func_verify_token(token)
        return {"valid": True, "email": token_data.email}
    
    except HTTPException as e:
        return {"valid": False, "detail": str(e.detail)}

@router.post("/auth/check-if-admin-user")
async def check_admin(request: Request, current_user:str = Depends(get_current_user)):
    origin = request.headers.get('origin')

    check_internal_request(origin)

    is_admin = current_user == ADMIN_USER

    return JSONResponse(status_code=status.HTTP_200_OK, content={"result": is_admin})

@router.post("/auth/generate-verification-code")
async def generate_verification_code(request:Request, email:str, db = Depends(get_db)):
    """
    Generate a 6-digit verification code for the given email
    """

    origin = request.headers.get('origin')
    check_internal_request(origin)

    code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
    

    expires_at = datetime.utcnow() + timedelta(minutes=10)
    
    ## Delete any existing codes for this email
    db.query(VerificationCode).filter(VerificationCode.email == email).delete()
    
    ## Create new verification code
    verification = VerificationCode(
        email=email,
        code=code,
        expires_at=expires_at
    )
    
    db.add(verification)
    db.commit()
    
    return {"message": "Verification code generated", "code": code}

@router.post("/auth/verify-code")
async def verify_code(request:Request, data:VerifyCodeRequest, db = Depends(get_db)):
    
    """
    Verify a 6-digit code for the given email
    """

    origin = request.headers.get('origin')
    check_internal_request(origin)
    
    verification = db.query(VerificationCode).filter(
        VerificationCode.email == data.email,
        VerificationCode.used == False
    ).first()
    
    if(not verification):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No verification code found for this email"
        )
    
    if(verification.expires_at < datetime.utcnow()):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Verification code has expired"
        )
    
    if(verification.code != data.code):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid verification code"
        )
    
    ## Mark code as used
    verification.used = True
    db.commit()
    
    return {"message": "Code verified successfully"}
