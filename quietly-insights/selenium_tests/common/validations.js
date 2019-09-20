const webdriver = require("selenium-webdriver");
const {until, By} = webdriver;
const chai = require('chai');
const assertArrays = require('chai-arrays');
const common = require('./common_functions');
const db = require('./database.js');
const Promise = require('promise');
const {user: commonUserData} = require('../common/common_data');
chai.use(assertArrays);
const expect = chai.expect;

//Number of validations: 43

//1. Validate the Page Title
validatePageTitle = exports.validatePageTitle = function (expTitle) {
    return new Promise(function (resolve, reject) {
        return driver.getTitle()
        .then(function (actTitle) {
            if (actTitle.includes(expTitle)) {
                resolve();
            }
            else {
                return driver.wait(until.titleIs(expTitle), 10000)
                .then(function () {
                    resolve(console.log("title read:" + actTitle));
                })
            }
        })
        .catch(function (err) {
            reject(err);
        })
    })
};

//2. Validate Page URL
validatePageURL = exports.validatePageURL = function (expURL) {
    return new Promise(function (resolve, reject) {
        return driver.getCurrentUrl()
        .then(function (actURL) {
            if (actURL.includes(expURL)) {
                resolve();
            }
            else {
                return driver.wait(until.urlIs(expURL), 10000)
                .then(function () {
                    resolve(console.log("Url read:" + actURL));
                })
            }
        })
        .catch(function (err) {
            reject(err);
        })
    })
};

//3. Validate the plan type after signing in
validatePlanType=exports.validatePlanType=async function(planType){
    await driver.wait(until.elementsLocated(By.className("-onboarding-border")),60000);
    if (planType==="Free") {
        await validateElementToIncludeTextByClassName("onboarding-plan-selector__col -selected", "FREE PLAN");
    }
    else if (planType==="Monthly Pro"){
        await validateElementToIncludeTextByClassName("onboarding-plan-selector__col -selected","PRO PLAN");
        await validateElementTextToIncludeByID("monthly","$195/month billed monthly");
    }
    else if (planType==="Annual Pro"){
        await validateElementToIncludeTextByClassName("onboarding-plan-selector__col -selected","PRO PLAN");
        await validateElementTextToIncludeByID("annually","$165/month billed annually");
    }
};

//4. Validate whether the blog posts are found for the given website
validateBlogsFound=exports.validateBlogsFound=async function(){
    await validateElementTextByClassName("billing-form__success","Found blog posts");
};

//5. Validate whether the data is displayed on the dashboard
validateDashboard=exports.validateDashboard=async function () {
    await common.delay(6000);
    await driver.wait(until.elementLocated(By.xpath("//div[@class='dashboard-content__full']")), 60000);
    await common.delay(8000);
    let expectedText = "Loading data...";
    try {
        await validateSubStringByXpath("//div[@class='dashboard-content__full']", expectedText);
    } catch(e) {
        expectedText= "RECOMMENDED CONTENT IDEAS\nCreate content that best reaches, engages, and converts your audience."
        await validateSubStringByXpath("//div[@class='dashboard-content__full']", expectedText);
    }
    await console.log("Dashboard data is loaded");
};

//6. Validate the status of the Start Guide
validateStartGuideCompletionPercentage=exports.validateStartGuideCompletionPercentage=async function(expNum){
    await validateElementTextByClassName("navigation-startguide__text",expNum+"% complete");
};

//7. Get the text of an element by Xpath and validate the expected text to be equal to the actual test
validateElementTextByXpath = exports.validateElementTextByXpath = function (xpath, expText) {
    return driver.wait(until.elementLocated(By.xpath(xpath)), 20000)
    .then(function (elem) {
        return elem.getText();
    })
    .then(function (actText) {
        console.log(actText);
        return expect(actText).to.equal(expText);
    })
};

//8. Get the text of an element by Class Name and validate the expected text to be equal to the actual test
validateElementTextByClassName = exports.validateElementTextByClassName = function (className, expText) {
    return driver.wait(until.elementLocated(By.className(className)), 30000)
    .then(function (elem) {
        return elem.getText();
    }).then(function (actText) {
        console.log("Runtime Text is: " + actText);
        return expect(actText).to.equal(expText);

    })
};

//9. Get the text of an element by Class Name and validate the expected text to be equal to the actual test
validateElementToIncludeTextByClassName = exports.validateElementToIncludeTextByClassName = function (className, expText) {
    return driver.wait(until.elementLocated(By.className(className)), 20000)
    .then(function (elem) {
        return elem.getText();
    }).then(function (actText) {
        console.log("Runtime Text is: " + actText);
        return expect(actText).to.include(expText);
    }).catch (function (err) {
            throw err;
    })
};

//10. Get the text of an element by ID and validate the expected text to be equal to the actual test
validateElementTextByID = exports.validateElementTextByID = async function (ID, expText) {
    return driver.wait(until.elementLocated(By.id(ID)), 20000).then(function (elem) {
        return elem.getText().then(function (actText) {
            console.log(actText);
            return expect(actText).to.equal(expText);
        })
    })
};


//11. Get the text of an element by ID and validate the expected text to be equal to the actual test
validateElementTextToIncludeByID = exports.validateElementTextToIncludeByID = function (ID, expText) {
    return driver.wait(until.elementLocated(By.id(ID)), 20000)
    .then(function (elem) {
        return elem.getText().then(function (actText) {
            console.log(actText);
            return expect(actText).to.include(expText);
        })
    })
};

//12. Get the text of an element by Xpath and validate the expected text to be equal to the actual test
validateSubStringByXpath = exports.validateSubStringByXpath = function (xpath, expSubString) {
    return new Promise(function (resolve,reject) {
        return driver.wait(until.elementLocated(By.xpath(xpath)), 60000)
        .then(function (elem) {
            return elem.getText();
        })
        .then(function (actText) {
            console.log(actText);
            resolve(expect(actText).to.include(expSubString));
        })
        .catch(function (err) {
            reject(err);
        });
    })
};

//13. Validate the plan type and the number of steps for on-boarding
ensureOnboardingSteps = exports.ensureOnboardingSteps = async function (planType) {
    let steps = ["PAYMENT", "YOUR CONTENT", "GOOGLE ANALYTICS", "COMPETITORS", "INSTALL"];
    let prompt = "Please enter your payment information to get started with Quietly Insights Pro";
    if (planType === 'Free') {
        steps = steps.slice(1);
        prompt = "To provide content marketing insights and recommendations, we need to know what content to analyze.";
    }

    let reqElement = await driver.wait(until.elementLocated(By.xpath("//div[@class='onboarding-sub-header']")), 30000);
    await driver.wait(until.elementTextContains(reqElement, prompt), 60000);
    await driver.wait(until.elementLocated(By.xpath("//div[@class='onboarding-step__label']")), 30000);
    return driver.findElements(By.xpath("//div[@class='onboarding-step__label']"))
    .then(function (elements) {
        let allElements = elements.map(function (element) {
            return element.getText();
        });
        return Promise.all(allElements)
    })
    .then(function(labels) {
        return expect(labels).to.be.equalTo(steps.slice(1));
    }).then(validateElementTextByXpath("//div[@class='onboarding-step__label -selected']", steps.slice(0,1)[0]));
};

//14. Validate whether the user is able to select
validateSwitchPlan = exports.validateSwitchPlan = function () {
    return driver.wait(until.elementLocated(By.xpath("//div[@class='onboarding-step__number']")), 6000)
    .then(function () {
        return driver.findElements(By.xpath("//div[@class='onboarding-step__number']"));
    })
    .then(function (numbers) {
        return expect(numbers.length).to.equal(3);
    })
};

//15. Validate whether Monthly Report is created
validateMonthlyReport= exports.validateMonthlyReport = async function () {
    await driver.wait(until.elementLocated(By.xpath("//div[@class='dashboard-content__full']")), 40000);
    await common.delay(3000);
    let expectedText = "We’re analyzing your data and your competitors to find insights and make recommendations. Check back in a few minutes!";
    try {
        await validateSubStringByXpath("//div[@class='dashboard-content__full']", expectedText);
    } catch(e) {
        expectedText= "INSIGHTS FOR\nGOALS\nHere\'s how you tracked towards your content marketing goals last month.\nLoading...\nRECOMMENDED CONTENT IDEAS\nCreate content that best reaches, engages, and converts your audience.\nLoading...\nKEY TAKEAWAYS\nHere’s a key thing to know about your content marketing performance last month.\nLoading...";
        //"INSIGHTS FOR\nFROM QUIETLY’S BLOG\nHere are some helpful articles to keep you on top of your content strategy.\nKnow the latest in content marketing with Quietly’s monthly newsletter\nSUBSCRIBE"
        await validateSubStringByXpath("//div[@class='dashboard-content__full']", expectedText);
    }
    await console.log("Reports Creation is Successful");
    await validateDataIsPopulated();
};

//16. Validate the Credit Card Info Error Messages on the Settings page
validateCreditCardErrorSettings = exports.validateCreditCardErrorSettings = async function (expError) {
    await validateElementTextByXpath("//div[@class='onboarding-errors -show']",expError );
    await common.waitForElementToBeClickable("//a[@class='modal__close']");
};

//17. Validate the "deleted" column value of a user account deleted in the database is 1
validateDeleteAccountStatus = exports.validateDeleteAccountStatus = function (customerID) {
    return new Promise(function (resolve, reject) {
        return delay(2000).then(function () {
            return db.getStatusByCustID(customerID);
        })
        .then(function (status) {
            if (expect(status).to.equal(1)) {
                resolve(console.log("Delete Account successful: " + status));
            }
        })
        .catch(function (err) {
            reject(console.log("Account Deleted failed: " + err));
        })
    })
};

//18. Validate the "deleted" status of an account before deleting account
validateBeforeDelete = exports.validateBeforeDelete = function (email) {
    return new Promise(function (resolve, reject) {
        return db.getStatusByEmail(email)
        .then(function (status) {
            if (expect(status).to.equal(0)) {
                resolve(console.log("User account is not yet deleted: " + status));
            } else {
                reject('User account should not be deleted yet.')
            }
        })
        .catch(function (err) {
            reject(err);
        })
    })
};

//19. Validate the Card Information in stripe
validateCardInfoInStripe = exports.validateCardInfoInStripe = function (email, cardNum, name, expMonth, expYear) {
    return new Promise(function (resolve, reject) {
        return db.getCardNumberFromStripe(email).then(function (jsonResult) {
            console.log(jsonResult);
            let expCardNum = jsonResult.data[0].last4;
            let expName = jsonResult.data[0].name;
            let expMon = jsonResult.data[0].exp_month;
            let expYr = jsonResult.data[0].exp_year;
            if (expect(cardNum).to.equal(expCardNum) && expect(name).to.equal(expName) && expect(expMonth).to.equal(expMon) && expect(expYear).to.equal(expYr)) {
                resolve(console.log("Stripe u" +
                    "" +
                    "" +
                    "" +
                    "" +
                    "" +
                    "" +
                    "" +
                    "" +
                    "" +
                    "" +
                    "" +
                    "" +
                    "" +
                    "" +
                    "" +
                    "pdate successfully" + expCardNum + " " + expName + " " + expMon + " " + expYr));
            }
        }).catch(function (err) {
            reject(err);
        })
    })
};

//20. Validate the email address of an account depending on the customer ID - Verify if the email is appended by "deleted" keyword
validateDeletedAccountEmail = exports.validateDeletedAccountEmail = function (customerID) {
    return new Promise(function (resolve, reject) {
        return db.getEmail(customerID).then(function (actEmail) {
            if (expect(actEmail).to.include("deleted")) {
                resolve(console.log("Account email is appended with delete keyword"));
            }
        })
        .catch(function (err) {
            reject(console.log("Account is not deleted " + err));
        })
    })

};

//21. Verify whether the plugin is installed
validatePluginInstall = exports.validatePluginInstall = function () {
    return new Promise(function (resolve, reject) {
        return delay(3000).then(function () {                        //Delay is required as the message does not come up immediatley
            return driver.wait(until.elementsLocated(By.xpath("//div[@class='quietly-analytics__module--message -success']")), 30000);
        })
        .then(delay(3000))
        .then(function (content) {
            console.log(content.length);
            let PromiseContents = content.map(function (elem) {
                return elem.getText().then(function (verifyText) {
                    if (expect(verifyText).include("You've successfully verified the Quietly Insights plugin!")) {
                        resolve(console.log("Plugin installation is successful"));
                    }
                })
                .catch(function (err) {
                    reject(err);
                })

            });
            return Promise.all(PromiseContents);
        })
    })
};

//22.Validate Error Messages
validateErrorMessage=exports.validateErrorMessage=function (expText) {
    return new Promise(function (resolve, reject, err) {
        return driver.wait(until.elementLocated(By.className("toast-alert -error")), 30000).then (function (elem) {
            elem.getText().then (function (actText) {
                if(expect(actText).to.include(expText)){
                    resolve();
                }
                else{
                    reject(err);
                }
            })
        })
    })
};

//23. Validate the Credit Card Info Error Messages
validateInvalidURL = exports.validateInvalidURL = async function (websiteUrl) {
    websiteUrl = websiteUrl || commonUserData.websiteUrl;
    await common.waitForElementToSendKeysById("websiteUrl", websiteUrl);
    await validateElementTextByXpath("//span[@class='onboarding-errors']","Please enter the link to a specific post!");
};

//24. Validate the Credit Card Info Error Messages
validateDuplicateCompURL = exports.validateDuplicateCompURL = function () {
    return validateElementTextByID("toast-alert", "Please make sure that there are no duplicate competitor domains.");
};

//25. Validate error that comes up when the report name is longer than 40 characters
validateReportNameError = exports.validateReportNameError = function () {
    return validateElementTextByID("toast-alert", "Please keep your report name to 40 characters or less");
};

//26. Validate the pro plan type selected after login.
validateProPlanTypeSelected=exports.validateProPlanTypeSelected=function (expPlan) {
    return validateElementTextByID("switchToProPlanLink",expPlan);
};

//27. Validate whether the user is successfully upgraded to the pro plan
validateUpgradeToProPlanSuccess=exports.validateUpgradeToProPlanSuccess=function () {
    return validateElementTextByID("upgradedToProPlanMessage","You’ve been upgraded to the Pro Plan.").then (function () {
        return common.waitForElementToBeClickable("//a[@class='modal__close']");
    })
};

//28. Validate whether QA goals cannot be added if plugin/tracker is not installed
validateQAGoalsCannotBeAdded=exports.validateQAGoalsCannotBeAdded= async function(){
    await common.goToGoalsSettings();
    // await common.waitForElementToBeClickableById("settingsConversionsAddGoals");
    // await common.waitForElementToBeClickableById("addGoalsLinkClicks");
    await validateElementToIncludeTextByClassName("noGA-header","To set up a Quietly Insights goal, you’ll need the Quietly Insights analytics code.");
    // await common.waitForElementToBeClickableById("addGoalsFormSubmission");
    // await validateElementToIncludeTextByClassName("goal-tabs__panel","Looks like you haven’t installed the Quietly Insights analytics code on your site. To set up form submission goals, you need to install the code first.");
};

//29. Validate whether Link click goal is added successfully.
validateLinkClickGoal=exports.validateLinkClickGoal= async function (goalName) {
    return new Promise(function (resolve,reject) {
        return common.delay(2000).then(function () {
            return getTextFromAllElements("//div[@class='goals-settings-item']");
        }).then(function (labels) {
            let result = labels.includes("CLICK GOAL: " + goalName.toUpperCase());
            console.log("Goal exists: "+result +" "+goalName);
            if (result === true) {
                resolve();
            }
            else {
                reject(console.log("Link Click Goal is not added successfully"));
            }
        })
    })
};

//30. Validate whether Form Submission goal is added successfully.
validateFormSubmissionGoal=exports.validateFormSubmissionGoal= async function (goalName) {
    goalName=goalName|| commonUserData.formGoalName;
    return new Promise(function (resolve,reject) {
        return common.delay(3000).then(function () {
            return getTextFromAllElements("//div[@class='goals-settings-item']");
        }).then(function (labels) {
            console.log(labels);
            let result = labels.includes("FORM GOAL: " + goalName.toUpperCase());
            console.log("Goal exists: "+ result+" "+goalName);
            if (result === true) {
                resolve();
            }
            else {
                reject(console.log("Form Submission Goal is not added successfully"));
            }
        })
    })
};

//31. Get the text of all Elements
getTextFromAllElements=exports.getTextFromAllElements= function (xpath) {
    return driver.wait(until.elementsLocated(By.xpath(xpath),20000)).then(function (elements) {
        let allElements = elements.map(function (element) {
            return element.getText();
        });
        return Promise.all(allElements);
    })
};

//32. Validate the error message when more than 1 goal for Free plan or more than 3 goals for pro plan is added
validateGoalError=exports.validateGoalError=function(){
   return validateElementTextByID("toastAlert","You already have the maximum number of goals. Remove an existing goal to add another one.");
};

//33. Validate non GA account sign in message
noGaPropertiesMessage = exports.noGaPropertiesMessage = async function() {
    await validateSubStringByXpath(
        "//div[@class='modal-box__inner -no-footer__ultra']",
        "We didn't find any Google Analytics properties attached to this account. Are you sure you logged in with the right Google Account?"
    );
    await waitForElementToBeClickableById("signOutNoGa");
};

//34. Validate whether the user gets a proper message when sign in is cancelled
couldNotConnectToGaMessage = exports.couldNotConnectToGaMessage = async function() {
    await validateSubStringByXpath("//div[@class='modal-box']", "We couldn't connect to your Google account");
    await waitForElementToBeClickableById("tryAgain");
};

//35. Validate whether user gets an error message when more than 40 characters are entered for a report name
validateMaximumCharactersError=exports.validateMaximumCharactersError=function () {
    return new Promise (function (resolve,reject) {
        let elem = driver.wait(until.elementLocated(By.className("toast-alert -error")), 30000);
        return elem.getText().then(function (actText) {
            driver.wait(until.elementTextContains());
            return driver.wait(until.elementTextContains(actText, "Please keep your report name to 40 characters or less")).then(function () {
                resolve();
            })
                .catch(function (err) {
                    reject(err);
                })
        })
    })
};

//36. Validate if the user is navigated to the pro plan
validateProPlan = exports.validateProPlan = async function () {
    let reqElement = await driver.wait(until.elementLocated(By.xpath("//div[@class='onboarding-sub-header']")), 30000);
    await driver.wait(until.elementTextContains(reqElement, "Please enter your payment information to get started with Quietly Insights Pro"), 60000);
    await driver.wait(until.elementLocated(By.xpath("//div[@class='onboarding-step__label']")), 30000);
    return driver.findElements(By.xpath("//div[@class='onboarding-step__label']"))
        .then(function (elements) {
            let allElements = elements.map(function (element) {
                return element.getText();
            });
            return Promise.all(allElements)
        })
        .then(function(labels) {
            console.log("Inactive onboarding steps", labels);
            return expect(labels).to.be.equalTo(["YOUR CONTENT", "GOOGLE ANALYTICS", "COMPETITORS", "INSTALL"]);
        })
        .then(async function() {
            let reqElement = await driver.wait(until.elementLocated(By.xpath("//div[@class='onboarding-step__label -selected']")), 30000);
            await driver.wait(until.elementTextContains(reqElement, "PAYMENT"), 60000);
        })
};

//37. Validate whether user gets an error when same domain is provided twice
validateSameDomainError=exports.validateSameDomainError=async function(){
    await validateElementTextByID("toast-alert", "This domain already has a property associated to it. Please choose a different url.");
};

//38. Validate the plugin/tracker verification failed message
validatePluginVerificationFailed=exports.validatePluginVerificationFailed=async function(url){
    await validateSubStringByXpath("//dic[@class='modal-box__inner -no-footer__ultra']","We couldn’t find an analytics code installed on this url:" +url);
};

//39.Validate whether the user is on Monthly Pro plan from the settings page
validateMonthlyProPlanFromSettings=exports.validateMonthlyProPlanFromSettings =async function () {
    await common.goToAccountSettings();
    await common.delay(3000);
    await validateSubStringByXpath("//div[@class='payment-property__container']","Billed Monthly");
};

//40.Validate whether the user is on Annual Pro plan from the settings page
validateAnnualProPlanFromSettings=exports.validateAnnualProPlanFromSettings =async function () {
    await common.goToAccountSettings();
    await common.delay(3000);
    await validateSubStringByXpath("//div[@class='payment-property__container']","Billed Yearly");
};

//41. Validate error message that comes up when plugin is not installed
validatePluginInstallFail=exports.validatePluginInstallFail=async function () {
    await common.goToAnalyticsCode();
    await common.waitForElementToBeClickableById("verifySnippetInstall");
    await common.delay(5000);
    await validateElementToIncludeTextByClassName("modal-box","We couldn’t find an analytics code installed on this url: ");
    await common.waitForElementToBeClickable("//button[@class='button button-onboarding button-settings-install']");
};

//42. Validate the Credit Card Info Error Messages while on-boarding
validateCreditCardError = exports.validateCreditCardError = async function (expError) {
    await validateElementTextByXpath("//div[@class='onboarding-errors -show']",expError);
};

//43. Validate whether the plugin verification is successfull from the settings page
validatePluginInstallSuccessMessage=exports.validatePluginInstallSuccessMessage=async function(){
    await common.goToAnalyticsCode();
    await common.delay(1000);
    await validateElementTextByID("codeInstalledMessage","Quietly Insights analytics code successfully installed");
};

//44. Validate competetior has been added for homepage
validateHomepageForAddCompetetiors=exports.validateHomepageForAddCompetetiors = async function(expText, index) {
    //if no index has been sent in, default to 0
    if(!index)
    {
        index = 0;
    }
    competetiorHeadingID = "overviewCompetitorHeading" + index;
    await driver.wait(until.elementsLocated(By.id(competetiorHeadingID)),60000);
    await validateElementTextToIncludeByID(competetiorHeadingID, expText.toUpperCase());
};

//45. Validate no GA insights for the current site in homepage
validateNoGACompetitorForHomepage=exports.validateNoGACompetitorForHomepage = async function (siteUrl) {
    //find no tile content text
    await driver.wait(until.elementsLocated(By.className("tile-no-content__text")),60000);
    await validateElementToIncludeTextByClassName("tile-no-content__text",
        "We couldn’t find any high-performing content"
    );
};