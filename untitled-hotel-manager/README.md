---------------------------------------------------------------------------------------------------------------------------------------------------
**Table of Contents**

- [**Overview** ](#overview-)
- [**To Build** ](#to-build-)
  - [**Setting Up A Local Build** ](#setting-up-a-local-build-)
- [**TODO** ](#todo-)
  - [Start ](#start-)

---------------------------------------------------------------------------------------------------------------------------------------------------

## **Overview** <a name="overview"></a>
Bullet points of requirements/basic overview of problem

Problem Statement: 
A new hotel needs a booking and management system to keep track of bookings. Management needs a front end for customers to book a hotel room, and a database containing all booking information, including dates/customer information. It can block out dates that are unavailable and (potentially) handle changing/cancelling bookings.

## **To Build** <a name="to-build"></a>


### **Setting Up A Local Build** <a name="setting-up-a-local-build"></a>

These steps must be followed _in order_.

1. Clone the repo, make sure you are using the correct branch (currently `development`)
2. Navigate to the `backend` directory. `cd backend`. Inside is the python backend.
3. Run the setup script with the local argument. This will install all requirements and setup the local env `python setup.py local`.
4. Run the server. For local `uvicorn main:app --reload --port 5000`
5. Open a new terminal and navigate to the `frontend` directory. `cd frontend`. Inside is the react (vite) frontend.
6. First install all required packages, these are in `package.json`. Do `npm i`. Then run the dev server with `npm run dev`
7. Website will be on localhost:5173 (frontend) and localhost:5000 (backend)

Default login is admin:password

## **TODO** <a name="todo"></a>

We can deal with assignments later and actual things like task assignment later.

### Start <a name="start"></a>

Copy over the files from the example project. (I'm going to take from my own website project)
