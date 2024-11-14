// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getURL } from "../utils";

// chakra-ui
import {
    Container,
    VStack,
    Text,
    Heading,
    useToast,
    Spinner,
    Center
} from "@chakra-ui/react";

// Add axios import at the top
import axios from "axios";

interface Room {
    id: string;
    name: string;
    price: number;
}

interface LocationState {
    dateRange: Date[];
    room: Room;
}

function PaymentPage() 
{
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const paymentInitiated = useRef(false);
    const controller = useRef(new AbortController());

    const { dateRange, room } = (location.state as LocationState) || {};

    // Calculate total price
    const calculateTotalPrice = (): number =>
    {
        if(!dateRange || !room) return 0;
        
        const checkIn = new Date(dateRange[0]);
        const checkOut = new Date(dateRange[1]);
        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
        return room.price * nights;
    };

    useEffect(() => 
    {
        if(!dateRange || !room)
        {
            navigate('/booking');
            return;
        }

        // Immediately return if payment was already initiated
        if(paymentInitiated.current)
        {
            return;
        }

        const initiatePayment = async () =>
        {
            // Set flag immediately
            paymentInitiated.current = true;

            try 
            {
                console.log("Creating booking with room ID:", room.id);
                // Create temporary booking to get booking ID
                const bookingResponse = await axios.post(
                    getURL('/booking/create'), 
                    {
                        room_id: room.id,
                        check_in: dateRange[0].toISOString(),
                        check_out: dateRange[1].toISOString()
                    },
                    { signal: controller.current.signal }
                );

                const bookingId = bookingResponse.data.booking_id;

                // Create Stripe checkout session
                const response = await axios.post(
                    getURL('/stripe/create-checkout-session'), 
                    {
                        amount: calculateTotalPrice() * 100,
                        booking_id: bookingId,
                        room_name: room.name
                    },
                    { signal: controller.current.signal }
                );

                if(response.data.url)
                {
                    window.location.href = response.data.url;
                    return;
                }

                throw new Error('No redirect URL received from Stripe');
            } 
            catch (error) 
            {
                // Only show error toast if it's not an abort error and payment wasn't already initiated
                if(axios.isAxiosError(error) && 
                   error.code !== 'ERR_CANCELED' && 
                   !controller.current.signal.aborted)
                {
                    console.error('Payment initiation error:', error);
                    toast({
                        title: "Error",
                        description: "Failed to initiate payment. Please try again.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                    navigate('/booking');
                }
            }
        };

        initiatePayment();

        // Cleanup function
        return () => 
        {
            // Abort any ongoing requests
            controller.current.abort();
            // Create new controller for potential future requests
            controller.current = new AbortController();
            // Reset payment initiated flag
            paymentInitiated.current = false;
        };
    }, [dateRange, room, navigate, toast]);

    if(!dateRange || !room)
    {
        return null;
    }

    return (
        <Container maxW="container.md" py={8} bg="brand.background" minH="100vh">
            <VStack spacing={8}>
                <Heading color="brand.cream">Processing Payment</Heading>
                <Text color="brand.cream">Please wait while we redirect you to our secure payment processor...</Text>
                <Center>
                    <Spinner size="xl" color="brand.cream" />
                </Center>
            </VStack>
        </Container>
    );
}

export default PaymentPage;