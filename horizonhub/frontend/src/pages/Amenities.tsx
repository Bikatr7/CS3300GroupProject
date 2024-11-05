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
    SimpleGrid,
    GridItem,
    FormControl,
    Input,
    FormLabel,
    Box,
    Flex,
    Grid,
    Spacer,
    Image
  } from "@chakra-ui/react";
  //import { useNavigate } from "react-router-dom";

  import kingBed from '../assets/images/pexels-enginakyurt-2725675.jpg'
  import queenBed from '../assets/images/pexels-rosie-c-94104461-14746040.jpg';
  import doubleBed from '../assets/images/pexels-quang-nguyen-vinh-222549-29000313.jpg'

  import pool from '../assets/images/pexels-pixabay-261169.jpg'

  function AmenitiesPage() {
    return (
      <Container maxW="container.xl" py={10}>
       {/*room types*/}
        <Heading textAlign="center">Rooms</Heading>

        <VStack justify="space-between" align="center" direction="column" gap="8">
            <Spacer />

            {/*king suite*/}
            <Box alignContent={"center"} w="1000px" bg="transparent" h="600px" 
              borderRadius="10px" borderWidth="1px" borderColor="#fbe9b4">
              <Text color="#fbe9b4" textAlign="center" fontWeight="bold" fontSize="25">King Suite</Text> 
              <Text color="#fbe9b4" textAlign="center" padding="10px" >
                Our King Suite is designed for the height of luxury and relaxation for up to two guests.
              </Text>
              <Image src={kingBed} h="500px" alignContent="center"></Image>
              </Box> 
              
            {/*double room*/}
              <Box w="1000px" bg="transparent" h="600px" 
              borderRadius="10px" borderWidth="1px" borderColor="#fbe9b4">
              <Text color="#fbe9b4" textAlign="center" fontWeight="bold" fontSize="25">Double Room</Text> 
              <Text color="#fbe9b4" textAlign="center" padding="10px">
                With two queen size beds, our Double Room is best for friends and families. 
                Sleeps up to four guests.
              </Text>
              <Spacer />
              <Image src={doubleBed} h="450px" ></Image>
              </Box> 
              
              {/*queen room*/}
              <Box w="1000px" bg="transparent" h="600px" 
              borderRadius="10px" borderWidth="1px" borderColor="#fbe9b4" >
              <Text color="#fbe9b4" textAlign="center" fontWeight="bold" fontSize="25">Queen Room</Text> 
              <Text color="#fbe9b4" textAlign="center" padding="10px">
                Our Queen Room is designed for economy without sacrificing the comforts of 
                our luxury amenities. Whether it's a quick trip or you're traveling solo, 
                you'll still experience our high standards of relaxation. Sleeps up to two guests.
              </Text>
              <Image src={queenBed} h="450px"></Image>
              </Box>
              <Spacer />
              <Button colorScheme="orange" size="lg" alignSelf="center">
              Book Now
              </Button>
        </VStack>
        {/*pool*/}
        <VStack justify="space-between" align="center" direction="column" gap="8">
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Heading>Resort Style Pool</Heading>
          <Box w="1000px" bg="transparent" h="500px" 
              borderRadius="10px" borderWidth="1px" borderColor="#fbe9b4" >
              <Text color="#fbe9b4" textAlign="center" padding="4">
                Our outdoor pool and hot tub will help you relax after a long day,
                whether you spent it exploring the local area or hard at work. The pool
                is heated to be comfortable year-round. Open 7 AM to 10 PM.
              </Text>
              <Image src={pool} h="400"></Image>
          </Box>
        </VStack>

      </Container>
    );
  }
  
  export default AmenitiesPage;