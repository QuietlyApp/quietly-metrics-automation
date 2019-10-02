const Promise = require('promise');
const webDriver = require('selenium-webdriver');
const Keys = webDriver.Key;
const promiseRetry = require('promise-retry');
const {until, By } = webDriver;
const {user: commonUserData} = require('../common/common_data');
const val = require('./validations');
const commonBeforeAfter = require('./commonBeforeAfter');

//Number of common functions: 83

//1. Open Browser
exports.openBrowser = (browser, server) => {
    let capabilities = null;

    switch (browser) {
        case "Chrome":
            capabilities = {'browserName': 'chrome'};
            break;

        case "Firefox":
            capabilities = {'browserName': 'firefox'};
            break;

        case "Edge":
            capabilities = {'browserName': 'MicrosoftEdge'};
            break;

        case "Safari":
            capabilities = {'browserName': 'safari'};
            break;

        case "Android":
            capabilities = {
                platformName: 'Android',
                platformVersion: '6.0.1',
                deviceName: '5dd57053',
                browserName: 'Chrome'
            };
            break;

        case "Firefox-headless":
            const firefox = require('selenium-webdriver/firefox');
            capabilities = (new firefox.Options()).addArguments("-headless").toCapabilities();
            break;
    }

    if (capabilities === null) {
        throw new Error(`Can't find configs for ${browser} browser`);
    }

    driver = new webDriver.Builder().usingServer(server).withCapabilities(capabilities).build();
};

//2. Go to the Login page of Quietly Insights
goToLandingPage =exports.goToLandingPage = async function(planType) {
    await driver.get(commonUserData.url);
    // await driver.manage().window().maximize();
    await val.validatePageTitle("Quietly Insights");
    if (planType) {
        await selectPlanType(planType);
    }
};

//3. Sign in with any Gmail account
signInWithGmail= exports.signInWithGmail= async function (email, password) {
    email = email || commonUserData.userName;
    password = password || commonUserData.password;
    await waitForElementToBeClickableById("homeSignUpRegular");
    await loginDetails(email, password);
};

//4. Provide the Blog url and get started with basic Onboarding
basicOnboarding=exports.basicOnboarding=async function(websiteUrl){
    websiteUrl = websiteUrl || commonUserData.websiteUrl;
    console.log('provideBlogUrl', websiteUrl);
    await driver.wait(until.elementLocated(By.xpath("//div[@class='onboarding-sub-header']")), 30000);
    await waitForElementToSendKeys("//input[@class='-onboarding-border']", websiteUrl);
    await val.validateBlogsFound();
    await waitForElementToBeClickableById("reportNextStep");
    await val.validateDashboard();
    await val.validateStartGuideCompletionPercentage("15");
};

//5. Provide the Blog url, Competitor and get started with the Free Plan
freePlanOnboardingWithComp=exports.freePlanOnboardingWithComp=async function(websiteUrl,competitor){
    websiteUrl = websiteUrl || commonUserData.websiteUrl;
    competitor=competitor || commonUserData.competitor;
    console.log('provideBlogUrl', websiteUrl);
    await driver.wait(until.elementLocated(By.xpath("//div[@class='onboarding-sub-header']")), 30000);
    await waitForElementToSendKeys("//input[@class='-onboarding-border']", websiteUrl);
    await val.validateBlogsFound();
    await waitForElementToSendKeysById("competitor1",competitor);
    await delay(2000);
    await waitForElementToBeClickableById("reportNextStep");
    await val.validateDashboard();
    await val.validateStartGuideCompletionPercentage("30");
};

//6. Provide the Blog url, Competitors and get started with the Pro Plan
proPlanOnboardingWithComp=exports.proPlanOnboardingWithComp=async function(websiteUrl,competitors){
    websiteUrl = websiteUrl || commonUserData.websiteUrl;
    competitors=competitors || commonUserData.allCompetitors;
    console.log('provideBlogUrl', websiteUrl);
    await driver.wait(until.elementLocated(By.xpath("//div[@class='onboarding-sub-header']")), 30000);
    await waitForElementToSendKeys("//input[@class='-onboarding-border']", websiteUrl);
    await val.validateBlogsFound();
    await selectCompetitors(competitors);
    await waitForElementToBeClickableById("reportNextStep");
    await val.validateDashboard();
    await val.validateStartGuideCompletionPercentage("30");
};

//7. Provide credit card details for monthly/annual pro plan
creditCardInfo = exports.creditCardInfo = async function (cardNumber, expiryDate, nameOnCard, cvcNumber) {
    cardNumber = cardNumber || commonUserData.cardNumber;
    expiryDate = expiryDate || commonUserData.expiryDate;
    nameOnCard = nameOnCard || commonUserData.nameOnCard;
    cvcNumber = cvcNumber || commonUserData.cvcNumber;
    console.log('creditCardInfo', cardNumber, expiryDate, nameOnCard, cvcNumber);
    await switchToIframeAndSendKeys("//iframe[@title='Secure payment input frame']", "//input[@name='cardnumber']", cardNumber);
    await switchToIframeAndSendKeys("//iframe[@name='__privateStripeFrame6']", "//input[@name='exp-date']", expiryDate);
    await switchToIframeAndSendKeys("//iframe[@name='__privateStripeFrame7']", "//input[@name='cvc']", cvcNumber);
    await waitForElementToSendKeysById("cardname", nameOnCard);
    await delay(2000);
};

//8. Logout of the app
logout = exports.logout =async function (email) {
    email = email || commonUserData.userName;
    await driver.executeScript("window.scrollTo(0,0);");
    await waitForElementToBeClickable("//div[@class='top-nav__arrow']");
    await waitForElementToBeClickableById("topNavLogout");
    await commonBeforeAfter.addToDeletionList(email);
};

//9. Go to the Start Guide Page
goToStartGuide=exports.goToStartGuide=async function(){
    await waitForElementToBeClickableById("startGuideSettingsLink");
};

//10. Get Text of any Element by ID
getTextFromElementByID = exports.getTextFromElementByID = function (elementID) {
    return getElementByID(elementID).then(function (elem) {
        return elem.getText().then(function (text) {
            return text;
        })
    })
};

//11. Get Text of any Element by Xpath
getTextFromElementByXpath = exports.getTextFromElementByXpath = function (elementXpath) {
    return driver.wait(until.elementLocated(By.xpath(elementXpath)), 5000).then(function (element) {
        return element.getText().then(function (text) {
            return text;
        })
    })
};

//12. Get Text of any Element By Class Name
getTextFromElementByClassName = exports.getTextFromElementByClassName =async function (className) {
    let elem = await getElementByClassName(className);
    return elem.getText();
};

//13. Provide Login Details
loginDetails = exports.loginDetails = async function (email, password) {
    email = email || commonUserData.userName;
    password = password || commonUserData.password;
    await waitForElementToSendKeys("//input[@type='email']", email);
    await waitForElementToBeClickable("//div[@id='identifierNext']");
    await waitForElementToSendKeys("//input[@type='password']", password);
    await waitForElementToBeClickable("//div[@id='passwordNext']");
};

//14. Sign in with the google account, provide username and password
signInWithGoogleAndAllow = exports.signInWithGoogleAndAllow = async function (email, password) {
    email = email || commonUserData.userName;
    password = password || commonUserData.password;
    delay(2000)
    await loginDetails(email, password);
    await allowAccess('Allow');
    //await commonBeforeAfter.addToDeletionList(email);
};

//15. Sign in with google anc cancel
signInWithGoogleAndCancel = exports.signInWithGoogleAndCancel = async function (email, password) {
    await waitForElementToBeClickableById("homeSignUpRegular");
    await loginDetails(email, password);
    await allowAccess('Cancel');
};

//16. Allow access to the GA account
allowAccess = exports.allowAccess = function (option) {
    return new Promise(function (resolve) {
        if (option === "Allow") {
            //click "Allow" to allow the access to view Google Account Data
            resolve(waitForElementToBeClickableById("submit_approve_access"));

        }
        else if (option === "Cancel") {
            resolve(waitForElementToBeClickableById("submit_deny_access"));
        }

    }).catch(function (err) {
        console.error('allowAccess', err);
        throw err;
    })
};

//17. Provide Google Analytics Information
provideGoogleAnalyticsInfo = exports.provideGoogleAnalyticsInfo = async function (account, property, view) {
    account = account || commonUserData.account;
    property = property || commonUserData.property;
    view = view || commonUserData.view;
    accountIdentifer = "react-select-2--value";
    propertyIdentifer = "react-select-3--value";
    viewIdentifer = "react-select-4--value";
    await selectItemFromDropDown(accountIdentifer, "//div[@role='option']", account);
    await selectItemFromDropDown(propertyIdentifer, "//div[@role='option']", property);
    await selectItemFromDropDown(viewIdentifer, "//div[@role='option']", view);
    await waitForElementToBeClickableById("modalSaveAnalytics");
    await delay(5000);
};

//18. Select Additional Goals
selectGoals = exports.selectGoals = function (goals) {
    if (goals === null || goals === undefined) {
        goals = commonUserData.primaryGoal;
    }
    return driver.wait(until.elementsLocated(By.xpath("//div[@class='goals-item']")),30000).then(function (allGoals) {
        return allGoals.map(function (goalElem) {
            return goalElem.getText().then(function (text) {
                return goals.map(function (goal) {
                    if(goal===text){
                        goalElem.click();
                    }
                })
            })
        })
    }).then (function () {
        return clickNextGoogleAnalytics();
    })
};

//19. Select the Industry and Competitors
selectIndustryAndCompetitors = exports.selectIndustryAndCompetitors = async function(industry, competitorList) {
    industry = industry || "";
    competitorList = competitorList || commonUserData.competitors;

    await selectIndustry(industry);
    await selectCompetitors(competitorList);
};

//20. Select the Industry
selectIndustry = exports.selectIndustry = function (industry) {
    return driver.wait(until.elementLocated(By.id("industry")), 20000).then(function (elem) {
        return driver.executeScript("arguments[0].scrollIntoView(false);", elem);
    }).then(function () {
        return selectItemFromDropDown("industry", "//div[@class='Select-option']", industry);
    })
};

//21. Input competitors
selectCompetitors = exports.selectCompetitors = function (competitors) {
    let x = 0;
    return competitors.reduce(function (currElem, nextElem) {
        return currElem.then(function () {
            let result = x + 1;
            console.log("competitors id: competitor" + result);
            x = result;
            return waitForElementToSendKeysById("competitor" + result, nextElem);
        }).catch(function (err) {
            return console.trace(err);
        })
    }, Promise.resolve())
};

//22. Wait for some time
delay = exports.delay = function (t) {
    return new Promise(function (resolve) {
        setTimeout(resolve, t)
    })
};

//23. Wait for the element to be attached to the DOM and sendKeys using xpath
waitForElementToSendKeys = exports.waitForElementToSendKeys = function (xpath, expText) {
    const retryOptions = {
        retries: 3,
        factor: 1,
        minTimeout: 1000
    };
    console.log('waitForElementToSendKeys', xpath, expText);
    return promiseRetry(function (retry, number) {
        console.log('attempt number', number);
        return driver.findElement(By.xpath(xpath)).then(function (elem) {
            return driver.wait(until.elementIsEnabled(elem), 3000).then(function () {
                return elem.sendKeys(expText);
            })
        })
        .catch(retry);
    }, retryOptions)
    .then(function (value) {

    }, function (err) {
        console.error("waitForElementToSendKeys", err);
        throw err
    });
};

//24. Wait for the element to be attached to the DOM and sendKeys using id
waitForElementToSendKeysById = exports.waitForElementToSendKeysById = function (id, expText) {
    const retryOptions = {
        retries: 3,
        factor: 1,
        minTimeout: 1000
    };
    console.log('waitForElementToSendKeysById', id, expText);
    return promiseRetry(function (retry) {
        return driver.findElement(By.id(id)).then(function (elem) {
            return driver.wait(until.elementIsEnabled(elem), 30000).then(function () {
                return elem.sendKeys(expText);
            })
        }).catch(retry);
    }, retryOptions)
    .then(function (value) {

    }, function (err) {
        console.error("waitForElementToSendKeysById", err);
        throw err
    });
};

//25. Wait until the element is clickable
const waitForElementToBeClickableForElement = (elFn) => {
    const retryOptions = {
        retries: 10,
        factor: 1,
        minTimeout: 2000
    };

    return promiseRetry(function (retry, number) {
        console.log('attempt number', number);
        return driver.findElement(elFn()).then(function (elem) {
            return driver.wait(until.elementIsEnabled(elem), 40000).then(function () {
                delay(1000);
                return elem.click();
            })
        })
            .catch(retry);
    }, retryOptions)
        .then(function (value) {
        }, function (err) {
            console.error("waitForElementToBeClickableForElement", err);
            throw err;
        });
};

//26. Wait for the element to be attached to the DOM and then click using xpath
waitForElementToBeClickable = exports.waitForElementToBeClickable = function (xpath) {
    
    return waitForElementToBeClickableForElement(() => By.xpath(xpath));
};

//27. Wait for the element to be attached to the DOM and then click using id
waitForElementToBeClickableById = exports.waitForElementToBeClickableById = function (id) {
    console.log('waitForElementToBeClickableById', id);
    return waitForElementToBeClickableForElement(() => By.id(id));
};

//28. Wait for the element to be attached to the DOM and then click using Css
waitForElementToBeClickableByCss = exports.waitForElementToBeClickableByCss = function (css) {
    return waitForElementToBeClickableForElement(() => By.css(css));
};

//29. Select the Plan type
selectPlanType=exports.selectPlanType=async function (planType = "Monthly Pro") {
    console.log('selectPlanType', planType);
    if (planType === "Free") {
        await waitForElementToBeClickableById("freePlanSelection");
        return;
    }
    if (planType === "Annual Pro") {
        await waitForElementToBeClickableById("switchToProPlanLink");
        await waitForElementToBeClickableById("switchToYearlyProPlanLink");
        return;
    }
    if (planType === "Monthly Pro") {
        await waitForElementToBeClickableById("switchToProPlanLink");
        await waitForElementToBeClickableById("switchToMonthlyProPlanLink");
    }
};

//30. Change the Plan type after logging in into Quietly Insights
onboardingChangePlan=exports.onboardingChangePlan= async function(planType) {
    if (planType === 'Free') {
        await waitForElementToBeClickableById('freePlan');
    } else if (planType === "Annual Pro") {
        await waitForElementToBeClickableById("proPlan");
        await driver.executeScript("window.scrollTo(0,500);");
        await waitForElementToBeClickableById("annually");
    } else if (planType === "Monthly Pro") {
        await waitForElementToBeClickableById("proPlan");
        await driver.executeScript("window.scrollTo(0,500);");
        await waitForElementToBeClickableById("monthly");
    }
};

//31. Close the Browser
closeBrowser = exports.closeBrowser = async function () {
    try {
        await driver.quit()
    } catch(err) {
        // do nothing
    }
};

//32. Switch to the iframe and Wait for the element to be attached to the DOM and then click using id
switchToIframeAndSendKeys = exports.switchToIframeAndSendKeys = function (framePath, xpath, expText) {
    return driver.switchTo().frame(driver.wait(until.elementLocated(By.xpath(framePath)), 20000)).then(function () {
        return driver.wait(until.elementLocated(By.xpath(xpath)), 20000);
    }).then (async function (frameElem) {
        let list = expText.split('');
        for (let i = 0; i < list.length; i++) {
            await delay(100);
            await frameElem.sendKeys(list[i]);
        }
    }).then(function () {
        return driver.switchTo().defaultContent();
    });
};

//33. Switch to the iframe and wait for elements te attached to the DOM and send keys
switchToDynamicIframeAndSendKeys = exports.switchToDynamicIframeAndSendKeys = function (index,xpath, expText) {
    return driver.findElements(By.xpath("//iframe[contains(@name,'privateStripe')]"))
        .then (function(elems) {
            return driver.switchTo().frame(elems[index]);
        }).then(function () {
        return driver.wait(until.elementLocated(By.xpath(xpath)), 20000);
    }).then (async function (frameElem) {
        let list = expText.split('');
        for (let i = 0; i < list.length; i++) {
            await delay(100);
            await frameElem.sendKeys(list[i]);
        }
    }).then(function () {
        return driver.switchTo().defaultContent();
    });
};

//34. Switch to the iframe and Wait for the element to be attached to the DOM
switchToIframeAndGetContent = exports.switchToIframeAndGetContent = function (framePath, xpath) {
    return driver.switchTo().frame(driver.wait(until.elementLocated(By.xpath(framePath)), 20000))
        .then(function () {
            return driver.wait(until.elementLocated(By.xpath(xpath)), 20000);
        }).then(function (frameElem) {
            return frameElem.getText();
        }).then(function (text) {
            return text;
        })
};

//35. Click on "Competitors" Next Step
clickNextCompetitors = exports.clickNextCompetitors = function () {
    return waitForElementToBeClickableById("competitorsNextStep");
};

//36. Execute Delete Account
deleteAccount = exports.deleteAccount = async function () {
    await delay(3000);
    await goToAccountSettings();
    await delay(3000);
    await waitForElementToBeClickableById("settingsDeleteAccount");
    await delay(3000);
    await waitForElementToBeClickableById("settingsDeleteAccountConfirm");
};

//37. Update the credit card details
updateCreditCard = exports.updateCreditCard = async function (cardNumber, expiryDate, nameOnCard, cvcNumber,update) {
    cardNumber = cardNumber || commonUserData.cardNumber;
    expiryDate = expiryDate || commonUserData.expiryDate;
    nameOnCard = nameOnCard || commonUserData.nameOnCard;
    cvcNumber = cvcNumber || commonUserData.cvcNumber;

    await waitForElementToBeClickable("//a[@class='payment-card__update button button-onboarding']");
    await switchToDynamicIframeAndSendKeys(0,"//input[@name='cardnumber']", cardNumber);
    await switchToDynamicIframeAndSendKeys(1,"//input[@name='exp-date']", expiryDate);
    await switchToDynamicIframeAndSendKeys(2,"//input[@name='cvc']", cvcNumber);
    await waitForElementToSendKeysById("cardname", nameOnCard);
    if (update === "yes") {
        await waitForElementToBeClickableById("settingsUpdateCreditCard");
        await delay(5000);
    }
    else if (update === "no") {
        await driver.executeScript("window.scrollTo(0,0);");
        await waitForElementToBeClickable("//a[@class='modal__close']");
        await delay(5000);
    }
};

//38. Get the Property Id from the Install Page
getPropertyIDFromInstallPage = exports.getPropertyIDFromInstallPage = function () {
    return delay(3000)
    .then(function() {
        return waitForElementToBeClickableById("trackerTabPlugin")
    })
    .then(delay(3000))
    .then(function () {
        return getTextFromElementByClassName("onboarding-plugin__pin")
    })
    .then(function (propertyID) {
        console.log('propertyID', propertyID);
        return propertyID.substring(21);
    })
};

//39. Open new tab in a browser
openNewTab = exports.openNewTab = function () {
    return driver.findElement(By.css("body")).sendKeys("CONTROL" + T);
};

//40. Install Plugin - Plugin already installed - Provide the Property ID and verify
installWordPressPlugin = exports.installWordPressPlugin = async function (wpUrl) {
    wpUrl = wpUrl || commonUserData.wpUrl;
    let propID=await getPropertyIDFromInstallPage();
    await verifyPropertyIDOnWebsite(wpUrl,propID);
    await waitForElementToBeClickableById("installNextStep");
    await delay(3000);
};

//41. Enter the property ID and verify on the website
verifyPropertyIDOnWebsite=exports.verifyPropertyIDOnWebsite=async function (wpUrl,propID) {
    wpUrl = wpUrl || commonUserData.wpUrl;
    await delay(3000);
    await driver.executeScript("window.open('" + wpUrl + "wp-admin/');");
    let allHandles = await driver.getAllWindowHandles();
    await driver.switchTo().window(allHandles[1]);
    await delay(3000);
    await loginAsAdmin();
    await waitForElementToBeClickable("//a[@href='plugins.php']");
    await delay(3000);
    await waitForElementToBeClickable("//a[@href='" + wpUrl + "wordpress/wp-admin/admin.php?page=quietly-analytics']");
    await waitForElementToBeClickable("//a[@class='quietly-analytics__module--re-enter']");
    await driver.findElement(By.xpath("//input[@class='quietly-analytics__module--input']")).clear();
    await waitForElementToSendKeys("//input[@class='quietly-analytics__module--input']", propID);
    await waitForElementToBeClickable("//button[@class='quietly-analytics__module--button']");
    await delay (3000);
    await val.validatePluginInstall();
    await driver.executeScript("window.close();");
    let allhandles = await driver.getAllWindowHandles();
    await driver.switchTo().window(allhandles[0]);
    await delay(5000);
};

//42. Select an element from a drop down
selectItemFromDropDown = exports.selectItemFromDropDown = function (elementID, optionsXpath, input) {
    return waitForElementToBeClickableById(elementID).then(function () {
        return driver.findElements(By.xpath(optionsXpath))
    }).then(function (elements) {
        let allElements = elements.map(function (element) {
            return element.getText()
                .then(function (eleText) {
                    if (eleText === input) {
                        return element.click();
                    }
                }).catch(function () {
                    return null;
                })
        });
        return Promise.all(allElements);
    })
};

//43. Get any Element By ID
getElementByID = exports.getElementByID = function (elementID) {
    return driver.wait(until.elementLocated(By.id(elementID)), 5000).then(function (element) {
        return element;
    })
};

//44. Get any Element By Class Name
getElementByClassName = exports.getElementByClassName = function (className) {
    return driver.wait(until.elementLocated(By.className(className)), 30000).then(function (element) {
        return element;
    })
};

//45. Skip the Plugin Installation and Proceed while On-boarding
skipPluginInstall = exports.skipPluginInstall = function () {
    return waitForElementToBeClickableById("installSkipStep").then(function () {
        return waitForElementToBeClickableById("skipModalInstallLater");
    })
};

//46. Install Plugin From the Settings Page
installPluginFromSettingsPage = exports.installPluginFromSettingsPage = async function (wpUrl) {
    wpUrl = wpUrl || commonUserData.wpUrl;
    await goToAnalyticsCode();
    let propID=await getPropertyIDFromInstallPage();
    // await waitForElementToBeClickable("//a[@href='" + commonUserData.installPageHref + "']");
    await verifyPropertyIDOnWebsite(wpUrl,propID);
    await waitForElementToBeClickableById("verifySnippetInstall");
    await delay(2000);
    await val.validateElementTextByID("codeInstalledMessage","Quietly Insights analytics code successfully installed");
};

//47. Add a credit card
addCreditCard = exports.addCreditCard = function (cardNumber, expiryDate, nameOnCard, cvcNumber) {
    cardNumber = cardNumber || commonUserData.cardNumber;
    expiryDate = expiryDate || commonUserData.expiryDate;
    nameOnCard = nameOnCard || commonUserData.nameOnCard;
    cvcNumber = cvcNumber || commonUserData.cvcNumber;

    return goToAccountSettings().then(function () {
        return waitForElementToBeClickableById("settingsAddCreditCard");
    }).then(function () {
        return switchToIframeAndSendKeys("//iframe[@title='Secure payment input frame']", "//input[@name='cardnumber']", cardNumber)
    }).then(function () {
        return switchToIframeAndSendKeys("//iframe[@name='__privateStripeFrame5']", "//input[@name='exp-date']", expiryDate);
    }).then(function () {
        return waitForElementToSendKeysById("cardname", nameOnCard);
    }).then(function () {
        return switchToIframeAndSendKeys("//iframe[@name='__privateStripeFrame6']", "//input[@name='cvc']", cvcNumber);
    }).then(function () {
        return waitForElementToBeClickableById("settingsUpdateCreditCard");
    })
};

//48. Upgrade to the Pro Plan
selectUpgradeFromAccountSettings=exports.selectUpgradeFromAccountSettings = async function (billingOption) {
    await goToAccountSettings();
    await delay(3000);
    await waitForElementToBeClickableById("editButtonForProperty0");
    await waitForElementToBeClickableById("upgradeToProForProperty0");
    await selectBillingOption(billingOption);
};

//49. Validate Pro Plan and add credit card information
proPlanAddCreditCard = exports.proPlanAddCreditCard = function (cardNumber, expiryDate, nameOnCard, cvcNumber) {
    return val.validateProPlan().then(function () {
        return creditCardInfo(cardNumber, expiryDate, nameOnCard, cvcNumber);
    })
};

//50. Add a new Link Click Conversion from the settings page
addNewLinkClickGoal = exports.addNewLinkClickGoal = async function (goalUrl, goalName) {
    await goToGoalsSettings();
    await waitForElementToBeClickableById("settingsAddGoal");
    await waitForElementToBeClickableById("addGoalsLinkClicks");
    await waitForElementToSendKeysById("goalUrl", goalUrl);
    await waitForElementToSendKeysById("goalName", goalName);
    await driver.executeScript("window.scrollTo(0,500);");
    await waitForElementToBeClickableById("addClickGoal");
    //await waitForElementToBeClickableById("settingsSaveChangesBottom");
    await val.validateLinkClickGoal(goalName);
};

//51. Add a new Form Submission Conversion from the settings page
addNewFormSubmissionGoal = exports.addNewFormSubmissionGoal = async function (form, goalName) {
    form=form || commonUserData.formGoalXpath;
    goalName=goalName ||commonUserData.formGoalName;
    await goToGoalsSettings();
    await waitForElementToBeClickableById("settingsAddGoal");
    await waitForElementToBeClickableById("addGoalsFormSubmission");
    await waitForElementToBeClickableById("launchVisualizer");
    await delay(5000);
    await waitForElementToBeClickable("//button[@class='quietly-tracker__module--button']");
    await waitForElementToBeClickable(form);
    await waitForElementToSendKeysById("quietly-tracker__module--form",goalName);
    await waitForElementToBeClickable("//button[@class='quietly-tracker__module--button']");
    await val.validateFormSubmissionGoal(goalName);
};

//52. Enter the Report Name
providePropertyName = exports.providePropertyName = function (reportText, emailIds) {
    reportText= reportText || commonUserData.propertyName;
    emailIds=emailIds || "";
    return waitForElementToBeClickableById("propertyName").then(function () {
        return driver.findElement(By.id("propertyName")).clear();
    }).then(function () {
        return waitForElementToSendKeysById("propertyName", reportText);
    }).then(function () {
        if (emailIds.length > 0) {
            console.log(emailIds.length);
            return addEmails(emailIds);
        }
        else {
            return null;
        }
    })
};

//53. Add a new property
addNewProperty = exports.addNewProperty = async function (billingType, promoCode) {
    await waitForElementToBeClickable("//div[@class='top-nav__arrow']");
    await waitForElementToBeClickableById("topNavCreateProperty");
    if(promoCode){
        addPromoCode(promoCode);
    }
    if (billingType==="Monthly") {
        await waitForElementToBeClickableById("switchToMonthlyProPlanLink");
    }
    else if (billingType==="Yearly"){
        await waitForElementToBeClickableById("switchToYearlyProPlanLink");
    }
    delay(2000);
    await waitForElementToBeClickableById("topNavContinueCreateProperty");
    delay(2000);
    await waitForElementToBeClickableById("topNavContinueCreateProperty");
};

//54. Go to the Account Settings Page
goToAccountSettings = exports.goToAccountSettings =async function () {
    await driver.executeScript("window.scrollTo(0,0);");
    await delay(2000);
    await waitForElementToBeClickable("//div[@class='top-nav__arrow']");
    await waitForElementToBeClickableById("topNavAccountSettings");
};

//55. Go to Content Ideas page
goToContentIdeasPage=exports.goToContentIdeasPage= async function () {
    await waitForElementToBeClickableById("contentIdeasSettingsLink");
};

//56. Go to KeyTakeAways page
goToKeyTakeawaysPage=exports.goToKeyTakeawaysPage= async function () {
    await waitForElementToBeClickableById("keyTakeawaysSettingsLink");
};

//57. Go to Competitors page
goToCompetitorsPage=exports.goToCompetitorsPage= async function () {
    await waitForElementToBeClickableById("competitorsSettingsLink");
};

//58. Open Settings
settingsOptions=exports.settingsOptions=async function(){
    await waitForElementToBeClickableById("settingsLink");
};

//59. Go to Competitors Settings Page
goToCompetitorsSettings=exports.goToCompetitorsSettings= async function () {
    await settingsOptions();
    await waitForElementToBeClickableById("competitorsLink");
};

//60. Go to Settings - Goals
goToGoalsSettings=exports.goToGoalsSettings=async function() {
    await settingsOptions();
    await waitForElementToBeClickableById("goalsLink");
};

//61. Go to Analytics Page
goToAnalyticsCode=exports.goToAnalyticsCode=async function() {
    await settingsOptions();
    await waitForElementToBeClickableById("analyticsCodeLink");
};

//62. Add GA Goal
addGAGoal=exports.addGAGoal=async function (goal) {
    await goToGoalsSettings();
    await waitForElementToBeClickableById("settingsConversionsAddGoals");
    await waitForElementToBeClickable("//span[@class='Select-arrow']");
    await selectItemFromDropDown("selectGAGoal", "//div[@class='Select-option']", goal);
    await waitForElementToBeClickableById("addGAGoal");
    await driver.executeScript("window.scrollTo(0,0);");
    await waitForElementToBeClickableById("settingsSaveChangesBottom");
};

//63. Switch property dashboard
switchProperty=exports.switchProperty=async function(id){
    await driver.executeScript("window.scrollTo(0,0);");
    await waitForElementToBeClickable("//div[@class='top-nav__arrow']");
    await waitForElementToBeClickableById(id);
};

//64. Add a new Link Click Conversion from the settings page
addNewPatternLinkClickGoal = exports.addNewPatternLinkClickGoal = async function (goalUrl, goalName) {
    await goToGoalsSettings();
    await waitForElementToBeClickableById("settingsConversionsAddGoals");
    await waitForElementToBeClickableById("addGoalsLinkClicks");
    await waitForElementToSendKeysById("goalUrl", goalUrl);
    await waitForElementToSendKeysById("goalName", goalName);
    await waitForElementToBeClickableById("isPrefix");

    await waitForElementToBeClickableById("addClickGoal");
    await driver.executeScript("window.scrollTo(0,0);");
    await waitForElementToBeClickableById("settingsSaveChangesBottom");
};

//65. Upgrade to Pro Plan
upgradeToProPlan=exports.upgradeToProPlan=async function(cardNumber,expiryDate,nameOnCard,cvcNumber){
    cardNumber = cardNumber || commonUserData.cardNumber;
    expiryDate = expiryDate || commonUserData.expiryDate;
    nameOnCard = nameOnCard || commonUserData.nameOnCard;
    cvcNumber = cvcNumber || commonUserData.cvcNumber;
    //await waitForElementToBeClickableById("upgradeToProPlanNext");
    await creditCardInfoSettings(cardNumber,expiryDate,nameOnCard,cvcNumber);
    await delay(10000);
    await val.validateUpgradeToProPlanSuccess();
    //await waitForElementToBeClickableById("upgradedToProAddCompetitors");
    // await delay(5000);
    // await waitForElementToBeClickableById("refreshDataBtn");
    // await delay(3000);
    // await waitForElementToBeClickableById("refreshDataNowBtn");
    // await waitForElementToBeClickableById("refreshDataNowBtn");
};

//66. Upgrade to monthly pro plan
selectBillingOption=exports.selectBillingOption=async function(billingOption, promoCode){
    if (billingOption==="Monthly") {
        await waitForElementToBeClickableById("switchToMonthlyProPlanLink");
    }
    else if (billingOption==="Annual"){
        await waitForElementToBeClickableById("switchToYearlyProPlanLink");
    }
    //add promocode if it is specified
    if(promoCode)
    {
        await addPromoCode(promoCode);
    }
    await waitForElementToBeClickableById("upgradeToProPlanNext");
    await delay(5000);
};

//67. Provide Credit card details from the settings page
creditCardInfoSettings=exports.creditCardInfoSettings= async function(cardNumber,expiryDate, nameOnCard, cvcNumber) {
    cardNumber = cardNumber || commonUserData.cardNumber;
    expiryDate = expiryDate || commonUserData.expiryDate;
    nameOnCard = nameOnCard || commonUserData.nameOnCard;
    cvcNumber = cvcNumber || commonUserData.cvcNumber;

    await switchToDynamicIframeAndSendKeys(0,"//input[@name='cardnumber']", cardNumber);
    await switchToDynamicIframeAndSendKeys(1,"//input[@name='exp-date']", expiryDate);
    await switchToDynamicIframeAndSendKeys(2,"//input[@name='cvc']", cvcNumber);
    await waitForElementToSendKeysById("cardname", nameOnCard);
    await waitForElementToBeClickableById("settingsUpdateCreditCard");
    await delay(5000);
};

//68. Rename the report from the settings page
renameReportSettings=exports.renameReportSettings=async function (repName) {
    await goToPropertySettings();
    await waitForElementToSendKeysById("reportName",repName);
    await waitForElementToBeClickableById("settingsSaveChangesBottom");
};

//69. Change the website URL from the settings page
changeWebsiteSettings=exports.changeWebsiteSettings=async function (webURL) {
    await goToPropertySettings();
    await waitForElementToBeClickableById("websiteUrl");
    await waitForElementToBeClickable("//button[@class='button button-onboarding']");
    await waitForElementToBeClickableById("websiteUrl").clear();
    await delay(2000);
    await waitForElementToSendKeysById("websiteUrl",webURL);
    await waitForElementToBeClickableById("settingsSaveChangesBottom");
};

//70. Go to Property Settings Page
goToPropertySettings=exports.goToPropertySettings=async function() {
    await settingsOptions();
    await waitForElementToBeClickableById("propertySettingsLink");
};

//71. Change the Billing Plan
changeBillingToAnnual=exports.changeBillingToAnnual=async function () {
    await goToAccountSettings();
    await waitForElementToBeClickableById("editButtonForProperty0");
    await waitForElementToBeClickableById("changeToAnnualBillingForProperty0");
    await waitForElementToBeClickableById("settingsChangeToYearlyBillingContinue");
};

//72. Install the tracker snippet
installTrackerSnippet=exports.installTrackerSnippet=async function (wpUrl,platform) {
    wpUrl = wpUrl || commonUserData.wpUrl;
    platform=platform || commonUserData.platform;
    let propertyID=await getPropertyIDFromInstallPage();
    console.log(propertyID);
    await waitForElementToBeClickableById("trackerTabSnippet");
    await waitForElementToBeClickableById("trackerCopySnippet");
    await copyTrackerSnippetToWebsite(wpUrl,propertyID,platform);
    await waitForElementToBeClickableById("installNextStep");
};

//73. Enter the tracker snippet and save the changes
copyTrackerSnippetToWebsite=exports.copyTrackerSnippetToWebsite=async function (wpUrl,propertyID,platform) {
    wpUrl = wpUrl || commonUserData.wpUrl;
    platform=platform||commonUserData.platform;
    await driver.executeScript("window.open('" + wpUrl + "wp-admin/');");
    let allHandles = await driver.getAllWindowHandles();
    await driver.switchTo().window(allHandles[1]);
    await delay(2000);
    await loginAsAdmin();
    await delay(2000);
    await waitForElementToBeClickableById("menu-appearance");
    await waitForElementToBeClickable("//a[@href='theme-editor.php']");
    await waitForElementToBeClickable("//a[@href='https://stagingblog.quiet.ly/wordpress/wp-admin/theme-editor.php?file=header.php&theme=quietly']");
    await delay(2000);
    let element=await driver.findElement(By.xpath("//div//textarea[@id='newcontent']"));
    let text=await element.getAttribute("innerHTML");
    let elem=await driver.findElement(By.xpath("//div[@role='textbox']"));
    if (platform==="Windows")
    {
        //On WINDOWS
        if (text.includes("analytics.min.js") === true) {
            await elem.sendKeys(Keys.chord(Keys.CONTROL, "f"), Keys.chord("analytics.min.js"), Keys.ENTER);
            await delay(2000);
            await elem.sendKeys(Keys.chord(Keys.HOME),Keys.chord(Keys.ARROW_DOWN), Keys.chord(Keys.CONTROL, "d"));
            await elem.sendKeys(Keys.chord("(window,document,'script','" + propertyID + "','[]');"), Keys.ENTER);
        }
        else {
            //Search for </head> tag and insert analytics code above it
            await elem.sendKeys(Keys.chord(Keys.CONTROL, "f"), Keys.chord("</head>"), Keys.ENTER);
            await elem.sendKeys(Keys.HOME);
            await elem.sendKeys(Keys.chord(Keys.SHIFT, Keys.INSERT));
        }
    }
    else if(platform==="MAC"){
        //ON MAC
        if (text.includes("analytics.min.js") === true) {
            await elem.sendKeys(Keys.chord(Keys.COMMAND, "f"), Keys.chord("analytics.min.js"), Keys.ENTER);
            await delay(2000);
            await elem.sendKeys(Keys.chord(Keys.CONTROL, "a"), Keys.chord(Keys.CONTROL, "n"), Keys.chord(Keys.COMMAND, "d"));
            await elem.sendKeys(Keys.chord("(window,document,'script','" + propertyID + "','[]');"), Keys.ENTER);
        }
        else {
            //Search for </head> tag and insert analytics code above it
            await elem.sendKeys(Keys.chord(Keys.COMMAND, "f"), Keys.chord("</head>"), Keys.ENTER);
            await elem.sendKeys(Keys.CONTROL, "a");
            await elem.sendKeys(Keys.chord(Keys.SHIFT, Keys.INSERT));
        }
    }
    await waitForElementToBeClickableById("submit");
    await delay(2000);
    // await val.validatePluginInstall();
    await driver.executeScript("window.close();");
    let allhandles = await driver.getAllWindowHandles();
    await driver.switchTo().window(allhandles[0]);
    await delay(5000);
};

//74. Login into staging blog to install tracker
loginAsAdmin=exports.loginAsAdmin=async function (wpAdminName,wpAdminPass) {
    wpAdminName = wpAdminName || commonUserData.wpAdminName;
    wpAdminPass = wpAdminPass || commonUserData.wpAdminPassword;
    await waitForElementToSendKeysById("user_login", wpAdminName);
    await waitForElementToSendKeysById("user_pass", wpAdminPass);
    await waitForElementToBeClickableById("wp-submit");
    await delay(2000);
};

//75. Install tracker from the settings page
installTrackerSnippetFromSettingsPage = exports.installTrackerSnippetFromSettingsPage =async function (wpUrl) {
    wpUrl = wpUrl || commonUserData.wpUrl;
    await goToAnalyticsCode();
    await delay(2000);
    await waitForElementToBeClickableById("trackerTabPlugin");
    //await waitForElementToBeClickable("//a[@href='" + commonUserData.installPageHref + "']");
    let propertyID=await getPropertyIDFromInstallPage();
    console.log(propertyID);
    await waitForElementToBeClickableById("trackerTabSnippet");
    await waitForElementToBeClickableById("trackerCopySnippet");
    await copyTrackerSnippetToWebsite(wpUrl,propertyID);
    await waitForElementToBeClickableById("verifySnippetInstall");
    await delay(2000);
    await val.validateElementTextByID("codeInstalledMessage","Quietly Insights analytics code successfully installed");
};

//76. Change the website URL from the settings page and save the changes
changeWebsiteUrl=exports.changeWebsiteUrl=async function(url){
    await goToPropertySettings();
    await waitForElementToBeClickableById("websiteUrl");
    await waitForElementToBeClickable("//button[@class='button button-onboarding']");
    let elem=await driver.findElement(By.id("websiteUrl"));
    await elem.clear();
    await elem.sendKeys(url);
    await waitForElementToBeClickableById("settingsSaveChangesBottom");
    await val.validateElementTextByID("websiteUrl",url);
};

//77. Change the property name from the settings page and save the changes
changePropertyName=exports.changePropertyName=async function(propertyName){
    await goToPropertySettings();
    let elem= await driver.findElement(By.id("reportName"));
    await elem.clear();
    await elem.sendKeys(propertyName);
    await waitForElementToBeClickableById("settingsSaveChangesBottom");
    await val.validateElementTextByID("reportName",propertyName);
};

//78. Regenerate the report from the Admin Panel
regenerateTheReport=exports.regenerateTheReport=async function(account,reportOption) {
    account=account || commonUserData.adminAccount;
    reportOption=reportOption || commonUserData.reportOption;
    //Provide the url to authenticate the website - https://username:password@<url>
    await driver.executeScript("window.open('https://vagrant:secret@qa.quiet.ly/app/admin/');");
    let allHandles = await driver.getAllWindowHandles();
    await driver.switchTo().window(allHandles[1]);
    // await waitForElementToBeClickable("//a[@ui-sref='reportMonitor']");
    await selectDropDownItemUsingRegex("//select[@id='reportAccountSelect']","//*[contains(@label,'stagingblog.quiet.ly')]",account);
    await waitForElementToBeClickable("//select[@id='reportTypeSelect']");
    if(reportOption==="monthly")
    {
        await waitForElementToBeClickable("//option[@value='monthly']");
    }
    else if (reportOption==="weekly") {
        await waitForElementToBeClickable("//option[@value='weekly']");
    }
    await waitForElementToBeClickable("//a[@ng-click='createInstance()']");
    await delay(3000);
    await waitForElementToBeClickable("//a[@ng-click='retrieveInternalData()']");
    await delay(3000);
    await waitForElementToBeClickable("//a[@ng-click='renderInstance()']");
    await delay(20000);
    await driver.executeScript("window.close();");
    let allhandles = await driver.getAllWindowHandles();
    await driver.switchTo().window(allhandles[0]);
};

//79. Add Recipients from the settings page
addEmails = exports.addEmails = function (emailIds) {
    return emailIds.reduce(function (currElem, emailID) {
        return currElem.then(function () {
            return waitForElementToBeClickable("//a[@class='recipients-table_add']").then(function () {
                return waitForElementToSendKeysById("newRecipient", emailID).then(function () {
                    return waitForElementToBeClickable("//*[contains(text(),'Add')]");
                })
            })
        })
    }, Promise.resolve())
};

//80. Select Items from the drop down providing the xpath and regular expression for drop down elements
//Regular expression would be useful if there are no unique identifiers for the drop down elements
selectDropDownItemUsingRegex=exports.selectDropDownItemUsingRegex=async function(xpath,regex,email){
    await waitForElementToBeClickable(xpath);
    let dropDownElems=await driver.wait(until.elementsLocated(By.xpath(regex)),40000);
    for(let i=0;i<dropDownElems.length;i++){
        let elemText=await dropDownElems[i].getText();
        if(elemText===email){
            await dropDownElems[i].click();
            break;
        }
    }
};

//81. Do not select goals, skip them
selectNoGoals = exports.selectNoGoals = function () {
    return selectGoals([]);
};

//82 Save Settings
saveSettings=exports.saveSettings=async function(){
    await waitForElementToBeClickableById("settingsSaveChangesBottom");
};

//83. Go to Google Analytics Settings Page
goToGoogleAnalyticsSettings=exports.goToGoogleAnalyticsSettings=async function() {
    await settingsOptions();
    await waitForElementToBeClickableById("pgoogleAnalyticsLink");
};

//84. Go to the Home Settings Page after onboarding
goToHomeSettings=exports.goToHomeSettings=async function() {
    await waitForElementToBeClickable("//a[@class='button button-onboarding']");
    await settingsOptions();
    await waitForElementToBeClickableById("homeSettingsLink");
}

//85. Sync Google Analytics from Homepage
syncGoogleAnalyticsFromHome=exports.syncGoogleAnalyticsFromHome=async function() {
    await waitForElementToBeClickable("//a[@class='button button button-onboarding']");
    await waitForElementToBeClickableById("importGAbtn");
    await waitForElementToBeClickable("//div[@data-identifier='" + commonUserData.userName + "']");
    await allowAccess('Allow');
    await delay(5000);
    await provideGoogleAnalyticsInfo();
}

syncEmptyGoogleAnalyticsFromHome=exports.syncEmptyGoogleAnalyticsFromHome=async function() {
    await waitForElementToBeClickable("//a[@class='button button button-onboarding']");
    await waitForElementToBeClickableById("importGAbtn");
    await waitForElementToBeClickable("//div[@data-identifier='" + commonUserData.userName + "']");
    await allowAccess('Allow');
    await delay(5000);
    await provideGoogleAnalyticsInfo('Quietly', 'Quietly Marketing', 'Test');
}

//86. Add competetior from Homepage
addCompetitorFromHome=exports.addCompetitorFromHome=async function(siteUrl) {
    await waitForElementToSendKeysById("overviewCompetitorInput1", siteUrl);
    await waitForElementToBeClickableById("overviewCompetitor1");
}

//87. Provide coupon code info
addPromoCode = exports.addPromoCode = async function (promoCode) {
    promoCode=promoCode|| commonUserData.promoCode;
    console.log('Applying Promo Code: ' + promoCode);
    await waitForElementToSendKeysById("promocode", promoCode);
    await waitForElementToBeClickableById("confirmCoupon");
    await delay(5000);
}