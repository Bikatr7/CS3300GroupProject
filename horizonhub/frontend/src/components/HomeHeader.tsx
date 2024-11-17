// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// chakra-ui
import {
    Box,
    Flex,
    Image,
    Divider,
    Link,
    IconButton,
    useDisclosure,
    Collapse,
    Text,
} from '@chakra-ui/react';

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

// logos and images
import logo from '../assets/images/logo.webp';

// components
import { DesktopNav, MobileNav, NAV_ITEMS } from './NavItems';
import Login from './Login';

// contexts
import { useAuth } from '../contexts/AuthContext';

// Home footer and header are just for the special home page layout.

const HomeHeader: React.FC = () => 
{
    const { isOpen, onToggle } = useDisclosure();
    const { isLoggedIn, userEmail, isLoading, isPrivilegedUser } = useAuth();

    const navItems = isPrivilegedUser ? [...NAV_ITEMS, { label: 'Admin', href: '/admin' }] : NAV_ITEMS;

    return (
        <Box position="absolute" top={0} left={0} right={0} zIndex={1} mb={4}>
            <Flex
                bg="brand.headerFooter"
                color="brand.text"
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                align={'center'}
                justify={'center'}
            >
                <Flex
                    width="100%"
                    maxWidth="container.xl"
                    justify="space-between"
                    align="center"
                >
                    <Flex align="center">
                        <Flex
                            display={{base: 'flex', md: 'none'}}
                            mr={2}
                        >
                            <IconButton
                                onClick={onToggle}
                                icon={
                                    isOpen ? <CloseIcon w={3} h={3}/> : <HamburgerIcon w={5} h={5}/>
                                }
                                variant={'ghost'}
                                aria-label={'Toggle Navigation'}
                                color="brand.text"
                                _hover={{ bg: 'rgba(251, 233, 180, 0.1)' }}
                            />
                        </Flex>
                        <Link as={RouterLink} to="/">
                            <Image src={logo} boxSize='40px' alt='Hotel Logo' mr={4}/>
                        </Link>
                        <Flex display={{base: 'none', md: 'flex'}}>
                            <DesktopNav items={navItems} />
                        </Flex>
                    </Flex>
                    <Flex align="center">
                        {!isLoading && isLoggedIn && userEmail && (
                            <Flex align="center">
                                <Text
                                    fontSize="sm" 
                                    fontWeight="medium" 
                                    color="brand.text" 
                                    mr={4}
                                >
                                    {userEmail}
                                </Text>
                            </Flex>
                        )}
                        <Login/>
                    </Flex>
                </Flex>
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <MobileNav items={navItems}/>
            </Collapse>
            <Divider borderColor="brand.text" opacity={0.3} />
        </Box>
    );
};

export default HomeHeader;
