const _ = require('lodash');
const common = require('../common/common_functions');
const val = require('../common/validations');
const {user: commonUserData} = require('../common/common_data');
const commonBeforeAfter = require('../common/commonBeforeAfter');

//Number of tests: 25

describe('Test Error Messages, #test_errormessages#', function () {
    commonBeforeAfter.loadBeforeAndAfterEach();

   it('C-210: Monthly Pro-Check for error message if credit card details are not provided', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.waitForElementToSendKeys("//input[@class='-onboarding-border']", "www.test.com");
        await val.validateBlogsFound();
        await common.switchToIframeAndSendKeys("//iframe[@title='Secure payment input frame']", "//input[@name='cardnumber']", '4242');
        await common.delay(2000);
        await common.waitForElementToBeClickableById("reportNextStep");
        await common.delay(2000);
        await val.validateErrorMessage("Your card number is incomplete.");
    });

    it('C-211: Monthly Pro-Check for error message if expiry date is not provided', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.waitForElementToSendKeys("//input[@class='-onboarding-border']", "www.test.com");
        await val.validateBlogsFound();
        await common.switchToIframeAndSendKeys("//iframe[@title='Secure payment input frame']", "//input[@name='cardnumber']", "5105105105105100");
        await common.delay(2000);
        await common.waitForElementToBeClickableById("reportNextStep");
        await common.delay(2000);
        await val.validateErrorMessage("Your card's expiration date is incomplete.");
    });

    it('C-212: Monthly Pro-Check for error message when the user does not provide CVC Number', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.waitForElementToSendKeys("//input[@class='-onboarding-border']", "www.test.com");
        await val.validateBlogsFound();
        await common.switchToIframeAndSendKeys("//iframe[@title='Secure payment input frame']", "//input[@name='cardnumber']", "5105105105105100");
        await common.delay(2000);
        await common.switchToIframeAndSendKeys("//iframe[@name='__privateStripeFrame6']", "//input[@name='exp-date']", "8/32");
        await common.delay(2000);
        await common.waitForElementToBeClickableById("reportNextStep");
        await common.delay(2000);
        await val.validateErrorMessage("Your card's security code is incomplete.");
    });

    it('C-213: Monthly Pro-Check for error message when the user does not provide Name on Card', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.waitForElementToSendKeys("//input[@class='-onboarding-border']", "www.test.com");
        await val.validateBlogsFound();
        await common.switchToIframeAndSendKeys("//iframe[@title='Secure payment input frame']", "//input[@name='cardnumber']", "5105105105105100");
        await common.delay(2000);
        await common.switchToIframeAndSendKeys("//iframe[@name='__privateStripeFrame6']", "//input[@name='exp-date']", "7/22")
        await common.delay(2000);
        await common.switchToIframeAndSendKeys("//iframe[@name='__privateStripeFrame7']", "//input[@name='cvc']", "672");
        await common.delay(2000);
        await common.waitForElementToBeClickableById("reportNextStep");
        await common.delay(2000);
        await val.validateErrorMessage("Please enter a valid cardholder name");
    });

    it('C-214: Monthly Pro-Check for error message when he enters numbers or special characters in the Name on Card field', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.waitForElementToSendKeys("//input[@class='-onboarding-border']", "www.test.com");
        await val.validateBlogsFound();
        await common.creditCardInfo("5555555555554444", "3/40", "12345&@()", "823");
        await common.waitForElementToBeClickableById("reportNextStep");
        await common.delay(3000);
        await val.validateErrorMessage("Please enter a valid cardholder name");
    });

    it('C-215: Monthly Pro-Check for error message when users enters 40 characters for naming the report', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding();
        await common.changePropertyName("Monthly Pro Plan-Enter Maximum Character");
        await val.validateErrorMessage("Please keep your report name to 40 characters or less");
    });

    it('C-216: Monthly Pro Plan - Check for error while trying to add a new property with same domain.', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding();
        await common.addNewProperty();
        await waitForElementToSendKeys("//input[@class='-onboarding-border']", commonUserData.websiteUrl);
        await val.validateErrorMessage("This domain already has a property associated to it. Please choose a different url.");
    });


//    it('Test Case 6: Monthly Pro-Check for error message when invalid url is provided', async function () {
//         await common.goToLandingPage('Monthly Pro');
//         await common.signInWithGmail();
//         await val.validatePlanType('Monthly Pro');
//         await common.creditCardInfo("4242424242424242", "4/22", "Dan Cornsoup", "420");
//         await common.delay(3000);
//         await val.validateInvalidURL("asdfasd");
//     });

    // it('Test Case 7: Monthly Pro-Check for error message when duplicate Competitor url is provided', async function () {
    //     await common.goToLandingPage('Monthly Pro');
    //     await common.signInWithGmail();
    //     await val.validatePlanType('Monthly Pro');
    //     await common.waitForElementToSendKeys("//input[@class='-onboarding-border']", "www.test.com");
    //     await val.validateBlogsFound();
    //     await common.creditCardInfo("5555555555554444", "3/40", "Dan Cornsoup", "823");
    //     await common.provideBlogUrl();
    //     await common.provideGoogleAnalyticsInfo();
    //     await common.selectNoGoals();
    //     await common.selectIndustryAndCompetitors("Building Materials", ["https://contently.com/2018/09/25/wyzowl-animation-marketing/","https://contently.com/2018/09/25/wyzowl-animation-marketing/"]);
    //     await common.delay(3000);
    //     await val.validateDuplicateCompURL();
    // });

//     it('Test Case 11: Monthly Pro Plan - Check for warning pop up when plugin/tracker is not installed but verified', async function () {
//         await common.goToLandingPage('Monthly Pro');
//         await common.signInWithGmail();
//         await val.validatePlanType('Monthly Pro');
//         await common.proPlanAddCreditCard();
//         await common.provideBlogUrl();
//         await common.provideGoogleAnalyticsInfo();
//         await common.selectGoals(commonUserData.additionalGoals);
//         await common.selectIndustryAndCompetitors(commonUserData.industry, []);
//         await common.skipPluginInstall();
//         await common.onboardingClickDone("Monpro-Verify plugin install");

//         await val.validateMonthlyReport();
//         await common.delay(2000);
//         await val.validatePluginInstallFail();
//         await common.logout();
//     });

//     it('Test Case 12: Annual Pro-Check for error message if credit card details are not provided', async function () {
//         await common.goToLandingPage('Annual Pro');
//         await common.signInWithGmail();
//         await val.validatePlanType('Annual Pro');
//         await common.delay(2000);
//         await common.switchToIframeAndSendKeys("//iframe[@title='Secure payment input frame']", "//input[@name='cardnumber']", '');
//         await common.delay(2000);
//         await common.waitForElementToBeClickableById("billingNextStep");
//         await common.delay(2000);
//         await val.validateCreditCardError("Error: Your card number is incomplete.");
//     });

//     it('Test Case 13: Annual Pro-Check for error message if expiry date is not provided', async function () {
//         await common.goToLandingPage('Annual Pro');
//         await common.signInWithGmail();
//         await val.validatePlanType('Annual Pro');
//         await common.delay(2000);
//         await common.switchToIframeAndSendKeys("//iframe[@title='Secure payment input frame']", "//input[@name='cardnumber']", "5105105105105100");
//         await common.delay(2000);
//         await common.waitForElementToBeClickableById("billingNextStep");
//         await common.delay(2000);
//         await val.validateCreditCardError("Error: Your card's expiration date is incomplete.");
//     });

//     it('Test Case 14: Annual Pro-Check for error message when the user does not provide CVC Number', async function () {
//         await common.goToLandingPage('Annual Pro');
//         await common.signInWithGmail();
//         await val.validatePlanType('Annual Pro');
//         await common.delay(2000);
//         await common.switchToIframeAndSendKeys("//iframe[@title='Secure payment input frame']", "//input[@name='cardnumber']", "5105105105105100");
//         await common.delay(2000);
//         await common.switchToIframeAndSendKeys("//iframe[@name='__privateStripeFrame10']", "//input[@name='exp-date']", "8/32");
//         await common.delay(2000);
//         await common.waitForElementToBeClickableById("billingNextStep");
//         await common.delay(2000);
//         await val.validateCreditCardError("Error: Your card's security code is incomplete.");
//     });

//     it('Test Case 15: Annual Pro-Check for error message when the user does not provide Name on Card', async function () {
//         await common.goToLandingPage('Annual Pro');
//         await common.signInWithGmail();
//         await val.validatePlanType('Annual Pro');
//         await common.delay(2000);
//         await common.switchToIframeAndSendKeys("//iframe[@title='Secure payment input frame']", "//input[@name='cardnumber']", "5105105105105100");
//         await common.delay(2000);
//         await common.switchToIframeAndSendKeys("//iframe[@name='__privateStripeFrame10']", "//input[@name='exp-date']", "7/22")
//         await common.delay(2000);
//         await common.switchToIframeAndSendKeys("//iframe[@name='__privateStripeFrame11']", "//input[@name='cvc']", "672");
//         await common.delay(2000);
//         await common.waitForElementToBeClickableById("billingNextStep");
//         await common.delay(2000);
//         await val.validateCreditCardError("Error: Please enter a valid cardholder name");
//     });

//     it('Test Case 16: Annual Pro-Check for error message when he enters numbers or special characters in the Name on Card field', async function () {
//         await common.goToLandingPage('Annual Pro');
//         await common.signInWithGmail();
//         await val.validatePlanType('Annual Pro');
//         await common.proPlanAddCreditCard("5555555555554444", "3/40", "12345&@()", "823");
//         await common.delay(3000);
//         await val.validateCreditCardError("Error: Please enter a valid cardholder name");
//     });

//     it('Test Case 17: Annual Pro-Check for error message when invalid url is provided', async function () {
//         await common.goToLandingPage('Annual Pro');
//         await common.signInWithGmail();
//         await val.validatePlanType('Annual Pro');
//         await common.proPlanAddCreditCard();
//         await val.validateInvalidURL("blog.quiet.ly");
//     });

//     it('Test Case 18: Annual Pro-Check for error message when duplicate Competitor url is provided', async function () {
//         await common.goToLandingPage('Annual Pro');
//         await common.signInWithGmail();
//         await val.validatePlanType('Annual Pro');
//         await common.proPlanAddCreditCard();
//         await common.provideBlogUrl();
//         await common.provideGoogleAnalyticsInfo();
//         await common.selectNoGoals();
//         await common.selectIndustryAndCompetitors("Building Materials", ["https://contently.com/2018/09/25/wyzowl-animation-marketing/","https://contently.com/2018/09/25/wyzowl-animation-marketing/"]);
//         await common.delay(3000);
//         await val.validateDuplicateCompURL();
//     });

//     it('Test Case 19: Annual Pro-Check for error message when users enters 40 characters for naming the report', async function () {
//         await common.goToLandingPage('Annual Pro');
//         await common.signInWithGmail();
//         await val.validatePlanType('Annual Pro');
//         await common.proPlanAddCreditCard();
//         await common.provideBlogUrl();
//         await common.provideGoogleAnalyticsInfo();
//         await common.selectNoGoals();
//         await common.selectIndustryAndCompetitors("Building Materials", []);
//         await common.skipPluginInstall();
//         await common.providePropertyName("Monthly Pro plan-enter maximum character",[]);
//         await val.validateReportNameError();
//     });

//     it('Test Case 20: Annual pro Plan- Check for error message if user tries to add more than 3 GA goals after on-boarding.', async function () {
//         await common.goToLandingPage('Annual Pro');
//         await common.signInWithGmail();
//         await val.validatePlanType('Annual Pro');
//         await common.proPlanAddCreditCard();
//         await common.provideBlogUrl();
//         await common.provideGoogleAnalyticsInfo();
//         await common.selectGoals(commonUserData.additionalGoals);
//         await common.selectIndustryAndCompetitors(commonUserData.industry, []);
//         await common.skipPluginInstall();
//         await common.onboardingClickDone("Annpro-Do not allow more than three goals");

//         await val.validateMonthlyReport();
//         await common.goToGoalsPage();
//         await common.waitForElementToBeClickableById("settingsConversionsAddGoals");
//         await common.waitForElementToBeClickable("//span[@class='Select-arrow']");
//         await common.selectItemFromDropDown("selectGAGoal", "//div[@class='Select-option']", "Agency CTA Clicks");
//         await common.waitForElementToBeClickableById("addGAGoal");
//         await val.validateGoalError();
//         await driver.executeScript("window.scrollTo(0,0);");
//         await common.deleteAccount();
//     });

//     it('Test Case 21: Annual Pro Plan - Check for error while trying to add a new property with same domain.', async function () {
//         await common.goToLandingPage('Annual Pro');
//         await common.signInWithGmail();
//         await val.validatePlanType('Annual Pro');
//         await common.proPlanAddCreditCard();
//         await common.provideBlogUrl();
//         await common.provideGoogleAnalyticsInfo();
//         await common.selectGoals(commonUserData.additionalGoals);
//         await common.selectIndustryAndCompetitors(commonUserData.industry, []);
//         await common.skipPluginInstall();
//         await common.onboardingClickDone("Annpro-Add property with same domain");

//         await val.validateMonthlyReport();
//         await common.delay(2000);
//         await common.addNewProperty("Monthly");
//         await common.waitForElementToSendKeysById("websiteUrl",commonUserData.websiteUrl);
//         await common.waitForElementToBeClickableById("reportNextStep");
//         await val.validateSameDomainError();
//         await common.switchProperty("topNavSwitchPropertystagingblog.quiet.ly");
//         await common.deleteAccount();
//     });

//     it('Test Case 22: Annual Pro Plan - Check for warning pop up when plugin/tracker is not installed but verified', async function () {
//         await common.goToLandingPage('Annual Pro');
//         await common.signInWithGmail();
//         await val.validatePlanType('Annual Pro');
//         await common.proPlanAddCreditCard();
//         await common.provideBlogUrl();
//         await common.provideGoogleAnalyticsInfo();
//         await common.selectGoals(commonUserData.additionalGoals);
//         await common.selectIndustryAndCompetitors(commonUserData.industry, []);
//         await common.skipPluginInstall();
//         await common.onboardingClickDone("Annpro-verify plugin install");

//         await val.validateMonthlyReport();
//         await common.delay(2000);
//         await val.validatePluginInstallFail();
//         await common.logout();
//     });

//     it('Test Case 23: Free Plan-Check for error message when invalid url is provided', async function () {
//         await common.goToLandingPage('Free');
//         await common.signInWithGmail();
//         await val.validatePlanType('Free');
//         await val.validateInvalidURL("blog.quiet.ly");
//     });

//     it('Test Case 24: Free Plan-Check for error message when users enters 40 characters for naming the report', async function () {
//         await common.goToLandingPage('Free');
//         await common.signInWithGmail();
//         await val.validatePlanType('Free');
//         await common.provideBlogUrl();
//         await common.provideGoogleAnalyticsInfo();
//         await common.selectNoGoals();
//         await common.selectIndustryAndCompetitors("Building Materials", []);
//         await common.skipPluginInstall();
//         await common.providePropertyName("Free plan Report-enter maximum character",[]);
//         await val.validateReportNameError();
//     });

//     it('Test Case 25: Free Plan - Check for warning pop up when plugin/tracker is not installed but verified', async function () {
//         await common.goToLandingPage('Free');
//         await common.signInWithGmail();
//         await val.validatePlanType('Free');

//         await common.provideBlogUrl();
//         await common.provideGoogleAnalyticsInfo();
//         await common.selectGoals(commonUserData.additionalGoals);
//         await common.selectIndustryAndCompetitors(commonUserData.industry, []);
//         await common.skipPluginInstall();
//         await common.onboardingClickDone("Free-verify plugin install");

//         await val.validateMonthlyReport();
//         await common.delay(2000);
//         await val.validatePluginInstallFail();
//         await common.logout();
    // });

});
