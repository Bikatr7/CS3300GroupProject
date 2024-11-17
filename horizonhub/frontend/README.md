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

Customer Page: Customers can book rooms from the Home page or Booking page, based on date range of stay and number of guests.

Check-in: Customer recieves a 6 digit code upon transaction completion. On the day of their check in, as long as it is at or after the check-in time the customer can check in online and receive their room number. 

Check-out: As with check-in, the customer can check out remotely with another 6 digit code.

Admin Page: Accessible only to hotel management and staff

- Staff must log in to portal
- From the admin page, staff can view and edit all bookings


#### Theming and Details

Please use the edit_me.json file in order to change the details of your website. 

Sections: 
"theme"
    -You can add the name of your hotel under the item "name". Please only edit inside of the "  " quotation marks, such as changing "The Horizon Hotel" to "The Adams Hotel". 
    -change website colors using Hex codes
    -Each color of the website is editable using the items under the "colors" section. 
    -***********add what each color changes***********
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



### Resources

https://github.com/Kakusui/kakusui.org/tree/development/frontend
https://github.com/Bikatr7/kadenbilyeu.com/tree/development/frontend
