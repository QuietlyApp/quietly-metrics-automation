const common = require('../common/common_functions');
const val = require('../common/validations');
const {user:commonUserData} = require('../common/common_data');
const commonBeforeAfter = require('../common/commonBeforeAfter');
const validate=require('../common/reports_settings_validations');

//Number of Tests: 14
/*
describe('Annual Pro Plan onboarding Tests, #annualpro_onboarding#', function () {
    commonBeforeAfter.loadBeforeAndAfterEach();

    it('Test Case 1: Annual Pro plan basic on-boarding - No plugin, Competitors and Goals', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Annual Pro');
        await common.proPlanAddCreditCard();
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors(null, []);
        await common.skipPluginInstall();
        await common.onboardingClickDone("Annual Pro Basic");
        await val.validateMonthlyReport();
        await common.logout();
    });

    it('Test Case 2: Annual Pro plan - On-boarding with Goals specified', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Annual Pro');
        await common.proPlanAddCreditCard();
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectGoals(commonUserData.additionalGoals);
        await common.selectIndustryAndCompetitors(null, []);
        await common.skipPluginInstall();
        await common.onboardingClickDone("Annual Pro with goals");
        await val.validateMonthlyReport();
        await validate.validateGAGoals(commonUserData.additionalGoals);
        await common.logout();
    });

    it('Test Case 3: Annual Pro Plan - On-boarding with Competitors Specified', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Annual Pro');
        await common.proPlanAddCreditCard("5200828282828210", "15/28", "Jessy", "785");
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors('Broadcase Media', commonUserData.allCompetitors);
        await common.skipPluginInstall();
        await common.onboardingClickDone("Annual Pro with comp");
        await val.validateMonthlyReport();
        await common.logout();
    });

    it('Test Case 4: Annual Pro Plan - On-boarding with Goals and Competitors Specified', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Annual Pro');
        await common.proPlanAddCreditCard("5200828282828210", "11/28", "Sid", "232");
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectGoals(commonUserData.additionalGoals);
        await common.selectIndustryAndCompetitors('Computer Games', commonUserData.competitors);
        await common.skipPluginInstall();
        await common.onboardingClickDone("Annpro- GoalsAndComp");
        await val.validateMonthlyReport();
        await validate.validateGAGoals(commonUserData.additionalGoals);
        await common.logout();
    });

    it('Test Case 5: Annual Pro plan on-boarding with plugin installed', async function () {
        //   expect(process.env.NODE_ENV).to.equal("qa");
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Annual Pro');
        await common.proPlanAddCreditCard("371449635398431", "12/38", "Melinda", "392");
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors("Building Materials", []);
        await common.installWordPressPlugin();
        await common.delay(2000);
        await common.onboardingClickDone("Annual Pro plugin installed");
        await val.validateMonthlyReport();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 6: Annual Pro plan - Install plugin after on-boarding', async function () {
        //    expect(process.env.NODE_ENV).to.equal("qa");
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Annual Pro');
        await common.proPlanAddCreditCard("371449635398431", "12/38", "Melinda", "392");
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors("Building Materials", []);
        await common.skipPluginInstall();
        await common.onboardingClickDone("Annpro- InstPluginAfterOnboarding");
        await val.validateMonthlyReport();
        await common.installPluginFromSettingsPage();
        await common.logout();
    });

    it('Test Case 7: Annual Pro Plan - On-boarding with plugin installed and Goals Specified', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Annual Pro');
        await common.proPlanAddCreditCard();
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectGoals(commonUserData.additionalGoals);
        await common.selectIndustryAndCompetitors(null, []);
        await common.installWordPressPlugin();
        await common.delay(2000);
        await common.onboardingClickDone("Annpro- PluginAndGoals");
        await val.validateMonthlyReport();
        await validate.validateGAGoals(commonUserData.additionalGoals);
        await common.settingsOptions();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 8: Annual Pro Plan - On-boarding with plugin installed and Competitors Specified', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Annual Pro');
        await common.proPlanAddCreditCard();
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors('Computer Games', commonUserData.competitors);
        await common.installWordPressPlugin();
        await common.delay(2000);
        await common.onboardingClickDone("Annpro- PluginAndComp");
        await val.validateMonthlyReport();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 9: Annual Pro Plan - On-boarding with plugin installed, Goals and Competitors Specified', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Annual Pro');
        await common.proPlanAddCreditCard("5200828282828210", "15/28", "Roshni", "785");
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectGoals(commonUserData.additionalGoals);
        await common.selectIndustryAndCompetitors('Computer Games', commonUserData.competitors);
        await common.installWordPressPlugin();
        await common.onboardingClickDone("Annpro- PluginGoalsAndComp");
        await val.validateMonthlyReport();
        await validate.validateGAGoals(commonUserData.additionalGoals);
        await common.settingsOptions();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 10: Annual Pro Plan - Complete on-boarding with tracker installed', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Annual Pro');
        await common.proPlanAddCreditCard("371449635398431", "12/38", "Melinda", "392");
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors("Building Materials", []);
        await common.installTrackerSnippet();
        await common.delay(2000);
        await common.onboardingClickDone("Annpro- Trackerinstalled");
        await val.validateMonthlyReport();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 11: Annual Pro Plan - Complete on-boarding with tracker installed and Goals Specified', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Annual Pro');
        await common.proPlanAddCreditCard("371449635398431", "12/38", "Melinda", "392");
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectGoals(commonUserData.primaryGoal);
        await common.selectIndustryAndCompetitors("Construction",[]);
        await common.installTrackerSnippet();
        await common.onboardingClickDone("Annpro- Tracker and Goals");
        await val.validateMonthlyReport();
        await validate.validateGAGoals(commonUserData.primaryGoal);
        await common.settingsOptions();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 12: Annual Pro Plan - Complete on-boarding with tracker installed and Competitors Specified', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Annual Pro');
        await common.proPlanAddCreditCard("371449635398431", "12/38", "Melinda", "392");
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors("Construction", commonUserData.competitors);
        await common.installTrackerSnippet();
        await common.onboardingClickDone("Annpro- Tracker and comp");
        await val.validateMonthlyReport();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 13: Annual Pro Plan - Complete on-boarding with tracker installed, goals and competitors specified', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Annual Pro');
        await common.proPlanAddCreditCard("371449635398431", "12/38", "Melinda", "392");
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectGoals(commonUserData.additionalGoals);
        await common.selectIndustryAndCompetitors("Construction", commonUserData.competitors);
        await common.installTrackerSnippet();
        await common.onboardingClickDone();
        await val.validateMonthlyReport();
        await validate.validateGAGoals(commonUserData.additionalGoals);
        await common.settingsOptions();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 14: Annual Pro Plan - Complete on-boarding with tracker installed after on-boarding', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Annual Pro');
        await common.proPlanAddCreditCard("371449635398431", "12/38", "Melinda", "392");
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors("Building Materials", []);
        await common.skipPluginInstall();
        await common.onboardingClickDone("Annpro- InstPluginAfterOnboarding");
        await val.validateMonthlyReport();
        await common.installTrackerSnippetFromSettingsPage();
        await common.logout();
    });

});
   /*
    it('Test Case 10: Annual Pro Plan - Add a new property with basic settings', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Annual Pro');
        await common.proPlanAddCreditCard();
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectGoals(commonUserData.additionalGoals);
        await common.selectIndustryAndCompetitors('Computer Games', commonUserData.competitors);
        await common.skipPluginInstall();
        await common.onboardingClickDone("Annpro- Add new property");
        await val.validateMonthlyReport();
        await common.addNewProperty("Monthly");
        await common.logout();
    });
});*/