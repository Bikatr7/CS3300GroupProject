// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// chakra-ui
import { Box, Flex, Image, Text, Link } from '@chakra-ui/react';

// images
import logo from '../assets/images/logo.webp';

function Footer() 
{
    return (
        <Box
            bg="brand.headerFooter"
            color="brand.text"
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
            >
                <Flex display={{ base: 'flex', md: 'none' }} width="100%" justify="space-between" align="center">
                    <Text textAlign="center" color="brand.text">© Horizon Hotel Group 2024. All rights reserved.</Text>
                    <Link href="/">
                        <Image src={logo} boxSize='30px' alt='Kakusui Logo' />
                    </Link>
                </Flex>
                <Flex display={{ base: 'none', md: 'flex' }} width="100%" justify="space-between" align="center">
                    <Link href="/">
                        <Image src={logo} boxSize='30px' alt='Kakusui Logo' />
                    </Link>
                    <Text textAlign="center" flex="1" color="brand.text">© Horizon Hotel Group 2024. All rights reserved.</Text>
                </Flex>
            </Flex>
        </Box>
    );
}

export default Footer;