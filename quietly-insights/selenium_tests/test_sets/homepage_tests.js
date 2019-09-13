const common = require('../common/common_functions');
const val = require('../common/validations');
const commonBeforeAfter = require('../common/commonBeforeAfter');

//Number of Tests: 12

describe('Homepage Automated Tests, #google_analytics_tests#', function () {
    commonBeforeAfter.loadBeforeAndAfterEach();

    it('Test Case 1: Free User is able to set GA Plugin from the Home Page', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await common.basicOnboarding("www.test.com");
        await common.goToHomeSettings();
        await common.syncGoogleAnalyticsFrhomHome();
        await common.logout();
    });
    it('Test Case 2: Monthly Pro User is able to set GA Plugin from the Home Page', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("www.test.com");
        await common.goToHomeSettings();
        await common.syncGoogleAnalyticsFrhomHome();
        await common.logout();
    });
    it('Test Case 3: Annual Pro User is able to set GA Plugin from the Home Page', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("www.test.com");
        await common.goToHomeSettings();
        await common.syncGoogleAnalyticsFrhomHome();
        await common.logout();
    });
    it('Test Case 4: Free User can add competetior from homepage if no competetior URL has been entered', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await common.basicOnboarding("blog.quiet.ly");
        await common.goToHomeSettings();
        await common.addCompetitorFromHome("www.jalopnik.com");
        await val.validateHomepageForAddCompetetiors("www.jalopnik.com");
        await common.logout();
    });
    it('Test Case 5: Monthly Pro User can add competetior from homepage if no competetior URL has been entered', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("blog.quiet.ly");
        await common.goToHomeSettings();
        await common.addCompetitorFromHome("www.jalopnik.com");
        await val.validateHomepageForAddCompetetiors("www.jalopnik.com");
        await common.logout();
    });
    it('Test Case 6: Annual Pro User can add competetior from homepage if no competetior URL has been entered', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("blog.quiet.ly");
        await common.goToHomeSettings();
        await common.addCompetitorFromHome("www.jalopnik.com");
        await val.validateHomepageForAddCompetetiors("www.jalopnik.com");
        await common.logout();
    });
    it('Test Case 7: Free User - Entering Invalid URL causes the correct error message to appear', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await common.basicOnboarding("blog.quiet.ly");
        await common.goToHomeSettings();
        await common.addCompetitorFromHome("invalid");
        await val.validateErrorMessage("Please enter a valid URL.");
        await common.logout();
    });
    it('Test Case 8: Free User - Entering URL with no sitedata (www.test.com)', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await common.basicOnboarding("blog.quiet.ly");
        await common.goToHomeSettings();
        await common.addCompetitorFromHome("www.test.com");
        await common.delay(5000);
        await val.validateNoGACompetitorForHomepage("www.test.com");
        await common.logout();
    });
    it('Test Case 9: Monthly Pro User - Entering Invalid URL causes the correct error message to appear', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("blog.quiet.ly");
        await common.goToHomeSettings();
        await common.addCompetitorFromHome("invalid");
        await val.validateErrorMessage("Please enter a valid URL.");
        await common.logout();
    });
    it('Test Case 10: Monthly Pro User - Entering URL with no sitedata (www.test.com)', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("blog.quiet.ly");
        await common.goToHomeSettings();
        await common.addCompetitorFromHome("www.test.com");
        await common.delay(5000);
        await val.validateNoGACompetitorForHomepage("www.test.com");
        await common.logout();
    });
    it('Test Case 11: Annual Pro User - Entering Invalid URL causes the correct error message to appear', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("blog.quiet.ly");
        await common.goToHomeSettings();
        await common.addCompetitorFromHome("invalid");
        await val.validateErrorMessage("Please enter a valid URL.");
        await common.logout();
    });
    it('Test Case 12: Annual Pro User - Entering URL with no sitedata (www.test.com)', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("blog.quiet.ly");
        await common.goToHomeSettings();
        await common.addCompetitorFromHome("www.test.com");
        await common.delay(5000);
        await val.validateNoGACompetitorForHomepage("www.test.com");
        await common.logout();
    });
    // it('Test Case 13: Free User - Add more competetiors from homepage', async function() {
    //     await common.goToLandingPage('Free');
    //     await common.signInWithGmail();
    //     await common.basicOnboarding("blog.quiet.ly");
    //     await common.goToHomeSettings();
    //     await common.waitForElementToBeClickableById("overviewAddMoreCompetitors");
    //     await common.logout();
    // });
});
