## Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## third-party imports
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
import stripe

## custom modules
from db.base import get_db
from util import get_frontend_url
from auth.util import check_internal_request
router = APIRouter()

@router.post("/stripe/create-checkout-session")
async def create_checkout_session(request: Request):
    
    await check_internal_request(request)

    FRONTEND_URL = await get_frontend_url()

    data = await request.json()
    amount = data.get('amount')
    booking_id = data.get('booking_id')
    room_name = data.get('room_name')

    if(not all([amount, booking_id, room_name])):
        raise HTTPException(status_code=400, detail="Missing required fields")

    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': amount,
                        'product_data': {
                            'name': f'Booking for {room_name}',
                            'description': f'Booking confirmation: {booking_id}',
                        },
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=f'{FRONTEND_URL}/booking/success?session_id={{CHECKOUT_SESSION_ID}}&booking_id={booking_id}',
            cancel_url=f'{FRONTEND_URL}/booking',
            metadata={
                'booking_id': booking_id,
                'processed': 'false'
            }
        )
        return {"url": checkout_session.url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/stripe/verify-payment")
async def verify_payment(request: Request, db: Session = Depends(get_db)):
    
    await check_internal_request(request)

    try:
        data = await request.json()
        session_id = data.get('session_id')
        booking_id = data.get('booking_id')
        
        if(not all([session_id, booking_id])):
            return {"success": False, "message": "Missing required fields"}

        session = stripe.checkout.Session.retrieve(session_id)

        if(session.payment_status == 'paid' and session.metadata.get('booking_id') == booking_id): ## type: ignore
            if(session.metadata.get('processed') == 'true'): ## type: ignore
                return {"success": False, "message": "Payment already processed"}

            stripe.checkout.Session.modify(
                session_id,
                metadata={'processed': 'true'}
            )

            return {"success": True, "message": "Payment verified successfully"}
        else:
            return {"success": False, "message": "Payment verification failed"}
    except Exception as e:
        return {"success": False, "message": f"An error occurred: {str(e)}"}