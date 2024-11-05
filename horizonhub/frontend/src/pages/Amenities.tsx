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
  } from "@chakra-ui/react";
  //import { useNavigate } from "react-router-dom";

  function AmenitiesPage() {
    return (
      <Container maxW="container.xl" py={10}>
        <Heading textAlign="center">Rooms</Heading>
        <Grid h="200px" templateRows="repeat(1, 1fr)" 
        templateColumns="repeat(1, 1fr)" gap={4}>
            <GridItem rowSpan={1}  bg="tomato" />
            <GridItem rowSpan={1} w="1000px" bg="transparent" h="100px" 
              borderRadius="10px" borderWidth="1px" borderColor="#fbe9b4">
              <Text color="#fbe9b4" textAlign="center" fontWeight="bold">King Suite</Text> 
              </GridItem> 
            <GridItem rowSpan={1} bg="papayawhip" />
            <GridItem rowSpan={1} bg="tomato" />
        </Grid>

          
          
        <VStack spacing={8} align="stretch">


 <Flex></Flex>
        <Button 
            colorScheme="orange" 
            size="lg" 
            alignSelf="center"
            //onClick={pageChange}
          >
            Book Now
          </Button>
          
        </VStack>
      </Container>
    );
  }
  
  export default AmenitiesPage;