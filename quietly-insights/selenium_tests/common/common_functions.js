const Promise = require('promise');
const webDriver = require('selenium-webdriver');
const Keys = webDriver.Key;
const promiseRetry = require('promise-retry');
const {until, By } = webDriver;
const {user: commonUserData} = require('../common/common_data');
const val = require('./validations');
const commonBeforeAfter = require('./commonBeforeAfter');
var testBrowser;
var testServer;
var testCapabilities;

//1. Open Browser
exports.openBrowser = (browser, server) => {
    testBrowser=browser;
    testServer=server;
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
    testCapabilities=capabilities;
};

//2. Go to the Login page of Quietly Insights
//This function always returns an incomplete page completion status
partialPageScroll =exports.partialPageScroll = async function() {
    for(let i=0; i<2; i++)
    {
        driver = new webDriver.Builder().usingServer(testServer).withCapabilities(testCapabilities).build();
        driver.manage().window().setSize(commonUserData.defaultScreenWidth, commonUserData.defaultScreenHeight);
        await driver.get(commonUserData.partialReadBlogUrl);
        await delay(10000);
        await driver.executeScript("window.scrollBy(0,1100)");
        await scrollDown(40);
        await scrollUp(20);
        await scrollTop();
        await delay(10000);
        //await driver.findElement(By.xpath("//a[@class='url fn']")).click();
        await driver.close();
    }
};

//3. Go to the Login page of Quietly Insights
//This function always allows a complete page completion status
completePageScroll =exports.completePageScroll = async function() {
    for(let i=0; i<2; i++)
    {
        driver = new webDriver.Builder().usingServer(testServer).withCapabilities(testCapabilities).build();
        driver.manage().window().setSize(commonUserData.defaultScreenWidth, commonUserData.defaultScreenHeight);
        scrollHeight= await driver.executeScript("return document.body.scrollHeight");
        await driver.get(commonUserData.fullReadBlogUrl);
        await scrollDown(scrollHeight);
        await driver.close();
    }
};

//4. Go to Testing 3 -> Testing 2 -> Testing
//This function always allows a complete page completion status
ticTacToe =exports.ticTacToe = async function() {
    for(let i=0; i<2; i++)
    {
        driver = new webDriver.Builder().usingServer(testServer).withCapabilities(testCapabilities).build();
        driver.manage().window().setSize(commonUserData.defaultScreenWidth, commonUserData.defaultScreenHeight);
        await traverseUrlSequence();
        await waitForElementToBeClickable("//a[@class='url fn']");
        await driver.close();
    }
};

//5. Skims entire document
// Tests a scenario when user quickly scrolls from top to bottom of the document
principalSkimmer =exports.principalSkimmer = async function() {
    for(let i=0; i<2; i++)
    {
        driver = new webDriver.Builder().usingServer(testServer).withCapabilities(testCapabilities).build();
        driver.manage().window().setSize(commonUserData.defaultScreenWidth, commonUserData.defaultScreenHeight);
        await driver.get(commonUserData.skimReadBlogUrl);
        await delay(10000);
        await skimDocument();
        await driver.close();
    }ß
};

//6. Test Reads Document
paragraphReadTest =exports.paragraphReadTest = async function(headings, wordCount) {
    wordCount = wordCount || commonUserData.paragraphWordCount;
    headings = headings || commonUserData.paragraphHeadings;    

    //Read article completely at 200wpm (100% completion rate)
    driver = new webDriver.Builder().usingServer(testServer).withCapabilities(testCapabilities).build();
    driver.manage().window().setSize(commonUserData.defaultScreenWidth, commonUserData.defaultScreenHeight);
    await driver.get(commonUserData.paragraphReadBlogUrl);
    //await delay(10000);
    for(let idx = 0; idx < headings.length; idx++)
    {
        console.log("Currently looking at paragraph heading:" + headings[idx]);
        scrollToElementByXpath("//p[contains(text(), '" + headings[idx] + "')]");
        await waitForCompleteRead(wordCount);
    }
    await driver.close();

    //Read article incompletely at 400wpm (0% completion rate)
    driver = new webDriver.Builder().usingServer(testServer).withCapabilities(testCapabilities).build();
    driver.manage().window().setSize(commonUserData.defaultScreenWidth, commonUserData.defaultScreenHeight);
    await driver.get(commonUserData.paragraphReadBlogUrl);
    //await delay(10000);
    for(let idx = 0; idx < headings.length; idx++)
    {
        console.log("Currently looking at paragraph heading:" + headings[idx]);
        scrollToElementByXpath("//p[contains(text(), '" + headings[idx] + "')]");
        await waitForIncompleteRead(wordCount);
    }
    await driver.close();

};

//6. Helper Function for document reading
convertForm =exports.convertForm = async function(assistUrls, xpath)
{
    assistUrls = assistUrls || commonUserData.assistUrls;
    xpath =  xpath || commonUserData.formXpath;
    driver = new webDriver.Builder().usingServer(testServer).withCapabilities(testCapabilities).build();
    driver.manage().window().setSize(commonUserData.defaultScreenWidth, commonUserData.defaultScreenHeight);
    await traverseUrlSequence(assistUrls);
    await waitForElementToBeClickable(xpath);
    await driver.close();
};
convertLink =exports.convertLink = async function(assistUrls, xpath)
{
    assistUrls = assistUrls || commonUserData.assistUrls;
    xpath =  xpath || commonUserData.linkXpath;
    driver = new webDriver.Builder().usingServer(testServer).withCapabilities(testCapabilities).build();
    driver.manage().window().setSize(commonUserData.defaultScreenWidth, commonUserData.defaultScreenHeight);
    await traverseUrlSequence(assistUrls);
    await waitForElementToBeClickable(xpath);
    await driver.close();
};
dontConvert =exports.dontConvert = async function(assistUrls)
{
    assistUrls = assistUrls || commonUserData.assistUrls;
    driver = new webDriver.Builder().usingServer(testServer).withCapabilities(testCapabilities).build();
    driver.manage().window().setSize(commonUserData.defaultScreenWidth, commonUserData.defaultScreenHeight);
    await traverseUrlSequence(assistUrls);
    await driver.close();
};


// Helper Function VVVVVV

// Wait for some time
delay = exports.delay = function (t) {
    return new Promise(function (resolve) {
        setTimeout(resolve, t)
    })
};

//trasverses a list of urls in the quietly blog page
traverseUrlSequence = exports.traverseUrlSequence = async function(urls)
{
    urls = urls || commonUserData.assistUrls;
    await driver.get(urls[0]);
    await delay(5000);
    for(let i = 1; i < urls.length; i++)
    {
        await delay(5000);
        await waitForElementToBeClickable("//a[@href='" + urls[i] +"']");
        await delay(5000);
    }
}

// Scroll by fixed amounts
scrollDown = exports.scrollDown = async function(duration)
{
    for(let i=0; i < duration; i++)
    {
        await driver.executeScript("window.scrollBy(0,10)");
        await delay(150);
    }
}
scrollUp = exports.scrollUp = async function(duration)
{
    for(let i=0; i < duration; i++)
    {
        await driver.executeScript("window.scrollBy(0,-10)");
        await delay(150);
    }
}

//skims the entire page from top to bottom
skimDocument = exports.skimDocument = async function()
{
    scrollHeight = await driver.executeScript("return document.body.scrollHeight");
    pageHeight = commonUserData.defaultScreenHeight;
    for(let i=0; i < scrollHeight / pageHeight; i++)
    {
        await driver.executeScript("window.scrollBy(0," + pageHeight + ")");
        await delay(150);
    }
}
scrollTop = exports.scrollTop = async function()
{
    await driver.executeScript("window.scrollTo(0,0)");
}

scrollBottom = exports.scrollBottom = async function()
{
    await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)")
}

//wait at a rate of more than 100WPM, plus 1 sec.
//word count / 100 * 60 secs per min * 1000 msec + 1000
waitForCompleteRead = exports.waitForCompleteDoc = async function(wordCount, wpm)
{
    var wpm=wpm||commonUserData.wpm;
    var delayTime = (wordCount / wpm) * 60 * 1000 + 5000;
    console.log("Delay: " + delayTime/1000 + "s");
    await delay(delayTime);
}

//wait at a rate of 200WPM.
//word count / 200 * 60 secs per min * 1000 msec
waitForIncompleteRead = exports.waitForIncompleteDoc = async function (wordCount, wpm)
{
    var wpm=commonUserData.wpm * 3 || wpm;
    var delayTime = (wordCount / wpm) * 60 * 1000;
    console.log("Delay: " + delayTime/1000 + "s");
    await delay(delayTime);
}

//Scroll to Element by Xpath
scrollToElementByXpath = exports.scrollToElementByXpath = function (elementXpath) {
    return driver.wait(until.elementLocated(By.xpath(elementXpath)), 5000).then(async function (element) {
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", element);
    })
};


//Locators


waitForElementToBeClickable = exports.waitForElementToBeClickable = function (xpath) {
    
    return waitForElementToBeClickableForElement(() => By.xpath(xpath));
};

waitForElementToBeClickableById = exports.waitForElementToBeClickableById = function (id) {
    console.log('waitForElementToBeClickableById', id);
    return waitForElementToBeClickableForElement(() => By.id(id));
};

waitForElementToBeClickableByCss = exports.waitForElementToBeClickableByCss = function (css) {
    return waitForElementToBeClickableForElement(() => By.css(css));
};

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