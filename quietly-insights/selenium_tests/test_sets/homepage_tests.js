const common = require('../common/common_functions');
const val = require('../common/validations');
const commonBeforeAfter = require('../common/commonBeforeAfter');
const {user: commonUserData} = require('../common/common_data');

//Number of Tests: 12

describe('Homepage Automated Tests, #google_analytics_tests#', function () {
    commonBeforeAfter.loadBeforeAndAfterEach();

    it('AT-44: Free User is able to set GA Plugin from the Home Page', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await common.basicOnboarding("www.test.com");
        await common.goToHomeSettings();
        await val.validateNoGAInsightsForHomepage();
        await common.syncGoogleAnalyticsFromHome();
        await common.logout();
    });
    it('AT-45: Monthly Pro User is able to set GA Plugin from the Home Page', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("www.test.com");
        await common.goToHomeSettings();
        await val.validateNoGAInsightsForHomepage();
        await common.syncGoogleAnalyticsFromHome();
        await common.logout();
    });
    it('AT-46: Annual Pro User is able to set GA Plugin from the Home Page', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("www.test.com");
        await common.goToHomeSettings();
        await val.validateNoGAInsightsForHomepage();
        await common.syncGoogleAnalyticsFromHome();
        await common.logout();
    });
    it('AT-47: Free User can add competetior from homepage if no competetior URL has been entered', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await common.basicOnboarding("blog.quiet.ly");
        await common.goToHomeSettings();
        await common.addCompetitorFromHome("www.jalopnik.com");
        await val.validateHomepageForAddCompetetiors("www.jalopnik.com");
        await common.logout();
    });
    it('AT-48: Monthly Pro User can add competetior from homepage if no competetior URL has been entered', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("blog.quiet.ly");
        await common.goToHomeSettings();
        await common.addCompetitorFromHome("www.jalopnik.com");
        await val.validateHomepageForAddCompetetiors("www.jalopnik.com");
        await common.logout();
    });
    it('AT-49: Annual Pro User can add competetior from homepage if no competetior URL has been entered', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("blog.quiet.ly");
        await common.goToHomeSettings();
        await common.addCompetitorFromHome("www.jalopnik.com");
        await val.validateHomepageForAddCompetetiors("www.jalopnik.com");
        await common.logout();
    });
    it('AT-50: Free User - Entering Invalid URL causes the correct error message to appear', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await common.basicOnboarding("blog.quiet.ly");
        await common.goToHomeSettings();
        await common.addCompetitorFromHome("invalid");
        await val.validateErrorMessage("Please enter a valid URL.");
        await common.logout();
    });
    it('AT-51: Free User - Entering URL with no sitedata (www.test.com)', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await common.basicOnboarding("blog.quiet.ly");
        await common.goToHomeSettings();
        await common.addCompetitorFromHome("www.test.com");
        await common.delay(5000);
        await val.validateNoGACompetitorForHomepage("www.test.com");
        await common.logout();
    });
    it('AT-52: Monthly Pro User - Entering Invalid URL causes the correct error message to appear', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("blog.quiet.ly");
        await common.goToHomeSettings();
        await common.addCompetitorFromHome("invalid");
        await val.validateErrorMessage("Please enter a valid URL.");
        await common.logout();
    });
    it('AT-53: Monthly Pro User - Entering URL with no sitedata (www.test.com)', async function() {
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
    it('AT-54: Annual Pro User - Entering Invalid URL causes the correct error message to appear', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("blog.quiet.ly");
        await common.goToHomeSettings();
        await common.addCompetitorFromHome("invalid");
        await val.validateErrorMessage("Please enter a valid URL.");
        await common.logout();
    });
    it('AT-55: Annual Pro User - Entering URL with no sitedata (www.test.com)', async function() {
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
    it('AT-56: Verify homepage navigator with Free User', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await common.freePlanOnboardingWithComp();
        sitePrefix = commonUserData.url;
        linksList = [
            ['navigationButtonLink', '0/overview'],
            ['homeSettingsLink', '0/overview'],
            ['startGuideSettingsLink', '0/startguide'],
            ['competitorsSettingsLink', '0/competitors-landing'],
            ['analyticsSettingsLink', '0/analytics'],
        ]
        contentLinksList = [
            ['trendingTopicsLink', '0/topic-recommendations?mode=performed_well'],
            ['seasonalTopicsLink', '0/topic-recommendations?mode=planning_ahead'],
            ['savedTopicsLink', '0/saved-topics'],
        ]
        settingsLinksList = [
            ['propertySettingsLink', '0/blogreport'],
            ['topicPreferencesLink', '0/settingstopicpreferences'],
            ['recipientsLink', '0/recipients'],
            ['pgoogleAnalyticsLink', '0/settingsgoogle'],
            ['goalsLink', '0/conversions'],
            ['competitorsLink', '0/settingscompetitors'],
            ['analyticsCodeLink', '0/install'],
        ]
        //iterate thru links first
        for(i=0 ; i <linksList.length ; i++)
        {   linkItem = linksList[i];
            await common.waitForElementToBeClickableById(linkItem[0]);
            await val.validatePageURL(sitePrefix + linkItem[1]);
        }
        await common.waitForElementToBeClickableById('contentIdeasSettingsLink');
        for(i=0 ; i < contentLinksList.length ; i++)
        {   linkItem = contentLinksList[i];
            await common.waitForElementToBeClickableById(linkItem[0]);
            await val.validatePageURL(sitePrefix + linkItem[1]);
        }
        await common.waitForElementToBeClickableById('settingsLink');
        for(i=0 ; i < settingsLinksList.length ; i++)
        {   linkItem = settingsLinksList[i];
            await common.waitForElementToBeClickableById(linkItem[0]);
            await val.validatePageURL(sitePrefix + linkItem[1]);
        }
    });

    it('AT-67: Adding Free Account with insufficient GA information returns the proper message', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await common.basicOnboarding("www.test.com");
        await common.goToHomeSettings();
        await common.syncEmptyGoogleAnalyticsFromHome();
        await val.validateInsufficientGAInsightsForHomepage();
        await common.logout();
    });
    it('AT-68: Adding Monthly Pro Account with insufficient GA information returns the proper message', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("www.test.com");
        await common.goToHomeSettings();
        await common.syncEmptyGoogleAnalyticsFromHome();
        await val.validateInsufficientGAInsightsForHomepage();
        await common.logout();
    });
    it('AT-69: Adding Annual Pro Account with insufficient GA information returns the proper message', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding("www.test.com");
        await common.goToHomeSettings();
        await common.syncEmptyGoogleAnalyticsFromHome();
        await val.validateInsufficientGAInsightsForHomepage();
        await common.logout();
    });
});
