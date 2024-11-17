## Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## gets environment variables
## has to be done first as it actually sets the environment variables
from constants import *

## built-in libraries
import os
import threading
import json

maintenance_mode = False
maintenance_lock = threading.Lock()

## third-party libraries
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBasic

## custom modules
from db.base import Base, engine, SessionLocal
from db.models import Room

from routes.warmups import router as warmups_router
from routes.auth import router as auth_router
from routes.financial import router as financial_router
from routes.booking import router as booking_router

def find_edit_me_json():
    """
    Find edit_me.json by checking multiple possible locations
    """
    possible_paths = [
        "edit_me.json",  ## Same directory
        "../edit_me.json",  ##   One level up
        "../../edit_me.json",  ## Two levels up
        os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "edit_me.json")  ## Absolute path from current file
    ]

    for path in possible_paths:
        if(os.path.exists(path)):
            return path

    raise FileNotFoundError("Could not find edit_me.json in any expected location")

def configure_rooms():
    """
    Configure rooms from edit_me.json on startup
    """
    try:
        ## Find and read the edit_me.json file
        json_path = find_edit_me_json()
        print(f"Found edit_me.json at: {json_path}")
        
        with open(json_path, "r") as f:
            config = json.load(f)

        ## Get the rooms configuration
        rooms_config = config.get("rooms", [])

        db = SessionLocal()

        try:
            ## Clear existing rooms
            db.query(Room).delete()

            ## Add new rooms from configuration
            for room_config in rooms_config:
                ## Verify quantity matches number of room numbers and ids
                if(len(room_config["numbers"]) != room_config["quantity"] or 
                   len(room_config["ids"]) != room_config["quantity"]):
                    raise ValueError(f"Room {room_config['name']}: quantity ({room_config['quantity']}) " +
                                  f"does not match number of room numbers ({len(room_config['numbers'])}) " +
                                  f"or IDs ({len(room_config['ids'])})")

                ## Create individual rooms for each number/id pair
                for i in range(room_config["quantity"]):
                    new_room = Room(
                        id=room_config["ids"][i],
                        name=room_config["name"],
                        description=room_config["description"],
                        price=room_config["price"],
                        capacity=room_config["capacity"],
                        quantity=1,  # Each individual room has quantity 1
                        number=room_config["numbers"][i]
                    )
                    db.add(new_room)

            ## Commit the changes
            db.commit()
            print("Rooms configured successfully from edit_me.json")

        except Exception as e:
            print(f"Error configuring rooms: {str(e)}")
            db.rollback()
            raise
        finally:
            db.close()

    except Exception as e:
        print(f"Error reading edit_me.json: {str(e)}")
        raise

##-----------------------------------------start-of-main----------------------------------------------------------------------------------------------------------------------------------------------------------

## prevents unsafe config in production mode (not actually provided by HHG, but helps if customer does something stupidly unsafe)
if(not os.path.exists("database") and ACCESS_TOKEN_SECRET == "secret"):
    os.makedirs("database", exist_ok=True)

elif(not os.path.exists("database") and ACCESS_TOKEN_SECRET != "secret"):
    raise NotImplementedError("Database volume not attached and running in production mode, please exit and attach the volume")

## Create all database tables
Base.metadata.create_all(bind=engine)

## Configure rooms from edit_me.json
configure_rooms()

security = HTTPBasic()

envs = [ADMIN_USER, 
        ADMIN_PASS_HASH, 
        ACCESS_TOKEN_SECRET, 
        REFRESH_TOKEN_SECRET]

for env in envs:
    assert env, f"{env} environment variable not set"


##-----------------------------------------start-of-main----------------------------------------------------------------------------------------------------------------------------------------------------------

app = FastAPI()

## CORS setup
## If you wanted to deploy to production, make sure to change the allowed origins to the production URL.
allowed_origins = [
    "http://localhost:5173",  ### Frontend dev server
    "http://127.0.0.1:5173",  ### Alternative frontend URL
    "http://localhost:5555",  ### Backend dev server
    "http://127.0.0.1:5555",   ### Alternative backend URL
    "http://localhost:5173/",  ### Frontend with trailing slash
    "http://api.localhost:5555"  ### API domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600
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
app.include_router(booking_router)
app.include_router(financial_router)