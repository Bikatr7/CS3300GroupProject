## Copyright [name placeholder] (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

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