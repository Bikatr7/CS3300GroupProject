## Copyright [name placeholder] (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

from constants import ENVIRONMENT

def get_url() -> str:

    """
    Returns the URL of the API based on the environment.
    """

    if(ENVIRONMENT == "development"):
        return "http://api.localhost:5000"
    
    ## needs to be changed later
    raise NotImplementedError("Not implemented yet (Kaden needs to decide if we want to do a production build)")


async def get_frontend_url() -> str:

    """
    Returns the URL of the frontend based on the environment.
    """

    if(ENVIRONMENT == "development"):
        return "http://localhost:5173"
    
    raise NotImplementedError("Not implemented yet (Kaden needs to decide if we want to do a production build)")