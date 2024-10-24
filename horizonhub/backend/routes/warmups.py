## Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## third-party imports
from fastapi import APIRouter, status
from fastapi.responses import JSONResponse

router = APIRouter()        

@router.get("/", status_code=status.HTTP_200_OK)
async def api_home():

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"message": "Welcome to the Kakusui API."}
    )