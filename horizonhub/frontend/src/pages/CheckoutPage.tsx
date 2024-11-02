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
      Flex,
      SimpleGrid,
      GridItem,
      FormControl,
      FormLabel,
      Input,
      Select,
      Checkbox
    } from "@chakra-ui/react";

    import { useNavigate } from "react-router-dom";

    function CheckoutPage() {
      let navigate = useNavigate();
    const pageChange = () =>{
    let path = `booking`;
    navigate(path);
  }
    return(
      <Container  maxW="container.xl" p={0}>
        <Flex h="100vh" py={20}>
        <VStack w ="full" h = "full" p={10} spacing={10} align="flex-start">
          <VStack spacing={3} align={"flex-start"}>
          <Heading as="h1" className="mainHeader" size="2xl" textAlign="center">
          Your details
          </Heading>
          <Text>If you already have an account, click here to log in.</Text>
        </VStack>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} width="full">
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input placeholder="Jane" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input placeholder="Doe" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input placeholder="123 Easy St." />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input placeholder="Anytown" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Select>
                <option value="usa">United States of America</option>
                <option value="uae">United Arab Emirates</option>
                <option value="de">Germany</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Checkbox defaultChecked>Confirm Billing Address is Correct</Checkbox>
          </GridItem>
          <GridItem colSpan={2}>
            <Button colorScheme="orange" size="lg" w="full" alignSelf="center">Continue to Checkout</Button>
          </GridItem>
        </SimpleGrid>
      </VStack>
  /{/* component2 */}

  <VStack w ="full" h = "full" p={10} spacing={10} align="flex-start" bg="gray.50">

    <Heading as="h1" className="mainHeader" size="2xl" textAlign="center">
    Book a Room

    </Heading>

    <Text fontSize="xl" textAlign="center">
    probably remove
    </Text>

    <Button colorScheme="orange" size="lg" alignSelf="center">
    Book Now
    </Button>
  </VStack>
  </Flex>
  </Container>
      );
      
  }
  export default CheckoutPage;
