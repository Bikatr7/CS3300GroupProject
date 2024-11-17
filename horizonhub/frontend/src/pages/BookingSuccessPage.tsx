// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getURL } from "../utils";
import axios from "axios";

// chakra-ui
import {
    Container,
    VStack,
    Heading,
    Text,
    Box,
    Button,
    useToast,
    Center,
    Flex,
    Divider
} from "@chakra-ui/react";

import { useTheme } from "@chakra-ui/react";

interface BookingConfirmation 
{
    message: string;
    booking_id: string;
    check_in: string;
    check_out: string;
}

function BookingSuccessPage() 
{
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const theme = useTheme();
    const hotelName = theme.hotelName;
    const supportEmail = theme.supportEmail;
    const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => 
    {
        const confirmPayment = async () => 
        {
            const params = new URLSearchParams(location.search);
            const sessionId = params.get('session_id');
            const bookingId = params.get('booking_id');

            if(!sessionId || !bookingId) 
            {
                navigate('/booking');
                return;
            }

            try 
            {
                // once again, if you would like to change payment processors, you would come here and change the stripe api calls to the new payment processor api calls that you would have to write in the backend.
                const response = await axios.post(getURL('/stripe/verify-payment'), {
                    session_id: sessionId,
                    booking_id: bookingId
                });

                if (response.data.success) {
                    // Even if already processed, still show the booking confirmation
                    setConfirmation({
                        message: response.data.message,
                        booking_id: bookingId,
                        check_in: response.data.check_in,
                        check_out: response.data.check_out
                    });
                } else {
                    throw new Error(response.data.message);
                }
            } 
            catch (error) 
            {
                console.error('Payment confirmation error:', error);
                toast({
                    title: "Error",
                    description: `Failed to confirm payment. Please contact us at ${supportEmail}.`,
                    status: "error",
                    duration: 5000,
                    isClosable: true
                });
                navigate('/booking');
            } 
            finally 
            {
                setIsLoading(false);
            }
        };

        confirmPayment();
    }, [location, navigate, toast]);

    if(isLoading) 
    {
        return (
            <Center minH="100vh" bg="brand.background">
                <Text color="brand.cream">Confirming your booking...</Text>
            </Center>
        );
    }

    return (
        <Flex minHeight="calc(100vh - 100px)" alignItems="center" bg="brand.background">
            <Container maxW="container.md" py={8}>
                <VStack spacing={8} bg="brand.accent3" p={8} borderRadius="lg" boxShadow="xl">
                    <Heading color="brand.text" size="xl">Booking Confirmed!</Heading>
                    
                    <Box w="full">
                        <VStack spacing={4} align="start" w="full">
                            <Text color="brand.text" fontSize="lg">
                                Thank you for choosing {hotelName}!
                            </Text>
                            
                            {confirmation && (
                                <VStack spacing={2} align="start">
                                    <Text color="brand.text" fontSize="lg">
                                        You may check in anytime after your check-in time, and you must check out by your check-out time.
                                    </Text>
                                    <Text color="brand.text" fontSize="lg">
                                        Check-in: {new Date(confirmation.check_in).toLocaleString()}
                                    </Text>
                                    <Text color="brand.text" fontSize="lg">
                                        Check-out: {new Date(confirmation.check_out).toLocaleString()}
                                    </Text>
                                </VStack>
                            )}
                            
                            <Divider />
                            
                            <Box bg="brand.accent2" p={6} borderRadius="md" w="full">
                                <VStack spacing={4} align="start">
                                    <Text color="brand.text" fontWeight="bold">
                                        Your Confirmation Code:
                                    </Text>
                                    <Heading color="brand.text" size="lg">
                                        {confirmation?.booking_id}
                                    </Heading>
                                    <Text color="brand.text" fontSize="sm">
                                        Please save this code - you'll need it to check in.
                                    </Text>
                                </VStack>
                            </Box>
                            
                            <Text color="brand.text" fontSize="sm">
                                If you have any questions, please contact our support team at {supportEmail}.
                            </Text>
                        </VStack>
                    </Box>

                    <Button
                        bg="brand.accent1"
                        color="brand.text"
                        size="lg"
                        w="full"
                        maxW="400px"
                        mt={4}
                        _hover={{ bg: 'brand.accent4' }}
                        onClick={() => navigate('/customer')}
                    >
                        Return to Customer Portal
                    </Button>
                </VStack>
            </Container>
        </Flex>
    );
}

export default BookingSuccessPage; 