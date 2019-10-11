const common = require('../common/common_functions');
const val=require ('../common/validations');
const validate=require('../common/reports_settings_validations');
const {user:commonUserData} = require('../common/common_data');
const commonBeforeAfter = require('../common/commonBeforeAfter');

//Number of test cases: 11

describe('Update Credit Card Details, #updatecreditcard#', function () {
    commonBeforeAfter.loadBeforeAndAfterEach();

    it('C293 Monthly Pro plan - Should display correct credit card information in the settings page and Stripe', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("378282246310005", "1/20", "Melinda", "6391");
        await common.proPlanOnboardingWithComp();
        await validate.validateCreditCardInfo("**** **** **** 0005", "1/2020");
        await val.validateCardInfoInStripe(commonUserData.userName, "0005", "Melinda", 1, 2020);
        await common.logout();
    });

    it('C294 Annual Pro plan - Should display correct credit card information in the settings page and Stripe', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("378282246310005", "1/20", "Melinda", "6391");
        await common.proPlanOnboardingWithComp();
        await validate.validateCreditCardInfo("**** **** **** 0005", "1/2020");
        await val.validateCardInfoInStripe(commonUserData.userName, "0005", "Melinda", 1, 2020);
        await common.logout();
    });

    it('C295 Monthly Pro plan - Should update the credit card information in the settings page and stripe successfully', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("5105105105105100", "9/28", "Shruthi", "723");
        await common.proPlanOnboardingWithComp();
        await validate.validateCreditCardInfo("**** **** **** 5100", "9/2028");
        await common.updateCreditCard("4242424242424242", "3/35", "Jack", "479", "yes");
        await validate.validateCreditCardInfo("**** **** **** 4242", "3/2035");
        await val.validateCardInfoInStripe(commonUserData.userName, "4242", "Jack", 3, 2035);
        await common.logout();
    });

    it('C296 Annual Pro plan - Should update the credit card information in the settings page and stripe successfully', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("5105105105105100", "9/28", "Shruthi", "723");
        await common.proPlanOnboardingWithComp();
        await validate.validateCreditCardInfo("**** **** **** 5100", "9/2028");
        await common.updateCreditCard("4242424242424242", "3/35", "Jack", "479", "yes");
        await validate.validateCreditCardInfo("**** **** **** 4242", "3/2035");
        await val.validateCardInfoInStripe(commonUserData.userName, "4242", "Jack", 3, 2035);
        await common.logout();
    });

    it('C297 Monthly Pro plan - Should not update any credit card changes if cancelled', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("5105105105105100", "9/28", "Shruthi", "723");
        await common.proPlanOnboardingWithComp();
        await validate.validateCreditCardInfo("**** **** **** 5100", "9/2028");
        await common.updateCreditCard("371449635398431", "12/41", "Jhony", "7823", "no");
        await validate.validateCreditCardInfo("**** **** **** 5100", "9/2028");
        await common.logout();
    });

    it('C298 Annual Pro plan - Should not update any credit card changes if cancelled', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("5105105105105100", "9/28", "Shruthi", "723");
        await common.proPlanOnboardingWithComp();
        await validate.validateCreditCardInfo("**** **** **** 5100", "9/2028");
        await common.updateCreditCard("371449635398431", "12/41", "Jhony", "7823", "no");
        await validate.validateCreditCardInfo("**** **** **** 5100", "9/2028");
        await common.logout();
    });

    it('C299 Monthly Pro plan - Should throw an error if Credit Card Number is not entered', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("5105105105105100", "9/28", "Shruthi", "723");
        await common.proPlanOnboardingWithComp();
        await validate.validateCreditCardInfo("**** **** **** 5100", "9/2028");
        await common.waitForElementToBeClickable("//a[@class='payment-card__update button button-onboarding']");
        await common.waitForElementToBeClickableById("settingsUpdateCreditCard");
        await val.validateCreditCardErrorSettings("Error: Your card number is incomplete.");
        await validate.validateCreditCardInfo("**** **** **** 5100", "9/2028");
        await common.logout();
    });

    it('C300 Annual Pro plan - Should throw an error if Credit Card Number is not entered', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("5105105105105100", "9/28", "Shruthi", "723");
        await common.basicOnboarding();
        await validate.validateCreditCardInfo("**** **** **** 5100", "9/2028");
        await common.waitForElementToBeClickable("//div//a[@class='payment-card__update button button-onboarding']");
        await common.waitForElementToBeClickableById("settingsUpdateCreditCard");
        await val.validateCreditCardErrorSettings("Error: Your card number is incomplete.");
        await validate.validateCreditCardInfo("**** **** **** 5100", "9/2028");
        await common.logout();
    });

    it('C301 Monthly Pro plan - Should throw errors when specific details are not provided', async function () {
        await common.goToLandingPage('Monthly Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Monthly Pro');
        await common.creditCardInfo("5105105105105100", "9/28", "Shruthi", "723");
        await common.basicOnboarding();
        await validate.validateCreditCardInfo("**** **** **** 5100", "9/2028");
        await common.waitForElementToBeClickable("//div//a[@class='payment-card__update button button-onboarding']");
        await common.switchToDynamicIframeAndSendKeys(0, "//input[@name='cardnumber']", "4242424242424242");
        await common.waitForElementToBeClickableById("settingsUpdateCreditCard");
        await val.validateCreditCardError("Error: Your card's expiration date is incomplete.");

        await common.switchToDynamicIframeAndSendKeys(1, "//input[@name='exp-date']", "4/40");
        await common.waitForElementToBeClickableById("settingsUpdateCreditCard");
        await common.delay(2000);
        await val.validateCreditCardError("Error: Your card's security code is incomplete.");

        await common.switchToDynamicIframeAndSendKeys(2, "//input[@name='cvc']", "873");
        await common.waitForElementToBeClickableById("settingsUpdateCreditCard");
        await common.delay(2000);
        await val.validateCreditCardError("Error: Please enter a valid cardholder name");

        await common.waitForElementToSendKeysById("cardname", "Prathibha123");
        await common.waitForElementToBeClickableById("settingsUpdateCreditCard");
        await common.delay(2000);
        await val.validateCreditCardError("Error: Please enter a valid cardholder name");
        await common.waitForElementToBeClickable("//a[@class='modal__close']");
        await common.logout();
    });

    it('C302 Annual Pro plan - Should throw errors when specific details are not provided', async function () {
        await common.goToLandingPage('Annual Pro');
        await common.signInWithGmail();
        await val.validatePlanType('Annual Pro');
        await common.creditCardInfo("5105105105105100", "9/28", "Shruthi", "723");
        await common.basicOnboarding();
        await validate.validateCreditCardInfo("**** **** **** 5100", "9/2028");
        await common.waitForElementToBeClickable("//div//a[@class='payment-card__update button button-onboarding']");
        await common.switchToDynamicIframeAndSendKeys(0, "//input[@name='cardnumber']", "4242424242424242");
        await common.waitForElementToBeClickableById("settingsUpdateCreditCard");
        await val.validateCreditCardError("Error: Your card's expiration date is incomplete.");

        await common.switchToDynamicIframeAndSendKeys(1, "//input[@name='exp-date']", "4/40");
        await common.waitForElementToBeClickableById("settingsUpdateCreditCard");
        await common.delay(2000);
        await val.validateCreditCardError("Error: Your card's security code is incomplete.");

        await common.switchToDynamicIframeAndSendKeys(2, "//input[@name='cvc']", "873");
        await common.waitForElementToBeClickableById("settingsUpdateCreditCard");
        await common.delay(2000);
        await val.validateCreditCardError("Error: Please enter a valid cardholder name");

        await common.waitForElementToSendKeysById("cardname", "Prathibha123");
        await common.waitForElementToBeClickableById("settingsUpdateCreditCard");
        await common.delay(2000);
        await val.validateCreditCardError("Error: Please enter a valid cardholder name");
        await common.waitForElementToBeClickable("//a[@class='modal__close']");
        await common.logout();
    });
});