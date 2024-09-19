# Backend

Assigned Roles:

- Architect (Kaden)
- Integrator (Ethan)
- Backend Developer (Chris)

## To run the frontend:

1. Ensure you are in the backend directory
2. Run `python setup.py local` to start the development server
3. Run `uvicorn main:app --reload --port 5000` to start the uvicorn server
4. Go to the url `http://localhost:5000/` to view the API

## To
- Functionality needs to be decided, majority of backend work will just be making sure the database holds new data and the api serves it correctly.

It is up to the integrator to coordinate with the backend developer to ensure that the backend is doing what the frontend expects it to do.

## File Structure

### Things you will probably not have to change

You will probably not have to change the following files

- setup.py
- requirements.txt (if you encounter dependency issues, just contact me (Kaden) and we can figure it out)
- entrypoint_prod.sh
- Dockerfile.dev
- Dockerfile.prod
- warmups.py
- migrations.py (this is where the database migrations are defined) (this is used to migrate the database when the schema changes, may or may not be needed as we likely won't be deploying somewhere were migrations would be needed)
- db/common.py
- db/base.py


### Things you will definitely have to change

#### Constants

constants.py (a lot of server variables are set here, new ones will need to be added)

#### Database

routes/models.py (this is where the database pydantic models are defined) (think of it as like a schema, for the actual database models)
db/models.py (this is where the database models are defined) (this is the actual database model, it has the table structure and such)


### Things you may have to change

#### Auth

routes/auth.py (this is where the auth routes are defined) (login, logout) etc, we may have to add more routes here related to authentication, but im not sure yet
auth/func.py (this is where the authentication functions are defined) (login, logout, register, etc)
auth/util.py (this is where the authentication utility functions are defined) (hash passwords, verify passwords, etc)


### Resources

https://github.com/Kakusui/kakusui.org/tree/development/backend