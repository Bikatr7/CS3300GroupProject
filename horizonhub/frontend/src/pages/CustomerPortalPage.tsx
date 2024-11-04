// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useNavigate } from "react-router-dom";

// chakra-ui
import {
    Container,
    VStack,
    Heading,
    Button,
    Text,
    SimpleGrid,
    Box,
    Icon
} from "@chakra-ui/react";

import { CalendarIcon, UnlockIcon, LockIcon } from '@chakra-ui/icons';

function CustomerPortalPage() 
{
    const navigate = useNavigate();

    const portalOptions = [
        {
            title: "Book a Stay",
            description: "Reserve your room for your next visit",
            icon: CalendarIcon,
            path: "/booking",
        },
        {
            title: "Check In",
            description: "Already have a reservation? Check in here",
            icon: UnlockIcon,
            path: "/checkin",
        },
        {
            title: "Check Out",
            description: "Ready to leave? Complete your check-out",
            icon: LockIcon,
            path: "/checkout",
        },
    ];

    return (
        <Container maxW="container.xl" py={10}>
            <VStack spacing={8}>
                <Heading color="brand.text">Customer Portal</Heading>
                <Text color="brand.text" textAlign="center">
                    Welcome to the Horizon Hotel customer portal. 
                    What would you like to do today?
                </Text>
                
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} width="full">
                    {portalOptions.map((option) => (
                        <Box
                            key={option.title}
                            bg="brand.accent3"
                            p={6}
                            borderRadius="lg"
                            cursor="pointer"
                            onClick={() => navigate(option.path)}
                            _hover={{ 
                                transform: "translateY(-5px)",
                                bg: "brand.accent2"
                            }}
                            transition="all 0.2s"
                        >
                            <VStack spacing={4}>
                                <Icon as={option.icon} w={10} h={10} color="brand.text" />
                                <Heading size="md" color="brand.text">
                                    {option.title}
                                </Heading>
                                <Text color="brand.text" textAlign="center">
                                    {option.description}
                                </Text>
                                <Button 
                                    bg="brand.accent1"
                                    color="brand.text"
                                    _hover={{ bg: 'brand.accent4' }}
                                >
                                    Continue
                                </Button>
                            </VStack>
                        </Box>
                    ))}
                </SimpleGrid>
            </VStack>
        </Container>
    );
}

export default CustomerPortalPage; 