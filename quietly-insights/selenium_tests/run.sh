#!/bin/bash

selenium-standalone start &
sleep 3
if [ "$#" -eq  "0" ]
then
    #mocha --reporter mocha-testrail-reporter --reporter-options domain=quietlyinsights.testrail.io,username=edwin@quiet.ly,password=fQK2DNVoLpST8VpjQ/Dm-IMr02Z69CEtw4zsQXSrn,projectId=1,suiteId=8
    mocha
else
    #mocha --reporter mocha-testrail-reporter --reporter-options domain=quietlyinsights.testrail.io,username=edwin@quiet.ly,password=fQK2DNVoLpST8VpjQ/Dm-IMr02Z69CEtw4zsQXSrn,projectId=1,suiteId=8 --grep "$@"
    mocha --grep "$@" 
fi
pkill -f 'selenium-standalone'
