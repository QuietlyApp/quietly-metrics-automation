const _ = require('lodash');
const common = require('../common/common_functions');
const val = require('../common/validations');
const {user: commonUserData} = require('../common/common_data');
const commonBeforeAfter = require('../common/commonBeforeAfter');

//Number of Tests: 12
//On-boarding using different options with Free/Monthly Pro and Annual pro plan types.

describe('Test on-boarding in case of Free plan, Monthly pro and Annaul pro plan types, #onboarding_tests#', async function () {
    commonBeforeAfter.loadBeforeAndAfterEach();

    it('Test Case 1: Log in with GA account using Free Plan and complete basic on-boarding', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await common.logout();
    });

    it('Test Case 2: Log in with non GA account using Free Plan and complete basic on-boarding', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Free');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await common.logout('quietlymedia@gmail.com');
    });

    it('Test Case 3: Log in with GA account using Free Plan and complete on-boarding specifying competitor', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await common.logout();
    });

    it('Test Case 4: Log in with non GA account using Free Plan and complete on-boarding specifying competitor', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Free');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await common.logout("quietlymedia@gmail.com");
    });

    it('Test Case 5: Log in with GA account using Monthly Pro Plan and complete basic on-boarding', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding();
        await common.logout();
    });

    it('Test Case 6: Log in with non GA account using Monthly Pro Plan and complete basic on-boarding', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding();
        await common.logout("quietlymedia@gmail.com");
    });

    it('Test Case 7: Log in with GA account using Monthly Pro Plan and complete on-boarding specifying 5 competitors', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.logout();
    });

    it('Test Case 8: Log in with non GA account using Monthly Pro Plan and complete on-boarding specifying 5 competitors', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.logout("quietlymedia@gmail.com");
    });

    it('Test Case 9: Log in with GA account using Annual Pro Plan and complete basic on-boarding', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding();
        await common.logout();
    });

    it('Test Case 10: Log in with non GA account using Annual Pro Plan and complete basic on-boarding', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding();
        await common.logout("quietlymedia@gmail.com");
    });

    it('Test Case 11: Log in with GA account using Annual Pro Plan and complete on-boarding specifying 5 competitors', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.logout();
    });

    it('Test Case 12: Log in with non GA account using Annual Pro Plan and complete on-boarding specifying 5 competitors', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.logout("quietlymedia@gmail.com");
    });

});
