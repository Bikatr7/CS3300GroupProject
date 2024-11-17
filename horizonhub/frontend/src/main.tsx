// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// react
import React from 'react'
import ReactDOM from 'react-dom/client'

// root components
import App from './App'

// typescript initializer, loads the app
// If you happen to be monitoring the network you will see double requests for ALL network requests.
// This is due to strict mode. HorizonHub comes with countermeasures to this, but if happens to bother you, you can remove the <React.StrictMode> tag.

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
)
