// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useLocation } from 'react-router-dom';

// chakra-ui
import { Box } from "@chakra-ui/react";

// react-router-dom
import { BrowserRouter } from 'react-router-dom';

// components
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Router from './Router.tsx';
import ThemeProvider from './components/ThemeProvider.tsx';
import { AuthProvider } from "./contexts/AuthContext.tsx";
import PageWrapper from './components/PageWrapper.tsx';

// helmet
import { HelmetProvider } from 'react-helmet-async';

function AppContent() 
{
    // determines if the page is a full screen page, should not really be used for anything else
    // Home is not a full screen page, but it is used here to prevent double navbar on the home page as we have a special layout for it
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
    // if you were to add a new provider, you would add it here
    return (
        <HelmetProvider>
            <ThemeProvider>
                <AuthProvider>
                    <BrowserRouter>
                        <AppContent />
                    </BrowserRouter>
                </AuthProvider>
            </ThemeProvider>
        </HelmetProvider>
    );
}

export default App;