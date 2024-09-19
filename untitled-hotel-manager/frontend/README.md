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

### Things you may have to change

#### Dependencies

If you run into dependency issues, just contact me (Kaden) and we can figure it out.

- package.json
- package-lock.json

#### App Config

Hopefully won't have to change anything here. Basically just the root component.

- App.tsx

#### Utils

index.tsx has some functions that are used throughout the app. Nothing too important. If you want to add a function, just add it here.

#### Pages

pages/HomePage.tsx is the home page. This is what you see when you first navigate to the website.

We'll add more pages as we get more functionality.
