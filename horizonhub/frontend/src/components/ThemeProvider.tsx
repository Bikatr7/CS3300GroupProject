// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import { useState, useEffect } from 'react'

// chakra-ui
import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react'

// theme config
import themeConfig from '../../../edit_me.json'

interface ThemeProviderProps 
{
    children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) =>
{
    const [currentTheme, setCurrentTheme] = useState(createTheme(themeConfig))

    useEffect(() =>
    {
        const loadTheme = async () =>
        {
            try 
            {
                const response = await fetch('/edit_me.json')
                const newThemeConfig = await response.json()
                setCurrentTheme(createTheme(newThemeConfig))
            } 
            catch (error) 
            {
                console.error('Failed to load theme:', error)
            }
        }

        loadTheme()
    }, [])

    return (
        <ChakraProvider theme={currentTheme}>
            {children}
        </ChakraProvider>
    )
}

// Helper function to create theme
function createTheme(config:any) 
{
    const isValidColorMode = (mode: string): mode is "light" | "dark" | "system" =>
    {
        return ["light", "dark", "system"].includes(mode)
    }

    const colorMode = isValidColorMode(config.theme.config.initialColorMode) 
        ? config.theme.config.initialColorMode 
        : "dark"

    const themeConfig: ThemeConfig = 
    {
        initialColorMode: colorMode,
        useSystemColorMode: config.theme.config.useSystemColorMode
    }

    const colors = 
    {
        brand: 
        {
            primary: config.theme.colors.primary,
            background: config.theme.colors.background,
            accent1: config.theme.colors.accent1,
            accent2: config.theme.colors.accent2,
            text: config.theme.colors.text,
            accent3: config.theme.colors.accent3,
            headerFooter: config.theme.colors.headerFooter,
            accent4: config.theme.colors.accent4,
            accent5: config.theme.colors.accent5,
            navbar: config.theme.colors.navbar
        }
    }

    return extendTheme(
    {
        config: themeConfig,
        colors,
        styles: 
        {
            global: 
            {
                'html, body': 
                {
                    color: colors.brand.text,
                    backgroundColor: colors.brand.background,
                },
                '.mainHeader':
                {
                    color: colors.brand.text,
                }
            },
            dateRangePicker:
            {
                '.picker':
                {
                    padding: 20,
                    border: 2 
                }
            }
        },
    })
}

export default ThemeProvider 