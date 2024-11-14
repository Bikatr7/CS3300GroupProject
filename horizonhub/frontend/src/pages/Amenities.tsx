// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import React from 'react';

// chakra-ui
import {
    VStack,
    Heading,
    Text,
    Button,
    Container,
    Box,
    Spacer,
    Image,
    Flex
} from "@chakra-ui/react";

// images
import kingBed from '../assets/images/kingBed.jpg';
import queenBed from '../assets/images/queenBed.jpg';
import doubleBed from '../assets/images/doubleBed.jpg';
import pool from '../assets/images/pool.jpg';

// theme config
import themeConfig from '../../../edit_me.json';

// image mapping
const imageMap: { [key: string]: string } = 
{
    kingBed,
    queenBed,
    doubleBed,
    pool
};

function AmenitiesPage() 
{
    const { rooms, facilities } = themeConfig.amenities;

    return (
        <Container maxW="container.xl" py={10}>
            <Heading textAlign="center">{rooms.title}</Heading>

            <VStack justify="space-between" align="center" direction="column" gap="8">
                <Spacer />
                
                {rooms.items.map((room, index) => (
                    <Box 
                        key={index}
                        alignContent="center" 
                        w="1000px" 
                        bg="transparent" 
                        h="600px"
                        borderRadius="10px" 
                        borderWidth="1px" 
                        borderColor="#fbe9b4"
                    >
                        <Text color="#fbe9b4" textAlign="center" fontWeight="bold" fontSize="25">
                            {room.title}
                        </Text>
                        <Text color="#fbe9b4" textAlign="center" padding="8px">
                            {room.description}
                        </Text>
                        <Flex justify="center">
                            <Image 
                                src={imageMap[room.image]} 
                                h={room.height} 
                                padding="3"
                            />
                        </Flex>
                    </Box>
                ))}

                <Button colorScheme="orange" size="lg" alignSelf="center">
                    Book Now
                </Button>
            </VStack>

            <VStack justify="space-between" align="center" direction="column" gap="8">
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                
                {facilities.items.map((facility, index) => (
                    <React.Fragment key={index}>
                        <Heading>{facility.title}</Heading>
                        <Box 
                            w="1000px" 
                            bg="transparent" 
                            h="500px"
                            borderRadius="10px" 
                            borderWidth="1px" 
                            borderColor="#fbe9b4"
                        >
                            <Text color="#fbe9b4" textAlign="center" padding="4">
                                {facility.description}
                            </Text>
                            <Flex justify="center">
                                <Image 
                                    src={imageMap[facility.image]} 
                                    h={facility.height}
                                />
                            </Flex>
                        </Box>
                    </React.Fragment>
                ))}
            </VStack>
        </Container>
    );
}

export default AmenitiesPage;