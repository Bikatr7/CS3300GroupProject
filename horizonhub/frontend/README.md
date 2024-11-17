### To run the frontend independently:

1. Ensure you are in the frontend directory `cd frontend`
2. Run `npm i` to install the dependencies
3. Run `npm run dev` to start the development server
4. Go to the url `http://localhost:5173/` to view the website

### B2B Customer Documentation


Home Page: Choose between customer and admin portals, can view amenities page from Navigation Bar. These can be changed in the upper level `edit_me.json` file.

Customer Page: Customers can book rooms from the Home page or Booking page, based on date range of stay and number of guests.

Check-in: Customer receives a 6 digit code upon transaction completion. On the day of their check in, as long as it is at or after the check-in time the customer can check in online and receive their room number. 

Check-out: As with check-in, the customer can check out remotely with another 6 digit code.

Admin Page: Accessible only to hotel management and staff

- Staff must log in to portal
- From the admin page, staff can view and edit all bookings
- Default login is admin:password, these can be changed by replacing the hashed password and username in `backend/setup.py`, make sure you do not push this change to any public repository as a B2B Customer.

### Theming and Details

Please use the edit_me.json file in order to change the details of your website. 

All images are stored in the `frontend/src/assets` folder. However if you want to change the favicon, you can do so by replacing the `logo.webp` file, it must be the same name and file type.

Sections: 
"theme"
    -You can add the name of your hotel under the item "name". Please only edit inside of the "  " quotation marks, such as changing "The Horizon Hotel" to "The Adams Hotel". 
    -change website colors using Hex codes
    -Each color of the website is editable using the items under the "colors" section. 
        -You can add the name of your hotel under the item "name". Please only edit inside of the "  " quotation marks, such as changing "The Horizon Hotel" to "The Adams Hotel". 
    -change website colors using Hex codes
    -Each color of the website is editable using the items under the "colors" section.
     -"primary": "#a46048",*not sure what this changes*
     -"background": the background color of the entire site
     -"accent1": "login" and "book now" button colors
     -"accent2": room selection button hover color
     -"text": whole website text color
     -"accent3": room selection button color
     -"headerFooter": bars across top and bottom of website
     -"accent4": Various buttons hover color
     -"accent5": *didn't see anywhere this is used?*
     -"navbar": *also not seen anywhere*
"config"
    -choose light or dark theme as default
"images"
    -change whether the background image is fullscreen
"amenities"
    -under "items", you can change the title and description of each room type. Please only edit the information contained inside the "  " quotation marks, such as "Ocean View Suite" or "Our Ocean View Suite is designed for the height of luxury and relaxation, with panoramic ocean views. Sleeps up to two guests."
    -to add another room type, please contact your developer.
"facilities"
    -Use the same rules as the "amenities" section, only change the title and description. To add another item to the facilities page, please contact your developer.
"rooms"
    -Use the same rules as the previous two sections. You can edit the items "name", "description", "price", "capacity", "quantity", "numbers" (room numbers), and "ids". 
    -If you contact your developer to add an additional room type, it will also be added in this section.

Rooms should only be changed before starting the backend server.

If you change anything visually related (config, theme, images, facilities, amenities), make sure you reload the page to see the changes. 

### Developer Documentation
