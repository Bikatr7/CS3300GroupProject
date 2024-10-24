// Copyright [name placeholder] (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// chakra-ui
import { ChakraProvider, Box, Container} from "@chakra-ui/react";

// helmet
import { HelmetProvider } from 'react-helmet-async';

// react-router-dom
import { BrowserRouter } from 'react-router-dom';

// root components
import theme from "./theme.ts";

// custom components
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Router from './Router.tsx';
import { AuthProvider } from "./contexts/AuthContext.tsx";

// the below should be fine but if we run into an issue, contact me - Kaden

function App() 
{
    return (
        <HelmetProvider>
            <ChakraProvider theme={theme}>
                <AuthProvider>
                    <BrowserRouter>
                        <Box bg="black">
                            <Navbar isHomePage={false}/>
                            <Container maxW="6xl">
                                <Router />
                            </Container>
                            <Footer/>
                        </Box>
                    </BrowserRouter>
                </AuthProvider>
            </ChakraProvider>
        </HelmetProvider>
    );
}

export default App;