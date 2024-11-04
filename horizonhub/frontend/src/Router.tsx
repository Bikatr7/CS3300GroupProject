// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useState, useEffect } from 'react';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

// chakra-ui
import { Spinner, Center } from "@chakra-ui/react";

// pages
import HomePage from "./pages/HomePage.tsx";
import BookingPage from './pages/BookingPage.tsx';
import SunsetBarPage from './pages/SunsetBarPage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import CheckInPage from './pages/CheckInPage.tsx';
import CustomerPortalPage from './pages/CustomerPortalPage.tsx';

// auth
import { useAuth } from './contexts/AuthContext.tsx';

// util
import { getURL } from './utils/index.ts';

// components
import AdminPanel from './components/AdminPanel.tsx';

const ProtectedAdminRoute = ({ children }: { children: ReactNode }) => 
{
    const { isLoggedIn, isLoading } = useAuth();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAdminStatus = async () => 
        {
            if (isLoading) 
            {
                return;
            }

            if (isLoggedIn) 
            {
                try 
                {
                    const response = await fetch(getURL('/auth/check-if-admin-user'), 
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        },
                    });
                    if (response.ok) 
                    {
                        const data = await response.json();
                        setIsAdmin(data.result);
                    } 
                    else 
                    {
                        setIsAdmin(false);
                    }
                } 
                catch (error) 
                {
                    setIsAdmin(false);
                }
            } 
            else 
            {
                setIsAdmin(false);
            }
        };

        checkAdminStatus();
    }, [isLoggedIn, isLoading]);

    if (isLoading || isAdmin === null) 
    {
        return (
            <Center height="100vh">
                <Spinner 
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="orange.500"
                    size="xl"
                />
            </Center>
        );
    }

    if (!isLoggedIn || !isAdmin) 
    {
        window.location.href = '/403';
        return null;
    }

    return <>{children}</>;
};

function Router() 
{
    const location = useLocation();
    const path = location.pathname;

    if (path === '/') 
    {
        return <HomePage />;
    }
    if(path === '/booking')
    {
        return <BookingPage />
    }
    if (path === '/sunsetbar')
    {
        return <SunsetBarPage />
    }
    if (path === '/checkout')
    {
        return <CheckoutPage />
    }
    if (path === '/checkin')
    {
        return <CheckInPage />
    }
    if (path === '/customer')
    {
        return <CustomerPortalPage />
    }

    if (path === '/admin') 
    {
        return (
            <ProtectedAdminRoute>
                <AdminPanel />
            </ProtectedAdminRoute>
        );
    }

    // Default case: 404 Not Found
    // can make some pretty 404 page later
    // Also need 403 and 500's
    return <div>404 Not Found</div>;
}

export default Router;