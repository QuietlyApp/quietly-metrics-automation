const common = require('../common/common_functions');
const val = require('../common/validations');
const commonBeforeAfter = require('../common/commonBeforeAfter');
const {user: commonUserData} = require('../common/common_data');

describe('Homepage Automated Tests, #content_ideas_page#', function () {
    commonBeforeAfter.loadBeforeAndAfterEach();

    it('C124: Free User is able to set GA Plugin from the Trending Topics Page', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await common.basicOnboarding("www.test.com");
        await common.waitForElementToBeClickableById('contentIdeasSettingsLink');
        await common.waitForElementToBeClickableById('trendingTopicsLink');
        await common.syncGoogleAnalyticsFromHome();
        await common.logout();
    });
    it('C125: Free User is able to set GA Plugin from the Seasonal Topics Page', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await common.basicOnboarding("www.test.com");
        await common.waitForElementToBeClickableById('contentIdeasSettingsLink');
        await common.waitForElementToBeClickableById('seasonalTopicsLink');
        await common.syncGoogleAnalyticsFromHome();
        await common.logout();
    });
    it('C126: Monthly Pro User is able to set GA Plugin from the Trending Topics Page', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("www.test.com");
        await common.waitForElementToBeClickableById('contentIdeasSettingsLink');
        await common.waitForElementToBeClickableById('trendingTopicsLink');
        await common.syncGoogleAnalyticsFromHome();
        await common.logout();
    });
    it('C127: Monthly Pro User is able to set GA Plugin from the Seasonal Topics Page', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("www.test.com");
        await common.waitForElementToBeClickableById('contentIdeasSettingsLink');
        await common.waitForElementToBeClickableById('seasonalTopicsLink');
        await common.syncGoogleAnalyticsFromHome();
        await common.logout();
    });
    it('C128: Annual Pro User is able to set GA Plugin from the Trending Topics Page', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("www.test.com");
        await common.waitForElementToBeClickableById('contentIdeasSettingsLink');
        await common.waitForElementToBeClickableById('trendingTopicsLink');
        await common.syncGoogleAnalyticsFromHome();
        await common.logout();
    });
    it('C129: Annual Pro User is able to set GA Plugin from the Seasonal Topics Page', async function() {
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
