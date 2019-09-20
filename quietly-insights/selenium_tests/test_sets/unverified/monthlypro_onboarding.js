/*const common = require('../common/common_functions');
const val = require('../common/validations');
const validate=require('../common/reports_settings_validations');
const {user:commonUserData} = require('../common/common_data');
const commonBeforeAfter = require('../common/commonBeforeAfter');

//Number of Tests: 14

describe('Monthly Pro_onboarding Tests, #monthlypro_onboarding#', function () {
    commonBeforeAfter.loadBeforeAndAfterEach();

    it('Test Case 1: Free Plan - Complete basic on-boarding and then setup competitors, import GA, install plugin and setup Goal', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await common.goToCompetitorsSettings();
        await common.selectCompetitors([commonUserData.competitor]);
        await common.saveSettings();
        await common.importGAFromSettings();
        await common.logout();
    });

    it('Test Case 1: Log in as a new user with Monthly Pro plan and complete basic on-boarding - No plugin, Competitors and Goals', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Monthly Pro');
        await common.proPlanAddCreditCard();
        await common.basicOnboarding(commonUserData.websiteurl);
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors(null,[]);
        await common.skipPluginInstall();
        await common.onboardingClickDone("Monthly Pro-Basic");
        await val.validateMonthlyReport();
        await common.logout();
    });

    it('Test Case 2: Log in as a new user with Monthly Pro Plan and complete on-boarding - Only Goals Specified', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Monthly Pro');
        await common.proPlanAddCreditCard();
        await common.basicOnboarding(commonUserData);
        await common.provideGoogleAnalyticsInfo();
        await common.selectGoals(commonUserData.additionalGoals);
        await common.selectIndustryAndCompetitors(null,[]);
        await common.skipPluginInstall();
        await common.onboardingClickDone("Monthly Pro-Goals");
        await val.validateMonthlyReport();
        await validate.validateGAGoals(commonUserData.additionalGoals);
        await common.logout();
    });

    it('Test Case 3: Log in as a new user with Monthly Pro Plan and complete on-boarding - Only Competitors Specified', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Monthly Pro');
        await common.proPlanAddCreditCard("5200828282828210", "15/28", "Padma", "785");
        await common.basicOnboarding();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors('Fishery', commonUserData.allCompetitors);
        await common.skipPluginInstall();
        await common.onboardingClickDone("Monthly Pro-Comp");
        await val.validateMonthlyReport();
        await common.goToCompetitorsSettings();
        await common.logout();
    });

    it('Test Case 4: Log in as a new user with Monthly Pro Plan and complete on-boarding - Competitors and Goals Specified', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Monthly Pro');
        await common.proPlanAddCreditCard("5105105105105100", "06/22", "Anne", "739");
        await common.basicOnboarding();
        await common.provideGoogleAnalyticsInfo();
        await common.selectGoals(commonUserData.additionalGoals);
        await common.selectIndustryAndCompetitors('Retail', commonUserData.competitors);
        await common.skipPluginInstall();
        await common.onboardingClickDone("Monthly Pro-Goals&Comp");
        await val.validateMonthlyReport();
        await validate.validateGAGoals(commonUserData.additionalGoals);
        await common.logout();
    });

    it('Test Case 5: Log in as a new user with Monthly Pro Plan and complete on-boarding with plugin installed', async function () {
        //expect(process.env.NODE_ENV).to.equal("qa");
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Monthly Pro');
        await common.proPlanAddCreditCard("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors("Building Materials", []);
        await common.installWordPressPlugin();
        await common.onboardingClickDone("Monthly Pro plugin installed");
        await val.validateMonthlyReport();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 6: Log in as a new user with Monthly Pro Plan and install plugin after on-boarding', async function () {
        //    expect(process.env.NODE_ENV).to.equal("qa");
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Monthly Pro');
        await common.proPlanAddCreditCard("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors("Building Materials", []);
        await common.skipPluginInstall();
        await common.onboardingClickDone("Monpro- InstPluginAfterOnboarding");
        await val.validateMonthlyReport();
        await common.installPluginFromSettingsPage();
        await common.delay(2000);
        await common.logout();
    });

    it('Test Case 7: Monthly Pro Plan - On-boarding with plugin installed and Goals Specified', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Monthly Pro');
        await common.proPlanAddCreditCard();
        await common.basicOnboarding();
        await common.provideGoogleAnalyticsInfo();
        await common.selectGoals(commonUserData.additionalGoals);
        await common.selectIndustryAndCompetitors(null,[]);
        await common.installWordPressPlugin();
        await common.delay(2000);
        await common.onboardingClickDone("Monpro- PluginAndGoals");
        await val.validateMonthlyReport();
        await validate.validateGAGoals(commonUserData.additionalGoals);
        await common.settingsOptions();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 8: Monthly Pro Plan - On-boarding with plugin installed and Competitors Specified', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Monthly Pro');
        await common.proPlanAddCreditCard();
        await common.basicOnboarding();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors('Computer Games', commonUserData.competitors);
        await common.installWordPressPlugin();
        await common.delay(2000);
        await common.onboardingClickDone("Monpro- PluginAndComp");
        await val.validateMonthlyReport();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 9: Monthly Pro Plan - On-boarding with plugin installed, Goals and Competitors Specified', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Monthly Pro');
        await common.proPlanAddCreditCard("5200828282828210", "15/28", "Roshni", "785");
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectGoals(commonUserData.additionalGoals);
        await common.selectIndustryAndCompetitors('Computer Games', commonUserData.competitors);
        await common.installWordPressPlugin();
        await common.delay(2000);
        await common.onboardingClickDone("Monpro- PluginGoalsAndComp");
        await val.validateMonthlyReport();
        await validate.validateGAGoals(commonUserData.additionalGoals);
        await common.settingsOptions();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 10: Monthly Pro Plan - Complete on-boarding with tracker installed', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Monthly Pro');
        await common.proPlanAddCreditCard("371449635398431", "12/38", "Melinda", "392");
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors("Building Materials", []);
        await common.installTrackerSnippet();
        await common.delay(2000);
        await common.onboardingClickDone("Monpro- Trackerinstalled");
        await val.validateMonthlyReport();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 11: Monthly Pro Plan - Complete on-boarding with tracker installed and Goals Specified', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Monthly Pro');
        await common.proPlanAddCreditCard("371449635398431", "12/38", "Melinda", "392");
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectGoals(commonUserData.primaryGoal);
        await common.selectIndustryAndCompetitors("Construction",[]);
        await common.installTrackerSnippet();
        await common.onboardingClickDone("Monpro- Tracker and Goals");
        await val.validateMonthlyReport();
        await validate.validateGAGoals(commonUserData.primaryGoal);
        await common.settingsOptions();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });


    it ('Test Case 12: Monthly Pro Plan - Complete on-boarding with tracker installed and Competitors Specified', async function(){
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Monthly Pro');
        await common.proPlanAddCreditCard("371449635398431", "12/38", "Melinda", "392");
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors("Construction",commonUserData.competitors);
        await common.installTrackerSnippet();
        await common.onboardingClickDone("Monpro- Tracker and Comp");
        await val.validateMonthlyReport();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 13: Monthly Pro Plan - Complete on-boarding with tracker installed, goals and competitors specified', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Monthly Pro');
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

    it('Test Case 14: Monthly Pro Plan - Complete on-boarding with tracker installed after on-boarding', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Monthly Pro');
        await common.proPlanAddCreditCard("371449635398431", "12/38", "Melinda", "392");
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors("Building Materials", []);
        await common.skipPluginInstall();
        await common.onboardingClickDone("Monpro- InstPluginAfterOnboarding");
        await val.validateMonthlyReport();
        await common.installTrackerSnippetFromSettingsPage();
        await common.logout();
    });
});

/* /* it('Test Case 2: Log in as a new user with Free Plan and complete on-boarding with only goal specified', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Free');
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectGoals(["Total Blog CTA Clicks"]);
        await common.selectIndustryAndCompetitors("Computer Games", []);
        await common.skipPluginInstall();
        await common.onboardingClickDone("Free Plan-Goal");
        await val.validateMonthlyReport();
        await validate.validateGAGoals(["Total Blog CTA Clicks"]);
        await common.logout();
    });

    it('Test Case 3: Log in as a new user with Free Plan and complete on-boarding with competitor specified', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Free');
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors("Retail",commonUserData.competitor);
        await common.skipPluginInstall();
        await common.onboardingClickDone("Free Plan-Comp");
        await val.validateMonthlyReport();
        await common.logout();
    });

    it('Test Case 4: Log in as a new user with Free Plan and complete on-boarding with Primary Goal and competitor specified', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Free');
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectGoals(["Agency CTA Clicks"]);
        await common.selectIndustryAndCompetitors("Retail", commonUserData.competitor);
        await common.skipPluginInstall();
        await common.onboardingClickDone("Free Plan-Goal$Comp");
        await val.validateMonthlyReport();
        await validate.validateGAGoals(["Agency CTA Clicks"]);
        await common.logout();
    });

    it('Test Case 5: Log in as a new user with Free Plan and complete on-boarding with plugin installed', async function () {
        // expect(process.env.NODE_ENV).to.equal("qa");
        await common.goToLandingPage('Free');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Free');
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors("Retail", []);
        await common.installWordPressPlugin();
        await common.onboardingClickDone("Free Plan-Plugin Installed");
        await val.validateMonthlyReport();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 6: Log in as a new user with Free Plan and complete on-boarding and install plugin after on-boarding', async function () {
        //expect(process.env.NODE_ENV).to.equal("qa");
        await common.goToLandingPage('Free');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Free');
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors("Retail", []);
        await common.skipPluginInstall();
        await common.onboardingClickDone("Free-InstPluginAfterOnboarding");
        await val.validateMonthlyReport();
        await common.installPluginFromSettingsPage();
        await common.logout();
    });

    it('Test Case 7:Log in as a new user with Free Plan and complete on-boarding with plugin installed and Goal Specified', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Free');
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectGoals(["Agency CTA Clicks"]);
        await common.selectIndustryAndCompetitors(null, []);
        await common.installWordPressPlugin();
        await common.delay(2000);
        await common.onboardingClickDone("FreePlan-PluginAndGoals");
        await val.validateMonthlyReport();
        await validate.validateGAGoals(["Agency CTA Clicks"]);
        await common.settingsOptions();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 8:Log in as a new user with Free Plan and complete on-boarding with plugin installed and Competitor Specified', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Free');
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors("Computer Games",commonUserData.competitor);
        await common.installWordPressPlugin();
        await common.delay(2000);
        await common.onboardingClickDone("Free-PluginAndComp");
        await val.validateMonthlyReport();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 9:Log in as a new user with Free Plan and complete on-boarding with plugin installed, Goals and Competitors Specified', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Free');
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectGoals(["Total Blog CTA Clicks"]);
        await common.selectIndustryAndCompetitors("Computer Games",commonUserData.competitor);
        await common.installWordPressPlugin();
        await common.delay(2000);
        await common.onboardingClickDone("Free-PluginGoalsAndComp");
        await val.validateMonthlyReport();
        await validate.validateGAGoals(["Total Blog CTA Clicks"]);
        await common.settingsOptions();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 10:Log in as a new user with Free Plan and complete on-boarding with tracker installed.', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Free');
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors("Computer Games", []);
        await common.installTrackerSnippet();
        await common.delay(2000);
        await common.onboardingClickDone("Free-Tracker installed");
        await val.validateMonthlyReport();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it ("Test Case 11: Free Plan - Complete on-boarding having tracker installed and Goals specified.", async function(){
        await common.goToLandingPage('Free');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Free');
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectGoals(commonUserData.primaryGoal);
        await common.selectIndustryAndCompetitors();
        await common.installTrackerSnippet();
        await common.delay(2000);
        await common.onboardingClickDone("Free- Tracker and goals");
        await val.validateMonthlyReport();
        await validate.validateGAGoals(commonUserData.primaryGoal);
        await common.settingsOptions();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it('Test Case 12: Free Plan - Complete on-boarding having tracker installed and competitors specified', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Free');
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors("Computer Games",commonUserData.competitor);
        await common.installTrackerSnippet();
        await common.delay(2000);
        await common.onboardingClickDone("Free- Tracker and comp");
        await val.validateMonthlyReport();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it ('Test Case 13: Free Plan - Complete on-boarding having tracker installed,goals and competitors specified', async function(){
        await common.goToLandingPage('Free');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Free');
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectGoals(commonUserData.primaryGoal);
        await common.selectIndustryAndCompetitors("Computer Games",commonUserData.competitor);
        await common.installTrackerSnippet();
        await common.delay(2000);
        await common.onboardingClickDone();
        await val.validateMonthlyReport();
        await validate.validateGAGoals(commonUserData.primaryGoal);
        await common.settingsOptions();
        await val.validatePluginInstallSuccessMessage();
        await common.logout();
    });

    it ('Test Case 14: Free Plan - Complete on-boarding having tracker installed after on-boarding', async function(){
        await common.goToLandingPage('Free');
        await common.signInWithGoogleAndAllow();
        await val.ensureOnboardingSteps('Free');
        await common.provideBlogUrl();
        await common.provideGoogleAnalyticsInfo();
        await common.selectNoGoals();
        await common.selectIndustryAndCompetitors("Computer Games",commonUserData.competitors);
        await common.skipPluginInstall();
        await common.onboardingClickDone();
        await val.validateMonthlyReport();
        await common.installTrackerSnippetFromSettingsPage();
        await common.logout();
    });

   // Login tests

    it('Test Case 3: Verify whether the "Cancel" button gives a proper warning message to the user', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGoogleAndCancel();
        await val.couldNotConnectToGaMessage();
    });

    it('Test Case 6: Verify whether the "Cancel" button gives a proper warning message to the user', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGoogleAndCancel();
        await val.couldNotConnectToGaMessage();
    });
    it('Test Case 9: Verify whether the "Cancel" button gives a proper warning message to the user', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGoogleAndCancel();
        await val.couldNotConnectToGaMessage();
    });

    // Quietly Analytics Conversions

    it('Test Case 11: Monthly Pro plan - Add a link click goal and Form Submission goal when plugin is installed after on-boarding.', async function () {
    await common.goToLandingPage('Monthly Pro');
    await common.signInWithGmail();
    await val.validatePlanType('Monthly Pro');
    await common.creditCardInfo();
    await common.provideBlogUrl();
    await common.provideGoogleAnalyticsInfo();
    await common.selectGoals();
    await common.selectIndustryAndCompetitors();
    await common.skipPluginInstall();
    await common.delay(2000);
    await common.onboardingClickDone();
    await val.validateMonthlyReport();
    await common.installPluginFromSettingsPage();
    await common.waitForElementToBeClickableById("homeSettingsLink");
    await common.addNewLinkClickGoal("https://stagingblog.quiet.ly/blog/case-studies/builddirect/", "Build Direct");
    await common.waitForElementToBeClickableById("homeSettingsLink");
    await common.addNewFormSubmissionGoal("//input[@name='newsletterFullName']", "Newsletter");
    await common.deleteAccount();
});

it('Test Case 12: Monthly Pro plan - Add a link click goal and Form Submission goal when tracker is installed after on-boarding.', async function () {
    await common.goToLandingPage('Monthly Pro');
    await common.signInWithGmail();
    await val.validatePlanType('Monthly Pro');
    await common.creditCardInfo();
    await common.provideBlogUrl();
    await common.provideGoogleAnalyticsInfo();
    await common.selectGoals();
    await common.selectIndustryAndCompetitors();
    await common.skipPluginInstall();
    await common.delay(2000);
    await common.onboardingClickDone();
    await val.validateMonthlyReport();
    await common.installTrackerSnippetFromSettingsPage();
    await common.waitForElementToBeClickableById("homeSettingsLink");
    await common.addNewLinkClickGoal("https://stagingblog.quiet.ly/blog/case-studies/builddirect/", "Build Direct");
    await common.waitForElementToBeClickableById("homeSettingsLink");
    await common.addNewFormSubmissionGoal("//input[@name='newsletterFullName']", "Newsletter");
    await common.deleteAccount();
});

it('Test Case 23: Annual Pro plan - Add a link click goal and Form Submission goal when plugin is installed after on-boarding.', async function () {
    await common.goToLandingPage('Annual Pro');
    await common.signInWithGmail();
    await val.validatePlanType('Annual Pro');
    await common.creditCardInfo();
    await common.provideBlogUrl();
    await common.provideGoogleAnalyticsInfo();
    await common.selectGoals();
    await common.selectIndustryAndCompetitors();
    await common.skipPluginInstall();
    await common.delay(2000);
    await common.onboardingClickDone();
    await val.validateMonthlyReport();
    await common.installPluginFromSettingsPage();
    await common.waitForElementToBeClickableById("homeSettingsLink");
    await common.addNewLinkClickGoal("https://stagingblog.quiet.ly/blog/case-studies/builddirect/", "Build Direct");
    await common.waitForElementToBeClickableById("homeSettingsLink");
    await common.addNewFormSubmissionGoal("//input[@name='newsletterFullName']", "Newsletter");
    await common.deleteAccount();
});

it('Test Case 24: Annual Pro plan - Add a link click goal and Form Submission goal when tracker is installed after on-boarding.', async function () {
    await common.goToLandingPage('Annual Pro');
    await common.signInWithGmail();
    await val.validatePlanType('Annual Pro');
    await common.creditCardInfo();
    await common.provideBlogUrl();
    await common.provideGoogleAnalyticsInfo();
    await common.selectGoals();
    await common.selectIndustryAndCompetitors();
    await common.skipPluginInstall();
    await common.delay(2000);
    await common.onboardingClickDone();
    await val.validateMonthlyReport();
    await common.installTrackerSnippetFromSettingsPage();
    await common.waitForElementToBeClickableById("homeSettingsLink");
    await common.addNewLinkClickGoal("https://stagingblog.quiet.ly/blog/case-studies/builddirect/", "Build Direct");
    await common.waitForElementToBeClickableById("homeSettingsLink");
    await common.addNewFormSubmissionGoal("//input[@name='newsletterFullName']", "Newsletter");
    await common.deleteAccount();
});
    */
