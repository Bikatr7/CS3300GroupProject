// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getURL } from "../utils";

// chakra-ui
import {
    Button,
    Container,
    VStack,
    Text,
    Heading,
    FormControl,
    FormLabel,
    Input,
    useToast
} from "@chakra-ui/react";

// Add axios import at the top
import axios from "axios";

function PaymentPage() 
{
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const [isProcessing, setIsProcessing] = useState(false);

    const { dateRange, room } = location.state || {};

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        setIsProcessing(true);

        try 
        {
            // Create the booking
            const response = await axios.post(getURL('/booking/create'), {
                room_id: room.id,
                check_in: dateRange[0].toISOString(),
                check_out: dateRange[1].toISOString()
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            toast({
                title: "Booking Confirmed!",
                description: `Your booking confirmation code is: ${response.data.booking_id}`,
                status: "success",
                duration: 10000,
                isClosable: true,
            });
            
            navigate('/');
        } 
        catch (error) 
        {
            console.error('Booking error:', error);
            toast({
                title: "Booking Failed",
                description: "There was an error processing your booking. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
        finally 
        {
            setIsProcessing(false);
        }
    };

    return (
        <Container maxW="container.md" py={8} bg="brand.background" minH="100vh">
            <VStack spacing={8}>
                <Heading color="brand.cream">Complete Your Booking</Heading>
                
                {room && dateRange && (
                    <VStack align="start" w="full" p={4} bg="brand.cream" borderRadius="md">
                        <Text fontWeight="bold" color="brand.text">Booking Summary:</Text>
                        <Text color="brand.text">Room: {room.name}</Text>
                        <Text color="brand.text">Price per night: ${room.price}</Text>
                        <Text color="brand.text">Check-in: {dateRange[0].toLocaleDateString()}</Text>
                        <Text color="brand.text">Check-out: {dateRange[1].toLocaleDateString()}</Text>
                    </VStack>
                )}

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <VStack spacing={4} w="full">
                        <FormControl isRequired>
                            <FormLabel color="brand.cream">Card Number</FormLabel>
                            <Input 
                                placeholder="1234 5678 9012 3456" 
                                bg="brand.cream"
                                color="brand.text"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel color="brand.cream">Cardholder Name</FormLabel>
                            <Input 
                                placeholder="John Doe" 
                                bg="brand.cream"
                                color="brand.text"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel color="brand.cream">Expiration Date</FormLabel>
                            <Input 
                                placeholder="MM/YY" 
                                bg="brand.cream"
                                color="brand.text"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel color="brand.cream">CVV</FormLabel>
                            <Input 
                                placeholder="123" 
                                type="password" 
                                maxLength={3} 
                                bg="brand.cream"
                                color="brand.text"
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            bg="brand.brown"
                            color="brand.cream"
                            size="lg"
                            w="full"
                            mt={4}
                            _hover={{ bg: 'brand.accent4' }}
                            isLoading={isProcessing}
                            loadingText="Processing"
                        >
                            Complete Booking
                        </Button>
                    </VStack>
                </form>
            </VStack>
        </Container>
    );
}

export default PaymentPage;