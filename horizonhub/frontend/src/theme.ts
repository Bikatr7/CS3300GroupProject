// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// chakra-ui
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = 
{
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const colors = 
{
    brand: 
    {
        primary: '#a46048',
        background: '#2e343c',
        accent1: '#de7c47',
        accent2: '#5c4b4a',
        text: '#fbe9b4',
        accent3: '#44545a',
        headerFooter: '#512316',
        accent4: '#7d341b',
        accent5: '#99837c',
        navbar: '#c18c6a'
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