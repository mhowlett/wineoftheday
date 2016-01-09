#!/bin/bash

docker run -d --name wineoftheday \
  node:4 \
  -v /git/wineoftheday:/usr/src/app \
  -w /usr/src/app \
  ./prepare.sh
