// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useNavigate } from "react-router-dom";

// chakra-ui
import {
  VStack,
  Heading,
  Text,
  Button,
  Container,
  HStack,
  Center,
  Flex
} from "@chakra-ui/react";

// components
import PageWrapper from "../components/PageWrapper";
import HomeHeader from "../components/HomeHeader";
import HomeFooter from "../components/HomeFooter";

function HomePage() 
{
  let navigate = useNavigate();
  
  const navigateToBooking = () =>
  {
    let path = `booking`;
    navigate(path);
  }

  const navigateToAdmin = () =>
  {
    let path = `admin`;
    navigate(path);
  }

  return (
    <PageWrapper showBackground={true}>
      <HomeHeader />
      <Flex minHeight="100vh" alignItems="center" maxHeight="100vh">
        <Container maxW="container.xl">
          <VStack spacing={8} align="center">
            <Heading as="h1" className="mainHeader" size="2xl" textAlign="center">
              Luxury, rest, and relaxation.
            </Heading>
            
            <Text fontSize="xl" textAlign="center">
              Plan your getaway today
            </Text>
            
            <Center>
              <HStack spacing={4}>
                <Button 
                  colorScheme="orange" 
                  size="lg"
                  onClick={navigateToBooking}
                >
                  Customer Portal
                </Button>
                <Button 
                  colorScheme="blue" 
                  size="lg"
                  onClick={navigateToAdmin}
                >
                  Admin Portal
                </Button>
              </HStack>
            </Center>
          </VStack>
        </Container>
      </Flex>
      <HomeFooter />
    </PageWrapper>
  );
}

export default HomePage;