const _ = require('lodash');
const common = require('../common/common_functions');
const val = require('../common/validations');
const {user: commonUserData} = require('../common/common_data');
const commonBeforeAfter = require('../common/commonBeforeAfter');

//Number of Tests: 12
//On-boarding using different options with Free/Monthly Pro and Annual pro plan types.

describe('Test on-boarding in case of Free plan, Monthly pro and Annaul pro plan types, #onboarding_tests#', async function () {
    commonBeforeAfter.loadBeforeAndAfterEach();

    it('C137: Log in with GA account using Free Plan and complete basic on-boarding', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await common.logout();
    });

    it('C138: Log in with non GA account using Free Plan and complete basic on-boarding', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Free');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Free');
        await common.basicOnboarding();
        await common.logout('quietlymedia@gmail.com');
    });

    it('C139: Log in with GA account using Free Plan and complete on-boarding specifying competitor', async function () {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await common.logout();
    });

    it('C140: Log in with non GA account using Free Plan and complete on-boarding specifying competitor', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Free');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Free');
        await common.freePlanOnboardingWithComp();
        await common.logout("quietlymedia@gmail.com");
    });

    it('C141: Log in with GA account using Monthly Pro Plan and complete basic on-boarding', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding();
        await common.logout();
    });

    it('C142: Log in with non GA account using Monthly Pro Plan and complete basic on-boarding', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding();
        await common.logout("quietlymedia@gmail.com");
    });

    it('C143: Log in with GA account using Monthly Pro Plan and complete on-boarding specifying 5 competitors', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.logout();
    });

    it('C144: Log in with non GA account using Monthly Pro Plan and complete on-boarding specifying 5 competitors', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.logout("quietlymedia@gmail.com");
    });

    it('C145: Log in with GA account using Annual Pro Plan and complete basic on-boarding', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding();
        await common.logout();
    });

    it('C146: Log in with non GA account using Annual Pro Plan and complete basic on-boarding', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.basicOnboarding();
        await common.logout("quietlymedia@gmail.com");
    });

    it('C147: Log in with GA account using Annual Pro Plan and complete on-boarding specifying 5 competitors', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.logout();
    });

    it('C148: Log in with non GA account using Annual Pro Plan and complete on-boarding specifying 5 competitors', async function () {
        commonUserData.userName='quietlymedia@gmail.com';
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("371449635398431", "12/38", "Melinda", "392");
        await common.proPlanOnboardingWithComp();
        await common.logout("quietlymedia@gmail.com");
    });

    it('C182: Onboard Monthly Pro Account with Promo Code', async function () {
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

    it('C183: Onboard Monthly Pro Account with invalid Promo Code', async function () {
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

    it('C184: Onboard Annual Pro Account with valid Promo Code', async function () {
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

    it('C185: Onboard Annual Pro Account with invalid Promo Code', async function () {
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
