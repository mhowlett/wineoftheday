#!/bin/bash

docker run -d --name wineoftheday \
  -v /git/wineoftheday:/usr/src/app \
  -w /usr/src/app \
  node:4 \
  ./prepare.sh
