// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// React
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Chakra UI
import {
  Box,
  Heading,
  Text,
  HStack,
  Divider,
  Spinner,
  Center,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  IconButton,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

// Images
import fullscreen from '../assets/images/fullscreen.jpg';

// Util
import { getURL } from '../utils';

// Theme
import theme from '../theme';
import themeConfig from '../../../edit_me.json';

// image mapping
const imageMap: { [key: string]: string } = 
{
    fullscreen
};

// there's a lot done here, but it's mostly styling. If you want to add a new admin feature, you can do so by adding a new section to the admin panel.
// The current features include viewing, editing and deleting bookings. Each booking is displayed in an accordion panel that shows basic info when collapsed
// and detailed info when expanded. The panel is draggable and resizable, with the position and size being saved to localStorage so it persists across page reloads.

function AdminPanel() 
{    const [bookings, setBookings] = useState([]);
    const [isLoadingBookings, setIsLoadingBookings] = useState(false);
    const toast = useToast();
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalSize, setModalSize] = useState(() => {
        const savedSize = localStorage.getItem('adminPanelSize');
        return savedSize ? JSON.parse(savedSize) : { width: 800, height: 600 };
    });
    const [modalPosition, setModalPosition] = useState(() => {
        const savedPosition = localStorage.getItem('adminPanelPosition');
        return savedPosition ? JSON.parse(savedPosition) : { left: window.innerWidth / 2, top: window.innerHeight / 2 };
    });
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const navigate = useNavigate();

    const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => 
    {
        // Prevent dragging when interacting with input, textarea, button, or select elements
        const interactiveElements = ['input', 'textarea', 'button', 'select'];
        if (interactiveElements.some(el => (e.target as HTMLElement).closest(el))) return;
        if ((e.target as HTMLElement).closest('.resize-handle')) return;

        const modal = modalRef.current;
        if (!modal) return;

        const startX = e.clientX - modalPosition.left;
        const startY = e.clientY - modalPosition.top;

        const onMouseMove = (e: MouseEvent) => 
        {
            const newLeft = e.clientX - startX;
            const newTop = e.clientY - startY;

            setModalPosition({ left: newLeft, top: newTop });
        };

        const onMouseUp = () => 
        {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const handleResize = (e: React.MouseEvent<HTMLDivElement>) => 
    {
        const modal = modalRef.current;
        if (!modal) return;

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = modal.offsetWidth;
        const startHeight = modal.offsetHeight;

        const onMouseMove = (e: MouseEvent) => 
        {
            const newWidth = startWidth + e.clientX - startX;
            const newHeight = startHeight + e.clientY - startY;

            const updatedSize = {
                width: Math.max(400, Math.min(newWidth, window.innerWidth)),
                height: Math.max(300, Math.min(newHeight, window.innerHeight))
            };
            setModalSize(updatedSize);
        };

        const onMouseUp = () => 
        {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const fetchBookings = async () => 
    {
        setIsLoadingBookings(true);
        try 
        {
            const response = await axios.get(getURL('/admin/bookings'), {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            setBookings(response.data.bookings);
        } 
        catch (error) 
        {
            toast({
                title: "Error",
                description: "Failed to fetch bookings",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
        finally 
        {
            setIsLoadingBookings(false);
        }
    };

    useEffect(() => 
    {
        fetchBookings();
    }, []);

    useEffect(() => 
    {
        localStorage.setItem('adminPanelSize', JSON.stringify(modalSize));
    }, [modalSize]);

    useEffect(() => 
    {
        localStorage.setItem('adminPanelPosition', JSON.stringify(modalPosition));
    }, [modalPosition]);

    useEffect(() => 
    {
        const modal = modalRef.current;
        if (modal) 
        {
            modal.style.width = `${modalSize.width}px`;
            modal.style.height = `${modalSize.height}px`;
            modal.style.left = `${modalPosition.left}px`;
            modal.style.top = `${modalPosition.top}px`;
        }
    }, [modalSize, modalPosition]);

    const formatDate = (dateString:string) => 
    {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status:string) => 
    {
        switch(status.toLowerCase()) 
        {
            case 'confirmed':
                return theme.colors.brand.accent1;
            case 'pending':
                return theme.colors.brand.accent4;
            case 'cancelled':
                return 'red.500';
            case 'checked_in':
                return 'green.500';
            case 'completed':
                return 'gray.500';
            default:
                return theme.colors.brand.text;
        }
    };

    const showBackground = themeConfig.theme.images.showBackgroundOn.admin;

    const handleEdit = async (bookingId: string, updatedData: any) => {
        try {
            await axios.put(
                getURL(`/admin/bookings/${bookingId}`),
                updatedData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                }
            );
            
            toast({
                title: "Success",
                description: "Booking updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            
            fetchBookings(); // Refresh the bookings list
            onClose();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.detail || "Failed to update booking",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDelete = async (bookingId: string) => {
        if (!window.confirm("Are you sure you want to delete this booking?")) {
            return;
        }

        try {
            await axios.delete(
                getURL(`/admin/bookings/${bookingId}`),
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                }
            );
            
            toast({
                title: "Success",
                description: "Booking deleted successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            
            fetchBookings(); // Refresh the bookings list
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.detail || "Failed to delete booking",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            height="100vh"
            width="100vw"
            position="relative"
            overflow="hidden"
        >
            {showBackground && (
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    backgroundImage={`url(${imageMap[themeConfig.theme.images.background]})`}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    filter="brightness(0.6)"
                />
            )}
            <Box
                ref={modalRef}
                position="absolute"
                left={`${modalPosition.left}px`}
                top={`${modalPosition.top}px`}
                transform="translate(-50%, -50%)"
                bg={`${theme.colors.brand.background}ee`}
                p={4}
                borderRadius="xl"
                color={theme.colors.brand.text}
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                width={`${modalSize.width}px`}
                height={`${modalSize.height}px`}
                display="flex"
                flexDirection="column"
                overflow="hidden"
                onMouseDown={handleDrag}
                cursor="move"
            >
                <HStack justifyContent="space-between" mb={2}>
                    <Heading size="lg" color={theme.colors.brand.accent1} userSelect="none">Admin Panel</Heading>
                    <Text 
                        color={theme.colors.brand.accent1} 
                        cursor="pointer" 
                        userSelect="none"
                        onClick={() => navigate('/')}
                    >
                        Go Back
                    </Text>
                </HStack>
                <Divider mb={2} />
                <Box height="calc(100% - 48px)" overflow="auto" sx={{
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                }}>
                    {isLoadingBookings ? (
                        <Center height="100%">
                            <Spinner />
                        </Center>
                    ) : bookings.length === 0 ? (
                        <Center height="100%" flexDirection="column">
                            <Text 
                                fontSize="xl" 
                                color={theme.colors.brand.accent1}
                                mb={2}
                            >
                                No Bookings Found
                            </Text>
                            <Text color={theme.colors.brand.text}>
                                There are currently no bookings in the system.
                            </Text>
                        </Center>
                    ) : (
                        <Accordion allowMultiple>
                            {bookings.map((booking:any) => (
                                <AccordionItem 
                                    key={booking.id}
                                    border="none"
                                    mb={2}
                                    bg={`${theme.colors.brand.background}80`}
                                    borderRadius="md"
                                >
                                    <AccordionButton 
                                        _hover={{ bg: `${theme.colors.brand.background}cc` }}
                                        borderRadius="md"
                                    >
                                        <Box flex="1">
                                            <Grid templateColumns="repeat(4, 1fr)" gap={4} alignItems="center">
                                                <GridItem>
                                                    <Text fontWeight="bold" color={theme.colors.brand.accent1}>
                                                        #{booking.confirmation_code}
                                                    </Text>
                                                </GridItem>
                                                <GridItem>
                                                    <Text>{booking.customer_email || 'No email'}</Text>
                                                </GridItem>
                                                <GridItem>
                                                    <Text>{formatDate(booking.check_in_date)}</Text>
                                                </GridItem>
                                                <GridItem>
                                                    <Text 
                                                        color={getStatusColor(booking.status)}
                                                        fontWeight="bold"
                                                    >
                                                        {booking.status.toUpperCase()}
                                                    </Text>
                                                </GridItem>
                                            </Grid>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel pb={4}>
                                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                                            <GridItem>
                                                <Text fontWeight="bold" color={theme.colors.brand.accent1}>Room Details</Text>
                                                <Text>Type: {booking.room_type || 'N/A'}</Text>
                                                <Text>Number: {booking.room_number || 'N/A'}</Text>
                                                {booking.room_price && <Text>Price: ${booking.room_price}</Text>}
                                                {booking.room_description && <Text>Description: {booking.room_description}</Text>}
                                            </GridItem>
                                            <GridItem>
                                                <Text fontWeight="bold" color={theme.colors.brand.accent1}>Booking Details</Text>
                                                <Text>Check-in: {formatDate(booking.check_in_date)}</Text>
                                                <Text>Check-out: {formatDate(booking.check_out_date)}</Text>
                                                <Text>Created: {formatDate(booking.created_at)}</Text>
                                            </GridItem>
                                            <GridItem colSpan={2}>
                                                <HStack spacing={4} justifyContent="flex-end">
                                                    <IconButton
                                                        aria-label="Edit booking"
                                                        icon={<EditIcon />}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedBooking(booking);
                                                            onOpen();
                                                        }}
                                                        colorScheme="blue"
                                                    />
                                                    <IconButton
                                                        aria-label="Delete booking"
                                                        icon={<DeleteIcon />}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(booking.id);
                                                        }}
                                                        colorScheme="red"
                                                    />
                                                </HStack>
                                            </GridItem>
                                        </Grid>
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    )}
                </Box>
                <Box
                    position="absolute"
                    bottom="0"
                    right="0"
                    width="20px"
                    height="20px"
                    cursor="se-resize"
                    onMouseDown={handleResize}
                    className="resize-handle"
                />
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="brand.background">
                    <ModalHeader color="brand.text">Edit Booking</ModalHeader>
                    <ModalCloseButton color="brand.text" />
                    <ModalBody>
                        {selectedBooking && (
                            <VStack spacing={4}>
                                <FormControl>
                                    <FormLabel color="brand.text">Status</FormLabel>
                                    <Select
                                        value={selectedBooking.status}
                                        onChange={(e) => setSelectedBooking({
                                            ...selectedBooking,
                                            status: e.target.value
                                        })}
                                        bg="brand.accent3"
                                        color="brand.text"
                                        borderColor="brand.accent1"
                                        _hover={{ borderColor: 'brand.accent4' }}
                                        sx={{
                                            option: {
                                                bg: 'brand.accent3',
                                                color: 'brand.text',
                                                _hover: { bg: 'brand.accent2' }
                                            }
                                        }}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="checked_in">Checked In</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel color="brand.text">Email</FormLabel>
                                    <Input
                                        value={selectedBooking.customer_email || ''}
                                        onChange={(e) => setSelectedBooking({
                                            ...selectedBooking,
                                            customer_email: e.target.value
                                        })}
                                        bg="brand.accent3"
                                        color="brand.text"
                                        borderColor="brand.accent1"
                                        _hover={{ borderColor: 'brand.accent4' }}
                                        _placeholder={{ color: 'brand.text' }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel color="brand.text">Check-in Date</FormLabel>
                                    <Input
                                        type="datetime-local"
                                        value={selectedBooking.check_in_date?.slice(0, 16)}
                                        onChange={(e) => setSelectedBooking({
                                            ...selectedBooking,
                                            check_in_date: e.target.value
                                        })}
                                        bg="brand.accent3"
                                        color="brand.text"
                                        borderColor="brand.accent1"
                                        _hover={{ borderColor: 'brand.accent4' }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel color="brand.text">Check-out Date</FormLabel>
                                    <Input
                                        type="datetime-local"
                                        value={selectedBooking.check_out_date?.slice(0, 16)}
                                        onChange={(e) => setSelectedBooking({
                                            ...selectedBooking,
                                            check_out_date: e.target.value
                                        })}
                                        bg="brand.accent3"
                                        color="brand.text"
                                        borderColor="brand.accent1"
                                        _hover={{ borderColor: 'brand.accent4' }}
                                    />
                                </FormControl>
                            </VStack>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            bg="brand.accent1"
                            color="brand.text"
                            mr={3}
                            onClick={() => handleEdit(selectedBooking.id, {
                                status: selectedBooking.status,
                                email: selectedBooking.customer_email,
                                check_in: selectedBooking.check_in_date,
                                check_out: selectedBooking.check_out_date
                            })}
                            _hover={{ bg: 'brand.accent4' }}
                        >
                            Save Changes
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            color="brand.text"
                            _hover={{ bg: 'brand.accent3' }}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default AdminPanel;
