// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// theme file
// Enables the theming system (edit_me.json) for the website

// chakra-ui
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// theme config
import themeConfig from '../../edit_me.json'

// Type guard to ensure correct color mode
const isValidColorMode = (mode: string): mode is "light" | "dark" | "system" =>
{
    return ["light", "dark", "system"].includes(mode)
}

const colorMode = isValidColorMode(themeConfig.theme.config.initialColorMode) 
    ? themeConfig.theme.config.initialColorMode 
    : "dark"

const config: ThemeConfig = 
{
    initialColorMode: colorMode,
    useSystemColorMode: themeConfig.theme.config.useSystemColorMode
}

const colors = 
{
    brand: 
    {
        primary: themeConfig.theme.colors.primary,
        background: themeConfig.theme.colors.background,
        accent1: themeConfig.theme.colors.accent1,
        accent2: themeConfig.theme.colors.accent2,
        text: themeConfig.theme.colors.text,
        accent3: themeConfig.theme.colors.accent3,
        headerFooter: themeConfig.theme.colors.headerFooter,
        accent4: themeConfig.theme.colors.accent4,
        accent5: themeConfig.theme.colors.accent5,
        navbar: themeConfig.theme.colors.navbar
    }
}

const theme = extendTheme(
{
    config,
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

export default theme