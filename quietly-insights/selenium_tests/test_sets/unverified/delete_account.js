const common = require('../common/common_functions');
const val = require('../common/validations');
const db = require('../common/database.js');
const {user:commonUserData} = require('../common/common_data');
const commonBeforeAfter = require('../common/commonBeforeAfter');
const {app} = require('../common/common_data');

//Number of Tests: 33

describe('Delete Account Feature functional tests, #delete_account#', function () {
    commonBeforeAfter.loadBeforeAndAfterEach();

    it('Test Case 1: Log in as a new user with Monthly Pro Plan and delete the account successfully', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.delay(5000);
        await common.deleteAccount();
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 2: Monthly Pro plan-Verify if the user can recreate an account after deletion using the same plan type', async function () {
        await common.goToLandingPage('Monthly pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.delay(5000);
        await common.deleteAccount();
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
        await common.closeBrowser();

        await common.openBrowser(app.browser, app.server);
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.logout();
    });

    it('Test Case 3: Monthly Pro plan-Verify if the user can recreate an account after deletion using the Annual Pro plan', async function () {
        await common.goToLandingPage('Monthly pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly pro');
        await common.creditCardInfo();
        await proPlanOnboardingWithComp();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.delay(5000);
        await common.deleteAccount();
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
        await common.closeBrowser();

        await common.openBrowser(app.browser, app.server);
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.logout();
    });

    it('Test Case 4: Monthly Pro plan-Verify if the user can recreate an account after deletion using the Free plan', async function () {
        await common.goToLandingPage('Monthly pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.delay(5000);
        await common.deleteAccount();
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
        await common.closeBrowser();

        await common.openBrowser(app.browser, app.server);
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.logout();
    });

    it('Test Case 5: Monthly Pro Plan-Delete the account when plugin is installed after on-boarding', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installPluginFromSettingsPage();
        await common.delay(2000);
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.delay(5000);
        await common.deleteAccount();
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 6: Monthly Pro plan-Delete account when plugin is installed and Form Submission Goal is added', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installPluginFromSettingsPage();
        await common.settingsOptions();
        await common.addNewFormSubmissionGoal();
        let aid = await db.getAccountId(commonUserData.userName);
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.deleteAccount();
        await common.delay(2000);
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 7: Monthly Pro plan-Delete account when plugin is installed and Link click conversion is added', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installPluginFromSettingsPage();
        await common.settingsOptions();
        await common.addNewLinkClickGoal("https://blog.quiet.ly/insights/determining-your-content-marketing-goals/", "Content Marketing");
        let aid = await db.getAccountId(commonUserData.userName);
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.deleteAccount();
        await common.delay(2000);
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 8: Monthly Pro plan-Delete account after changing the billing plan to annual', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.changeBillingToAnnual();
        await val.validateAnnualProPlanFromSettings();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.deleteAccount();
        await common.delay(2000);
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 9: Log in as a new user with Annual Pro Plan and delete the account successfully', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.delay(5000);
        await common.deleteAccount();
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 10: Annual Pro plan-Verify if the user can recreate an account after deletion using the same plan type', async function () {
        await common.goToLandingPage('Annual pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.delay(5000);
        await common.deleteAccount();
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
        await common.closeBrowser();

        await common.openBrowser(app.browser, app.server);
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.logout();
    });

    it('Test Case 11: Annual Pro plan-Verify if the user can recreate an account after deletion using the Monthly Pro plan', async function () {
        await common.goToLandingPage('Annual pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.delay(5000);
        await common.deleteAccount();
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
        await common.closeBrowser();

        await common.openBrowser(app.browser, app.server);
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.logout();
    });

    it('Test Case 12: Annual Pro plan-Verify if the user can recreate an account after deletion using the Free plan', async function () {
        await common.goToLandingPage('Annual pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.delay(5000);
        await common.deleteAccount();
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
        await common.closeBrowser();

        await common.openBrowser(app.browser, app.server);
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.logout();
    });

    it('Test Case 13: Annual Pro Plan-Delete the account when plugin is installed after on-boarding', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installPluginFromSettingsPage();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.delay(5000);
        await common.deleteAccount();
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 14: Annual Pro plan-Delete account when plugin is installed and Form Submission Goal is added', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installPluginFromSettingsPage();
        await common.settingsOptions();
        await common.addNewFormSubmissionGoal();
        let aid = await db.getAccountId(commonUserData.userName);
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.deleteAccount();
        await common.delay(2000);
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 15: Annual Pro plan-Delete account when plugin is installed and Link click conversion is added', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installPluginFromSettingsPage();
        await common.settingsOptions();
        await common.addNewLinkClickGoal("https://blog.quiet.ly/insights/determining-your-content-marketing-goals/", "Content Marketing");
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.deleteAccount();
        await common.delay(2000);
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 16: Log in as a new user with Free Plan and delete the account successfully', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.delay(5000);
        await common.deleteAccount();
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 17: Free plan-Verify if the user can recreate an account after deletion using the same plan type', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.delay(5000);
        await common.deleteAccount();
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
        await common.closeBrowser();

        await common.openBrowser(app.browser, app.server);
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.logout();
    });

    it('Test Case 18: Free plan-Verify if the user can recreate an account after deletion using the Monthly Pro plan', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.delay(5000);
        await common.deleteAccount();
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
        await common.closeBrowser();

        await common.openBrowser(app.browser, app.server);
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType("Monthly Pro");
        await common.logout();
    });
    it('Test Case 19: Free plan-Verify if the user can recreate an account after deletion using the Annual Pro plan', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.delay(5000);
        await common.deleteAccount();
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
        await common.closeBrowser();

        await common.openBrowser(app.browser, app.server);
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.logout();
    });

    it('Test Case 20: Free Plan-Delete the account when plugin is installed after on-boarding', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await common.installPluginFromSettingsPage();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.delay(5000);
        await common.deleteAccount();
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 21: Free plan-Delete account when plugin is installed and Form Submission Goal is added', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await common.installPluginFromSettingsPage();
        await common.settingsOptions();
        await common.addNewFormSubmissionGoal();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.deleteAccount();
        await common.delay(2000);
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 22: Free plan-Delete account when plugin is installed and Link click conversion is added', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await common.installPluginFromSettingsPage();
        await common.settingsOptions();
        await common.addNewLinkClickGoal("https://blog.quiet.ly/insights/determining-your-content-marketing-goals/", "Content Marketing");
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.deleteAccount();
        await common.delay(2000);
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 23: Free plan-Delete the account after upgrading to the Monthly Pro plan', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await common.installPluginFromSettingsPage();
        await common.selectUpgradeFromAccountSettings("Monthly");
        await common.upgradeToProPlanAndRefresh();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.deleteAccount();
        await common.delay(2000);
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 24: Free plan-Delete the account after upgrading to the Annual Pro plan', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await common.selectUpgradeFromAccountSettings("Annual");
        await common.upgradeToProPlanAndRefresh();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.deleteAccount();
        await common.delay(2000);
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 25: Monthly Pro Plan-Delete the account when tracker is installed after on-boarding', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installTrackerSnippetFromSettingsPage();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.delay(5000);
        await common.deleteAccount();
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 26: Annual Pro Plan-Delete the account when tracker is installed after on-boarding', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installTrackerSnippetFromSettingsPage();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.delay(5000);
        await common.deleteAccount();
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 27: Free Plan-Delete the account when tracker is installed after on-boarding', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await common.installTrackerSnippetFromSettingsPage();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.delay(5000);
        await common.deleteAccount();
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 28: Monthly Pro-Delete account when tracker is installed and Form Submission Goal is added', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installTrackerSnippetFromSettingsPage();
        await common.settingsOptions();
        await common.addNewFormSubmissionGoal();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.deleteAccount();
        await common.delay(2000);
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 29: Monthly pro -Delete account when tracker is installed and Link click conversion is added', async function () {
        await common.goToLandingPage('Monthly pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installTrackerSnippetFromSettingsPage();
        await common.settingsOptions();
        await common.addNewLinkClickGoal("https://blog.quiet.ly/insights/determining-your-content-marketing-goals/", "Content Marketing");
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.deleteAccount();
        await common.delay(2000);
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 30: Annual Pro-Delete account when tracker is installed and Form Submission Goal is added', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installTrackerSnippetFromSettingsPage();
        await common.settingsOptions();
        await common.addNewFormSubmissionGoal();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.deleteAccount();
        await common.delay(2000);
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 31: Annual pro -Delete account when tracker is installed and Link click conversion is added', async function () {
        await common.goToLandingPage('Annual pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installTrackerSnippetFromSettingsPage();
        await common.settingsOptions();
        await common.addNewLinkClickGoal("https://blog.quiet.ly/insights/determining-your-content-marketing-goals/", "Content Marketing");
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.deleteAccount();
        await common.delay(2000);
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 32: Free Plan -Delete account when tracker is installed and Form Submission Goal is added', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await common.installTrackerSnippetFromSettingsPage();
        await common.settingsOptions();
        await common.addNewFormSubmissionGoal();
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.deleteAccount();
        await common.delay(2000);
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });

    it('Test Case 33: Free Plan -Delete account when tracker is installed and Link click conversion is added', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await common.installTrackerSnippetFromSettingsPage();
        await common.settingsOptions();
        await common.addNewLinkClickGoal("https://blog.quiet.ly/insights/determining-your-content-marketing-goals/", "Content Marketing");
        await val.validateBeforeDelete(commonUserData.userName);
        let customerID = await db.getCustomerID(commonUserData.userName);
        await common.deleteAccount();
        await common.delay(2000);
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });


});

   /* it('Test Case 25: Monthly Pro plan-Delete the account after changing the billing to Annual', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Monthly Pro');
        await common.proPlanAddCreditCard();
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors("Civil Engineering", [commonUserData.competitors[1]]);
        await common.skipPluginInstall();
        await common.onboardingClickDone("Monpro- Delacc after switching to annpro");

        await val.validateMonthlyReport();
        await common.upgradeToProPlan();

        var aid = await db.getAccountId(commonUserData.userName);
        await val.validateBeforeDelete(commonUserData.userName);
        var customerID = await db.getCustomerID(commonUserData.userName);
        await common.deleteAccount();
        await common.delay(2000);
        await val.validateDeleteAccountStatus(customerID);
        await val.validateDeletedAccountEmail(customerID);
    });
    */

