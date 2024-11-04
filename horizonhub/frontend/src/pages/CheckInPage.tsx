// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useState } from "react";

// chakra-ui
import {
    Container,
    VStack,
    Heading,
    Input,
    Button,
    Text,
    useToast
} from "@chakra-ui/react";

function CheckInPage() 
{
    const [code, setCode] = useState("");
    const toast = useToast();

    const handleSubmit = () =>
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

        // Hardcoded response for now
        toast({
            title: "Check-in Successful",
            description: "Welcome to Horizon Hotel! Your room is 301.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    return (
        <Container maxW="container.md" py={10}>
            <VStack spacing={8}>
                <Heading color="brand.text">Check In</Heading>
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
                    _hover={{ bg: 'brand.accent4' }}
                >
                    Check In
                </Button>
            </VStack>
        </Container>
    );
}

export default CheckInPage; 