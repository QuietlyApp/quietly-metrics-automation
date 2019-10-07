const _ = require('lodash');
const common = require('../common/common_functions');
const val = require('../common/validations');
const {user: commonUserData} = require('../common/common_data');
const commonBeforeAfter = require('../common/commonBeforeAfter');

//Number of Tests: 15

describe('Upgrade Tests, #upgradetoproplan#', async function () {
    commonBeforeAfter.loadBeforeAndAfterEach();

    it('C196: Log in as a new user with Free Plan and upgrade to monthly pro plan from the goals section of the dashboard', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await waitForElementToBeClickable("//div[@class='top-nav__arrow']");
        await waitForElementToBeClickableById("topNavAccountSettings");
        await waitForElementToBeClickableById("editButtonForProperty0");
        await waitForElementToBeClickableById("upgradeToProForProperty0");
        await common.selectBillingOption("Monthly");
        await common.upgradeToProPlan();
        await val.validateMonthlyProPlanFromSettings();
        await common.logout();
    });

    it('C197: Log in as a new user with Free Plan and upgrade to annual pro plan from the goals section of the dashboard', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await waitForElementToBeClickable("//div[@class='top-nav__arrow']");
        await waitForElementToBeClickableById("topNavAccountSettings");
        await waitForElementToBeClickableById("editButtonForProperty0");
        await waitForElementToBeClickableById("upgradeToProForProperty0");
        await common.selectBillingOption("Annual");
        await common.upgradeToProPlan();
        await val.validateAnnualProPlanFromSettings();
        await common.logout();
    });

    it('C198: Upgrade Account to Monthly Pro with Valid Promocode', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await waitForElementToBeClickable("//div[@class='top-nav__arrow']");
        await waitForElementToBeClickableById("topNavAccountSettings");
        await waitForElementToBeClickableById("editButtonForProperty0");
        await waitForElementToBeClickableById("upgradeToProForProperty0");
        await common.addPromoCode();
        await val.validatePromoCodeSuccess();
        await common.selectBillingOption("Monthly");
        await common.upgradeToProPlan();
        await val.validatePropertyPrice();
        await val.validateMonthlyProPlanFromSettings();
        await common.logout();
    });

    it('C199: Upgrade Account to Monthly Pro with Invalid Promocode', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await waitForElementToBeClickable("//div[@class='top-nav__arrow']");
        await waitForElementToBeClickableById("topNavAccountSettings");
        await waitForElementToBeClickableById("editButtonForProperty0");
        await waitForElementToBeClickableById("upgradeToProForProperty0");
        await common.addPromoCode("INSIGHTS-0");
        await val.validatePromoCodeFailed();
        await common.selectBillingOption("Monthly");
        await common.upgradeToProPlan();
        await val.validateMonthlyProPlanFromSettings();
        await common.logout();
    });

    it('C200: Upgrade Account to Yearly Pro with Promocode', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await waitForElementToBeClickable("//div[@class='top-nav__arrow']");
        await waitForElementToBeClickableById("topNavAccountSettings");
        await waitForElementToBeClickableById("editButtonForProperty0");
        await waitForElementToBeClickableById("upgradeToProForProperty0");
        await common.addPromoCode();
        await val.validatePromoCodeSuccess();
        await common.selectBillingOption("Annual");
        await common.upgradeToProPlan();
        await val.validatePropertyPrice("$1975.00");
        await val.validateAnnualProPlanFromSettings();
        await common.logout();
    });

    // it('Test Case 3: Log in as a new user with Free Plan and upgrade to monthly pro plan from the middle-of-funnel content ideas page', async function () {
    //     await common.goToLandingPage('Free');
    //     await common.signInWithGmail();
    //     await val.validatePlanType('Free');
    //     await common.basicOnboarding();
    //     await common.goToContentIdeasPage();
    //     await common.waitForElementToBeClickableById("UpgradeTopicMiddleFunnelBtn");
    //     await common.selectBillingOption("Monthly");
    //     await common.upgradeToProPlanAndRefresh();
    //     await val.validateMonthlyProPlanFromSettings();
    //     await common.logout();
    // });

    // it('Test Case 4: Log in as a new user with Free Plan and upgrade to annual pro plan from the middle-of-funnel content ideas page', async function () {
    //     await common.goToLandingPage('Free');
    //     await common.signInWithGmail();
    //     await val.validatePlanType('Free');
    //     await common.basicOnboarding();
    //     await common.goToContentIdeasPage();
    //     await common.waitForElementToBeClickableById("UpgradeTopicMiddleFunnelBtn");
    //     await common.selectBillingOption("Annual");
    //     await common.upgradeToProPlanAndRefresh();
    //     await val.validateAnnualProPlanFromSettings();
    //     await common.logout();
    // });

    // it('Test Case 5: Log in as a new user with Free Plan and upgrade to monthly pro plan from the bottom-of-funnel content ideas page', async function () {
    //     await common.goToLandingPage('Free');
    //     await common.signInWithGmail();
    //     await val.validatePlanType('Free');
    //     await common.basicOnboarding();
    //     await common.goToContentIdeasPage();
    //     await common.waitForElementToBeClickableById("UpgradeBottomMiddleFunnelBtn");
    //     await common.selectBillingOption("Monthly");
    //     await common.upgradeToProPlanAndRefresh();
    //     await val.validateMonthlyProPlanFromSettings();
    //     await common.logout();
    // });

    // it('Test Case 6: Log in as a new user with Free Plan and upgrade to annual pro plan from the bottom-of-funnel content ideas page', async function () {
    //     await common.goToLandingPage('Free');
    //     await common.signInWithGmail();
    //     await val.validatePlanType('Free');
    //     await common.basicOnboarding();
    //     await common.goToContentIdeasPage();
    //     await common.waitForElementToBeClickableById("UpgradeBottomMiddleFunnelBtn");
    //     await common.selectBillingOption("Annual");
    //     await common.upgradeToProPlanAndRefresh();
    //     await val.validateAnnualProPlanFromSettings();
    //     await common.logout();
    // });

    // it('Test Case 7: Log in as a new user with Free Plan and upgrade to monthly pro plan from the goal settings page', async function () {
    //     await common.goToLandingPage('Free');
    //     await common.signInWithGmail();
    //     await val.validatePlanType('Free');
    //     await common.basicOnboarding();
    //     await common.goToGoalsSettings();
    //     await common.waitForElementToBeClickableById("upgradeToProGoalsSettings");
    //     await common.selectBillingOption("Monthly");
    //     await common.upgradeToProPlanAndRefresh();
    //     await val.validateMonthlyProPlanFromSettings();
    //     await common.logout();
    // });

    // it('Test Case 8: Log in as a new user with Free Plan and upgrade to annual pro plan from the goal settings page', async function () {
    //     await common.goToLandingPage('Free');
    //     await common.signInWithGmail();
    //     await val.validatePlanType('Free');
    //     await common.basicOnboarding();
    //     await common.goToGoalsSettings();
    //     await common.waitForElementToBeClickableById("upgradeToProGoalsSettings");
    //     await common.selectBillingOption("Annual");
    //     await common.upgradeToProPlanAndRefresh();
    //     await val.validateAnnualProPlanFromSettings();
    //     await common.logout();
    // });

    // it('Test Case 9: Log in as a new user with Free Plan and upgrade to monthly pro plan from the competitors settings page', async function () {
    //     await common.goToLandingPage('Free');
    //     await common.signInWithGmail();
    //     await val.validatePlanType('Free');
    //     await common.basicOnboarding();
    //     await common.goToCompetitorsSettings();
    //     await common.waitForElementToBeClickableById("upgradeToProCompetitorSettings");
    //     await common.selectBillingOption("Monthly");
    //     await common.upgradeToProPlanAndRefresh();
    //     await val.validateMonthlyProPlanFromSettings();
    //     await common.logout();
    // });

    // it('Test Case 10: Log in as a new user with Free Plan and upgrade to annual pro plan from the competitors settings page', async function () {
    //     await common.goToLandingPage('Free');
    //     await common.signInWithGmail();
    //     await val.validatePlanType('Free');
    //     await common.freePlanOnboardingWithComp();
    //     await common.goToCompetitorsSettings();
    //     await common.waitForElementToBeClickableById("upgradeToProCompetitorSettings");
    //     await common.selectBillingOption("Annual");
    //     await common.upgradeToProPlanAndRefresh();
    //     await val.validateAnnualProPlanFromSettings();
    //     await common.logout();
    // });

    // it('Test Case 11: Log in with non GA account using Free Plan and upgrade to monthly pro plan from the goals section of the dashboard', async function () {
    //     commonUserData.userName='quietlymedia@gmail.com';
    //     await common.goToLandingPage('Free');
    //     await common.signInWithGmail('quietlymedia@gmail.com');
    //     await val.validatePlanType('Free');
    //     await common.basicOnboarding();
    //     await common.waitForElementToBeClickableById("overviewUpgradeBtn");
    //     await common.selectBillingOption("Monthly");
    //     await common.upgradeToProPlanAndRefresh();
    //     await val.validateMonthlyProPlanFromSettings();
    //     await common.logout('quietlymedia@gmail.com');
    // });

    // it('Test Case 12: Log in with non GA account using Free Plan and upgrade to annual pro plan from the middle-of-funnel content ideas page', async function () {
    //     commonUserData.userName='quietlymedia@gmail.com';
    //     await common.goToLandingPage('Free');
    //     await common.signInWithGmail('quietlymedia@gmail.com');
    //     await val.validatePlanType('Free');
    //     await common.basicOnboarding();
    //     await common.goToContentIdeasPage();
    //     await common.waitForElementToBeClickableById("UpgradeTopicMiddleFunnelBtn");
    //     await common.selectBillingOption("Annual");
    //     await common.upgradeToProPlanAndRefresh();
    //     await val.validateAnnualProPlanFromSettings();
    //     await common.logout('quietlymedia@gmail.com');
    // });

    // it('Test Case 13: Log in with non GA account using Free Plan and upgrade to monthly pro plan from the bottom-of-funnel content ideas page', async function () {
    //     commonUserData.userName='quietlymedia@gmail.com';
    //     await common.goToLandingPage('Free');
    //     await common.signInWithGmail('quietlymedia@gmail.com');
    //     await val.validatePlanType('Free');
    //     await common.basicOnboarding();
    //     await common.goToContentIdeasPage();
    //     await common.waitForElementToBeClickableById("UpgradeBottomMiddleFunnelBtn");
    //     await common.selectBillingOption("Monthly");
    //     await common.upgradeToProPlanAndRefresh();
    //     await val.validateMonthlyProPlanFromSettings();
    //     await common.logout('quietlymedia@gmail.com');
    // });

    // it('Test Case 14: Log in with non GA account using Free Plan and upgrade to annual pro plan from the goal settings page', async function () {
    //     commonUserData.userName='quietlymedia@gmail.com';
    //     await common.goToLandingPage('Free');
    //     await common.signInWithGmail('quietlymedia@gmail.com');
    //     await val.validatePlanType('Free');
    //     await common.basicOnboarding();
    //     await common.goToGoalsSettings();
    //     await common.waitForElementToBeClickableById("upgradeToProGoalsSettings");
    //     await common.selectBillingOption("Annual");
    //     await common.upgradeToProPlanAndRefresh();
    //     await val.validateAnnualProPlanFromSettings();
    //     await common.logout('quietlymedia@gmail.com');
    // });

    // it('Test Case 15: Log in with non GA account using Free Plan and upgrade to monthly pro plan from the competitors settings page', async function () {
    //     commonUserData.userName='quietlymedia@gmail.com';
    //     await common.goToLandingPage('Free');
    //     await common.signInWithGmail('quietlymedia@gmail.com');
    //     await val.validatePlanType('Free');
    //     await common.basicOnboarding();
    //     await common.goToCompetitorsSettings();
    //     await common.waitForElementToBeClickableById("upgradeToProCompetitorSettings");
    //     await common.selectBillingOption("Monthly");
    //     await common.upgradeToProPlanAndRefresh();
    //     await val.validateMonthlyProPlanFromSettings();
    //     await common.logout('quietlymedia@gmail.com');
    // });

});