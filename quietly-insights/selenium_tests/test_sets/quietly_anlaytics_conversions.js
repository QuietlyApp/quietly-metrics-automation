const common = require('../common/common_functions');
const val=require ('../common/validations');
const {user:commonUserData} = require('../common/common_data');
const commonBeforeAfter = require('../common/commonBeforeAfter');

//Number of Tests: 25

describe('Quietly Analytics Conversions Testing, #quietlyanalytics_conversions#', function () {
    commonBeforeAfter.loadBeforeAndAfterEach();

    it('Test Case 1: Monthly Pro plan - Verify if the user has no access to QA goals if Quietly Analytics code is not installed', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo();
        await common.basicOnboarding();
        await val.validateQAGoalsCannotBeAdded();
        await common.logout();
    });

    it('Test Case 2: Monthly Pro plan - Install plugin after on-boarding and check if the user is able to add Link Click goal', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installPluginFromSettingsPage();
        await common.settingsOptions();
        await common.addNewLinkClickGoal("https://stagingblog.quiet.ly/blog/uncategorized/sothebys-test/", "Sothebys");
        await val.validateLinkClickGoal("Sothebys");
        await common.logout();
    });

    it('Test Case 3: Monthly Pro plan - Install tracker after on-boarding and check if the user is able to add Link Click goal', async function () {
        await common.goToLandingPage('Monthly pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installTrackerSnippetFromSettingsPage();
        await common.settingsOptions();
        await common.addNewLinkClickGoal("https://blog.quiet.ly/insights/determining-your-content-marketing-goals/", "Content Marketing");
        await val.validateLinkClickGoal("Content Marketing");
        await common.logout();
    });

    it('Test Case 4: Monthly Pro plan - Install plugin after on-boarding and check if the user is able to add Form Submission goal', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo();
        await common.basicOnboarding();
        await common.installPluginFromSettingsPage();
        await common.settingsOptions();
        await common.addNewFormSubmissionGoal();
        await val.validateFormSubmissionGoal();
        await common.deleteAccount();
    });

    it('Test Case 5: Monthly Pro - Install tracker after on-boarding and check if the user is able to add Form Submission goal', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installTrackerSnippetFromSettingsPage();
        await common.settingsOptions();
        await common.addNewFormSubmissionGoal();
        await val.validateFormSubmissionGoal();
        await common.deleteAccount();
    });

    it('Test Case 6: Monthly Pro plan - Install plugin after on-boarding and check if the user is able to add one Link click and one Form Submission goal', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installPluginFromSettingsPage();
        await common.settingsOptions();
        await common.addNewLinkClickGoal("https://stagingblog.quiet.ly/blog/case-studies/builddirect/", "Build Direct");
        await val.validateLinkClickGoal("Build Direct");
        await common.waitForElementToBeClickableById("homeSettingsLink");
        await common.addNewFormSubmissionGoal();
        await val.validateFormSubmissionGoal();
        await common.deleteAccount();
    });

    it('Test Case 7: Monthly Pro plan - Install tracker after on-boarding and check if the user is able to add one Link click and one Form Submission goal', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installTrackerSnippetFromSettingsPage();
        await common.settingsOptions();
        await common.addNewLinkClickGoal("https://stagingblog.quiet.ly/blog/case-studies/builddirect/", "Build Direct");
        await val.validateLinkClickGoal("Build Direct");
        await common.waitForElementToBeClickableById("homeSettingsLink");
        await common.addNewFormSubmissionGoal();
        await val.validateFormSubmissionGoal();
        await common.deleteAccount();
    });

    it('Test Case 8: Monthly Pro plan - Install plugin after on-boarding and check if the user is able to add Link Click Pattern', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installPluginFromSettingsPage();
        await common.settingsOptions();
        await common.addNewPatternLinkClickGoal("https://stagingblog.quiet.ly/blog/case-studies/builddirect/", "Build Direct");
        await val.validateLinkClickGoal("Build Direct");
        await common.deleteAccount();
    });

    it('Test Case 9: Monthly Pro plan - Install tracker after on-boarding and check if the user is able to add Link Click Pattern', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo();
        await common.basicOnboarding();
        await common.installTrackerSnippetFromSettingsPage();
        await common.settingsOptions();
        await common.addNewPatternLinkClickGoal("https://stagingblog.quiet.ly/blog/case-studies/builddirect/", "Build Direct");
        await val.validateLinkClickGoal("Build Direct");
        await common.deleteAccount();
    });

    it('Test Case 10: Annual Pro plan - Verify if the user has no access to QA goals if Quietly Analytics code is not installed', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo();
        await common.basicOnboarding();
        await val.validateQAGoalsCannotBeAdded();
        await common.logout();
    });

    it('Test Case 11: Annual Pro plan - Install plugin after on-boarding and check if the user is able to add Link Click goal', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo();
        await common.basicOnboarding();
        await common.installPluginFromSettingsPage();
        await common.settingsOptions();
        await common.addNewLinkClickGoal("https://stagingblog.quiet.ly/blog/uncategorized/sothebys-test/", "Sothebys");
        await val.validateLinkClickGoal("Sothebys");
        await common.logout();
    });

    it('Test Case 12: Annual Pro plan - Install tracker after on-boarding and check if the user is able to add Link Click goal', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installTrackerSnippetFromSettingsPage();
        await common.settingsOptions();
        await common.addNewLinkClickGoal("https://stagingblog.quiet.ly/blog/uncategorized/sothebys-test/", "Sothebys");
        await val.validateLinkClickGoal("Sothebys");
        await common.logout();
    });

    it('Test Case 13: Annual Pro plan - Install plugin after on-boarding and check if the user is able to add Form Submission goal', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installPluginFromSettingsPage();
        await common.settingsOptions();
        await common.addNewFormSubmissionGoal();
        await val.validateFormSubmissionGoal();
        await common.deleteAccount();
    });

    it('Test Case 14: Annual Pro plan - Install tracker after on-boarding and check if the user is able to add Form Submission goal', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installTrackerSnippetFromSettingsPage();
        await common.settingsOptions();
        await common.addNewFormSubmissionGoal();
        await val.validateFormSubmissionGoal();
        await common.deleteAccount();
    });

    it('Test Case 15: Annual Pro plan - Install plugin after on-boarding and check if the user is able to add one Link click and one Form Submission goal', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo();
        await common.basicOnboarding();
        await common.installPluginFromSettingsPage();
        await common.settingsOptions();
        await common.addNewLinkClickGoal("https://stagingblog.quiet.ly/blog/case-studies/builddirect/", "Build Direct");
        await val.validateLinkClickGoal("Build Direct");
        await common.waitForElementToBeClickableById("homeSettingsLink");
        await common.addNewFormSubmissionGoal();
        await val.validateFormSubmissionGoal();
        await common.deleteAccount();
    });

    it('Test Case 16: Annual Pro plan - Install tracker after on-boarding and check if the user is able to add one Link click and one Form Submission goal', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo();
        await common.proPlanOnboardingWithComp();
        await common.installTrackerSnippetFromSettingsPage();
        await common.settingsOptions();
        await common.addNewLinkClickGoal("https://stagingblog.quiet.ly/blog/case-studies/builddirect/", "Build Direct");
        await val.validateLinkClickGoal("Build Direct");
        await common.waitForElementToBeClickableById("homeSettingsLink");
        await common.addNewFormSubmissionGoal();
        await val.validateFormSubmissionGoal();
        await common.deleteAccount();
    });

    it('Test Case 17: Annual Pro plan - Install plugin after on-boarding and check if the user is able to add Link Click Pattern', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo();
        await common.basicOnboarding();
        await common.installPluginFromSettingsPage();
        await common.settingsOptions();
        await common.addNewPatternLinkClickGoal("https://stagingblog.quiet.ly/blog/case-studies/builddirect/", "Build Direct");
        await val.validateLinkClickGoal("Build Direct");
        await common.deleteAccount();
    });

    it('Test Case 18: Annual Pro plan - Install tracker after on-boarding and check if the user is able to add Link Click Pattern', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo();
        await common.basicOnboarding();
        await common.installTrackerSnippetFromSettingsPage();
        await common.settingsOptions();
        await common.addNewPatternLinkClickGoal("https://stagingblog.quiet.ly/blog/case-studies/builddirect/", "Build Direct");
        await val.validateLinkClickGoal("Build Direct");
        await common.deleteAccount();
    });

    it('Test Case 19: Free plan - Verify if the user has no access to QA goals if Quietly Analytics code is not installed', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await val.validateQAGoalsCannotBeAdded();
        await common.logout();
    });

    it('Test Case 20: Free plan - Install plugin after on-boarding and check if the user is able to add Link Click goal', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await common.installPluginFromSettingsPage();
        await common.settingsOptions();
        await common.addNewLinkClickGoal("https://stagingblog.quiet.ly/blog/uncategorized/sothebys-test/", "Sothebys");
        await val.validateLinkClickGoal("Sothebys");
        await common.logout();
    });

    it('Test Case 21: Free plan - Install tracker after on-boarding and check if the user is able to add Link Click goal', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await common.installTrackerSnippetFromSettingsPage();
        await common.settingsOptions();
        await common.addNewLinkClickGoal("https://stagingblog.quiet.ly/blog/uncategorized/sothebys-test/", "Sothebys");
        await val.validateLinkClickGoal("Sothebys");
        await common.logout();
    });

    it('Test Case 22: Free plan - Install plugin after on-boarding and check if the user is able to add Form Submission goal', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await common.installPluginFromSettingsPage();
        await common.settingsOptions();
        await common.addNewFormSubmissionGoal();
        await val.validateFormSubmissionGoal();
        await common.deleteAccount();
    });

    it('Test Case 23: Free plan - Install tracker after on-boarding and check if the user is able to add Form Submission goal', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await common.installTrackerSnippetFromSettingsPage();
        await common.settingsOptions();
        await common.addNewFormSubmissionGoal();
        await val.validateFormSubmissionGoal();
        await common.deleteAccount();
    });

    it('Test Case 24: Free plan - Install plugin after on-boarding and check if the user is able to add link click pattern', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await common.installPluginFromSettingsPage();
        await common.settingsOptions();
        await common.addNewPatternLinkClickGoal("https://stagingblog.quiet.ly/blog/case-studies/builddirect/", "Build Direct");
        await val.validateLinkClickGoal("Build Direct");
        await common.deleteAccount();
    });

    it('Test Case 25: Free plan - Install tracker after on-boarding and check if the user is able to add link click pattern', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await common.installTrackerSnippetFromSettingsPage();
        await common.settingsOptions();
        await common.addNewPatternLinkClickGoal("https://stagingblog.quiet.ly/blog/case-studies/builddirect/", "Build Direct");
        await val.validateLinkClickGoal("Build Direct");
        await common.deleteAccount();
    });
});
/*
it('Test Case 6: Monthly pro Plan- Check for error message if user tries to add QA goal when user already has 3 GA goals', async function () {
    await common.goToLandingPage('Monthly Pro');
    await common.signInWithGmail();
    await val.validatePlanType('Monthly Pro');
    await common.creditCardInfo();
    await common.proPlanOnboardingWithComp();
    await common.installPluginFromSettingsPage();
    await common.goToGoalsSettings();
    await common.waitForElementToBeClickableById("settingsConversionsAddGoals");
    await common.waitForElementToBeClickableById("addGoalsLinkClicks");
    await common.waitForElementToSendKeysByid("goalUrl", "https://stagingblog.quiet.ly/blog/case-studies/builddirect/");
    await common.waitForElementToSendKeysByid("goalName", "Build Direct");
    await common.waitForElementToBeClickableById("addClickGoal");
    await val.validateGoalError();
    await common.delay(2000);
    await common.waitForElementToBeClickableById("addGoalsFormSubmission");
    await common.waitForElementToBeClickableById("launchVisualizer");
    await val.validateGoalError();
    await driver.executeScript("window.scrollTo(0,0);");
    await common.deleteAccount();
});

it('Test Case 16: Annual pro Plan- Check for error message if user tries to add QA goal when user already has 3 GA goals.', async function () {
    await common.goToLandingPage('Annual Pro');
    await common.signInWithGmail();
    await val.validatePlanType('Annual Pro');
    await common.creditCardInfo();
    await common.basicOnboarding();
    await common.installPluginFromSettingsPage();
    await common.goToGoalsSettings();
    await common.waitForElementToBeClickableById("settingsConversionsAddGoals");
    await common.waitForElementToBeClickableById("addGoalsLinkClicks");
    await common.waitForElementToSendKeysByid("goalUrl", "https://stagingblog.quiet.ly/blog/case-studies/builddirect/");
    await common.waitForElementToSendKeysByid("goalName", "Build Direct");
    await common.waitForElementToBeClickableById("addClickGoal");
    await val.validateGoalError();
    await common.delay(3000);
    await common.waitForElementToBeClickableById("addGoalsFormSubmission");
    await common.waitForElementToBeClickableById("launchVisualizer");
    await val.validateGoalError();
    await driver.executeScript("window.scrollTo(0,0);");
    await common.deleteAccount();
});*/