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
    raise NotImplementedError("Environment not set")
