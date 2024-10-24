// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// chakra-ui
import { background, extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { color } from 'framer-motion'

const config: ThemeConfig = 
{
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const theme = extendTheme(
{
    config,
    styles: 
    {
        
        global: 
        {
            'html, body': 
            {
                color: '#fbe9b4',


            },
            '.mainHeader':{
                color: '#fbe9b4'
                
            }
        },

        
    },
})

export default theme