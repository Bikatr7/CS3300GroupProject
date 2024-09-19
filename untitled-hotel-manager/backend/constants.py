## Copyright [name placeholder] (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

import os 

def get_env_variables() -> None:

    """

    Only used in development. This function reads the .env file and sets the environment variables.

    """

    if(not os.path.exists(".env")):
        return

    with open(".env") as f:
        for line in f:
            key, value = line.strip().split("=")
            os.environ[key] = value

get_env_variables()

ADMIN_USER = os.environ.get("ADMIN_USER")
ADMIN_PASS_HASH = os.environ.get("ADMIN_PASS_HASH")
ACCESS_TOKEN_SECRET = os.environ.get("ACCESS_TOKEN_SECRET")
REFRESH_TOKEN_SECRET = os.environ.get("REFRESH_TOKEN_SECRET")

ENVIRONMENT = os.environ.get("ENVIRONMENT", "development")

TOKEN_ALGORITHM = "HS256"
TOKEN_EXPIRE_MINUTES = 30 * 24 * 60  ## 30 days in minutes

DATABASE_URL:str = "sqlite:///./database/database.db"
DATABASE_PATH:str = "database/database.db"

__all__ = ["ADMIN_USER", 
           "ADMIN_PASS_HASH", 
           "ACCESS_TOKEN_SECRET", 
           "REFRESH_TOKEN_SECRET", 
           "ENVIRONMENT", 
           "TOKEN_ALGORITHM",
           "TOKEN_EXPIRE_MINUTES",
           "DATABASE_URL", 
           "DATABASE_PATH"]