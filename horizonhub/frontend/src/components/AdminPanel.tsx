// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// React
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Chakra UI
import {
  Box,
  Button,
  Heading,
  Input,
  Textarea,
  useToast,
  Text,
  HStack,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  FormControl,
  FormLabel,
  VStack,
  Icon,
} from "@chakra-ui/react";

// Icons
import { ChevronUpIcon } from '@chakra-ui/icons';

// Images
import landingPageBg from '../assets/images/SunsetBkgd.jpg';

// Util
import { getURL } from '../utils';

// Theme
import theme from '../theme';

function AdminPanel() 
{
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [sqlQuery, setSqlQuery] = useState('');
    const [queryResult, setQueryResult] = useState('');
    const [backupStatus, setBackupStatus] = useState('');
    const [replaceFile, setReplaceFile] = useState<File | null>(null);
    const [replaceStatus, setReplaceStatus] = useState('');
    const toast = useToast();
    const modalRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [modalSize, setModalSize] = useState(() => {
        const savedSize = localStorage.getItem('adminPanelSize');
        return savedSize ? JSON.parse(savedSize) : { width: 800, height: 600 };
    });
    const [modalPosition, setModalPosition] = useState(() => {
        const savedPosition = localStorage.getItem('adminPanelPosition');
        return savedPosition ? JSON.parse(savedPosition) : { left: window.innerWidth / 2, top: window.innerHeight / 2 };
    });

    const navigate = useNavigate();

    const handleSendEmail = async () => 
    {
        try 
        {
            const response = await fetch(getURL('/admin/db/send-email'), 
            {
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify({ subject: emailSubject, body: emailBody })
            });

            if (response.ok) 
            {
                toast({
                    title: "Emails Sent",
                    description: "The emails have been sent to all users successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                setEmailSubject('');
                setEmailBody('');
            } 
            else 
            {
                const errorData = await response.json();
                setQueryResult(JSON.stringify(errorData, null, 2));
                throw new Error(errorData.message || 'Failed to send emails');
            }
        } 
        catch (error) 
        {
            toast({
                title: "Error",
                description: (error as Error).message || "Failed to send emails. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleRunQuery = async () => 
    {
        try 
        {
            const response = await fetch(getURL('/admin/db/run-query'), 
            {
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify({ sql_query: sqlQuery })
            });

            if (response.ok) 
            {
                const result = await response.json();
                setQueryResult(JSON.stringify(result, null, 2));
                toast({
                    title: "Query Executed",
                    description: "The query has been executed successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } 
            else 
            {
                const errorData = await response.json();
                setQueryResult(JSON.stringify(errorData, null, 2));
                throw new Error(errorData.message || 'Failed to run query');
            }
        } 
        catch (error) 
        {
            toast({
                title: "Error",
                description: (error as Error).message || "Failed to run query. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleForceBackup = async () => 
    {
        try 
        {
            setBackupStatus('Starting backup...');
            const response = await fetch(getURL('/admin/db/force-backup'), 
            {
                method: 'POST',
                headers: 
                {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            if (response.ok) 
            {
                setBackupStatus('Backup initiated successfully.');
                toast({
                    title: "Backup Initiated",
                    description: "The backup process has started.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } 
            else 
            {
                const errorData = await response.json();
                setBackupStatus(`Backup failed: ${errorData.message || 'Unknown error'}`);
                throw new Error(errorData.message || 'Failed to initiate backup');
            }
        } 
        catch (error) 
        {
            setBackupStatus(`Backup error: ${(error as Error).message}`);
            toast({
                title: "Error",
                description: (error as Error).message || "Failed to initiate backup. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleReplaceDatabase = async () => 
    {
        if (!replaceFile) 
        {
            toast({
                title: "No File Selected",
                description: "Please select a backup file to replace the database.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try 
        {
            setReplaceStatus('Replacing database...');
            const formData = new FormData();
            formData.append('file', replaceFile);

            const response = await fetch(getURL('/admin/db/replace-database'), 
            {
                method: 'POST',
                headers: 
                {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: formData
            });

            if (response.ok) 
            {
                const result = await response.json();
                setReplaceStatus(result.message || 'Database replaced successfully.');
                toast({
                    title: "Database Replaced",
                    description: result.message || "The database has been replaced successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } 
            else 
            {
                const errorData = await response.json();
                setReplaceStatus(`Replace failed: ${errorData.message || 'Unknown error'}`);
                throw new Error(errorData.message || 'Failed to replace database');
            }
        } 
        catch (error) 
        {
            setReplaceStatus(`Replace error: ${(error as Error).message}`);
            toast({
                title: "Error",
                description: (error as Error).message || "Failed to replace database. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

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

    const resetModalSizeAndPosition = () => 
    {
        const defaultSize = { width: 800, height: 600 };
        const defaultPosition = { left: window.innerWidth / 2, top: window.innerHeight / 2 };
        setModalSize(defaultSize);
        setModalPosition(defaultPosition);
        localStorage.removeItem('adminPanelSize');
        localStorage.removeItem('adminPanelPosition');
    };

    useEffect(() => 
    {
        const handleKeyDown = (e: KeyboardEvent) => 
        {
            if (e.altKey && e.key === 'r') 
            {
                resetModalSizeAndPosition();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => 
        {
            window.removeEventListener('keydown', handleKeyDown);
        };
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

    return (
        <Box
            height="100vh"
            width="100vw"
            position="relative"
            overflow="hidden"
        >
            <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                backgroundImage={`url(${landingPageBg})`}
                backgroundSize="cover"
                backgroundPosition="center"
                filter="brightness(0.6)"
            />
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
                <Tabs variant="enclosed" colorScheme="orange" flex={1} display="flex" flexDirection="column">
                    <TabList>
                        <Tab _selected={{ color: theme.colors.brand.text, bg: theme.colors.brand.accent1 }}>Email</Tab>
                        <Tab _selected={{ color: theme.colors.brand.text, bg: theme.colors.brand.accent1 }}>Query</Tab>
                        <Tab _selected={{ color: theme.colors.brand.text, bg: theme.colors.brand.accent1 }}>Force Backup</Tab>
                        <Tab _selected={{ color: theme.colors.brand.text, bg: theme.colors.brand.accent1 }}>Replace Database</Tab>
                    </TabList>
                    <TabPanels flex={1} overflow="hidden">
                        <TabPanel height="100%" display="flex" flexDirection="column">
                            <Input
                                placeholder="Email Subject"
                                value={emailSubject}
                                onChange={(e) => setEmailSubject(e.target.value)}
                                mb={2}
                                bg={theme.colors.brand.background}
                                color={theme.colors.brand.text}
                                _placeholder={{ color: `${theme.colors.brand.text}80` }}
                            />
                            <Textarea
                                placeholder="Email Body"
                                value={emailBody}
                                onChange={(e) => setEmailBody(e.target.value)}
                                mb={2}
                                flex={1}
                                resize="none"
                                bg={theme.colors.brand.background}
                                color={theme.colors.brand.text}
                                _placeholder={{ color: `${theme.colors.brand.text}80` }}
                                sx={{
                                    '&::-webkit-scrollbar': {
                                        display: 'none',
                                    },
                                    scrollbarWidth: 'none',
                                    overflow: 'auto',
                                }}
                            />
                            <Button 
                                onClick={handleSendEmail} 
                                bg={theme.colors.brand.accent1}
                                color={theme.colors.brand.text}
                                _hover={{ bg: theme.colors.brand.accent4 }}
                            >
                                Send Email to All
                            </Button>
                        </TabPanel>
                        <TabPanel height="100%" display="flex" flexDirection="column">
                            <Textarea
                                placeholder="Enter SQL Query"
                                value={sqlQuery}
                                onChange={(e) => setSqlQuery(e.target.value)}
                                mb={2}
                                flex={0.5}
                                resize="none"
                                bg={theme.colors.brand.background}
                                color={theme.colors.brand.text}
                                _placeholder={{ color: `${theme.colors.brand.text}80` }}
                                sx={{
                                    '&::-webkit-scrollbar': {
                                        display: 'none',
                                    },
                                    scrollbarWidth: 'none',
                                    overflow: 'auto',
                                }}
                            />
                            <Button 
                                onClick={handleRunQuery} 
                                bg={theme.colors.brand.accent1}
                                color={theme.colors.brand.text}
                                _hover={{ bg: theme.colors.brand.accent4 }}
                                mb={2}
                            >
                                Run Query
                            </Button>
                            {queryResult && (
                                <Box
                                    flex={1}
                                    p={2}
                                    bg={`${theme.colors.brand.background}80`}
                                    borderRadius="md"
                                    fontSize="sm"
                                    fontFamily="monospace"
                                    whiteSpace="pre-wrap"
                                    overflow="auto"
                                    color={theme.colors.brand.text}
                                    sx={{
                                        '&::-webkit-scrollbar': {
                                            display: 'none',
                                        },
                                        scrollbarWidth: 'none',
                                    }}
                                >
                                    {queryResult}
                                </Box>
                            )}
                        </TabPanel>
                        <TabPanel height="100%" display="flex" flexDirection="column">
                            <Button onClick={handleForceBackup} colorScheme="orange" mb={2}>Force Backup</Button>
                            {backupStatus && (
                                <Text mt={2} color="whiteAlpha.800">
                                    {backupStatus}
                                </Text>
                            )}
                        </TabPanel>
                        <TabPanel height="100%" display="flex" flexDirection="column">
                            <FormControl mb={2}>
                                <FormLabel>Upload Backup File</FormLabel>
                                <input
                                    type="file"
                                    accept=".zip,.pgp"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            setReplaceFile(e.target.files[0]);
                                        }
                                    }}
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                />
                                <VStack
                                    border="2px dashed"
                                    borderColor="orange.400"
                                    borderRadius="md"
                                    p={4}
                                    spacing={2}
                                    alignItems="center"
                                    cursor="pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Icon as={ChevronUpIcon} w={8} h={8} color="orange.400" />
                                    <Text color="orange.400">
                                        {replaceFile ? replaceFile.name : "Click or drag to upload backup file"}
                                    </Text>
                                </VStack>
                            </FormControl>
                            <Button onClick={handleReplaceDatabase} colorScheme="orange" mb={2}>Replace Database</Button>
                            {replaceStatus && (
                                <Text mt={2} color="whiteAlpha.800">
                                    {replaceStatus}
                                </Text>
                            )}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
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
        </Box>
    );
}

export default AdminPanel;