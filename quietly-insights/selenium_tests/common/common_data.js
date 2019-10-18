//Ensure the platfirm variable is updated
//Check for the correct Database details
//Check for the browser name to be updated to the name of the browser on which the automation is intended to run.
//Refer common_functions.js file "openBrowser" function to update the correct browser name.
'use strict';
let _ = require('lodash');
const {config: loadEnv} = require('dotenv');

let configs = {
    app: {
        browser: "Chrome",
        stripeKey: "sk_test_CLAbYrrDZDIuzDcXdrOqAkyi",
        seleniumGridIp: "127.0.0.1",
        server:"http://127.0.0.1:4444/wd/hub"
    },
    user: {
        platform:"MAC", //To install tracker, the steps are different on windows and MAC, hence added this variable.
        cardNumber:"4242424242424242",
        expiryDate:"0123",
        nameOnCard:"Ellen",
        cvcNumber:"123",
        promoCode:"INSIGHTS-30",
        promoCodePrice:"$30",
        promoDuration:"6 months",
        userName: "quietlyqa21257@gmail.com",
        password: "N0morewaffles",
        adminAccount: "quietlyautomation@gmail.com (stagingblog.quiet.ly)",
        reportOption: "monthly",
        userNameNoGa: "pprathibhacse2k6@gmail.com",
        passwordNoGa: "HelloHWU@09",
        planType: "Pro",
        industry: "Plastics",
        account: "Quietly",
        property: "CURRENT: Quietly Agency Marketing",
        view: "Agency Master View",
        propertyName: "Quietly Insights Automation",
        websiteUrl: "stagingblog.quiet.ly",
        wpUrl: "https://stagingblog.quiet.ly/",
        adminUrl: "https://qa.quiet.ly/app/",
        propertyUrl: "https://www.jalopnik.com/",
        wpUserName: "aaa",
        wpPassword: "1234",
        competitor: 'https://www.brafton.com/',
        competitors:[
            'https://contently.com/strategist/2018/06/05/modern-cmo-infographic/',
            'https://contentmarketinginstitute.com/',
            'https://www.rei.com/blog/'
        ],
        allCompetitors:[
            'https://contently.com/',
            'https://contentmarketinginstitute.com/2018/07/purpose-marketing-brands/',
            'https://www.rei.com/blog/cycle/putting-the-colorado-trail-on-the-map',
            'https://blog.percolate.com/',
            'https://www.brafton.com/blog/'
        ],
        emails:['pprathibhacse2k6@gmail.com', 'prathibhanalla007@gmail.com', 'vamshreddy@gmail.com', 'nallavamsidharreddy@gmail.com'],
        primaryGoal: ['Agency CTA Clicks'],
        additionalGoals:['Insights CTA Clicks','Total Blog CTA Clicks','Lead Form Submission'],
        wpAdminName:"Prathibha",
        wpAdminPassword:"jHfF$o9pnzL8Uqzeo)twiieO",
        formGoalName:"Newsletter",
        formGoalXpath:"//form[@id='newsletterSignupForm']",
        installPageHref:"/#/0/install"
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
