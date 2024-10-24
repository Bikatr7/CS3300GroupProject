## Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## gets environment variables
## has to be done first as it actually sets the environment variables
from constants import *

## built-in libraries
import os
import threading

maintenance_mode = False
maintenance_lock = threading.Lock()

## third-party libraries
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBasic

## custom modules
from db.base import Base, engine
from db.common import create_tables_if_not_exist
from db.migration import migrate_database

from routes.warmups import router as warmups_router
from routes.auth import router as auth_router
from routes.booking import router as booking_router

##-----------------------------------------start-of-main----------------------------------------------------------------------------------------------------------------------------------------------------------

if(not os.path.exists("database") and ACCESS_TOKEN_SECRET == "secret"):
    os.makedirs("database", exist_ok=True)

elif(not os.path.exists("database") and ACCESS_TOKEN_SECRET != "secret"):
    raise NotImplementedError("Database volume not attached and running in production mode, please exit and attach the volume")

security = HTTPBasic()

envs = [ADMIN_USER, 
        ADMIN_PASS_HASH, 
        ACCESS_TOKEN_SECRET, 
        REFRESH_TOKEN_SECRET]

for env in envs:
    assert env, f"{env} environment variable not set"

create_tables_if_not_exist(engine, Base)

migrate_database(engine)

##-----------------------------------------start-of-main----------------------------------------------------------------------------------------------------------------------------------------------------------

app = FastAPI()

## CORS setup
allowed_origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def maintenance_middleware(request:Request, call_next):
    global maintenance_mode, maintenance_lock
    with maintenance_lock:
        if(maintenance_mode):
            return JSONResponse(status_code=503, content={"message": "Server is in maintenance mode"})
    
    response = await call_next(request)
    
    return response

app.include_router(warmups_router)
app.include_router(auth_router)