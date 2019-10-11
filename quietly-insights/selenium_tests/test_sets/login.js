//Not a valid test set anymore
const common = require('../common/common_functions');
const val = require('../common/validations');
const commonBeforeAfter = require('../common/commonBeforeAfter');

//Number of Tests: 8

describe('Login Tests, #login_tests#', function () {
    commonBeforeAfter.loadBeforeAndAfterEach();

    it('C255 Log in as a new user with Monthly Pro plan and verify if the user is navigated to the pro plan', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.logout();
    });

    it('C256 Log in into "Quietly Insights" with Monthly Pro plan with non Google Analytics account', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Monthly Pro');
        await common.logout("quietlymedia@gmail.com");
    });

    it('C257 Log in as a new user with "Annual Pro plan" and verify if the user is navigated to the pro plan', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.logout();
    });

    it('C258 Log in into "Quietly Insights" with Annual Pro plan with non Google Analytics account', async function() {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Annual Pro');
        await common.logout("quietlymedia@gmail.com");
    });

    it('C259 Log in as a new user with "Free plan" and verify if the user is navigated to the Free plan', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail();
        await val.validatePlanType('Free');
        await common.logout();
    });

    it('C260 Log in into "Quietly Insights" with Free plan with non Google Analytics account', async function() {
        await common.goToLandingPage('Free');
        await common.signInWithGmail("quietlymedia@gmail.com", "N0morewaffles");
        await val.validatePlanType('Free');
        await common.logout("quietlymedia@gmail.com");
    });

    it('C261 Verify whether the "Quietly Logo" on the pricing page navigates the user to the home page', async function() {
        await common.goToLandingPage('Monthly Pro');
        await common.waitForElementToBeClickableById("homeLogo");
        await val.validatePageURL("https://insights.quiet.ly/");
    });

    // it('AT-14: Verify whether the "Support" link on the home page navigates the user to the Resource Center page', async function() {
    //     await common.goToLandingPage('Annual Pro');
    //     await common.waitForElementToBeClickableById("homeLogo");
    //     await common.waitForElementToBeClickable("//a[@href='http://insights.quiet.ly/support']");
    //     await val.validatePageURL("https://insights.quiet.ly/support/");
    // });

});
