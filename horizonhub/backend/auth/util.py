## Copyright [name placeholder] (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## built-in imports
import os

## third-party imports
from fastapi import HTTPException

from werkzeug.utils import secure_filename

## custom modules
from constants import ENVIRONMENT

def get_secure_path(base_dir:str, filename:str) -> str:
    secure_name = secure_filename(filename)
    return os.path.join(base_dir, secure_name)

def get_secure_filename(filename:str) -> str:
    return secure_filename(filename)

def check_internal_request(origin:str | None) -> None:

    """

    Check if the request is from an internal source

    Args:
    origin (str): The origin of the request

    """

    ## note from Kaden
    ## We need to update this to allow requests from the production frontend
    ## when/if we have one

    allowed_domains = [
        "http://localhost:5173",
    ]

    if(ENVIRONMENT != "development"):
        allowed_domains.pop(allowed_domains.index("http://localhost:5173"))

    if(origin is None or (origin is not None and not any(origin.endswith(domain) for domain in allowed_domains))):
        raise HTTPException(status_code=403, detail="Forbidden")