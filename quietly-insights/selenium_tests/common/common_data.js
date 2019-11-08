//Ensure the platfirm variable is updated
//Check for the correct Database details
//Check for the browser name to be updated to the name of the browser on which the automation is intended to run.
//Refer common_functions.js file "openBrowser" function to update the correct browser name.
'use strict';
let _ = require('lodash');
const {config: loadEnv} = require('dotenv');

let configs = {
    app: {
        browser: "Firefox",
        stripeKey: "sk_test_CLAbYrrDZDIuzDcXdrOqAkyi",
        seleniumGridIp: "127.0.0.1",
        server:"http://127.0.0.1:4444/wd/hub"
    },
    user: {


        //Iterations to run tests:
        readTestIterations: 20,
        //full depth conversions
        convertLinkIterations: 10,
        convertFormIterations: 10,
        noConvertIterations: 10,
        //single depth conversions
        SDConvertLinkIterations: 0,
        SDConvertFormIterations: 0,
        SDNoConvertIterations: 0,
        //=====================================================================

        //Site Data Control:
        blogUrl: "https://stagingblog.quiet.ly/blog/uncategorized/testing/",
        //List of URLs to use for assist testing
        assistUrls:[
            "https://stagingblog.quiet.ly/blog/uncategorized/testing-3/",
            "https://stagingblog.quiet.ly/blog/uncategorized/testing-2/",
            "https://stagingblog.quiet.ly/blog/uncategorized/links-and-goals/",
        ],
        formXpath: "//button[@class='button button-submit']",
        linkXpath: "//a[@href='https://www.quiet.ly']",
        //url for blog read tests
        partialReadBlogUrl:"https://stagingblog.quiet.ly/blog/uncategorized/partial-read-test/",
        fullReadBlogUrl:"https://stagingblog.quiet.ly/blog/uncategorized/full-read-test/",
        skimReadBlogUrl:"https://stagingblog.quiet.ly/blog/uncategorized/page-skim-test/",
        //for paragraph reading tests
        paragraphReadBlogUrl:"https://stagingblog.quiet.ly/blog/uncategorized/lipsum-4paragraphs/",
        paragraphHeadings:[
            "P1",
            "P2",
            "P3",
            "P4",
        ],
        //for paragraph up and down reading tests
        readUpDownSequence:[
            "P1",
            "P2",
            "P3",
            "P1",
        ],


        //=======================================================================
        //READER PARAMETERS
        paragraphWordCount: 40,
        wpm: 240,
        //global config
        defaultScreenWidth: 1024,
        defaultScreenHeight: 500,
    },
    db: { }
};

let cmdLineNodeEnv = process.env.NODE_ENV;

const {parsed} = loadEnv({path: '../src/server/.env'});

let envMap = {
    "DB_HOST": "db.host",
    "DB_ADMIN_USER": "db.userName",
    "DB_ADMIN_PASSWORD": "db.password",
    "DB_NAME": "db.name",
};

for(let key in envMap) {
    if (parsed && parsed.hasOwnProperty(key)) {
        _.set(configs, envMap[key], parsed[key]);
    }
}

if (cmdLineNodeEnv) {
    process.env.NODE_ENV = cmdLineNodeEnv
}

if (process.env.NODE_ENV ==='localdev') {
    configs.user.url = 'http://localhost:9000/#/';
    configs.user.freePlanUrl = "http://localhost:9000/#/?planType=free";
    configs.user.proPlanUrl = "http://localhost:9000/#/?planType=pro";
} else {
    configs.user.url = "https://qa.quiet.ly/app/#/";
    configs.user.freePlanUrl = "https://qa.quiet.ly/app/#/?planType=free";
    configs.user.proPlanUrl = "https://qa.quiet.ly/app/#/?planType=pro";
    configs.user.installPageHref = "/app/#/0/install";
    configs.db.host = 'quietly-insights-custom.ckbjgp1pwsoh.us-east-1.rds.amazonaws.com';
    configs.db.userName = 'quietly_admin';
    configs.db.password = 'dHHjweJdgRRVD8MeYvUf4HdN9WuCZETjTycc5MnZH9mU7qexEqsQK22X';
    configs.db.name = 'insights';
}

Object.assign(exports, configs);
