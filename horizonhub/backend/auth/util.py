## Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## built-in imports
import asyncio
import os

## third-party imports
from fastapi import HTTPException, Request

from werkzeug.utils import secure_filename

async def get_secure_path(base_dir:str, filename:str) -> str:
    secure_name = await get_secure_filename(filename)
    return os.path.join(base_dir, secure_name)

async def get_secure_filename(filename:str) -> str:
    return await asyncio.to_thread(secure_filename, filename)

async def check_internal_request(request:Request) -> None:

    """

    Check if the request is from an internal source

    Args:
    origin (str): The origin of the request

    """

    allowed_domains = set()

    origin = request.headers.get('origin')

    ## prod build is out of scope for this project
    allowed_domains.add("http://localhost:5173")

    if(origin is None or (origin is not None and not any(origin.endswith(domain) for domain in allowed_domains))):
        raise HTTPException(status_code=403, detail="Forbidden")