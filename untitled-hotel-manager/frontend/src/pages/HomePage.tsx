// Copyright [name placeholder] (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
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


function HomePage() {
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
        >
          Book Now
        </Button>
        
      </VStack>
    </Container>
  );
}

export default HomePage;