## Copyright [name placeholder] (https://github.com/Bikatr7/CS3300GroupProject)
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

## could hypothetically be used for production urls, but not currently.

def get_url() -> str:

    """
    Returns the URL of the API based on the environment.
    """

    return "http://api.localhost:5555"
    
async def get_frontend_url() -> str:

    """
    Returns the URL of the frontend based on the environment.
    """

    return "http://localhost:5173"