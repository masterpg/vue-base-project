#!/bin/sh -e

if [ -z $1 ]; then
  prettier --write "**/*.{ts,vue,html,js}"
  vue-cli-service lint
else
  if [ -d $1 ]; then
    prettier --write "$1/**/*.{ts,html,vue,js}"
    vue-cli-service lint $1
  elif [ -e $1 ]; then
    prettier --write "$1"
    vue-cli-service lint "$1"
  else
    echo "Directory or File \"$1\" not exists."
    exit 1
  fi
fi
