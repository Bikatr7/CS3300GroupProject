// Copyright [name placeholder] (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

const getURL = (path: string) => 
{
    let url;

    if(process.env.NODE_ENV === "production") 
    {
        url = ""
    } 
    else if (process.env.NODE_ENV === "development") 
    {
        url = "http://api.localhost:5000";
    } 
    
    return url + path;
}

const formatDate = (dateString: string) => 
{
    // Parse the input date string as UTC
    const utcDate = new Date(dateString);
    
    // Convert UTC to local time
    const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
    
    // Get local date components
    const year = localDate.getFullYear();
    const month = localDate.toLocaleString('default', { month: 'short' });
    const day = localDate.getDate();
    let hours = localDate.getHours();
    const minutes = localDate.getMinutes().toString().padStart(2, '0');
    
    // Determine AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    // Get timezone abbreviation
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeZoneAbbr = new Intl.DateTimeFormat('en-US', {
        timeZone,
        timeZoneName: 'short'
    }).formatToParts().find(part => part.type === 'timeZoneName')?.value || '';
    
    // Construct the formatted string
    const formattedDate = `${month} ${day}, ${year}, ${hours}:${minutes} ${ampm} ${timeZoneAbbr}`;
    
    return formattedDate;
};
    
export {getURL, formatDate};