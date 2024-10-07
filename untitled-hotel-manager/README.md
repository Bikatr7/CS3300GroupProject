---------------------------------------------------------------------------------------------------------------------------------------------------
**Table of Contents**

- [**Overview**](#overview)
  - [**To Do (Architectural wise)**](#to-do-architectural-wise)
  - [**Requirements**](#requirements)
    - [**Venv**](#venv)
  - [**Setting Up A Local Build**](#setting-up-a-local-build)
- [**Resources**](#resources)

---------------------------------------------------------------------------------------------------------------------------------------------------

## **Overview**<a name="overview"></a>

Need to deal with this later

Bullet points of requirements/basic overview of problem

Problem Statement: 
A new hotel needs a booking and management system to keep track of bookings. Management needs a front end for customers to book a hotel room, and a database containing all booking information, including dates/customer information. It can block out dates that are unavailable and (potentially) handle changing/cancelling bookings.

### **To Do (Architectural wise)**<a name="to-do-architectural-wise"></a>

Basic overview of what needs to be done.

- Login for admin (only admin) (should be able to see all bookings, and have the ability to cancel/change)
- Interface for user, user can check in/out and also register, date time, room etc, these can be hardcoded options
- having actual occupancies can be dealt with later, just assume unlimited, booking should be simple. I just want standard like pay, at the counter (imagine cash insertion or something we're not going to deal with cards, just simulate a cash insertion feature and have it always succeed)

### **Requirements**<a name="requirements"></a>

![TIP] These are rough versions, as in what I currently use. It may work with other versions, but I can't guarantee it.

- Docker Desktop
- Python 3.11+
- Node.js v20.13.1
- NPM 10.8.1

#### **Venv**

It is recommended to use a virtual environment to manage dependencies. This can be done with the following commands:

```bash
python -m venv venv
source venv/Scripts/activate
cd untitled-hotel-manager
cd backend
pip install -r requirements.txt
```

VScode will also prompt you to use that. I also recommend using type checking for python via pylance.

### **Setting Up A Local Build**<a name="setting-up-a-local-build"></a>

These steps must be followed _in order_.

1. Clone the repo, make sure you are using the correct branch (currently `development`)
2. Navigate to the project directory. `cd untitled-hotel-manager`
3. Navigate to the `backend` directory. `cd backend`. Inside is the python backend.
4. Run the setup script with the local argument. This will install all requirements and setup the local env `python setup.py local`.
5. Run the server. For local `uvicorn main:app --reload --port 5000`
6. Open a new terminal and navigate to the `untitled-hotel-manager/frontend` directory. `cd untitled-hotel-manager/frontend`. Inside is the react (vite) frontend.
7. First install all required packages, these are in `package.json`. Do `npm i`. Then run the dev server with `npm run dev`
8. Website will be on localhost:5173 (frontend) and localhost:5000 (backend)

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