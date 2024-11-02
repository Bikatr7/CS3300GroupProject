// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

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
                bg="brand.background"
            >
                {/* Customer Details Section */}
                <VStack 
                    w="full" 
                    h="full" 
                    p={10} 
                    spacing={10} 
                    align="flex-start"
                    color="brand.text"
                >
                    <VStack spacing={3} align="flex-start">
                        <Heading size="2xl" color="brand.text">Your Details</Heading>
                        <Text color="brand.text">If you already have an account, click here to log in.</Text>
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
                                bg="brand.accent1"
                                color="brand.text"
                                _hover={{ bg: 'brand.primary' }}
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
                    bg="brand.accent5"
                    color="brand.text"
                >
                    <Heading size="2xl" color="brand.text">Order Summary</Heading>
                    
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
