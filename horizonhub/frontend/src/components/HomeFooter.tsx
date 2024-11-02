// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import React from 'react';

// chakra-ui
import { Box, Divider } from '@chakra-ui/react';

// components
import FooterContent from './FooterContent';

const HomeFooter: React.FC = () => 
{
    return (
        <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            bg="#512316"
            color="white"
            py={4}
            zIndex={1}
            marginTop={10}
        >
            <Divider borderColor="#fbe9b4" opacity={0.3} mb={4} />
            <FooterContent color="#fbe9b4" />
        </Box>
    );
};

export default HomeFooter;