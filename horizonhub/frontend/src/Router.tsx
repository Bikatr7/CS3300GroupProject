// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

// chakra-ui
import { Spinner, Center, useTheme } from "@chakra-ui/react";

// axios
import axios from 'axios';

// pages
import HomePage from "./pages/HomePage.tsx";
import BookingPage from './pages/BookingPage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import CheckInPage from './pages/CheckInPage.tsx';
import CustomerPortalPage from './pages/CustomerPortalPage.tsx';
import PaymentPage from './pages/PaymentPage.tsx';
import NotFoundPage from './pages/error_pages/404.tsx';
import ForbiddenPage from './pages/error_pages/403.tsx';
import InternalErrorPage from './pages/error_pages/500.tsx';
import AmenitiesPage from './pages/Amenities.tsx';
import BookingSuccessPage from './pages/BookingSuccessPage.tsx';

// components
import AdminPanel from './components/AdminPanel.tsx';

// auth & util
import { useAuth } from './contexts/AuthContext.tsx';
import { getURL } from './utils/index.ts';

// If you would want to add a new route, you can do so here.
// Just add the new route to the routes object.
// If a new route requires protected access, you can wrap the component in the ProtectedAdminRoute component.

const ProtectedAdminRoute = ({ children }: { children: ReactNode }) => 
{
    const { isLoggedIn, isLoading } = useAuth();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const theme = useTheme();

    useEffect(() => 
    {
        const checkAdminStatus = async () =>
        {
            if(!isLoading && isLoggedIn)
            {
                try 
                {
                    const response = await axios.post(getURL('/auth/check-if-admin-user'), {}, {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
                    });
                    setIsAdmin(response.data.result);
                }
                catch(error)
                {
                    setIsAdmin(false);
                }
            }
            else if(!isLoading)
            {
                setIsAdmin(false);
            }
        };

        checkAdminStatus();
    }, [isLoggedIn, isLoading]);

    if(isLoading || isAdmin === null)
    {
        return (
            <Center height="100vh" bg={theme.colors.brand.background}>
                <Spinner 
                    thickness="4px" 
                    speed="0.65s" 
                    emptyColor={theme.colors.brand.accent2}
                    color={theme.colors.brand.accent1} 
                    size="xl"
                />
            </Center>
        );
    }

    if(!isLoggedIn || !isAdmin)
    {
        window.location.href = '/403';
        return null;
    }

    return <>{children}</>;
};

function Router() 
{
        const routes = {
        '/': <HomePage />,
        '/booking': <BookingPage />,
        '/checkout': <CheckoutPage />,
        '/checkin': <CheckInPage />,
        '/payment': <PaymentPage />,
        '/customer': <CustomerPortalPage />,
        '/amenities': <AmenitiesPage />,
        '/booking/success': <BookingSuccessPage />,
        '/admin': <ProtectedAdminRoute><AdminPanel /></ProtectedAdminRoute>,
        '/403': <ForbiddenPage />,
        '/500': <InternalErrorPage />
    } as const;

    const path = useLocation().pathname;
    return routes[path as keyof typeof routes] || <NotFoundPage />;
}

export default Router;