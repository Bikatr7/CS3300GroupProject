// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// chakra-ui
import {
    Button,
    Container,
    Flex,
    VStack,
    Text,
    Heading
} from "@chakra-ui/react";

// date picker
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

// Add these styles right after imports
const customStyles = `
  .react-calendar { 
    background-color: white;
    border-radius: 8px;
    border: 1px solid #E2E8F0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    font-family: system-ui, sans-serif;
  }

  /* Make ALL calendar tiles (dates) blue */
  .react-calendar__tile,
  .react-calendar__month-view__days__day {
    color: #3182CE !important;
    padding: 0.75em 0.5em;
  }

  .react-calendar__tile--active {
    background: #3182CE !important;
    color: white !important;
  }

  .react-calendar__tile--active:hover {
    background: #2B6CB0 !important;
  }

  .react-calendar__tile:enabled:hover {
    background: #EBF8FF !important;
  }

  /* Make ALL input text blue */
  .react-daterange-picker__inputGroup__input,
  .react-daterange-picker__inputGroup__divider,
  .react-daterange-picker__inputGroup__year,
  .react-daterange-picker__inputGroup__month,
  .react-daterange-picker__inputGroup__day {
    color: #3182CE !important;
  }

  .react-daterange-picker__wrapper {
    border: 1px solid #E2E8F0;
    padding: 0.5rem;
    border-radius: 6px;
    background: white;
  }

  .react-calendar__navigation {
    margin-bottom: 1em;
  }

  .react-calendar__navigation button {
    color: #3182CE;
  }

  .react-calendar__month-view__weekdays__weekday {
    color: #3182CE;
  }

  .react-calendar__tile--now {
    background: #EBF8FF;
    color: #3182CE !important;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #BEE3F8;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #90CDF4 !important;
  }

  .react-calendar__year-view__months__month {
    color: #3182CE !important;
  }

  /* Target ALL text inside the input groups, including zeros */
  .react-daterange-picker__inputGroup {
    color: #3182CE !important;
  }

  .react-daterange-picker__inputGroup__input,
  .react-daterange-picker__inputGroup__divider,
  .react-daterange-picker__inputGroup__year,
  .react-daterange-picker__inputGroup__month,
  .react-daterange-picker__inputGroup__day,
  .react-daterange-picker__inputGroup span {
    color: #3182CE !important;
  }

  /* Ensure placeholder text is also blue */
  .react-daterange-picker__inputGroup input::placeholder {
    color: #3182CE !important;
  }
`;

function BookingPage() 
{
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState<any>(null);
    
    const handleDateChange = (value: any) =>
    {
        setDateRange(value);
    };

    const handleBooking = () =>
    {
        navigate('/payment');
    };
      
    return (
        <>
            <style>{customStyles}</style>
            <Flex minHeight="calc(100vh - 100px)" alignItems="center">
                <Container maxW="container.xl">
                    <VStack spacing={8} w="full" py={8}>
                        <Heading size="xl" color="brand.text">Select Your Dates</Heading>
                        <Text color="brand.text">Choose your check-in and check-out dates</Text>
                        
                        <Flex justifyContent="center" w="full">
                            <DateRangePicker 
                                value={dateRange}
                                onChange={handleDateChange}
                                format="y-MM-dd"
                                minDate={new Date()}
                            />
                        </Flex>

                        <Button 
                            bg="brand.accent1"
                            color="brand.text"
                            size="lg" 
                            w="full" 
                            maxW="400px"
                            _hover={{ bg: 'brand.accent4' }}
                            onClick={handleBooking}
                        >
                            Continue to Booking
                        </Button>
                    </VStack>
                </Container>
            </Flex>
        </>
    );
}

export default BookingPage;