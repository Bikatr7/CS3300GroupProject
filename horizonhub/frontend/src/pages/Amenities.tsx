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
    Box,
    Spacer,
    Image,
    Flex
  } from "@chakra-ui/react";

//room size images
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
            
            {/*ocean view suite*/}

            <Box alignContent={"center"} w="1000px" bg="transparent" h="600px" 
              borderRadius="10px" borderWidth="1px" borderColor="#fbe9b4">
              <Text color="#fbe9b4" textAlign="center" fontWeight="bold" fontSize="25">Ocean View Suite</Text> 
              <Text color="#fbe9b4" textAlign="center" padding="8px" >
                Our Ocean View Suite is designed for the height of luxury and relaxation,
                with panoramic ocean views. Sleeps up to two guests.
              </Text>
              <Flex justify={"center"}>
                <Image src={kingBed} h="500px" padding="3"/>
              </Flex>

              </Box> 

            {/*presidential suite*/}
              <Box w="1000px" bg="transparent" h="600px" 
              borderRadius="10px" borderWidth="1px" borderColor="#fbe9b4">
              <Text color="#fbe9b4" textAlign="center" fontWeight="bold" fontSize="25">Presidential Suite</Text> 
              <Text color="#fbe9b4" textAlign="center" padding="8px">
                With two queen beds, the Presidential Suite is our finest accommodation 
                with premium amenities. Sleeps up to four guests.
              </Text>
              <Spacer />
              <Flex justify={"center"}>
                <Image src={doubleBed} h="500px" ></Image>
              </Flex>
              </Box> 
              
              {/*garden deluxe room*/}
              <Box w="1000px" bg="transparent" h="630px" 
              borderRadius="10px" borderWidth="1px" borderColor="#fbe9b4" >
              <Text color="#fbe9b4" textAlign="center" fontWeight="bold" fontSize="25">Garden Deluxe Room</Text> 
              <Text color="#fbe9b4" textAlign="center" padding="10px">
                Our Garden Deluxe Room is designed for economy without sacrificing the comforts of 
                our luxury amenities. With peaceful views of our tropical gardens,
                this room sleeps up to two guests.
              </Text>
              <Flex justify={"center"}>
                <Image src={queenBed} h="500px"></Image>
              </Flex>
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
              <Flex justify={"center"}>
                <Image src={pool} h="400"></Image>
              </Flex>
          </Box>
        </VStack>

      </Container>
    );
  }
  
  export default AmenitiesPage;