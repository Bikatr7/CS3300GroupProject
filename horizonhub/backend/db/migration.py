## Copyright [name placeholder] (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## third-party imports
from sqlalchemy import Engine
from sqlalchemy.inspection import inspect

## custom imports
from db.models import User

def migrate_database(engine:Engine) -> None:

    """

    Performs database migrations if needed.
    
    """

    inspector = inspect(engine)

    inspector.clear_cache()

    ## Migration 1 (2024-09-05) (Addition of users table)
    try:
        if(not inspector.has_table('users')):
            print("users table not found. Attempting to create it.")
            User.__table__.create(engine)
            print("Created users table")
        else:
            print("users table already exists")

        inspector.clear_cache()
        
    except Exception as e:
        print(f"Error during migration: {str(e)}")
        pass