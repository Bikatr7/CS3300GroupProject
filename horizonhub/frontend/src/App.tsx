// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useLocation } from 'react-router-dom';

// chakra-ui
import { ChakraProvider, Box } from "@chakra-ui/react";

// react-router-dom
import { BrowserRouter } from 'react-router-dom';

// components
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Router from './Router.tsx';
import theme from "./theme.ts";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import PageWrapper from './components/PageWrapper.tsx';

// helmet
import { HelmetProvider } from 'react-helmet-async';

function AppContent() 
{
    const location = useLocation();
    const isFullScreenPage = location.pathname === '/' || location.pathname === '/admin';

    return (
        <>
            {!isFullScreenPage && <Navbar isHomePage={false} />}
            {isFullScreenPage ? (
                <Router />
            ) : (
                <PageWrapper showBackground={false}>
                    <Box maxWidth="container.xl" margin="0 auto">
                        <Router />
                    </Box>
                </PageWrapper>
            )}
            {!isFullScreenPage && <Footer />}
        </>
    );
}

function App() 
{
    return (
        <HelmetProvider>
            <ChakraProvider theme={theme}>
                <AuthProvider>
                    <BrowserRouter>
                        <AppContent />
                    </BrowserRouter>
                </AuthProvider>
            </ChakraProvider>
        </HelmetProvider>
    );
}

export default App;