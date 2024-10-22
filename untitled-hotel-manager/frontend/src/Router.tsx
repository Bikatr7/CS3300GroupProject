// Copyright [name placeholder] (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
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

// auth
import { useAuth } from './contexts/AuthContext.tsx';

// util
import { getURL } from './utils';
import SunsetBarPage from './pages/SunsetBarPage.tsx';

// unused but we'll use it later
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
                    // TODO: adjust this to the correct endpoint
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

    // TODO: Add admin panel back in
    // if (path === '/admin') 
    // {
    //     return (
    //         <ProtectedAdminRoute>
    //             <AdminPanel />
    //         </ProtectedAdminRoute>
    //     );
    // }

    // Default case: 404 Not Found
    return <div>404 Not Found</div>;
}

export default Router;