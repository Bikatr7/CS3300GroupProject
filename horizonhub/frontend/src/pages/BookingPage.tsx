// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// chakra-ui
import {
    Button,
    Container,
    Flex
  } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DateRangePicker } from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

function BookingPage() 
{
    let navigate = useNavigate();
    const pageChange = () =>
    {
      let path = `checkout`;
      navigate(path);
    }

    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
      
    return (
      <Container maxW="container.xl" p={0}>
        <Flex h="60vh" py={20} display="flex" justifyContent="center">
          <DateRangePicker 
            value={dateRange}
            onChange={setDateRange}
            format="y-MM-dd"
          />
        </Flex>
        <Button 
          colorScheme="orange" 
          size="lg" 
          w="full" 
          alignSelf="center" 
          onClick={pageChange}
        >
          Book Room
        </Button>
      </Container>
    );
}
  
export default BookingPage;