// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// chakra-ui
import {
    Container,
    Stack,
    Text,
    Image,
    Flex,
} from '@chakra-ui/react';

// images
import logo from '../assets/images/logo.webp';

interface FooterContentProps 
{
    color?: string;
}

// common footer content used.

const FooterContent: React.FC<FooterContentProps> = () => 
{
    return (
        <Container as={Stack} maxW={'6xl'}>
            <Flex align="center" justify="center">
                <Image src={logo} alt="Horizon Hotel Logo" boxSize="30px" mr={3} />
                <Text fontSize={'sm'} color="brand.text">
                    © Horizon Hotel Group 2024. All rights reserved.
                </Text>
            </Flex>
        </Container>
    );
};

export default FooterContent;
