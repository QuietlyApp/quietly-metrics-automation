#!/bin/bash

selenium-standalone start &
sleep 3
if [ "$#" -eq  "0" ]
then
    mocha
else
    mocha --grep "$@"
fi
pkill -f 'selenium-standalone'
