const _ = require('lodash');
const common = require('../common/common_functions');
const val = require('../common/validations');
const {user: commonUserData} = require('../common/common_data');
const commonBeforeAfter = require('../common/commonBeforeAfter');

//Number of Tests: 12
//On-boarding using different options with Free/Monthly Pro and Annual pro plan types.

describe('Test on-boarding in case of Free plan, Monthly pro and Annaul pro plan types, #onboarding_tests#', async function () {
    commonBeforeAfter.loadBeforeAndAfterEach();

    it('C262 Log in with GA account using Free Plan and complete basic on-boarding', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await common.logout();
    });

    it('C263 Log in with non GA account using Free Plan and complete basic on-boarding', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Free');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await common.logout('quietlymedia@gmail.com');
    });

    it('C264 Log in with GA account using Free Plan and complete on-boarding specifying competitor', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await common.logout();
    });

    it('C265 Log in with non GA account using Free Plan and complete on-boarding specifying competitor', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Free');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await common.logout("quietlymedia@gmail.com");
    });

    it('C266 Log in with GA account using Monthly Pro Plan and complete basic on-boarding', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding();
        await common.logout();
    });

    it('C267 Log in with non GA account using Monthly Pro Plan and complete basic on-boarding', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding();
        await common.logout("quietlymedia@gmail.com");
    });

    it('C268 Log in with GA account using Monthly Pro Plan and complete on-boarding specifying 5 competitors', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.logout();
    });

    it('C269 Log in with non GA account using Monthly Pro Plan and complete on-boarding specifying 5 competitors', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.logout("quietlymedia@gmail.com");
    });

    it('C270 Log in with GA account using Annual Pro Plan and complete basic on-boarding', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding();
        await common.logout();
    });

    it('C271 Log in with non GA account using Annual Pro Plan and complete basic on-boarding', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding();
        await common.logout("quietlymedia@gmail.com");
    });

    it('C272 Log in with GA account using Annual Pro Plan and complete on-boarding specifying 5 competitors', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.logout();
    });

    it('C273 Log in with non GA account using Annual Pro Plan and complete on-boarding specifying 5 competitors', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.logout("quietlymedia@gmail.com");
    });

    it('C274 Onboard Monthly Pro Account with Promo Code', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await common.addPromoCode();
        await val.validatePromoCodeSuccess();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.goToAccountSettings();
        await val.validatePropertyPrice();
        await common.logout();
    });

    it('C275 Onboard Monthly Pro Account with invalid Promo Code', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await common.addPromoCode("INSIGHTS-0");
        await val.validatePromoCodeFailed();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.goToAccountSettings();
        await val.validatePropertyPrice("$195.00");
        await common.logout();
    });

    it('C276 Onboard Annual Pro Account with valid Promo Code', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await common.addPromoCode();
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.goToAccountSettings();
        await val.validatePropertyPrice("$1975.00");
        await common.logout();
    });

    it('C277 Onboard Annual Pro Account with invalid Promo Code', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await common.addPromoCode("INSIGHTS-0");
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.goToAccountSettings();
        await val.validatePropertyPrice("$1975.00");
        await common.logout();
    });
});
