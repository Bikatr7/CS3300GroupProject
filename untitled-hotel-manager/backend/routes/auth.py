## Copyright [name placeholder] (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## built-in imports
from datetime import timedelta

## third-party imports
from fastapi import APIRouter, HTTPException, Request, status, Cookie, Depends
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBasicCredentials

## custom imports
from db.base import SessionLocal
from db.common import get_db

from routes.models import LoginModel, LoginToken

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