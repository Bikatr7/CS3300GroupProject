---------------------------------------------------------------------------------------------------------------------------------------------------
**Table of Contents**

- [**Overview**](#overview)
  - [**To Do (Architectural wise)**](#to-do-architectural-wise)
  - [Maddison see Readme in frontend](#maddison-see-readme-in-frontend)
  - [**Requirements**](#requirements)
    - [**Venv**](#venv)
  - [**Setting Up A Local Build**](#setting-up-a-local-build)
- [**Resources**](#resources)

---------------------------------------------------------------------------------------------------------------------------------------------------

## **Overview**<a name="overview"></a>

Problem Statement: 
The Development of a Hotel Management and Booking software that allows customers to schedule, check-in, and check-out of rooms, and enables hotel management to oversee bookings, including creating, modifying, and canceling them. The software aims to minimize the need for hotel owners to manage bookings manually, streamlining the process through automation.

### **To Do (Architectural wise)**<a name="to-do-architectural-wise"></a>

### Maddison see Readme in frontend

Basic overview of what needs to be done.

- Home Page or main page should have two buttons, one for customers one for admins

Customer Page:

check in (prompt for 6 digit code, accept it, and return some hardcoded response)

check out (prompt for 6 digit code, accept it, return some hardcoded response)

schedule (prompt for first name/last name/email/phone number/) -> go to next window or whatever (ask for date, best way to do this is probably a calender modal, we need that and a time) -> (next ask for room, just assume we have three hardcoded options for now, approve it and output a 6 digit code)

Admin Page:

- Login page FIRST
- View all bookings (will have a way to cancel/modify bookings later)

you're free to hardcode all these responses on the frontend, i'll design the base of the backend and connect them up later

### **Requirements**<a name="requirements"></a>

![TIP] These are rough versions, as in what I currently use. It may work with other versions, but I can't guarantee it.

- Docker Desktop
- Python 3.11+
- Node.js v20.13.1
- NPM 10.8.1

#### **Venv**

It is recommended to use a virtual environment to manage dependencies. This can be done with the following commands:

You may need these to install the requirements:
https://visualstudio.microsoft.com/visual-cpp-build-tools/

```bash
python -m venv venv
source venv/Scripts/activate
cd horizonhub
cd backend
pip install -r requirements.txt
```

VScode will also prompt you to use that. I also recommend using type checking for python via pylance.

### **Setting Up A Local Build**<a name="setting-up-a-local-build"></a>

These steps must be followed _in order_.

1. Clone the repo, make sure you are using the correct branch (currently `development`)
2. Navigate to the project directory. `cd horizonhub`
3. Navigate to the `backend` directory. `cd backend`. Inside is the python backend.
4. Run the setup script with the local argument. This will install all requirements and setup the local env `python setup.py local`.
5. Run the server. For local `uvicorn main:app --reload --port 5000`
6. Open a new terminal and navigate to the `horizonhub/frontend` directory. `cd horizonhub/frontend`. Inside is the react (vite) frontend.
7. First install all required packages, these are in `package.json`. Do `npm i`. Then run the dev server with `npm run dev`
8. Website will be on localhost:5173 (frontend) and localhost:5000 (backend)
so
Default login is admin:password

## **Resources**

Technologies:

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/en/main)
- [Vite](https://vitejs.dev/)
- [Tailwind](https://tailwindcss.com/)
- [Python](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Uvicorn](https://www.uvicorn.org/)

Model Templates:

  https://github.com/bikatr7/kadenbilyeu.com
  https://github.com/kakusui/kakusui.org