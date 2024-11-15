// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getURL } from "../utils";

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
    Collapse
} from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";

function CheckOutPage() 
{
    const [code, setCode] = useState("");
    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const theme = useTheme();
    const hotelName = theme.hotelName || 'The Horizon Hotel';
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

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
            const response = await axios.post(getURL('/booking/check-out'), {
                check_out_code: code
            });

            setCheckOutDate(new Date());
            setIsCheckedOut(true);
            
            toast({
                title: "Check-out Successful",
                description: `Thank you for staying in room ${response.data.room_number}! We hope to see you again soon.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } 
        catch (error:any) 
        {
            toast({
                title: "Check-out Failed",
                description: error.response?.data?.detail || "An error occurred during check-out",
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
                <Heading color="brand.text">Check Out</Heading>
                
                <Collapse in={!isCheckedOut} animateOpacity>
                    <VStack spacing={4}>
                        <Text color="brand.text">Please enter your 6-digit check-out code</Text>
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
                            Check Out
                        </Button>
                    </VStack>
                </Collapse>

                <Collapse in={isCheckedOut} animateOpacity>
                    <VStack spacing={6}>
                        <Box
                            bg="brand.accent3"
                            p={6}
                            borderRadius="lg"
                            textAlign="center"
                        >
                            <VStack spacing={4}>
                                <Heading size="md" color="brand.text">Thank You!</Heading>
                                {checkOutDate && (
                                    <Text color="brand.text">
                                        Checked out at: {checkOutDate.toLocaleString()}
                                    </Text>
                                )}
                                <Text color="brand.text">
                                    Your check-out has been completed successfully.
                                </Text>
                                <Text color="brand.text">
                                    We hope you enjoyed your stay at {hotelName}!
                                </Text>
                                <Button
                                    bg="brand.accent1"
                                    color="brand.text"
                                    onClick={() => navigate('/')}
                                    _hover={{ bg: 'brand.accent4' }}
                                >
                                    Return to Home
                                </Button>
                            </VStack>
                        </Box>
                    </VStack>
                </Collapse>
            </VStack>
        </Container>
    );
}

export default CheckOutPage;
