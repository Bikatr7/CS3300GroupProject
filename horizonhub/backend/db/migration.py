## Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## built-in imports
from uuid import uuid4

## third-party imports
from sqlalchemy import text


## Unless you are Kaden, do not modify old migrations, you may add new ones
## but do not remove old ones

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

        ## Add status column to bookings if it doesn't exist
        result = connection.execute(text("PRAGMA table_info(bookings)"))
        columns = [row[1] for row in result.fetchall()]
        
        if('status' not in columns):
            connection.execute(text("ALTER TABLE bookings ADD COLUMN status VARCHAR NOT NULL DEFAULT 'pending'"))
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
                    'quantity': 2,
                    'number': '301'
                },
                {
                    'id': str(uuid4()),
                    'name': 'Garden Deluxe Room',
                    'description': 'Peaceful room overlooking our tropical gardens',
                    'price': 199,
                    'capacity': 2,
                    'quantity': 2,
                    'number': '201'
                },
                {
                    'id': str(uuid4()),
                    'name': 'Presidential Suite',
                    'description': 'Our finest accommodation with premium amenities',
                    'price': 499,
                    'capacity': 4,
                    'quantity': 2,
                    'number': '401'
                }
            ]
            
            for room in rooms:
                connection.execute(
                    text("""
                        INSERT INTO rooms (id, name, description, price, capacity, quantity, number) 
                        VALUES (:id, :name, :description, :price, :capacity, :quantity, :number)
                    """),
                    room
                )
            connection.commit()

        ## Add check-in/check-out columns migration
        result = connection.execute(text("PRAGMA table_info(bookings)"))
        columns = [row[1] for row in result.fetchall()]
        
        ## If we need to add the new columns, we need to recreate the table
        if('checkout_code' not in columns or 'room_number' not in columns):
            try:
                ## Create new table with all columns
                connection.execute(text("""
                    CREATE TABLE bookings_new (
                        id UUID PRIMARY KEY,
                        user_id UUID REFERENCES users(id),
                        room_id UUID REFERENCES rooms(id),
                        check_in TIMESTAMP,
                        check_out TIMESTAMP,
                        confirmation_code VARCHAR(6) UNIQUE,
                        status VARCHAR NOT NULL DEFAULT 'pending',
                        checkout_code VARCHAR UNIQUE,
                        room_number VARCHAR
                    )
                """))
                
                ## Copy existing data
                connection.execute(text("""
                    INSERT INTO bookings_new (
                        id, user_id, room_id, check_in, check_out, 
                        confirmation_code, status
                    )
                    SELECT id, user_id, room_id, check_in, check_out,
                           confirmation_code, status
                    FROM bookings
                """))
                
                ## Drop old table and rename new one
                connection.execute(text("DROP TABLE bookings"))
                connection.execute(text("ALTER TABLE bookings_new RENAME TO bookings"))
                print("Successfully recreated bookings table with new columns")
                
            except Exception as e:
                print(f"Error recreating bookings table: {e}")

        ## Add room number column to rooms table if it doesn't exist
        result = connection.execute(text("PRAGMA table_info(rooms)"))
        columns = [row[1] for row in result.fetchall()]
        
        if('number' not in columns):
            try:
                connection.execute(text("ALTER TABLE rooms ADD COLUMN number VARCHAR"))
                print("Added number column to rooms table")
                
                ## Update existing rooms with numbers if any exist
                rooms = connection.execute(text("SELECT id FROM rooms")).fetchall()
                for i, room in enumerate(rooms, start=1):
                    connection.execute(
                        text("UPDATE rooms SET number = :number WHERE id = :id"),
                        {"number": f"{i}01", "id": room[0]}
                    )
            except Exception as e:
                print(f"Error adding number column to rooms: {e}")

        connection.commit()

    ## Add the new migration
    add_default_rooms(engine)

def add_default_rooms(engine):
    """Add default rooms if they don't exist"""
    from sqlalchemy.orm import sessionmaker
    from db.models import Room
    
    Session = sessionmaker(bind=engine)
    session = Session()

    ## Check if rooms already exist
    existing_rooms = session.query(Room).count()
    if(existing_rooms > 0):
        session.close()
        return

    ## Define default rooms
    default_rooms = [
        Room(
            name="Deluxe King Suite",
            description="Spacious suite with king-size bed, ocean view, and luxury amenities",
            price=299,
            capacity=2,
            quantity=5,
            number="501"
        ),
        Room(
            name="Double Queen Room",
            description="Comfortable room with two queen beds, perfect for families",
            price=199,
            capacity=4,
            quantity=8,
            number="601"
        ),
        Room(
            name="Executive Suite",
            description="Premium suite with separate living area and premium amenities",
            price=399,
            capacity=2,
            quantity=3,
            number="701"
        ),
        Room(
            name="Family Suite",
            description="Large suite with two bedrooms, perfect for family stays",
            price=499,
            capacity=6,
            quantity=4,
            number="801"
        )
    ]

    ## Add rooms to database
    for room in default_rooms:
        session.add(room)

    try:
        session.commit()
    except Exception as e:
        print(f"Error adding default rooms: {e}")
        session.rollback()
    finally:
        session.close()