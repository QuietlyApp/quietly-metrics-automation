const common = require('../common/common_functions');
const val = require('../common/validations');
const commonBeforeAfter = require('../common/commonBeforeAfter');
const chai = require('chai');

//Number of Tests: 6

describe('Test on-boarding in case of switching plan type after login, #onboarding_plan_switch#', function () {
    commonBeforeAfter.loadBeforeAndAfterEach();

    it('AT-27: Login with Free Plan, switch to Monthly pro, complete on-boarding and check the Plan type', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.onboardingChangePlan('Monthly Pro');
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("378282246310005", "1/20", "Melinda", "6391");
        await common.basicOnboarding();
        await common.logout();
    });

    it('AT-28:Login as Free Plan and switch to Annual pro', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.onboardingChangePlan('Annual Pro');
        await val.validatePlanType('Annual Pro');
        await common.logout();
    });

    it('AT-29:Login with Monthly Pro Plan and switch to Free Plan', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.onboardingChangePlan('Free');
        await val.validatePlanType('Free');
        await common.logout();
    });

    it('AT-30:Login with Monthly Pro Plan and switch to Annual Pro Plan', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.onboardingChangePlan('Annual Pro');
        await val.validatePlanType('Annual Pro')
        await common.logout();
    });

    it('AT-31:Login with Annual Pro Plan and switch to Free Plan', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.onboardingChangePlan('Free');
        await val.validatePlanType('Free');
        await common.logout();
    });

    it('AT-32:Login with Annual Pro Plan and switch to Monthly Pro Plan', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.onboardingChangePlan('Monthly Pro');
        await val.validatePlanType('Monthly Pro');
        await common.logout();
    })
    
});
