const common = require('../common/common_functions');
const val=require ('../common/validations');
const validate=require('../common/reports_settings_validations');
const {user:commonUserData} = require('../common/common_data');
const commonBeforeAfter = require('../common/commonBeforeAfter');

//Number of test cases: 9

describe('Test the Property Settings page, #propertysettings#', function () {
    commonBeforeAfter.loadBeforeAndAfterEach();

    it('C-201: Monthly Pro plan - Rename the report and save the changes', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.changePropertyName("Count Chocula");
    });

    it('C-202: Annual Pro plan - Rename the report and save the changes', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.changePropertyName("Count Chocula");
    });

    it('C-203: Free plan - Rename the report and save the changes', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await common.changePropertyName("Count Chocula");
    });

    it('C-204: User should be able to add Monthly Pro property', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.addNewProperty('Monthly');
        await common.proPlanOnboardingWithComp('www.jalopnik.com');
    });

    it('C-205: User should be able to add Annual Pro property', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.addNewProperty('Yearly');
        await common.proPlanOnboardingWithComp('www.jalopnik.com');
    });

    it('C-206: User should be able to add Monthly Pro property with promo code', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.addNewProperty('Monthly', 'INSIGHTS-30');
        await common.proPlanOnboardingWithComp('www.jalopnik.com');
        await common.goToAccountSettings();
        await val.validatePropertyPrice('$30.00');
    });

    it('C-207: Adding monthly property with invalid promo code should not affect price', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.addNewProperty('Monthly', 'INSIGHTS-INVALID');
        await common.proPlanOnboardingWithComp('www.jalopnik.com');
        await common.goToAccountSettings();
        await val.validatePropertyPrice('$195.00');
    });

    it('C-209: User should be able to add Annual Pro property with activated promo code', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.addNewProperty('Yearly', 'INSIGHTS-30');
        await common.proPlanOnboardingWithComp('www.jalopnik.com');
        await common.goToAccountSettings();
        await val.validatePropertyPrice('$1975.00');
    });

    it('C-208: User should be able to add Annual Pro property with invalid promo code', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.addNewProperty('Yearly', 'INSIGHTS-INVALID');
        await common.proPlanOnboardingWithComp('www.jalopnik.com');
        await common.goToAccountSettings();
        await val.validatePropertyPrice('$1975.00');
    });

    // it('Test Case 4: Monthly Pro plan - Change the website and save the changes', async function () {
    //     await common.goToLandingPage('Monthly Pro');
    //     await common.signInWithGmail();
    //     await val.validatePlanType('Monthly Pro');
    //     await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
    //     await common.proPlanOnboardingWithComp();
    //     await common.changeWebsiteUrl("blog.quiet.ly");
    // });

    // it('Test Case 5: Annual Pro plan - Change the website and save the changes', async function () {
    //     await common.goToLandingPage('Annual Pro');
    //     await common.signInWithGmail();
    //     await val.validatePlanType('Annual Pro');
    //     await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
    //     await common.proPlanOnboardingWithComp();
    //     await common.changeWebsiteUrl("blog.quiet.ly");
    // });

    // it('Test Case 6: Free plan - Change the website and save the changes', async function () {
    //     await common.goToLandingPage('Free');
    //     await common.signInWithGmail();
    //     await val.validatePlanType('Free');
    //     await common.freePlanOnboardingWithComp();
    //     await common.changeWebsiteUrl("blog.quiet.ly");
    // });

    // it('Test Case 2: Annual Pro plan- Rename the report and save the changes', async function () {
    //     await common.goToLandingPage('Annual Pro');
    //     await common.signInWithGoogleAndAllow();
    //     await val.ensureOnboardingSteps('Annual Pro');
    //     await common.proPlanAddCreditCard("378282246310005", "1/20", "Melinda", "6391");
    //     await common.provideBlogUrl();
    //     await common.provideGoogleAnalyticsInfo();
    //     await common.selectNoGoals();
    //     await common.selectIndustryAndCompetitors("Building Materials", []);
    //     await common.skipPluginInstall();
    //     await common.onboardingClickDone("Annpro-Rename Report");

    //     await val.validateMonthlyReport();
    //     await common.renameReportSettings("Settings rename report");
    //     await validate.validateSettingsPageElementByID("reportName", "Settings rename report");
    // });

    // it('Test Case 3: Free plan- Rename the report and save the changes', async function () {
    //     await common.goToLandingPage('Free');
    //     await common.signInWithGoogleAndAllow();
    //     await val.ensureOnboardingSteps('Free');
    //     await common.proPlanAddCreditCard("378282246310005", "1/20", "Melinda", "6391");
    //     await common.provideBlogUrl();
    //     await common.provideGoogleAnalyticsInfo();
    //     await common.selectNoGoals();
    //     await common.selectIndustryAndCompetitors("Building Materials", []);
    //     await common.skipPluginInstall();
    //     await common.onboardingClickDone("Free-Rename Report");

    //     await val.validateMonthlyReport();
    //     await common.renameReportSettings("Settings rename report");
    //     await validate.validateSettingsPageElementByID("reportName", "Settings rename report");
    // });
});
// /*
//     it('Test Case 4: Monthly Pro plan- Change the Website URL and save the changes', async function () {
//         await common.goToLandingPage('Monthly Pro');
//         await common.signInWithGoogleAndAllow();
//         await val.ensureOnboardingSteps('Monthly Pro');
//         await common.proPlanAddCreditCard("378282246310005", "1/20", "Melinda", "6391");
//         await common.provideBlogUrl();
//         await common.provideGoogleAnalyticsInfo();
//         await common.selectNoGoals();
//         await common.selectIndustryAndCompetitors("Building Materials", []);
//         await common.skipPluginInstall();
//         await common.onboardingClickDone("Monpro-Change Website URL");

//         await val.validateMonthlyReport();
//         await common.changeWebsiteSettings("");
//         await validate.validateSettingsPageElementByID("websiteUrl", "");
//     });

// /*    //Test Case 7: Install word-press plugin after on-boarding is done. Verify if the Settings page is updated
//     it('7.Install word-press plugin after on-boarding is done. Verify if the Settings page is updated', () => {
//         const PluginDataTestTC7 = Object.assign(commonUserData, {
//             cardNum:"5555555555554444",
//             expiry:"05/28",
//             name:"Vimala",
//             cvc:"729",
//             primGoal: "Total Blog CTA Clicks",
//             industry1: "Commercial Real Estate",
//             comp: ['percolate.com'],
//         });
//         //Go to Quietly Insights Login Page
//         return common.site(PluginDataTestTC7.proPlanUrl)
//             .then(function () {
//                 //Login into Quietly Insights using the Google Analytics Account
//                 return common.loginDetails(PluginDataTestTC7.userName, PluginDataTestTC7.password);
//             }).then(function () {
//                 //Allow Access to Google Analytics
//                 return common.allowAccess("Allow");
//             }).then (function () {
//                 //Validate whether the user is on the Pro plan and provide the credit card details
//                 return common.proPlanAddCreditCard(PluginDataTestTC7.cardNum,PluginDataTestTC7.expiry,PluginDataTestTC7.name,PluginDataTestTC7.cvc);
//             }).then(function () {
//                 //Provide the Google Analytics Information
//                 return common.googleAnalyticsInfo(PluginDataTestTC7.websiteUrl,PluginDataTestTC7.account,PluginDataTestTC7.property,PluginDataTestTC7.view);
//             }).then(function () {
//                 //Select a Primary Goal
//                 return common.selectPrimaryGoal(PluginDataTestTC7.primGoal);
//             }).then(function () {
//                 //Google Analytics - Click next to proceed to the install page
//                 return common.clickNextGoogleAnalytics();
//             }).then(function () {
//                 //Give the Industry Details
//                 return common.selectIndustry(PluginDataTestTC7.industry1);
//             }).then(function () {
//                 //Select competitors
//                 return common.selectCompetitors(PluginDataTestTC7.comp);
//             }).then(function () {
//                 //Skip Installation
//                 return common.skipPluginInstall();
//             }).then(function () {
//                 //Validate whether Monthly Report is created
//                 return val.ValidateMonthlyReport();
//             }).then(function () {
//                 //Validate whether Weekly Snapshot is created
//                 return val.validateWeeklyReport();
//             }).then(function () {
//                 //Get the Monthly Report Data
//                 return common.getMonthlyReportData();
//             }).then(function (expData) {
//                 //Validate the Monthly Reports Reach Data
//                 return validate.validateMonthlyReportsReachData(expData)
//                     .then(function () {
//                         return validate.validateMonthlyReportsEngageData(expData, false, PluginDataTestTC7.competitors)
//                             .then(function () {
//                                 return validate.validateMonthlyReportsConvertData(expData, [PluginDataTestTC7.primGoal]);
//                             })
//                     })
//             }).then(function () {
//                 return driver.switchTo().defaultContent();
//             }).then(function () {
//                 //Validate Weekly Reports
//                 return validate.validateWeeklyReports(false, [PluginDataTestTC7.primGoal]);
//             }).then(function () {
//                 //Go to Settings page
//                 return common.goToSettingsPage();
//             }).then(function () {
//                 //Install plugin from the Settings Page
//                 return common.installPluginFromSettingsPage(PluginDataTestTC7.wpUrl, PluginDataTestTC7.wpAdminName, PluginDataTestTC7.wpAdminPassword);
//             }).then (function () {
//                 //Validate Plugin is installed
//                 return validate.validateWordPressPluginInstall();
//             }).then(function () {
//                 //Logout of Quietly Insights
//                 return common.logout();
//             })
//     });

//     //Test Case 8: On-boarding with word-press plugin installed and all 5 competitors specified
//     it('8.On-boarding with word-press plugin installed and all 5 competitors specified', () => {
//         const PluginDataTestTC8 = Object.assign(commonUserData, {
//             cardNum:"5555555555554444",
//             expiry:"05/28",
//             name:"Vimala",
//             cvc:"729",
//             industry1: "Commercial Real Estate",
//             comp: ['percolate.com','contently.com','apple.com','telus.com','pwc.ca']
//         });
//         //Go to Quietly Insights Login Page
//         return common.site(PluginDataTestTC8.proPlanUrl)
//             .then(function () {
//                 //Login into Quietly Insights using the Google Analytics Account
//                 return common.loginDetails(PluginDataTestTC8.userName, PluginDataTestTC8.password);
//             }).then(function () {
//                 //Allow Access to Google Analytics
//                 return common.allowAccess("Allow");
//             }).then (function () {
//                 //Validate whether the user is on the Pro plan and provide the credit card details
//                 return common.proPlanAddCreditCard(PluginDataTestTC8.cardNum,PluginDataTestTC8.expiry,PluginDataTestTC8.name,PluginDataTestTC8.cvc);
//             }).then(function () {
//                 //Provide the Google Analytics Information
//                 return common.googleAnalyticsInfo(PluginDataTestTC8.websiteUrl,PluginDataTestTC8.account,PluginDataTestTC8.property,PluginDataTestTC8.view);
//             }).then(function () {
//                 //Google Analytics - Click next to proceed to the competitors page
//                 return common.clickNextGoogleAnalytics();
//             }).then(function () {
//                 //Give the Industry Details
//                 return common.selectIndustry(PluginDataTestTC8.industry1);
//             }).then(function () {
//                 //Select competitors
//                 return common.selectCompetitors(PluginDataTestTC8.comp);
//             }).then(function () {
//                 //Get the Property ID
//                 return common.getPropertyIDFromInstallPage();
//             }).then(function (propertyID) {
//                 //Install Plugin
//                 return common.installWordPressPlugin(propertyID, "Install", PluginDataTestTC8.wpUrl, PluginDataTestTC8.wpAdminName, PluginDataTestTC8.wpAdminPassword);
//             }).then(function () {
//                 //Validate whether Monthly Report is created
//                 return val.validateMonthlyReport();
//             }).then(function () {
//                 //Validate whether Weekly Snapshot is created
//                 return val.validateWeeklyReport();
//             })/*.then(function () {
//                 //Get the Monthly Report Data
//                 return common.getMonthlyReportData();
//             }).then(function (expData) {
//                 //Validate the Monthly Reports Reach Data
//                 return validate.validateMonthlyReportsReachData(expData)
//                     .then(function () {
//                         return validate.validateMonthlyReportsEngageData(expData, false, PluginDataTestTC8.comp)
//                             .then(function () {
//                                 return validate.validateMonthlyReportsConvertData(expData, "");
//                             })
//                     })
//             }).then(function () {
//                 return driver.switchTo().defaultContent();
//             }).then(function () {
//                 //Validate Weekly Reports
//                 return validate.validateWeeklyReports(false, "");
//             }).then(function () {
//                 //Logout of Quietly Insights
//                 return common.logout();
//             })
//     });

//     //Test Case 9: On-boarding with word-press plugin installed and all 3 goals and 5 competitors specified
//     it('8.On-boarding with word-press plugin installed and all 5 competitors specified', () => {
//         const PluginDataTestTC9 = Object.assign(commonUserData, {
//             industry1: "Commercial Real Estate",
//             allGoals:['Agency CTA Clicks','Total Blog CTA Clicks','Lead Form Submission'],
//             comp: ['percolate.com','contently.com','apple.com','telus.com','pwc.ca']
//         });
//         //Go to Quietly Insights Login Page
//         return common.site(PluginDataTestTC9.proPlanUrl)
//             .then(function () {
//                 //Login into Quietly Insights using the Google Analytics Account
//                 return common.loginDetails(PluginDataTestTC9.userName, PluginDataTestTC9.password);
//             }).then(function () {
//                 //Allow Access to Google Analytics
//                 return common.allowAccess("Allow");
//             }).then (function () {
//                 //Validate whether the user is on the Pro plan and provide the credit card details
//                 return common.proPlanAddCreditCard(PluginDataTestTC9.cardNumber,PluginDataTestTC9.expiryDate,PluginDataTestTC9.nameOnCard,PluginDataTestTC9.cvcNumber);
//             }).then(function () {
//                 //Provide the Google Analytics Information
//                 return common.googleAnalyticsInfo(PluginDataTestTC9.websiteUrl,PluginDataTestTC9.account,PluginDataTestTC9.property,PluginDataTestTC9.view);
//             }).then(function () {
//                 //Select the Primary Goal
//                 return common.selectPrimaryGoal(PluginDataTestTC9.primaryGoal);
//             }).then (function () {
//                 //Select Additional Goals
//                 return common.selectAdditionalGoals(PluginDataTestTC9.additionalGoals);
//             }).then(function () {
//                 //Give the Industry Details
//                 return common.selectIndustry(PluginDataTestTC9.industry1);
//             }).then(function () {
//                 //Select competitors
//                 return common.selectCompetitors(PluginDataTestTC9.comp);
//             }).then(function () {
//                 //Get the Property ID
//                 return common.getPropertyIDFromInstallPage();
//             }).then(function (propertyID) {
//                 //Install Plugin
//                 return common.installWordPressPlugin(propertyID, "Install", PluginDataTestTC9.wpUrl, PluginDataTestTC9.wpAdminName, PluginDataTestTC9.wpAdminPassword);
//             }).then(function () {
//                 //Validate whether Monthly Report is created
//                 return val.validateMonthlyReport();
//             }).then(function () {
//                 //Validate whether Weekly Snapshot is created
//                 return val.validateWeeklyReport();
//             })/*.then(function () {
//                 //Get the Monthly Report Data
//                 return common.getMonthlyReportData();
//             }).then(function (expData) {
//                 //Validate the Monthly Reports Reach Data
//                 return validate.validateMonthlyReportsReachData(expData)
//                     .then(function () {
//                         return validate.validateMonthlyReportsEngageData(expData, false, PluginDataTestTC9.comp)
//                             .then(function () {
//                                 return validate.validateMonthlyReportsConvertData(expData, PluginDataTestTC9.allGoals);
//                             })
//                     })
//             }).then(function () {
//                 return driver.switchTo().defaultContent();
//             }).then(function () {
//                 //Validate Weekly Reports
//                 return validate.validateWeeklyReports(false, PluginDataTestTC9.allGoals);
//             }).then(function () {
//                 //Logout of Quietly Insights
//                 return common.logout();
//             })
//     });

//     //Test Case 10: Change the Website URL from the "Settings" page, install the word-press plugin and Verify PID successfully.
//     it('10.Change the Website URL from the "Settings" page, install the word-press plugin and Verify PID successfully', () => {
//         const PluginDataTestTC10 = Object.assign(commonUserData, {
//             primGoal: "Lead Form Submission",
//             websiteURl: "www.contently.com",
//             industry1: "computer Networking",
//             comp: ['percolate.com']
//         });
//         //Go to Quietly Insights Login Page
//         return common.site(PluginDataTestTC10.url)
//             .then(function () {
//                 //Login into Quietly Insights using the Google Analytics Account
//                 return common.loginDetails(PluginDataTestTC10.userName, PluginDataTestTC10.password);
//             }).then(function () {
//                 //Allow Access to Google Analytics
//                 return common.allowAccess("Allow");
//             }).then (function () {
//                 //Validate whether the user is on the Pro plan and provide the credit card details
//                 return common.proPlanAddCreditCard(PluginDataTestTC10.cardNumber,PluginDataTestTC10.expiryDate,PluginDataTestTC10.nameOnCard,PluginDataTestTC10.cvcNumber);
//             }).then (function () {
//                 //Provide Credit card details
//                 return common.creditCardInfo(PluginDataTestTC10.cardNum,PluginDataTestTC10.expiry,PluginDataTestTC10.name,PluginDataTestTC10.cvc);
//             }).then(function () {
//                 //Provide the Google Analytics Informaiton
//                 return common.googleAnalyticsInfo(PluginDataTestTC10.websiteURl,PluginDataTestTC10.account,PluginDataTestTC10.property,PluginDataTestTC10.view);
//             }).then(function () {
//                 //Select a Primary Goal
//                 return common.selectPrimaryGoal(PluginDataTestTC10.primGoal);
//             }).then(function () {
//                 //Google Analytics- Click next to proceed to the competitors page
//                 return common.clickNextGoogleAnalytics();
//             }).then(function () {
//                 //Give the Industry Details
//                 return common.selectIndustry(PluginDataTestTC10.industry1);
//             }).then(function () {
//                 //Click Next to proceed to the install page
//                 return common.clickNextCompetitors();
//             }).then(function () {
//                 //Skip Installation
//                 return common.skipPluginInstall();
//             }).then(function () {
//                 //Validate whether Monthly Report is created
//                 return val.ValidateMonthlyReport();
//             }).then(function () {
//                 //Validate whether Weekly Snapshot is created
//                 return val.validateWeeklyReport();
//             }).then(function () {
//                 //Get the Monthly Report Data
//                 return common.getMonthlyReportData();
//             }).then(function (expData) {
//                 //Validate the Monthly Reports Reach Data
//                 return validate.validateMonthlyReportsReachData(expData)
//                     .then(function () {
//                         return validate.validateMonthlyReportsEngageData(expData, false, "")
//                             .then(function () {
//                                 return validate.validateMonthlyReportsConvertData(expData, [PluginDataTestTC10.primGoal]);
//                             })
//                     })
//             }).then(function () {
//                 return driver.switchTo().defaultContent();
//             }).then(function () {
//                 //Validate Weekly Reports
//                 return validate.validateWeeklyReports(false, [PluginDataTestTC10.primGoal]);
//             }).then(function () {
//                 //Change the Website URL and install Plugin from Settings Page
//                 return common.changeWebsiteURLFromSettings(PluginDataTestTC10.websiteUrl);
//             }).then(function () {
//                 //Install plugin from the Settings Page
//                 return common.installPluginFromSettingsPage(PluginDataTestTC10.wpUrl, PluginDataTestTC10.wpAdminName, PluginDataTestTC10.wpAdminPassword);
//             }).then(function () {
//                 //Validate the Plugin is installed
//                 return validate.validateWordPressPluginInstall();
//             }).then(function () {
//                 //Logout of Quietly Insights
//                 return common.logout();
//             })
//     });
// });