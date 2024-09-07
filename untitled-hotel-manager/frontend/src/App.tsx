// Copyright [name placeholder] (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// chakra-ui
import { ChakraProvider, Box, Container} from "@chakra-ui/react";

// helmet
import { HelmetProvider } from 'react-helmet-async';

// root components
import theme from "./theme.ts";

// custom components
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Router from './Router.tsx';

function App() 
{
    return (
        <HelmetProvider>
            <ChakraProvider theme={theme}>
                <Box bg="black">
                    <Navbar/>
                    <Container maxW="6xl">
                        <Router />
                    </Container>
                    <Footer/>
                </Box>
            </ChakraProvider>
        </HelmetProvider>
    );
}

export default App;