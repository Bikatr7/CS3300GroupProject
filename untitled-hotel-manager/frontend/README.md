## Frontend

Assigned Roles:

- Architect (Kaden)
- Integrator (Ethan)
- Frontend Developer (Madison)

## To run the frontend:

1. Ensure you are in the frontend directory
2. Run `npm i` to install the dependencies
3. Run `npm run dev` to start the development server
4. Go to the url `http://localhost:5173/` to view the website

## ToDo

- Overall theming needs to be decided and dealt with
- New pages and stuff will need to be added
- Functionality needs to be added, most data fetches will be done in the backend, but stuff like getting info, forms, selecting stuff etc. will be done here.

It is up to the integrator to coordinate with the frontend developer to ensure that the frontend is doing what the backend expects it to do. As well as communicate api needs to the backend.


## File Structure

### Things you will probably not have to change

You will probably not have to change the following files

- vite.config.ts
- tsconfig.json
- tsconfig.node.json
- .env
- .eslintrc.cjs
- .prettierignore
- package-lock.json
- package.json
- vite-env.d.ts
- main.tsx

### Things you will definitely have to change

#### Theming

- index.html (favicon and root styles need to be decided)
- theme.ts (colors and fonts need to be decided)

#### Routing

- Router.tsx (this is where the routing is set up) (routes are how you navigate between pages)

#### Components

components/Navbar.tsx is the navbar. This is the top navigation bar that is present on every page.
components/NavItem.tsx is the navbar item. Holds lists of nav items for the navbar.

components/Footer.tsx is the footer. This is the bottom navigation bar that is present on every page.

Both of these need to changed for new pages and theming.

components/Login.tsx is the login component. This is the login button that is on the navbar. Login wise should be okay, but needs styling.

### Things you may have to change

#### Dependencies

If you run into dependency issues, just contact me (Kaden) and we can figure it out.

- package.json
- package-lock.json

#### App Config

Hopefully won't have to change anything here. Basically just the root component. If you believe something is wrong with the app config, then contact me (Kaden) and we can figure it out.

- App.tsx

#### Utils

index.tsx has some functions that are used throughout the app. Nothing too important. If you want to add a function, just add it here.

#### Pages

pages/HomePage.tsx is the home page. This is what you see when you first navigate to the website.

We'll add more pages as we get more functionality.

#### Contexts

contexts/AuthContext.tsx is the context for the authentication state. This is used to store the authentication state and provide it to the rest of the app. Hopefully proven technology and should work fine.

#### Animations

animations/commonAnimations.tsx has some common animations that are used throughout the app. Nothing too important. Add new ones as you see fit.

#### Assets

assets/images has all the images used in the app. Add new ones as you see fit.
