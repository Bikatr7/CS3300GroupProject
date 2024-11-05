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
    Box
} from "@chakra-ui/react";

import barPhoto from '../assets/images/pexels-pixabay-260922.jpg'

function SunsetBarPage() 
{
    return (
        <Container maxW="container.xl" py={10}>
            <VStack spacing={8} align="stretch">
                <Heading 
                    as="h1" 
                    className="mainHeader" 
                    size="2xl" 
                    textAlign="center"
                    color="brand.text"
                >
                    The Sunset Bar
                </Heading>
                
                <Text 
                    fontSize="xl" 
                    textAlign="center"
                    color="brand.text"
                >
                    Watch the sunset with one of our signature cocktails
                </Text>
                <Box pos="relative" alignContent="center" h="600px" w="900px" >
                    <Image src={barPhoto} alignSelf="center" opacity="0.5" boxSize="full" />
                    <Text pos="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" fontSize="20px" fontWeight="bold">
                        Signature Cocktails
                        
                    </Text>
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