// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// vite config file
// does not need to be edited in hardly any circumstances
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => 
{

  if(mode === 'production') 
  {
    process.env.NODE_ENV = 'production';
  } 
  else 
  {
    process.env.NODE_ENV = 'development';
  }

  return {
    plugins: [react()],
    build: 
    {
      sourcemap: true,
    },
    server: 
    {
      port: 5173, 
    },
  }
})