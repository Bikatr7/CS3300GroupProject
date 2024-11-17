// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useState } from 'react';
import axios from 'axios';

// chakra-ui
import { Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Flex, useDisclosure, Spinner, useToast, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

// util
import { getURL } from '../utils';

// motion
import { motion } from 'framer-motion';

// animations
import { buttonVariants } from '../animations/commonAnimations';

// auth
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => 
{
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();
    const { isLoggedIn, login, logout, isLoading } = useAuth();

    const handleClose = () => 
    {
        setEmail('');
        setPassword('');
        onClose();
    };

    const showToast = (title: string, description: string, status: "error" | "info" | "warning" | "success") => 
    {
        toast({
            title,
            description,
            status,
            duration: 5000,
            isClosable: true,
        });
    };

    const handleSubmit = async () => 
    {
        try 
        {
            const response = await axios.post(getURL('/auth/login'), {
                username: email,
                password
            });

            if(response.data.access_token)
            {
                await login(response.data.access_token);
                handleClose();
                showToast("Success", "Successfully logged in", "success");
            }
            else
            {
                showToast("Error", "Invalid credentials", "error");
            }
        } 
        catch (error) 
        {
            if(axios.isAxiosError(error))
            {
                showToast("Error", error.response?.data?.message || "Invalid credentials", "error");
            }
            else
            {
                showToast("Error", "An error occurred. Please try again.", "error");
            }
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => 
    {
        if(event.key === 'Enter') 
        {
            handleSubmit();
        }
    };

    return (
        <>
            <motion.div whileHover="hover" variants={buttonVariants}>
                <Button 
                    onClick={isLoggedIn ? async () => { await logout(); showToast("Success", "Successfully logged out", "success"); } : onOpen} 
                    rounded="full"
                    bg="#de7c47"
                    color="#fbe9b4"
                    _hover={{ bg: '#a46048' }}
                    minWidth="70px" 
                    height="40px"    
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Spinner size="sm" color="#fbe9b4" />
                    ) : (
                        isLoggedIn ? 'Logout' : 'Login'
                    )}
                </Button>
            </motion.div>
            <Modal isOpen={isOpen} onClose={handleClose} isCentered motionPreset="slideInBottom">
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
                <ModalContent
                    bg="#2e343c"
                    color="#fbe9b4"
                    borderRadius="xl"
                    boxShadow="xl"
                >
                    <ModalHeader color="#de7c47">Login</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction="column" gap={4}>
                            <Input
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyPress={handleKeyPress}
                                bg="whiteAlpha.200"
                                border="none"
                                _focus={{ bg: "whiteAlpha.300" }}
                            />
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    bg="whiteAlpha.200"
                                    border="none"
                                    _focus={{ bg: "whiteAlpha.300" }}
                                />
                                <InputRightElement>
                                    <IconButton
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                        onClick={() => setShowPassword(!showPassword)}
                                        variant="ghost"
                                        colorScheme="whiteAlpha"
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Flex width="100%" justify="space-between">
                            <Button variant="ghost" mr={3} onClick={handleClose} _hover={{ bg: "whiteAlpha.200" }}>
                                Close
                            </Button>
                            <Button colorScheme="orange" onClick={handleSubmit}>
                                Login
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Login;