const common = require('../common/common_functions');
const val = require('../common/validations');
const commonBeforeAfter = require('../common/commonBeforeAfter');
const {user: commonUserData} = require('../common/common_data');

describe('Homepage Automated Tests, #content_ideas_page#', function () {
    commonBeforeAfter.loadBeforeAndAfterEach();

    it('C233 Free User is able to set GA Plugin from the Trending Topics Page', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await common.basicOnboarding("www.test.com");
        await common.waitForElementToBeClickableById('contentIdeasSettingsLink');
        await common.waitForElementToBeClickableById('trendingTopicsLink');
        await common.syncGoogleAnalyticsFromHome();
        await common.logout();
    });
    it('C234 Free User is able to set GA Plugin from the Seasonal Topics Page', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await common.basicOnboarding("www.test.com");
        await common.waitForElementToBeClickableById('contentIdeasSettingsLink');
        await common.waitForElementToBeClickableById('seasonalTopicsLink');
        await common.syncGoogleAnalyticsFromHome();
        await common.logout();
    });
    it('C235 Monthly Pro User is able to set GA Plugin from the Trending Topics Page', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("www.test.com");
        await common.waitForElementToBeClickableById('contentIdeasSettingsLink');
        await common.waitForElementToBeClickableById('trendingTopicsLink');
        await common.syncGoogleAnalyticsFromHome();
        await common.logout();
    });
    it('C236 Monthly Pro User is able to set GA Plugin from the Seasonal Topics Page', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("www.test.com");
        await common.waitForElementToBeClickableById('contentIdeasSettingsLink');
        await common.waitForElementToBeClickableById('seasonalTopicsLink');
        await common.syncGoogleAnalyticsFromHome();
        await common.logout();
    });
    it('C237 Annual Pro User is able to set GA Plugin from the Trending Topics Page', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("www.test.com");
        await common.waitForElementToBeClickableById('contentIdeasSettingsLink');
        await common.waitForElementToBeClickableById('trendingTopicsLink');
        await common.syncGoogleAnalyticsFromHome();
        await common.logout();
    });
    it('C238 Annual Pro User is able to set GA Plugin from the Seasonal Topics Page', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("www.test.com");
        await common.waitForElementToBeClickableById('contentIdeasSettingsLink');
        await common.waitForElementToBeClickableById('seasonalTopicsLink');
        await common.syncGoogleAnalyticsFromHome();
        await common.logout();
    });
});
