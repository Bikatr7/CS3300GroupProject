// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useState } from "react";
import axios from "axios";
import { getURL } from "../utils";
import { useNavigate } from "react-router-dom";

// chakra-ui
import {
    Container,
    VStack,
    Heading,
    Input,
    Button,
    Text,
    useToast,
    Box,
    Collapse,
    useTheme
} from "@chakra-ui/react";

function CheckInPage() 
{
    const [code, setCode] = useState("");
    const [checkOutCode, setCheckOutCode] = useState("");
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const theme = useTheme();
    const hotelName = theme.hotelName || 'The Horizon Hotel';
    const [bookingDates, setBookingDates] = useState<{
        checkIn: Date | null;
        checkOut: Date | null;
    }>({ checkIn: null, checkOut: null });

    const handleSubmit = async () =>
    {
        if(code.length !== 6)
        {
            toast({
                title: "Invalid Code",
                description: "Please enter a 6-digit code",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);
        try 
        {
            const response = await axios.post(getURL('/booking/check-in'), {
                check_in_code: code
            });

            setCheckOutCode(response.data.check_out_code);
            setBookingDates({
                checkIn: new Date(response.data.check_in),
                checkOut: new Date(response.data.check_out)
            });
            setIsCheckedIn(true);
            
            toast({
                title: "Check-in Successful",
                description: `Welcome to ${hotelName}! Your room is ${response.data.room_number}.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } 
        catch (error:any) 
        {
            toast({
                title: "Check-in Failed",
                description: error.response?.data?.detail || "An error occurred during check-in",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
        finally 
        {
            setIsLoading(false);
        }
    };

    return (
        <Container maxW="container.md" py={10}>
            <VStack spacing={8}>
                <Heading color="brand.text">Check In</Heading>
                
                <Collapse in={!isCheckedIn} animateOpacity>
                    <VStack spacing={4}>
                        <Text color="brand.text">Please enter your 6-digit check-in code</Text>
                        <Input
                            placeholder="Enter code"
                            value={code}
                            onChange={(e) => setCode(e.target.value.slice(0, 6))}
                            maxLength={6}
                            size="lg"
                            width="200px"
                            textAlign="center"
                            bg="white"
                            color="brand.accent3"
                            _placeholder={{ color: 'brand.accent3' }}
                        />
                        
                        <Button
                            bg="brand.accent1"
                            color="brand.text"
                            onClick={handleSubmit}
                            size="lg"
                            isLoading={isLoading}
                            _hover={{ bg: 'brand.accent4' }}
                        >
                            Check In
                        </Button>
                    </VStack>
                </Collapse>

                <Collapse in={isCheckedIn} animateOpacity>
                    <VStack spacing={6}>
                        <Box
                            bg="brand.accent3"
                            p={6}
                            borderRadius="lg"
                            textAlign="center"
                        >
                            <VStack spacing={4}>
                                <Heading size="md" color="brand.text">Welcome to {hotelName}!</Heading>
                                
                                {bookingDates.checkIn && bookingDates.checkOut && (
                                    <VStack spacing={2}>
                                        <Text color="brand.text">
                                            You may check in anytime after your check-in time, and you must check out by your check-out time.
                                        </Text>
                                        <Text color="brand.text">
                                            Check-in: {bookingDates.checkIn.toLocaleString()}
                                        </Text>
                                        <Text color="brand.text">
                                            Check-out: {bookingDates.checkOut.toLocaleString()}
                                        </Text>
                                    </VStack>
                                )}
                                
                                <Heading size="md" color="brand.text">Your Check-out Code</Heading>
                                <Text 
                                    fontSize="2xl" 
                                    fontWeight="bold"
                                    color="brand.text"
                                >
                                    {checkOutCode}
                                </Text>
                                <Text color="brand.text" fontSize="sm">
                                    Please save this code - you'll need it to check out.
                                </Text>
                                <Button
                                    bg="brand.accent1"
                                    color="brand.text"
                                    onClick={() => navigate('/customer')}
                                    size="lg"
                                    _hover={{ bg: 'brand.accent4' }}
                                >
                                    Return to Customer Portal
                                </Button>
                            </VStack>
                        </Box>
                    </VStack>
                </Collapse>
            </VStack>
        </Container>
    );
}

export default CheckInPage;