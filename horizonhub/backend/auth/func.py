## Copyright [name placeholder] (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## built-in imports
import typing

from datetime import datetime, timedelta, timezone

## third-party imports
from jwt import PyJWTError
from passlib.context import CryptContext

import jwt

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, HTTPBasicCredentials

## custom imports
from routes.models import TokenData

from constants import ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, TOKEN_ALGORITHM, ADMIN_USER, ADMIN_PASS_HASH

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(data:dict, 
                        expires_delta:typing.Optional[timedelta]) -> str:

    """
    
    Create an access token with the given data and expiration time

    Args:
    data (dict): The data to encode into the token
    expires_delta (timedelta): The time until the token expires

    Returns:
    encoded_jwt (str): The encoded JWT token

    """

    to_encode = data.copy()

    if(expires_delta):
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, ACCESS_TOKEN_SECRET, algorithm=TOKEN_ALGORITHM) # type: ignore

    return encoded_jwt

def create_refresh_token(data:dict, 
                         expires_delta:typing.Optional[timedelta]) -> str:

    """

    Create a refresh token with the given data and expiration time

    Args:
    data (dict): The data to encode into the token
    expires_delta (timedelta): The time until the token expires

    Returns:
    encoded_jwt (str): The encoded JWT token

    """

    to_encode = data.copy()

    if(expires_delta):
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=1)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, REFRESH_TOKEN_SECRET, algorithm=TOKEN_ALGORITHM) # type: ignore
    return encoded_jwt


def func_verify_token(token:str) -> TokenData:

    """

    Verify the given token and return the data

    Args:    
    token (str): The token to verify

    Returns:
    TokenData: The data from the token

    """

    try:
        payload = jwt.decode(token, ACCESS_TOKEN_SECRET, algorithms=[TOKEN_ALGORITHM]) # type: ignore
        email:str = payload.get("sub")

        if(email is None):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        
        return TokenData(email=email)
        
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")

    except PyJWTError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
def get_current_user(token:str = Depends(oauth2_scheme)):

    """

    Get the current user from the given token

    Args:
    token (str): The token to get the user from

    Returns:
    str: The email of the user

    """

    if(not token):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No token provided")

    try:
        token_data = func_verify_token(token)
        return token_data.email
    except HTTPException as e:
        raise e

def check_if_admin_user(current_user:str = Depends(get_current_user)):

    """

    Get the current active user

    Args:
    current_user (str): The current user

    Returns:
    str: The username of the user

    """

    if(current_user != ADMIN_USER):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    
    return current_user

def verify_credentials(credentials:HTTPBasicCredentials) -> None:

    """
    
    Verify the given credentials

    Args:
    credentials (HTTPBasicCredentials): The credentials to verify

    """

    if(not(credentials.username == ADMIN_USER and pwd_context.verify(credentials.password, ADMIN_PASS_HASH))):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
            headers={"WWW-Authenticate": "Basic"},
        )