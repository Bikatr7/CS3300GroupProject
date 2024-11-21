## To run the backend:

1. Ensure you are in the backend directory
2. Run `python setup.py local` to install requirements and setup envs.
3. Run `uvicorn main:app --reload --port 5555` to start the uvicorn server
4. Go to the url `http://localhost:5555/` to view the API

## B2B Customer Documentation

### Room Configuration
Rooms are configured through the `edit_me.json` file in the root directory. Each room requires:
- `name`: The room type name (e.g., "Ocean View Suite")
- `description`: Detailed description of the room
- `price`: Price per night in USD
- `capacity`: Maximum number of guests
- `quantity`: Number of rooms of this type
- `numbers`: Array of room numbers (must match quantity)
- `ids`: Array of unique identifiers (must match quantity)

Example room configuration:

```json
{
"name": "Ocean View Suite",
"description": "Luxury suite with ocean views",
"price": 299,
"capacity": 2,
"quantity": 2,
"numbers": ["301", "302"],
"ids": ["ocean-view-1", "ocean-view-2"]
}
```

### Admin Credentials
The default login is:
- Username: `admin`
- Password: `password`

To change these credentials:
1. Open `backend/setup.py`
2. Locate the `setup_local_environment()` function
3. Modify the `ADMIN_USER` and `ADMIN_PASS_HASH` values
4. **Important**: Do not commit these changes to any public repository

### Payment Processing
HorizonHub uses Stripe for payment processing. The system comes with a test Stripe key for development. For production:
1. Sign up for a Stripe account
2. Replace the test key in `backend/setup.py`
3. Use real card information instead of test cards

### Database Management
- The database is automatically created at `database/database.db`
- Bookings are automatically cleaned up after expiration
- Manual cleanup can be performed through the admin panel
- Backup the database regularly to prevent data loss

### System Maintenance
To perform system maintenance:
1. The system has a built-in maintenance mode
2. All endpoints except health checks will return 503 during maintenance
3. Existing sessions will be preserved
4. Use this for updates or database maintenance

### Important Notes
1. Check-in/out times are fixed at 7 AM
2. Room configurations require server restart
3. Keep your admin credentials secure
4. Regularly backup your database
5. Test payment processing in test mode before going live
6. Monitor the server logs for errors or suspicious activity

### Developer Documentation

#### API Endpoints

The backend provides the following key API endpoints:

##### Authentication
- `POST /auth/login` - Login with admin credentials
- `POST /auth/refresh-access-token` - Refresh an expired access token
- `POST /auth/verify-token` - Verify a token's validity
- `POST /auth/check-if-admin-user` - Check if current user is admin

##### Booking Management
- `POST /booking/create` - Create a new booking
- `PUT /booking/modify/{booking_id}` - Modify an existing booking
- `POST /booking/check-availability` - Check room availability for dates
- `POST /booking/confirm-payment` - Confirm booking after payment
- `POST /booking/check-in` - Process guest check-in
- `POST /booking/check-out` - Process guest check-out

##### Admin Operations
- `GET /admin/bookings` - Get all bookings (admin only)
- `PUT /admin/bookings/{booking_id}` - Update a booking (admin only)
- `DELETE /admin/bookings/{booking_id}` - Delete a booking (admin only)

##### Payment Processing
- `POST /stripe/create-checkout-session` - Create Stripe payment session
- `POST /stripe/verify-payment` - Verify payment completion

#### Database Schema

The backend uses SQLite with SQLAlchemy ORM. Key models include:

##### Room
- `id` - Unique identifier
- `name` - Room type name
- `description` - Room description
- `price` - Price per night
- `capacity` - Maximum guest capacity
- `quantity` - Number of rooms of this type
- `number` - Physical room number

##### Booking
- `id` - Unique booking identifier
- `room_id` - Associated room ID
- `email` - Guest email
- `check_in` - Check-in datetime
- `check_out` - Check-out datetime
- `confirmation_code` - 6-digit booking confirmation code
- `status` - Booking status (pending/confirmed/checked_in/completed/cancelled)
- `checkout_code` - 6-digit check-out code
- `room_number` - Assigned room number
- `created_at` - Booking creation timestamp

#### Configuration

The backend is configured through several mechanisms:

1. Environment Variables (via .env file):
   - `ADMIN_USER` - Admin username
   - `ADMIN_PASS_HASH` - Hashed admin password
   - `ACCESS_TOKEN_SECRET` - JWT access token secret
   - `REFRESH_TOKEN_SECRET` - JWT refresh token secret
   - `STRIPE_API_KEY` - Stripe API key for payments

2. Room Configuration:
   - Rooms are configured via the `edit_me.json` file in the root directory
   - Changes to room configuration require server restart

#### Security Features

1. Authentication:
   - JWT-based authentication
   - Access and refresh token system
   - Bcrypt password hashing
   - Admin-only routes protection

2. Request Validation:
   - Origin verification via CORS
   - Request body validation using Pydantic models
   - Internal request verification

3. Booking Protection:
   - Concurrent booking prevention using locks
   - Automatic cleanup of stale pending bookings
   - Unique confirmation and checkout codes

#### Error Handling

The backend implements comprehensive error handling:
- HTTP status codes for different error scenarios
- Detailed error messages for debugging
- Transaction rollback on database errors
- Proper exception handling for third-party services

#### Development Notes

1. Local Development:
   - Use `python setup.py local` for local environment setup
   - Development mode enables auto-reload and detailed error messages
   - Test Stripe integration using test keys and cards

2. Database Management:
   - SQLite database located in `database/database.db`
   - Tables auto-created on first run
   - Manual cleanup possible via admin endpoints

3. Maintenance Mode:
   - Built-in maintenance mode toggle
   - Affects all endpoints except health checks
   - Controlled via threading lock

4. Rate Limiting:
   - Consider implementing rate limiting for production
   - Currently relies on upstream rate limiting

#### Production Considerations

When deploying to production:
1. Replace the test Stripe key with a production key
2. Configure proper CORS origins
3. Use a production-grade database
4. Implement rate limiting
5. Set up proper logging
6. Configure secure session handling
7. Use HTTPS
8. Set up monitoring and alerting
