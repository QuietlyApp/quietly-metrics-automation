//Not a valid test set anymore
const common = require('../common/common_functions');
const val = require('../common/validations');
const commonBeforeAfter = require('../common/commonBeforeAfter');

//Number of Tests: 8

describe('Google Analytics Tests, #google_analytics_tests#', function () {
    commonBeforeAfter.loadBeforeAndAfterEach();

    it('Test Case 1: Free User is able to set GA Plugin from the Home Page', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.basicOnboarding("www.test.com");
        await common.goToHomeSettings();
        await common.syncGoogleAnalyticsFrhomHome();
        await common.logout();
    });
    it('Test Case 2: Monthly Pro User is able to set GA Plugin from the Home Page', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("www.test.com");
        await common.goToHomeSettings();
        await common.syncGoogleAnalyticsFrhomHome();
        await common.logout();
    });
    it('Test Case 3: Annual Pro User is able to set GA Plugin from the Home Page', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("www.test.com");
        await common.goToHomeSettings();
        await common.syncGoogleAnalyticsFrhomHome();
        await common.logout();
    });
});
