#!/bin/bash

docker run -d --name wineoftheday \
  -p 2989:3000 \
  -v /git/wineoftheday:/usr/src/app \
  -w /usr/src/app \
  node:4 \
  ./prepare.sh
