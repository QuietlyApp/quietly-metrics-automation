//This defines all the stuff we'll add for Add Competitor Page
const common = require('../common/common_functions');
const val = require('../common/validations');
const commonBeforeAfter = require('../common/commonBeforeAfter');
const {user: commonUserData} = require('../common/common_data');

//Number of Tests: 12

describe('Add Competitor Tests, #google_analytics_tests#', function () {
    commonBeforeAfter.loadBeforeAndAfterEach();
    it('C224 Free User - Add more competetiors from homepage', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await common.basicOnboarding("blog.quiet.ly");
        await common.waitForElementToBeClickableById("competitorsSettingsLink");
        await common.addCompetitorFromHome("www.jalopnik.com");
        await val.validateComppageForAddCompetetiors("www.jalopnik.com")
        await common.logout();
    });
    it('C225 Monthly Pro User can add competetior from homepage if no competetior URL has been entered', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("blog.quiet.ly");
        await common.waitForElementToBeClickableById("competitorsSettingsLink");
        await common.addCompetitorFromHome("www.jalopnik.com");
        await val.validateComppageForAddCompetetiors("www.jalopnik.com");
        await common.logout();
    });
    it('C226 Annual Pro User can add competetior from homepage if no competetior URL has been entered', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("blog.quiet.ly");
        await common.waitForElementToBeClickableById("competitorsSettingsLink");
        await common.addCompetitorFromHome("www.jalopnik.com");
        await val.validateComppageForAddCompetetiors("www.jalopnik.com");
        await common.logout();
    });
    it('C227 Free User - Entering Invalid URL causes the correct error message to appear', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await common.basicOnboarding("blog.quiet.ly");
        await common.waitForElementToBeClickableById("competitorsSettingsLink");
        await common.addCompetitorFromHome("invalid");
        await val.validateErrorMessage("Please enter a valid URL.");
        await common.logout();
    });
    it('C228 Free User - Entering URL with no sitedata (www.test.com)', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await common.basicOnboarding("blog.quiet.ly");
        await common.waitForElementToBeClickableById("competitorsSettingsLink");
        await common.addCompetitorFromHome("www.test.com");
        await common.delay(5000);
        await val.validateNoGACompetitorForHomepage("www.test.com");
        await common.logout();
    });
    it('C229 Monthly Pro User - Entering Invalid URL causes the correct error message to appear', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("blog.quiet.ly");
        await common.waitForElementToBeClickableById("competitorsSettingsLink");
        await common.addCompetitorFromHome("invalid");
        await val.validateErrorMessage("Please enter a valid URL.");
        await common.logout();
    });
    it('C230 Monthly Pro User - Entering Invalid URL causes the correct error message to appear', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("blog.quiet.ly");
        await common.waitForElementToBeClickableById("competitorsSettingsLink");
        await common.addCompetitorFromHome("www.test.com");
        await common.delay(5000);
        await val.validateNoGACompetitorForHomepage("www.test.com");
        await common.logout();
    });
    it('C231 Annual Pro User - Entering Invalid URL causes the correct error message to appear', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("blog.quiet.ly");
        await common.waitForElementToBeClickableById("competitorsSettingsLink");
        await common.addCompetitorFromHome("invalid");
        await val.validateErrorMessage("Please enter a valid URL.");
        await common.logout();
    });
    it('C232 Annual Pro User - Entering URL with no sitedata (www.test.com)', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("blog.quiet.ly");
        await common.waitForElementToBeClickableById("competitorsSettingsLink");
        await common.addCompetitorFromHome("www.test.com");
        await common.delay(5000);
        await val.validateNoGACompetitorForHomepage("www.test.com");
        await common.logout();
    });
});
