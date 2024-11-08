// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getURL } from "../utils";
import axios from "axios";

// chakra-ui
import {
    Button,
    Container,
    Flex,
    VStack,
    Text,
    Heading,
    Box
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

interface Room {
    id: string;
    name: string;
    price: number;
    description: string;
    capacity: number;
    available_quantity: number;
}

function BookingPage() 
{
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState<any>(null);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAvailableRooms = async (checkIn:Date, checkOut:Date) =>
    {
        setIsLoading(true);
        setError(null);
        try 
        {
            const response = await axios.post(getURL('/booking/check-availability'), {
                check_in: checkIn.toISOString(),
                check_out: checkOut.toISOString()
            });
            setAvailableRooms(response.data);
        } 
        catch (err) 
        {
            setError("Failed to fetch available rooms. Please try again.");
            console.error("Error fetching rooms:", err);
        }
        finally 
        {
            setIsLoading(false);
        }
    };

    const handleDateChange = (value:any) =>
    {
        setDateRange(value);
        if(value && value[0] && value[1]) 
        {
            fetchAvailableRooms(value[0], value[1]);
        }
    };

    const handleBooking = () =>
    {
        if(!dateRange || !selectedRoom)
        {
            return;
        }
        
        // Pass booking details through navigation state
        navigate('/payment', {
            state: {
                dateRange,
                room: selectedRoom
            }
        });
    };
      
    return (
        <>
            <style>{customStyles}</style>
            <Flex minHeight="calc(100vh - 100px)" alignItems="center" bg="brand.background">
                <Container maxW="container.xl">
                    <VStack spacing={8} w="full" py={8}>
                        <Heading size="xl" color="brand.cream">Book Your Stay</Heading>
                        
                        <VStack spacing={4} w="full">
                            <Text color="brand.cream" fontWeight="bold">1. Select Your Dates</Text>
                            <Flex justifyContent="center" w="full">
                                <DateRangePicker 
                                    value={dateRange}
                                    onChange={handleDateChange}
                                    format="y-MM-dd"
                                    minDate={new Date()}
                                />
                            </Flex>

                            {dateRange && (
                                <>
                                    <Text color="brand.cream" fontWeight="bold" mt={6}>2. Select Your Room</Text>
                                    {isLoading && <Text color="brand.cream">Loading available rooms...</Text>}
                                    {error && <Text color="red.500">{error}</Text>}
                                    <VStack spacing={4} w="full" maxW="600px">
                                        {availableRooms.map((room) => (
                                            <Box
                                                key={room.id}
                                                w="full"
                                                bg="brand.accent3"
                                                p={6}
                                                borderRadius="lg"
                                                cursor="pointer"
                                                onClick={() => setSelectedRoom(room)}
                                                position="relative"
                                                transform="translateZ(0)"
                                                _hover={{ 
                                                    "&::after": {
                                                        transform: "translateY(-5px)",
                                                        opacity: 1
                                                    }
                                                }}
                                                _after={{
                                                    content: '""',
                                                    position: "absolute",
                                                    inset: 0,
                                                    bg: "brand.accent2",
                                                    borderRadius: "lg",
                                                    opacity: 0,
                                                    transition: "all 0.2s",
                                                    zIndex: -1
                                                }}
                                                border={selectedRoom?.id === room.id ? "2px solid" : "none"}
                                                borderColor={selectedRoom?.id === room.id ? "brand.accent1" : "transparent"}
                                            >
                                                <VStack align="start" w="full" spacing={2}>
                                                    <Heading size="md" color="brand.text">
                                                        {room.name}
                                                    </Heading>
                                                    <Text color="brand.text">
                                                        {room.description}
                                                    </Text>
                                                    <Text color="brand.text">
                                                        Capacity: {room.capacity} guests
                                                    </Text>
                                                    <Text color="brand.text" fontWeight="bold">
                                                        ${room.price}/night
                                                    </Text>
                                                    <Text color="brand.text">
                                                        {room.available_quantity} rooms available
                                                    </Text>
                                                </VStack>
                                            </Box>
                                        ))}
                                    </VStack>

                                    <Button 
                                        bg="brand.accent1"
                                        color="brand.text"
                                        size="lg" 
                                        w="full" 
                                        maxW="400px"
                                        mt={6}
                                        _hover={{ bg: 'brand.accent4' }}
                                        onClick={handleBooking}
                                        isDisabled={!selectedRoom}
                                    >
                                        Continue to Payment
                                    </Button>
                                </>
                            )}
                        </VStack>
                    </VStack>
                </Container>
            </Flex>
        </>
    );
}

export default BookingPage;