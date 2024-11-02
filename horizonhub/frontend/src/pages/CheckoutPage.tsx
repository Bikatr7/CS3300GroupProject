// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useNavigate } from "react-router-dom";

// chakra-ui
import {
    VStack,
    Heading,
    Text,
    Button,
    Container,
    Flex,
    SimpleGrid,
    GridItem,
    FormControl,
    FormLabel,
    Input,
    Select,
    Checkbox,
    Box
} from "@chakra-ui/react";

function CheckoutPage() 
{
    const navigate = useNavigate();

    const handleSubmit = () =>
    {
        // TODO: Implement checkout logic
        console.log("Processing checkout...");
    };

    return (
        <Container maxW="container.xl" p={0}>
            <Flex 
                minH="100vh" 
                py={20} 
                direction={{ base: "column", lg: "row" }}
            >
                {/* Customer Details Section */}
                <VStack 
                    w="full" 
                    h="full" 
                    p={10} 
                    spacing={10} 
                    align="flex-start"
                >
                    <VStack spacing={3} align="flex-start">
                        <Heading size="2xl">Your Details</Heading>
                        <Text>If you already have an account, click here to log in.</Text>
                    </VStack>

                    <SimpleGrid 
                        columns={2} 
                        columnGap={3} 
                        rowGap={6} 
                        w="full"
                    >
                        <GridItem colSpan={1}>
                            <FormControl isRequired>
                                <FormLabel>First Name</FormLabel>
                                <Input placeholder="Jane" />
                            </FormControl>
                        </GridItem>

                        <GridItem colSpan={1}>
                            <FormControl isRequired>
                                <FormLabel>Last Name</FormLabel>
                                <Input placeholder="Doe" />
                            </FormControl>
                        </GridItem>

                        <GridItem colSpan={2}>
                            <FormControl isRequired>
                                <FormLabel>Address</FormLabel>
                                <Input placeholder="123 Easy St." />
                            </FormControl>
                        </GridItem>

                        <GridItem colSpan={1}>
                            <FormControl isRequired>
                                <FormLabel>City</FormLabel>
                                <Input placeholder="Anytown" />
                            </FormControl>
                        </GridItem>

                        <GridItem colSpan={1}>
                            <FormControl isRequired>
                                <FormLabel>Country</FormLabel>
                                <Select placeholder="Select country">
                                    <option value="usa">United States of America</option>
                                    <option value="uae">United Arab Emirates</option>
                                    <option value="de">Germany</option>
                                </Select>
                            </FormControl>
                        </GridItem>

                        <GridItem colSpan={2}>
                            <Checkbox defaultChecked>
                                Confirm Billing Address is Correct
                            </Checkbox>
                        </GridItem>

                        <GridItem colSpan={2}>
                            <Button 
                                colorScheme="orange" 
                                size="lg" 
                                w="full"
                                onClick={handleSubmit}
                            >
                                Complete Booking
                            </Button>
                        </GridItem>
                    </SimpleGrid>
                </VStack>

                {/* Order Summary Section */}
                <VStack 
                    w="full" 
                    h="full" 
                    p={10} 
                    spacing={10} 
                    align="flex-start" 
                    bg="gray.50"
                >
                    <Heading size="2xl">Order Summary</Heading>
                    
                    {/* TODO: Add booking details summary */}
                    <Box w="full">
                        <Text fontSize="lg" mb={4}>Booking Details:</Text>
                        {/* Add booking details here */}
                    </Box>
                </VStack>
            </Flex>
        </Container>
    );
}

export default CheckoutPage;
