#!/bin/sh

## Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
## Use of this source code is governed by an GNU Affero General Public License v3.0
## license that can be found in the LICENSE file.

exec uvicorn main:app --host 0.0.0.0 --port 5000 --reload