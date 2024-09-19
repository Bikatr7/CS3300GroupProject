// maintain allman bracket style for consistency

// chakra-ui
import { Box, Flex, IconButton, Image, Text, Link } from '@chakra-ui/react';

// icons
import { IconBrandGithub } from '@tabler/icons-react';

// images
import logo from '../assets/images/logo.webp';

function Footer() 
{
    return (
        <Box
            bg="#14192b"
            color="gray.300"
            borderTop="1px"
            borderColor="rgba(255, 255, 255, 0.1)"
            boxShadow="0 -1px 2px 0 rgba(0, 0, 0, 0.05)"
            width="100%"
            mt={6}
        >
            <Flex
                maxWidth="container.xl"
                margin="0 auto"
                py={4}
                px={4}
                direction={{ base: 'column', md: 'row' }}
                justify="space-between"
                align="center"
                color="gray.300"
            >
                <Flex display={{ base: 'flex', md: 'none' }} width="100%" justify="space-between" align="center">
                    <IconButton 
                        as='a' 
                        href='/'
                        aria-label='Home' 
                        icon={<IconBrandGithub />} 
                        color="white"
                        bg="transparent"
                        _hover={{ bg: 'whiteAlpha.200' }}
                    />
                    <Text textAlign="center">© Whatever the fuck we want it to be All rights reserved</Text>
                    <Link href="/">
                        <Image src={logo} boxSize='30px' alt='Kakusui Logo' />
                    </Link>
                </Flex>
                <Flex display={{ base: 'none', md: 'flex' }} width="100%" justify="space-between" align="center">
                    <Link href="/">
                        <Image src={logo} boxSize='30px' alt='Kakusui Logo' />
                    </Link>
                    <Text textAlign="center" flex="1">© Whatever the fuck we want it to be All rights reserved</Text>
                    <IconButton 
                        as='a' 
                        href='https://github.com/Bikatr7' 
                        aria-label='Github' 
                        icon={<IconBrandGithub />} 
                        color="white"
                        bg="transparent"
                        _hover={{ bg: 'whiteAlpha.200' }}
                    />
                </Flex>
            </Flex>
        </Box>
    );
}

export default Footer;