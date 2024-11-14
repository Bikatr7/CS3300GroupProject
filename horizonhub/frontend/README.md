# Frontend

Assigned Roles:

- Architect (Kaden)
- Integrator (Ethan)
- Frontend Developer (Maddison)

## To run the frontend:

1. Ensure you are in the frontend directory `cd frontend`
2. Run `npm i` to install the dependencies
3. Run `npm run dev` to start the development server
4. Go to the url `http://localhost:5173/` to view the website


## Frontend:

Home Page: Choose between customer and admin portals, can view amenities page from Navigation Bar.

Customer Page:

Check-in: Customer recieves a 6 digit code upon transaction completion. On the day of their check in, as long as it is at or after the check-in time the customer can check in online and receive their room number. 

Check-out: As with check-in, the customer can check out remotely with another 6 digit code.

schedule (prompt for first name/last name/email/phone number/) -> go to next window or whatever (ask for date, best way to do this is probably a calender modal, we need that and a time) -> (next ask for room, just assume we have three hardcoded options for now, approve it and output a 6 digit code)

Admin Page: Accessible only to hotel management and staff

- Staff must log in to portal
- From the admin page, staff can view and edit all bookings


#### Theming

- index.html
- theme.ts
<img width="604" alt="Screen Shot 2024-10-06 at 11 00 44 AM" src="https://github.com/user-attachments/assets/bd0e3c9a-4bd8-4c64-9655-e67825393ad0">

- Color Scheme hex codes (from left to right)
- #a46048
- App background: #2e343c
- #de7c47
- #5c4b4a
- Text color: #fbe9b4
- #44545a
- Header/footer color: #512316
- #7d341b
- #99837c
- Nav bar drop down: #c18c6a

#### Routing

- Router.tsx (this is where the routing is set up) (routes are how you navigate between pages)

#### Components

components/Navbar.tsx is the navigation bar. This is the top navigation bar that is present on every page.
components/NavItem.tsx is the navigation bar item. Holds lists of navigation items for the navbar.

components/Footer.tsx is the footer. This is the bottom navigation bar that is present on every page.

components/Login.tsx is the login component. This is the login button that is on the navbar.


### Resources

https://github.com/Kakusui/kakusui.org/tree/development/frontend
https://github.com/Bikatr7/kadenbilyeu.com/tree/development/frontend
