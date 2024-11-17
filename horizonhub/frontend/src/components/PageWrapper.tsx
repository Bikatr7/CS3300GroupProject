// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency
// react
import React from 'react';

// chakra-ui
import { Box } from "@chakra-ui/react";

// images
import landingPageBg from '../assets/images/fullscreen.jpg';

interface PageWrapperProps 
{
    children: React.ReactNode;
    showBackground?: boolean;
    zIndex?: number;
}

// a bit hard to understand, but it's used to wrap the pages in a background image and a dark overlay.

function PageWrapper({ children, showBackground = false, zIndex = 1 }: PageWrapperProps) 
{
    return (
        <Box
            position="relative"
            minHeight="100vh"
            backgroundImage={showBackground ? `url(${landingPageBg})` : 'none'}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundAttachment="fixed"
            zIndex={zIndex}
        >
            {showBackground && (
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    backgroundColor="rgba(0, 0, 0, 0.5)"
                    zIndex={zIndex - 1}
                />
            )}
            <Box
                position="relative"
                maxWidth="container.xl"
                margin="0 auto"
                backgroundColor="brand.background"
                minHeight="100vh"
                px={4}
                zIndex={zIndex}
            >
                {children}
            </Box>
        </Box>
    );
}

export default PageWrapper;