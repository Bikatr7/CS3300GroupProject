// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

// chakra-ui
import {
  VStack,
  Heading,
  Text,
  Button,
  Container,
  HStack,
  Center,
  Flex,
  Box
} from "@chakra-ui/react";

// components
import HomeHeader from "../components/HomeHeader";
import HomeFooter from "../components/HomeFooter";

function HomePage() 
{
  const navigate = useNavigate();
  const toast = useToast();
  const { isLoggedIn, isPrivilegedUser } = useAuth();

  const handleAdminClick = () =>
  {
    if(!isLoggedIn)
    {
      toast({
        title: "Access Denied",
        description: "You must be logged in to access the admin panel.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if(!isPrivilegedUser)
    {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access the admin panel.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    navigate('/admin');
  };

  const navigateToCustomerPortal = () =>
  {
    navigate('/customer');
  }

  return (
    <Box position="relative" minHeight="100vh" bg="brand.background">
      <HomeHeader />
      <Flex 
        height="calc(100vh - 140px)" 
        alignItems="center" 
        justifyContent="center"
      >
        <Container 
          maxW="800px" 
          display="flex"     
          justifyContent="center"
          alignItems="center"
        >
          <VStack 
            spacing={8} 
            align="center"
            width="100%"
          >
            <Heading 
              as="h1" 
              className="mainHeader" 
              size="2xl" 
              textAlign="center"
              color="brand.text"
            >
              Luxury, rest, and relaxation.
            </Heading>
            
            <Text 
              fontSize="xl" 
              textAlign="center"
              color="brand.text"
            >
              Plan your getaway today
            </Text>
            
            <Center width="100%">
              <HStack spacing={4}>
                <Button 
                  bg="brand.accent1"
                  color="brand.text"
                  size="lg"
                  _hover={{ bg: 'brand.accent4' }}
                  onClick={navigateToCustomerPortal}
                >
                  Customer Portal
                </Button>
                <Button 
                  bg="brand.accent3"
                  color="brand.text"
                  size="lg"
                  _hover={{ bg: 'brand.accent2' }}
                  onClick={handleAdminClick}
                >
                  Admin Portal
                </Button>
              </HStack>
            </Center>
          </VStack>
        </Container>
      </Flex>
      <HomeFooter />
    </Box>
  );
}

export default HomePage;