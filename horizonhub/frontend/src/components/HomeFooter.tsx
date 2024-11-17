// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import React from 'react';

// chakra-ui
import { Box, Divider } from '@chakra-ui/react';

// components
import FooterContent from './FooterContent';

// Home footer and header are just for the special home page layout.

const HomeFooter: React.FC = () => 
{
    return (
        <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            bg="brand.headerFooter"
            color="brand.text"
            py={4}
            zIndex={1}
            marginTop={10}
        >
            <Divider borderColor="brand.text" opacity={0.3} mb={4} />
            <FooterContent />
        </Box>
    );
};

export default HomeFooter;