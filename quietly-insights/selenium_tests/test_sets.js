const common = require('./common/common_functions');
const db = require('./common/database.js');
const commonBeforeAfter = require('./common/commonBeforeAfter');

const login = require('./test_sets/login');                                   //Login Tests
const proOnboarding = require('./test_sets/monthlypro_onboarding');           //Monthly Pro on=boarding Tests
const deleteAccount = require('./test_sets/delete_account');                  //Delete Account Tests
const updateCreditCard = require('./test_sets/update_creditcard_details');    //Update Credit Card Details Tests
const testErrors = require('./test_sets/test_errormessages');                 //Error Messages Tests
const goals = require('./test_sets/quietly_anlaytics_conversions');                          //Support for Multiple Goals Tests
const reports = require('./test_sets/reports_datatest');                      //Report Data validation Tests
const wordPressPlugin = require('./test_sets/property_settings');                  //Word press Plugin Tests
const keyTopics = require('./test_sets/delete_account');


//A. Login Test Set
loginTests = exports.loginTests = function () {
    describe('Login Tests', function () {
        commonBeforeAfter.loadBeforeAndAfterEach();

        it('1.should login successfully with monthly pro plan', function (done) {
            login.loginWithMonthlyProPlan().then(function () {
                done();
            });
        });
        it('2.should login with non GA account and pop up warning message', function (done) {
            login.loginWithNoGAAccount().then(function () {
                done();
            });
        });
        it('3.should get a warning message on cancel', function (done) {
            login.verifyCancelOnLogin().then(function () {
                done();
            });
        });
        it('4.should be navigated to the home page', function (done) {
            login.verifyReturnHome().then(function () {
                done();
            });
        });
        it('5.should be navigated to the support page', function (done) {
            login.verifyResourceCenter().then(function () {
                done();
            });
        });
    });
};

//B. Monthly Pro-onboarding Test Set
monthlyProOnboarding = exports.monthlyProOnboarding = function () {
    describe('B. Monthly Pro_onboarding Tests ', function () {
        commonBeforeAfter.loadBeforeAndAfterEach();
        it('1.should successfully on-board with Monthly Pro Plan', function (done) {
            proOnboarding.onboardingMonthlyPro().then(function () {
                done();
            });
        });
        it('2.should successfully on-board with Monthly Pro Plan specifying goals', function (done) {
            proOnboarding.onboardingMonthlyProWithGoals().then(function () {
                done();
            });
        });
        it('3.should successfully on-board with Monthly Pro Plan specifying Competitors ', function (done) {
            proOnboarding.onboardingMonthlyProWithCompetitors().then(function () {
                done();
            });
        });
        it('4.should successfully on-board with Monthly Pro Plan specifying Competitors and Goals', function (done) {
            proOnboarding.onboardingMonthlyProWithCompetitorsAndGoals().then(function () {
                done();
            });
        });
        it('5.should successfully be able to create reports with maximum characters provided in report name ', function (done) {
            proOnboarding.maximumCharactersSupportForReportName().then(function () {
                done();
            });
        });
        it('6.should successfully be able to create reports adding at-least 5 recipients', function (done) {
            proOnboarding.onboardingWithFiveRecipientsAdded().then(function () {
                done();
            });
        });
        it('7.should successfully on-board with different weekly and monthly options selected for different recipients', function (done) {
            proOnboarding.onboardingWithDiffWeeklyAndMonthlyOptionsSelected().then(function () {
                done();
            });
        });

    });
};

//C. Delete Account Test Set
deleteAccountTests = exports.deleteAccountTests = function () {
    describe('C. Delete Account Tests', function () {
        commonBeforeAfter.loadBeforeAndAfterEach();
        it('1.Should delete the Monthly Pro Plan user account successfully', function (done) {
            deleteAccount.deleteAccountUsingMPP().then(function () {
                done()
            });
        });
        it('2. Should recretae an account successfully after deleting account using Same Credit Card', function (done) {
            deleteAccount.recreateAccountUsingSameCreditCard().then(function () {
                done();
            });
        });
        it('3. Should recreate an account successfully after deleting account using different Credit Card', function (done) {
            deleteAccount.recreateAccountUsingDiffCreditCard().then(function () {
                done();
            });
        });
        it('4. Should recreate an account with plugin installed while on-boarding after deleting account', function (done) {
            deleteAccount.recreateAccountAndInstallPlugin().then(function () {
                done();
            });
        });
        it('5. Verify whether the pro plan user is successfully able to recreate an account with Plugin installed after on-boarding', function (done) {
            deleteAccount.recreateAccountAndInstallPluginAfterOnboarding().then(function () {
                done();
            });
        });
    });
};

//D. Update Credit Card Details Test Set
updateCreditCardTests = exports.updateCreditCardTests = function () {
    describe('D. Update Credit Card Details', function () {
        commonBeforeAfter.loadBeforeAndAfterEach();
        it('1. Should display correct credit card information in the settings page', function (done) {
            updateCreditCard.viewCreditCardInfo().then(function () {
                done();
            });
        });
        it('2. Should update the credit card information in the settings page successfully', function (done) {
            updateCreditCard.updateCreditCardInfo().then(function () {
                done();
            });
        });
        it('3. Should not update any credit card changes if cancelled', function (done) {
            updateCreditCard.cancelCreditCardChanges().then(function () {
                done();
            });
        });
        it('4. Should update the credit card changes in stripe successfully', function (done) {
            updateCreditCard.verifyCreditCardInfoInStripe().then(function () {
                done();
            });
        });
        it('5. Should throw an error if Credit Card Number is not entered- Settings page', function (done) {
            updateCreditCard.verifyErrorForCreditCardNum().then(function () {
                done();
            });
        });
        it('6. Should throw an error if Expiry Date is not entered- Settings page', function (done) {
            updateCreditCard.verifyErrorForExpiryDate().then(function () {
                done();
            });
        });
        it('7. Should throw an error if CVC Number is not entered- Settings page', function (done) {
            updateCreditCard.verifyErrorForCVCNum().then(function () {
                done();
            });
        });
        it('8. Should throw an error if Name on Card field is not entered- Settings page', function (done) {
            updateCreditCard.verifyErrorForNameOnCard().then(function () {
                done();
            });
        });
        it('9. Should throw an error if invalid characters are entered for Name on Card field- Settings page', function (done) {
            updateCreditCard.verifyErrorForNameOnCardInvalidInputs().then(function () {
                done();
            });
        });
    });
};

//E. Error Messages Test Set- Verify different kind of error messages
errorMessagesTests = exports.errorMessagesTests = function () {
    describe('E.Test Error Messages ', function () {
        commonBeforeAfter.loadBeforeAndAfterEach();
        it('1.should throw an error if user does not enter Credit Card Number', function (done) {
            testErrors.verifyCreditCardNumError().then(function () {
                done();
            });
        });
        it('2.should throw an error if user does not enter Expiry Date', function (done) {
            testErrors.verifyExpiryDateError().then(function () {
                done();
            });
        });
        it('3.should throw an error if user does not enter CVC Number', function (done) {
            testErrors.verifySecurityCodeError().then(function () {
                done();
            });
        });
        it('4.should throw an error if user does not enter Name on Card', function (done) {
            testErrors.verifyNameOnCardError().then(function () {
                done();
            });
        });
        it('5.should throw an error if user enters numbers/special characters in Name on Card Field', function (done) {
            testErrors.verifyInputCharacters().then(function () {
                done();
            });
        });
    });
};

//F. Support Multiple Goals Test Set
supportMultipleGoals = exports.supportMultipleGoals = function () {
    describe('F. Multiple Goals Tests', function () {
        commonBeforeAfter.loadBeforeAndAfterEach();
        it('1.should on-board selecting only Primary Goal', function (done) {
            goals.onboardSelectingPrimaryGoal().then(function () {
                done();
            });
        });
        it('2.should on-board selecting Primary Goal and one secondary goal', function (done) {
            goals.onboardSelectingTwoGoals().then(function () {
                done();
            });
        });
        it('3.should on-board selecting Primary Goal and two secondary goals', function (done) {
            goals.onboardSelectingThreeGoals().then(function () {
                done();
            });
        });
        it('4.should on-board selecting Primary Goal and three secondary goals', function (done) {
            goals.onboardSelectingFourGoals().then(function () {
                done();
            });
        });
        it('5.should on-board selecting Primary Goal and four secondary goals', function (done) {
            goals.onboardSelectingFiveGoals().then(function () {
                done();
            });
        });
        it('6.should on-board selecting Primary Goal and competitors', function (done) {
            goals.onboardSelectingOneGoalAndComp().then(function () {
                done();
            });
        });
        it('7.should on-board selecting goals and competitors', function (done) {
            goals.onboardSelectingGoalsAndComp().then(function () {
                done();
            });
        });
    });
};

//G. Reports data validation tests with respect to the data inputs that we provide while on-boarding
reportsDataValidationTests = exports.reportsDataValidationTests = function () {
    describe('G. Reports Data Validation Tests Corresponding to Data Inputs While On-boarding', function () {
        commonBeforeAfter.loadBeforeAndAfterEach();
        it('1.Reports metrics data validation for a basic report', function (done) {
            reports.verifyBasicMonthlyReports().then(function () {
                done();
            });
        });
        it('2.Reports metric data validation with competitors', function (done) {
            reports.verifyReportsDataWithCompetitors().then(function () {
                done();
            });
        });
        it('3.Reports metric data validation with goals', function (done) {
            reports.verifyReportsDataWithGoals().then(function () {
                done();
            });
        });
        it('4.Reports metric data validation with competitors and goals', function (done) {
            reports.verifyReportsDataWithCompetitorsAndGoals().then(function () {
                done();
            });
        });
        it('5.Reports metric data validation with multiple goals', function (done) {
            reports.verifyReportsDataWithMultipleGoals().then(function () {
                done();
            });
        });
        it('6.Reports metric data validation with competitors and multiple goals', function (done) {
            reports.verifyReportsDataWithCompetitorsAndMultipleGoals().then(function () {
                done();
            });
        });
    });
};

//F. WordPress Plugin Tests- on-boarding and Reports Data Verification
pluginTests = exports.pluginTests = function () {
    describe('F. WordPress Plugin installation tests - Monthly Pro Plan ', function () {
        commonBeforeAfter.loadBeforeAndAfterEach();
        it('1.On-boarding with word-press Plugin installed-No goals and competitors.', function (done) {
            wordPressPlugin.verifyReportsWithPluginInstalled().then(function () {
                done();
            });
        });
        it('2.On-boarding with word-press plugin installed and competitors specified (No Goals).', function (done) {
            wordPressPlugin.verifyReportsWithPluginAndCompetitors().then(function () {
                done();
            });
        });
        it('3.On-boarding with word-press plugin installed and Primary goal specified (No Competitors).', function (done) {
            wordPressPlugin.verifyReportsWithPluginAndPrimaryGoal().then(function () {
                done();
            });
        });
        it('4.On-boarding with word-press plugin installed and multiple goals specified (No Competitors).', function (done) {
            wordPressPlugin.verifyReportsWithPluginAndMultipleGoals().then(function () {
                done();
            });
        });
        it('5.On-boarding with word-press plugin installed, competitors and multiple goals specified.', function (done) {
            wordPressPlugin.verifyReportsWithCompleteData().then(function () {
                done();
            });
        });
        it('6.Install word-press plugin after on-boarding is done. Verify if the Settings page is updated', function (done) {
            wordPressPlugin.installWordPressPluginAfterOnboarding().then(function () {
                done();
            });
        });
        it('7.Change the Website URL from the "Settings" page, install the word-press plugin and Verify PID successfully', function (done) {
            wordPressPlugin.changewebsiteURLAndInstallPlugin().then(function () {
                done();
            });
        });

    });
};

//G. Key Topics Feature functional tests
keyTopicsTests = exports.keyTopicsTests = function () {
    describe('G. Key Topics Feature functional tests- Monthly Pro Plan ', function () {
        commonBeforeAfter.loadBeforeAndAfterEach();
        it('1.Should include key topics when the user is done with basic on-boarding', function (done) {
            keyTopics.keyTopicsBasicOnboarding().then(function () {
                done();
            });
        });
        it('2.Should include key topics when plugin is installed while on-boarding', function (done) {
            keyTopics.keyTopicsWithPluginInstalled().then(function () {
                done();
            });
        });
        it('3.Should include key topics for competitors as well when plugin is installed and competitors specified', function (done) {
            keyTopics.keyTopicsWithPluginAndCompetitors().then(function () {
                done();
            });
        });
        it('4.Should include key topics when plugin is installed and primary goal is specified', function (done) {
            keyTopics.keyTopicsWithPluginAndPrimaryGoal().then(function () {
                done();
            });
        });
        it('5.Should include key topics when plugin is installed and multiple goals are specified', function (done) {
            keyTopics.keyTopicsWithPluginAndMultipleGoals().then(function () {
                done();
            });
        });
        it('6.Should include key topics for domain and competitors when plugin is installed,competitors and multiple goals are specified', function (done) {
            keyTopics.keyTopicsWithPluginCompAndGoals().then(function () {
                done();
            });
        });
        it('7.Should give proper message when there are no topics or data for competitors', function (done) {
            keyTopics.keyTopicsWithNoDataForCompetitors().then(function () {
                done();
            });
        });

    });
};
