// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

import { Box, Text, Link } from "@chakra-ui/react";
import { isChrome } from "../utils/browserDetect";

function ChromeWarningBanner() {
    if (!isChrome()) {
        return null;
    }

    return (
        <Box 
            bg="red.500" 
            color="white" 
            p={4} 
            textAlign="center" 
            width="100%"
        >
            <Text>
                Due to technical limitations, this site only works in Firefox. 
                Please <Link 
                    href="https://www.mozilla.org/firefox/new/" 
                    color="white" 
                    textDecoration="underline" 
                    isExternal
                >
                    download Firefox
                </Link> for the best experience.
            </Text>
        </Box>
    );
}

export default ChromeWarningBanner; 