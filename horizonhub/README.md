---------------------------------------------------------------------------------------------------------------------------------------------------
**Table of Contents**

- [**Overview**](#overview)
  - [**Requirements**](#requirements)
  - [**Setting Up A Local Build**](#setting-up-a-local-build)
    - [To just run after setup](#to-just-run-after-setup)
  - [Repairing HorizonHub](#repairing-horizonhub)
  - [Some notes](#some-notes)

---------------------------------------------------------------------------------------------------------------------------------------------------

## **Overview**<a name="overview"></a>

HorizonHub is a hotel management and booking software that allows customers to schedule, check-in, and check-out of rooms, and enables hotel management to oversee bookings, including modifying and deleting them.

HorizonHub is provided as a full solution for hotel management and booking, with a focus on ease of use and customization. It is distributed for free by Horizon Hotel Group (Hereby referred to as HHG), whom offers additional paid support and services.

HorizonHub allows easy customization of theming, branding, and hotel information via a no-code solution. simply edit the `edit_me.json` file on the same level as this README and reload the page.

Please also see the `frontend/README.md` for information on the frontend, as well as the `backend/README.md` for information on the backend. Both have crucial information for customizing and understanding HorizonHub.

### **Requirements**<a name="requirements"></a>
 These are the recommended versions when setting up a local build of HorizonHub, other versions may work but HHG can't and does not guarantee it.

- Python 3.11+
- Node.js v20.13.1
- NPM 10.8.1
- Firefox (does not work in Chrome due to technical limitations, edge and other chromium based browsers have not been tested)
  
### **Setting Up A Local Build**<a name="setting-up-a-local-build"></a>

These steps must be followed _in order_. You only need to do this once per instance of HorizonHub to set things up, or if you change any fundamental part of `setup.py` or the code in `backend` or `frontend`.

YOU MUST HAVE YOUR SCRIPTS FOLDER ADDED TO YOUR PATH. Uvicorn will not work otherwise as it will not be able to find the python executable. (if you get a uvicorn not found error, you have not added your scripts folder to your path, do this, or use the direct path of the uvicorn executable)

1. Clone the repo, make sure you are using the correct branch (currently `development`)
2. Navigate to the project directory. `cd horizonhub`
3. Navigate to the `backend` directory. `cd backend`. Inside is the python backend.
4. Run the setup script with the local argument. This will install all requirements and setup the local env `python setup.py local`.
5. Run the server. For local `uvicorn main:app --reload --port 5555`
6. Open a new terminal and navigate to the `horizonhub/frontend` directory. `cd horizonhub/frontend`. Inside is the react (vite) frontend.
7. First install all required packages, these are in `package.json`. Do `npm i`. Then run the dev server with `npm run dev`
8. Website will be on localhost:5173 (frontend) and localhost:5555 (backend)

#### To just run after setup

If you have already done the above and just want to run again:

1. Navigate to the project directory. `cd horizonhub`
2. Navigate to the `backend` directory. `cd backend`. Inside is the python backend.
3. Run the server. For local `uvicorn main:app --reload --port 5555`
4. Open a new terminal and navigate to the `horizonhub/frontend` directory. `cd horizonhub/frontend`. Inside is the react (vite) frontend.
5. Run the dev server with `npm run dev`
6. Website will be on localhost:5173 (frontend) and localhost:5555 (backend)

The default login is admin:password, these can be changed by replacing the hashed password and username in `backend/setup.py`, make sure you do not push this change to any public repository as a B2B Customer.

### Repairing HorizonHub

If you have a broken HorizonHub, you can try the following:

1. In the `backend` directory, manually delete the `database/database.db` file. Make sure you have everything you need in `edit_me.json`.
2. In the `frontend` directory, manually delete the `node_modules` folder.
3. Navigate to the `horizonhub/backend` directory. `cd horizonhub/backend`.
4. Run `python setup.py local` again.
5. Run the server. For local `uvicorn main:app --reload --port 5555`
6. Open a new terminal and navigate to the `horizonhub/frontend` directory. `cd horizonhub/frontend`
7. Run `npm i`
8. Run `npm run dev`

If all else fails, save your `edit_me.json` and start over by deleting the entire `horizonhub` folder and cloning the repository again.

### Some notes

When testing, use `https://docs.stripe.com/testing` for payment

Once again, default login is `admin:password`.

Check in/out times are set to 7am, this was chosen as these systems are designed to be automated and this is the standard check in time for most hotels.
