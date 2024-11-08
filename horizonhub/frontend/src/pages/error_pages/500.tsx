// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// chakra-ui
import {
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  Box,
  keyframes
} from "@chakra-ui/react";

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const InternalErrorPage = () =>
{
  return (
    <Flex
      bg="brand.background"
      minH="100vh"
      align="center"
      justify="center"
      color="brand.text"
      position="relative"
      overflow="hidden"
    >
      <Container textAlign="center" maxW="md" position="relative">
        <VStack spacing={8}>
          <Box
            fontSize="8xl"
            mb={4}
            animation={`${floatAnimation} 3s ease-in-out infinite`}
          >
            🛠️
          </Box>
          <Heading as="h1" size="2xl" color="brand.text">
            Temporary Maintenance
          </Heading>
          <Text fontSize="xl" color="brand.accent1">
            500 - Server Error
          </Text>
          <Text fontSize="lg" color="brand.accent5">
            We're currently performing maintenance to improve your stay.
          </Text>
          <Button
            as="a"
            href="/"
            bg="brand.accent1"
            color="brand.text"
            py={2}
            px={4}
            rounded="md"
            mb={4}
            _hover={{
              bg: "brand.accent4",
            }}
          >
            Return to Lobby
          </Button>
        </VStack>
      </Container>
    </Flex>
  );
};

export default InternalErrorPage;