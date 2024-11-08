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
    Image,
    Box,
    Spacer
} from "@chakra-ui/react";

import barPhoto from '../assets/images/pexels-pixabay-260922.jpg'

function SunsetBarPage() 
{
    return (
        <Container maxW="container.xl" py={10}>
            <VStack spacing={8} align="stretch" alignItems={"center"}>
                <Heading 
                    as="h1" 
                    className="mainHeader" 
                    size="2xl" 
                    textAlign="center"
                    color="brand.color"
                    fontSize={"50px"}
                    fontFamily={"Snell Roundhand, cursive"}
                >
                    The Sunset Bar
                </Heading>
                
                <Text 
                    fontSize="xl" 
                    textAlign="center"
                    color="#a46048"
                    fontFamily={"Optima, sans-serif"}
                >
                    Watch the sunset with one of our signature cocktails
                </Text>

                {/*Cocktails Menu*/ }
                <Box pos="relative" alignContent="center" h="600px" w="900px">
                    <Image src={barPhoto} alignSelf="center" opacity="0.5" boxSize="full" 
                    borderRadius={"5px"} shadow={"lg"}/>
                    <Text pos="absolute" top="20%" left="50%" 
                    transform="translate(-50%,-50%)" 
                    fontSize="30px" fontWeight="bold" fontFamily="Snell Roundhand, cursive">
                        Signature Cocktails
                    </Text>
                    <Text pos="absolute" top="30%" left="50%" 
                    transform="translate(-50%,-50%)" fontSize="25px" fontFamily={"Optima, sans-serif"}>
                        Horizon Martini</Text>
                    <Text pos="absolute" top="35%" left="50%" 
                    transform="translate(-50%,-50%)" fontSize="15px">
                        Gin, dry vermouth, olive brine with a twist</Text>
                    <Spacer />
                    <Text pos="absolute" top="43%" left="50%" 
                    transform="translate(-50%,-50%)" fontSize="25px" fontFamily={"Optima, sans-serif"}>
                        Take a Load Off</Text>
                    <Text pos="absolute" top="47%" left="50%" 
                    transform="translate(-50%,-50%)" fontSize="15px">
                        Tequila, mezcal, orange juice, walnut bitters, paper umbrella
                    </Text>
                    <Text pos="absolute" top="55%" left="50%" 
                    transform="translate(-50%,-50%)" fontSize="25px" fontFamily={"Optima, sans-serif"}>
                        Height of Luxury</Text>
                    <Text pos="absolute" top="60%" left="50%" 
                    transform="translate(-50%,-50%)" fontSize="15px">
                        Champagne, gin, lemon</Text>
                    <Text pos="absolute" top="90%" left="50%" 
                    transform="translate(-50%,-50%)" fontSize="20px" fontFamily={"optima, sans-serif"}>
                        Visit us for full menu</Text>

                </Box>
                

                <Button 
                    bg="brand.accent1"
                    color="brand.text"
                    size="lg" 
                    alignSelf="center"
                    _hover={{ bg: 'brand.accent4' }}
                    //onClick={pageChange}
                >
                    Book Now
                </Button>
            </VStack>
        </Container>
    );
}

export default SunsetBarPage;