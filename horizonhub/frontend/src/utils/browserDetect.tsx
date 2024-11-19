// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

const isChrome = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('chrome') && !userAgent.includes('edge') && !userAgent.includes('firefox');
}; 

export {isChrome};