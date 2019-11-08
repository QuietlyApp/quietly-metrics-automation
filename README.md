Quietly Automation Repo
==========================

This repository contains the automated UI tests for Quietly Insights. It may contain other tests eventually, but for now, it's just Quietly Insights automated UI tests

How to get these running on your local machine:
------------------------
* Clone this repo
* Navigate to the `quietly-insights/selenium_tests` directory in terminal
* Run `./setup.sh`
* You may also have to manually install the mysql NPM package. `npm install mysql --save`
* Run `./run.sh` to run the default test suite.

The tests are currently set up to run on qa.quiet.ly/app
If you want the tests to run on another server, you can change the configurate inside the following file:
`uietly-insights/selenium_tests/common/common_data.js`


# quietly-metrics-automation
