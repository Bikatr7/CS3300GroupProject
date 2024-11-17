// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// gets the url of the api
// allows for easy switching between local and deployed api if you happen to deploy remotely, note that HorizonHub does not come with a built in solution for this and would require additional
// programming to support it.
const getURL = (path: string) => 
{
    let url;

    url = "http://api.localhost:5555";
    
    return url + path;
}

export {getURL};