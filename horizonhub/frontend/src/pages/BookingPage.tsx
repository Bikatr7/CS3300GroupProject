// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// chakra-ui
import {
    VStack,
    HStack,
    Heading,
    Box,
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
  import { DatePicker, Stack } from 'rsuite';
  //import { ReactDOM } from "react";
  import { useNavigate } from "react-router-dom";
  //import * as React from 'react';
  import { useState } from "react";
  import { DateRangePicker } from "react-date-range";
  import "react-date-range/dist/styles.css";
  import "react-date-range/dist/theme/default.css"


  function BookingPage() {

    let navigate = useNavigate();
    const pageChange = () =>{
      let path = `checkout`;
      navigate(path);
    }

    const [date, setDate] = useState(
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    );
      
    return (
      <Container maxW="container.xl" p={0}>

        <Flex h="60vh" py={20} display="flex">
          <span className="calendar" color="#2e343c"></span>
          <DateRangePicker className='picker' ranges={[date]} onChange={()=>{}} 
          >

          </DateRangePicker>
        </Flex>
        <Button colorScheme="orange" size="lg" w="full" alignSelf="center" 
            onClick={pageChange}>Book Room</Button>
        
      </Container>
    );
  }
  
  export default BookingPage;