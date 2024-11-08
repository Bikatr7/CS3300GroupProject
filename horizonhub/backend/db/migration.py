## Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## built-in imports
import os
from uuid import uuid4

## third-party imports
from sqlalchemy import text

## custom imports
from db.models import Room

def migrate_database(engine):
    """
    Handles all database migrations
    """
    
    with engine.connect() as connection:
        ## Check if quantity column exists in rooms table
        result = connection.execute(text("SELECT name FROM sqlite_master WHERE type='table' AND name='rooms'"))
        if(result.fetchone()):
            ## Check if quantity column exists
            result = connection.execute(text("PRAGMA table_info(rooms)"))
            columns = [row[1] for row in result.fetchall()]
            
            if('quantity' not in columns):
                ## Add quantity column with default value of 2
                connection.execute(text("ALTER TABLE rooms ADD COLUMN quantity INTEGER NOT NULL DEFAULT 2"))
                connection.commit()

        ## Check if confirmation_code column exists in bookings table
        result = connection.execute(text("SELECT name FROM sqlite_master WHERE type='table' AND name='bookings'"))
        if(result.fetchone()):
            ## Check if confirmation_code column exists
            result = connection.execute(text("PRAGMA table_info(bookings)"))
            columns = [row[1] for row in result.fetchall()]
            
            if('confirmation_code' not in columns):
                ## Create new bookings table with confirmation_code
                connection.execute(text("""
                    CREATE TABLE IF NOT EXISTS bookings_new (
                        id UUID PRIMARY KEY,
                        user_id UUID REFERENCES users(id),
                        room_id UUID REFERENCES rooms(id),
                        check_in TIMESTAMP,
                        check_out TIMESTAMP,
                        confirmation_code VARCHAR(6) UNIQUE
                    )
                """))
                
                ## Copy data from old table to new table
                connection.execute(text("""
                    INSERT INTO bookings_new (id, user_id, room_id, check_in, check_out)
                    SELECT id, user_id, room_id, check_in, check_out FROM bookings
                """))
                
                ## Drop old table and rename new table
                connection.execute(text("DROP TABLE bookings"))
                connection.execute(text("ALTER TABLE bookings_new RENAME TO bookings"))
                connection.commit()

        ## Add some initial rooms if the table is empty
        result = connection.execute(text("SELECT COUNT(*) FROM rooms"))
        if(result.fetchone()[0] == 0):
            rooms = [
                {
                    'id': str(uuid4()),
                    'name': 'Ocean View Suite',
                    'description': 'Luxurious suite with panoramic ocean views',
                    'price': 299,
                    'capacity': 2,
                    'quantity': 2
                },
                {
                    'id': str(uuid4()),
                    'name': 'Garden Deluxe Room',
                    'description': 'Peaceful room overlooking our tropical gardens',
                    'price': 199,
                    'capacity': 2,
                    'quantity': 2
                },
                {
                    'id': str(uuid4()),
                    'name': 'Presidential Suite',
                    'description': 'Our finest accommodation with premium amenities',
                    'price': 499,
                    'capacity': 4,
                    'quantity': 2
                }
            ]
            
            for room in rooms:
                connection.execute(
                    text("""
                        INSERT INTO rooms (id, name, description, price, capacity, quantity) 
                        VALUES (:id, :name, :description, :price, :capacity, :quantity)
                    """),
                    room
                )
            connection.commit()