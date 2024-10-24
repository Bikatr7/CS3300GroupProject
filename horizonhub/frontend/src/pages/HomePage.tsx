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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

  



function HomePage() {

  let navigate = useNavigate();
  const pageChange = () =>{
    let path = `booking`;
    navigate(path);
  }
  return (
    <Container maxW="container.xl" py={10}>

      <VStack spacing={8} align="stretch">

        
        <Heading as="h1" className="mainHeader" size="2xl" textAlign="center">
          Luxury, rest, and relaxation.

        </Heading>
        
        <Text fontSize="xl" textAlign="center">
          Plan your getaway today
        </Text>
        
        <Button 
          colorScheme="orange" 
          size="lg" 
          alignSelf="center"
          onClick={pageChange}
        >
 
          Book Now
        </Button>
        
      </VStack>
    </Container>
  );
}

export default HomePage;