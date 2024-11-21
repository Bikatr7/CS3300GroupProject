### To run the frontend independently:

1. Ensure you are in the frontend directory `cd frontend`
2. Run `npm i` to install the dependencies
3. Run `npm run dev` to start the development server
4. Go to the url `http://localhost:5173/` to view the website

### B2B Customer Documentation

#### Portal Overview
- **Customer Portal**: Accessible from home page, allows guests to:
  - Book rooms
  - Check in using confirmation code
  - Check out using checkout code
  - View amenities and facilities

- **Admin Portal**: Secure access for staff to:
  - View all bookings
  - Edit booking details
  - Delete bookings
  - Monitor booking status

#### Website Customization

1. **Basic Information**
   - Hotel name and support email configurable in `edit_me.json`
   - Logo can be changed by replacing `logo.webp` in `src/assets`
   - All changes require page reload

2. **Color Scheme**
   All colors are customizable through `edit_me.json`:
   - "background": The background color of the entire site
   - "accent1": Primary button colors (login, book now, etc.)
   - "accent2": Secondary interactive elements and hover states
   - "text": Main text color throughout the website
   - "accent3": Interactive element backgrounds (room selection, panels)
   - "headerFooter": Navigation and footer bars color
   - "accent4": Button hover states and secondary actions
   - "accent5": Secondary text color (used in error pages)

3. **Room Configuration**
   In `edit_me.json`, under "rooms":
   - Configure room types, descriptions, and pricing
   - Set room capacity and quantity
   - Assign room numbers and IDs
   - **Important**: Changes require backend server restart

4. **Amenities & Facilities**
   In `edit_me.json`, under "amenities":
   - Customize room type descriptions and images
   - Add facility information (pool, spa, etc.)
   - Images must be placed in `src/assets/images/`

#### Important Notes

1. **Browser Compatibility**
   - Primary support for Firefox
   - Chrome not fully supported
   - Warning banner shown to Chrome users

2. **Theme Changes**
   - Edit `edit_me.json` for visual changes
   - Reload page to see updates
   - Clear browser cache if changes don't appear

3. **Security**
   - Admin credentials in `backend/setup.py`
   - Don't commit credential changes
   - Keep access tokens secure

4. **Images**
   - Store in `src/assets/images/`
   - Use .jpg format for room images
   - Use .webp for logo

5. **Maintenance**
   - Regular cache clearing recommended
   - Monitor admin panel for booking issues
   - Keep edit_me.json backed up

### Theming and Details

Please use the edit_me.json file in order to change the details of your website. 

All images are stored in the `frontend/src/assets` folder. However if you want to change the favicon, you can do so by replacing the `logo.webp` file, it must be the same name and file type.

Sections:

"theme"

You can add the name of your hotel under the item "name". Please only edit inside of the "  " quotation marks, such as changing "The Horizon Hotel" to "The Adams Hotel". 
    
Change website colors using Hex codes
    
Each color of the website is editable using the items under the "colors" section. 
     
- "background": The background color of the entire site
     
- "accent1": Primary button colors (login, book now, etc.)
     
- "accent2": Secondary interactive elements and hover states
     
- "text": Main text color throughout the website
     
- "accent3": Interactive element backgrounds (room selection, panels)
     
- "headerFooter": Navigation and footer bars color
     
- "accent4": Button hover states and secondary actions
     
- "accent5": Secondary text color (used in error pages)

"config"

- choose light or dark theme as default
    
"images"

- change whether the background image is fullscreen
    
"amenities"

- under "items", you can change the title and description of each room type. Please only edit the information contained inside the "  " quotation marks, such as "Ocean View Suite" or "Our Ocean View Suite is designed for the height of luxury and relaxation, with panoramic ocean views. Sleeps up to two guests."
    
- to add another room type, please contact your developer.
    
"facilities"

- Use the same rules as the "amenities" section, only change the title and description. To add another item to the facilities page, please contact your developer.
"rooms"

- Use the same rules as the previous two sections. You can edit the items "name", "description", "price", "capacity", "quantity", "numbers" (room numbers), and "ids". 
    
- If you contact your developer to add an additional room type, it will also be added in this section.

Rooms should only be changed before starting the backend server.

If you change anything visually related (config, theme, images, facilities, amenities), make sure you reload the page to see the changes. 

### Developer Documentation

#### Project Structure

- `src/`
  - `components/` - Reusable UI components
  - `pages/` - Page components and routes
  - `contexts/` - React context providers
  - `utils/` - Utility functions
  - `animations/` - Animation configurations
  - `assets/` - Static assets (images, etc.)

#### Key Technologies

- React 18 with TypeScript
- Chakra UI for styling
- Framer Motion for animations
- Axios for API requests
- React Router for routing

#### Core Components

1. **ThemeProvider**
   - Manages global theming based on `edit_me.json`
   - Handles color modes and theme customization
   - Located in `src/components/ThemeProvider.tsx`

2. **AuthContext**
   - Manages authentication state
   - Handles JWT tokens and user sessions
   - Located in `src/contexts/AuthContext.tsx`

3. **Router**
   - Central routing configuration
   - Protected route handling
   - Located in `src/Router.tsx`

#### Adding New Features

1. **New Pages**
   - Create component in `src/pages/`
   - Add route to `Router.tsx`
   - Add navigation link in `NavItems.tsx` if needed

2. **New Components**
   - Create in `src/components/`
   - Follow existing component patterns
   - Use Chakra UI for styling

3. **Protected Routes**
   - Use `ProtectedAdminRoute` wrapper
   - Add authentication checks
   - Update `AuthContext` if needed

#### Styling Guidelines

1. **Theme Configuration**
   - All colors defined in `edit_me.json`
   - Access via `theme.colors.brand.[color]`
   - Use Chakra UI's style props

2. **Responsive Design**
   - Use Chakra UI's responsive syntax
   - Mobile-first approach
   - Test all breakpoints

3. **Animations**
   - Define in `src/animations/commonAnimations.tsx`
   - Use Framer Motion variants
   - Keep animations consistent

#### API Integration

1. **Making Requests**
   ```typescript
   import { getURL } from '../utils';
   
   const response = await axios.post(getURL('/endpoint'), data);
   ```

2. **Error Handling**
   ```typescript
   try {
     // API call
   } catch (error) {
     toast({
       title: "Error",
       description: error.response?.data?.detail || "An error occurred",
       status: "error",
       duration: 5000,
       isClosable: true,
     });
   }
   ```

#### Browser Compatibility

- Primary support for Firefox
- Chrome support limited due to technical constraints
- Use `isChrome()` utility for browser detection

#### Development Notes

1. **Environment Variables**
   - Configured in `.env`
   - Access via `import.meta.env`
   - Don't commit sensitive values

2. **State Management**
   - Use React Context for global state
   - Local state with useState
   - Props for component-specific data

3. **Performance**
   - Lazy load routes
   - Optimize images
   - Memoize expensive computations

4. **Testing**
   - Component testing with React Testing Library
   - Integration testing with Cypress
   - Run tests before commits

#### Build and Deployment

1. **Development**
   ```bash
   npm run dev
   ```

2. **Production Build**
   ```bash
   npm run build
   ```

3. **Preview Production Build**
   ```bash
   npm run preview
   ```

#### Common Issues

1. **Chrome Compatibility**
   - Certain features don't work in Chrome
   - Use Firefox for development
   - Implement Chrome warning banner

2. **Theme Updates**
   - Changes require page reload
   - Update `edit_me.json`
   - Clear browser cache if needed

3. **Authentication**
   - Token expiration handling
   - Refresh token implementation
   - Protected route access
