// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useNavigate } from 'react-router-dom';

// chakra-ui
import {
    VStack,
    Heading,
    Text,
    Button,
    Container,
    Box,
    Image,
    Flex,
    useTheme
} from "@chakra-ui/react";

// theme config
import themeConfig from '../../../edit_me.json';

function AmenitiesPage() 
{
    const { rooms, facilities } = themeConfig.amenities;
    const theme = useTheme();
    const navigate = useNavigate();

    const handleBookNow = () =>
    {
        navigate('/booking');
    };

    const getImageUrl = (imageName:string) =>
    {
        try 
        {
            return new URL(`../assets/images/${imageName}.jpg`, import.meta.url).href;
        } 
        catch (error) 
        {
            console.error(`Failed to load image: ${imageName}`, error);
            return '';
        }
    };

    return (
        <Container maxW="container.xl" py={10}>
            <VStack spacing={12}>
                <Heading 
                    textAlign="center"
                    color={theme.colors.brand.text}
                >
                    {rooms.title}
                </Heading>

                <VStack spacing={8} width="100%">
                    {rooms.items.map((room, index) => (
                        <Box 
                            key={index}
                            w="full" 
                            bg="transparent" 
                            borderRadius="lg" 
                            borderWidth="1px" 
                            borderColor={theme.colors.brand.text}
                            p={6}
                        >
                            <VStack spacing={4}>
                                <Text 
                                    color={theme.colors.brand.text} 
                                    textAlign="center" 
                                    fontWeight="bold" 
                                    fontSize="2xl"
                                >
                                    {room.title}
                                </Text>
                                <Text 
                                    color={theme.colors.brand.text} 
                                    textAlign="center"
                                >
                                    {room.description}
                                </Text>
                                <Flex justify="center">
                                    <Image 
                                        src={getImageUrl(room.image)} 
                                        height={room.height} 
                                        objectFit="cover"
                                        borderRadius="md"
                                        fallback={<Box height={room.height} width="100%" bg={theme.colors.brand.accent2} />}
                                    />
                                </Flex>
                            </VStack>
                        </Box>
                    ))}

                    <Button 
                        bg={theme.colors.brand.accent1}
                        color={theme.colors.brand.text}
                        size="lg"
                        _hover={{
                            bg: theme.colors.brand.accent4
                        }}
                        onClick={handleBookNow}
                    >
                        Book Now
                    </Button>
                </VStack>

                {facilities.items.length > 0 && (
                    <VStack spacing={8} width="100%" pt={8}>
                        <Heading 
                            color={theme.colors.brand.text}
                        >
                            {facilities.title}
                        </Heading>
                        
                        {facilities.items.map((facility, index) => (
                            <Box 
                                key={index}
                                w="full" 
                                bg="transparent" 
                                borderRadius="lg" 
                                borderWidth="1px" 
                                borderColor={theme.colors.brand.text}
                                p={6}
                            >
                                <VStack spacing={4}>
                                    <Text 
                                        color={theme.colors.brand.text} 
                                        textAlign="center"
                                    >
                                        {facility.description}
                                    </Text>
                                    <Flex justify="center">
                                        <Image 
                                            src={getImageUrl(facility.image)} 
                                            height={facility.height}
                                            objectFit="cover"
                                            borderRadius="md"
                                            fallback={<Box height={facility.height} width="100%" bg={theme.colors.brand.accent2} />}
                                        />
                                    </Flex>
                                </VStack>
                            </Box>
                        ))}
                    </VStack>
                )}
            </VStack>
        </Container>
    );
}

export default AmenitiesPage;