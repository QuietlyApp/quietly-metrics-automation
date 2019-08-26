const common = require('./common_functions');
const val = require('./validations');
const Promise = require('promise');
const expect = require('chai').expect;
const webDriver = require("selenium-webdriver");
const {until, By} = webDriver;
const PromiseArrays = require('promise-arrays');

//Number of Validations - 27

//1. Validate the Credit Card Information visible on the "Settings" page
validateCreditCardInfo = exports.validateCreditCardInfo = async function (cardNum, date) {
    await common.goToAccountSettings();
    await common.delay(2000);
    await val.validateElementToIncludeTextByClassName("payment-card__number",cardNum);
    await val.validateElementToIncludeTextByClassName("payment-card__expiry",date);
};

//2. Validate Text of Settings Page Element By ID
validateSettingsPageElementByID = exports.validateSettingsPageElementByID = function (ID, expText) {
    return common.goToPropertySettings().then(function () {
            return val.validateElementTextByID(ID, expText);                                              //Identify an element by Id , get the text and verify with the expected text value
        })
};

//3. Validate Text of Settings Page Element By Xpath
validateSettingsPageElementByXpath = exports.validateSettingsPageElementByXpath = function (Xpath, expText) {
    return common.goToSettingsPage()   //Go to the Settings Page
        .then(function () {
            return val.validateElementTextByXpath(Xpath, expText);                                              //Identify an element by Id , get the text and verify with the expected text value
        })
};

//4. Validate Text of Settings Page Element By ClassName
validateSettingsPageElementByClass = exports.validateSettingsPageElementByXpath = function (ClassName, expText) {
    return common.goToSettingsPage()                                  //Go to the Settings Page
        .then(function () {
            return val.validateElementTextByClassName(ClassName, expText);                                              //Identify an element by Id , get the text and verify with the expected text value
        })
};

//5. Get the text of an element by ClassName and validate the expected substring to be a part of actual string
validateSettingsPageSubStringElementByClass = exports.validateSettingsPageSubStringElementByClass = function (className, expSubString) {
    return new Promise(function (resolve, reject) {
        let reqElem = driver.wait(until.elementLocated(By.className(className)), 20000);
            return driver.findElement(By.className(className)).then(function (elem) {
                return elem.getText();
            }).then(function (actText) {
                console.log(actText);
                if (actText.includes(expSubString)) {
                    resolve();
                }
                else {
                    return driver.wait(until.elementTextContains(reqElem, expSubString), 60000).then(function () {
                        resolve();
                    })
                }
            })
        }).catch(function (err) {
            reject(err);
        })
};

//6. Validate Plugin Install from Settings Page
validateWordPressPluginInstall = exports.validateWordPressPluginInstall = function () {
    return new Promise(function (resolve, reject) {
        return delay(5000).then(function () {                                   //Delay is required as the status is not immediately reflected
            return validateSettingsPageSubStringElementByClass("verify-status", "Quietly Insights analytics code successfully installed");
        }).then(function () {
            resolve(console.log("Settings Page: Plugin installed successfully"));
        }).catch(function (err) {
            reject(err);
        })
    })
};

//7. Validate Plugin Not Installed from Settings Page
validateWordPressPluginNotInstalled = exports.validateWordPressPluginNotInstalled = function () {
    return new Promise(function (resolve, reject) {
        return common.goToAnalyticsCode().then(function () {
            return driver.wait(until.elementLocated(By.className("verify-status")), 20000).then(function (elem) {
                return elem.getText();
            }).then(function (actText) {
                if (expect(actText).not.to.include("Quietly Insights analyitcs code successfully installed") &&
                    driver.findElement(By.id("verifySnippetInstall")).isEnabled()) {
                    resolve();
                }
            }).catch(function (err) {
                reject(err);
            })
        })
    })
};

//8. Validate Primary Goal in the Settings Page
validatePrimaryGoalSettingsPage = exports.validatePrimaryGoalSettingsPage = function (expText) {
    return val.validateElementTextToIncludeByID("selectPrimaryGoal", expText);                        //Get the text of the primary goal field and validate with the expected text value
};

//9. Validate Report Name from Settings Page
validateReportNameSettingsPage = exports.validateReportNameSettingsPage = async expName => {
    await val.validateElementTextByID("reportName", expName);                                            //Get the text of the report name and validate with the expected text value
};

//10. Validate Account, Property and View from Settings Page
validateWebsiteInfoSettingsPage = exports.validateWebsiteInfoSettingsPage = function (expAcc, expProp, expView) {
    return val.validateElementTextByClassName("selectAccount", expAcc).then(function () {
        return val.validateElementTextByClassName("selectProperty", expProp).then(function () {
            return val.validateElementTextByClassName("selectView", expView);
        })
    })
};

//11. Validate Additional Goals from Settings Page
validateAdditionalGoalSettingsPage = exports.validateAdditionalGoalSettingsPage = function (goals) {
    let x = 0;
    return goals.reduce(function (curElem, nextElem) {
        return curElem.then(function () {
            let result = x + 1;
            x = result;
            return val.validateElementTextToIncludeByID("selectSecondaryGoal" + result, nextElem);
        })
    }, Promise.resolve())
};

//12. Validate the Monthly Reports Metric Information for Reach Section
validateMonthlyReportsReachData = exports.validateMonthlyReportsReachData = function (expData) {
    return new Promise(function (resolve, reject) {
        if (expect(expData).to.include("Key Takeaways") &&
            expect(expData).to.include("Pageviews and Avg. Session Duration") &&
            expect(expData).to.include("Traffic Sources") &&
            expect(expData).to.include("Users") && expect(expData).to.include("Top Pages")) {
            resolve(console.log("Reach Data Validation for Monthly Reports is Successful"));
        }
        else {
            reject(console.log("Reach Data Validation for Monthly Reports Failed"));
        }
    }).catch(function (err) {
        console.log(err);
    })
};

//13. Validate the Competitors Data in Monthly Reports
validateTopicsCompetitorData = exports.validateTopicsCompetitorData = function (expData, competitors) {
    return new Promise(function (resolve, reject) {
        let PromiseContents = competitors.map(function (comp) {
            if (expData.includes(comp) && expect(expData).not.to.include("We couldn't find any data from " + comp + " for this month.")) {
                console.log("Competitor input which has data for topics is : " + comp);
                expect(expData).to.include("Best performing topics from " + comp);
            }
            else if (expData.includes(comp) && expect(expData).to.include("We couldn't find any data from " + comp + "for this month.")) {
                console.log("Competitor input which has no data for topics is : " + comp);
                expect(expData).to.include("We couldn't find any data from " + comp + " for this time period.");
            }
        });
        Promise.all(PromiseContents).then(function () {
            resolve(console.log("Competitors data validation is successful"));
        }).catch(function (err) {
            reject(err);
        })
    })
};

//14. Validate the Competitors Data in Monthly Reports
validateEngageCompetitorData = exports.validateEngageCompetitorData = function (expData, competitors) {
    return new Promise(function (resolve, reject) {
        let PromiseContents = competitors.map(function (comp) {
            if (expData.includes(comp) && expect(expData).not.to.include("We couldn't find any data from " + comp + " for this month.")) {
                console.log("Competitor input with engagements data " + comp);
            }
            else if (expData.includes(comp) && expect(expData).to.include("We couldn't find any data from " + comp + "for this month.")) {
                console.log("Competitor input which has no engagements data: " + comp);
            }
        });
        Promise.all(PromiseContents).then(function () {
            resolve(console.log("Engage Section Competitors data validation is successful"));
        }).catch(function (err) {
            reject(err);
        })
    })
};

//15. Validate the Monthly Reports Metric Information for Engage Section
validateMonthlyReportsEngageData = exports.validateMonthlyReportsEngageData = function (expData, plugin, comp) {
    return new Promise(function (resolve, reject) {
        if (plugin === false && comp === "") {
            if (expect(expData).to.include("Looks like you don't have the Quietly Insights analytics code set up on your site.") &&
                expect(expData).to.include("Bounce Rate") &&
                expect(expData).to.include("Avg. Time on Page") && expect(expData).to.include("Most Engaging Posts this Month") &&
                expect(expData).to.include("Competitors' Most Engaging Posts this Month") &&
                expect(expData).to.include("Hmm... It looks like you haven't entered any competitors yet.")) {
                resolve(console.log("No Plugin and competitors: Engage Data Validation for Monthly Reports is Successful"));
            }
            else {
                reject();
            }
        }
        else if (plugin === false && comp.length > 0) {
            return validateEngageCompetitorData(expData, comp, false).then(function () {
                if (expect(expData).to.include("Looks like you don't have the Quietly Insights analytics code set up on your site.") &&
                    expect(expData).to.include("Bounce Rate") &&
                    expect(expData).to.include("Avg. Time on Page") && expect(expData).to.include("Most Engaging Posts this Month") &&
                    expect(expData).to.include("Competitors' Most Engaging Posts this Month") &&
                    expect(expData).to.not.include("Hmm... It looks like you haven't entered any competitors yet.")) {
                    resolve(console.log("Competitors specified: Engage Data Validation for Monthly Reports is Successful"));
                }
                else {
                    reject();
                }
            })
        }
        else if (plugin === true && comp === "") {
            if (expect(expData).to.include("Normally, you'd see data here about your site's completion rate and average read percentage.") &&
                expect(expData).to.include("Bounce Rate") &&
                expect(expData).to.include("Avg. Time on Page") && expect(expData).to.include("Most Engaging Posts this Month") &&
                expect(expData).to.include("Competitors' Most Engaging Posts this Month") &&
                expect(expData).to.include("Hmm... It looks like you haven't entered any competitors yet.")) {
                resolve(console.log("Plugin installed: No Competitors,Engage Data Validation for Monthly Reports is Successful"));
            }
            else {
                reject();
            }
        }
        else if (plugin === true && comp.length > 0) {
            return validateEngageCompetitorData(expData, comp, false).then(function () {
                if (expect(expData).to.include("Normally, you'd see data here about your site's completion rate and average read percentage.") &&
                    expect(expData).to.include("Bounce Rate") &&
                    expect(expData).to.include("Avg. Time on Page") && expect(expData).to.include("Most Engaging Posts this Month") &&
                    expect(expData).to.include("Competitors' Most Engaging Posts this Month") &&
                    expect(expData).to.not.include("Hmm... It looks like you haven't entered any competitors yet.")) {
                    resolve(console.log("Plugin and Competitors Specified: Engage Data Validation for Monthly Reports is Successful"));
                }
                else {
                    reject();
                }
            })

        }
    }).catch(function (err) {
        return console.log("Engage Data Validation for Monthly Reports Failed: " + err);
    })
};

//16. Validate the Goals data in Monthly Reports
validateGoalsData = exports.validateGoalsData = function (expData, goals) {
    return new Promise(function (resolve, reject) {
        let PromiseContents = goals.map(function (goal) {
            if (expect(expData).to.include(goal)) {
                return console.log("Goal input is: " + goal);
            }
        });
        Promise.all(PromiseContents).then(function () {
            resolve(console.log("Goals data validation is successful"));
        }).catch(function (err) {
            reject(err);
        })
    })
};

//17. Validate the Monthly Reports Metric Information for Convert Section
validateMonthlyReportsConvertData = exports.validateMonthlyReportsConvertData = function (expData, goals) {
    return new Promise(function (resolve, reject) {
        if (goals.length > 0 && expect(expData).not.to.include("Hmm... It looks like you haven't set up any Goals in your Google Analytics account.")) {
            return validateGoalsData(expData, goals).then(function () {
                resolve(console.log("Goals Specified: Convert Data Validation is Successful"));
            }).catch(function (err) {
                reject(console.log("Convert Data Validation is Failed: " + err));
            })
        }
        else if (expect(expData).to.include("Hmm... It looks like you haven't set up any Goals in your Google Analytics account.")) {
            resolve(console.log("No Goals: Convert Data Validation is Successful"));
        }
        else {
            reject();
        }
    })
};

//18. Validate the Goals data in Weekly Snapshots
validateGoalsDatainSnapshots = exports.validateGoalsDatainSnapshots = function (expData, goals) {
    return new Promise(function (resolve) {
        let PromiseContents = goals.map(function (goal) {
            if (expect(expData).to.include(goal)) {
                return console.log("Goal input: " + goal);
            }
        });
        Promise.all(PromiseContents).then(function () {
            resolve(console.log("Goals data validation is successful in Weekly Snapshots"));
        }).catch(function (err) {
            return console.log(err);
        })
    })
};

//19. Validate the Weekly Reports Data
validateWeeklyReports = exports.validateWeeklyReports = function (plugin, goals) {
    return new Promise(function (resolve, reject) {
        return common.getWeeklyReportData().then(function (expData) {
            if (plugin === false && goals === "") {
                if (expect(expData).to.include("Pageviews") &&
                    expect(expData).to.include("Users") &&
                    expect(expData).to.include("Avg. Session Duration") &&
                    expect(expData).to.include("Traffic Sources") &&
                    expect(expData).to.include("Other Metrics") &&
                    expect(expData).to.include("Looks like you don't have the Quietly Insights analytics code set up on your site.") &&
                    expect(expData).to.include("Hmm... It looks like you haven't set up any Goals in your Google Analytics account.")) {
                    resolve(console.log("No Plugin and Goals: Weekly Snapshots Data Validation is Successful"));
                }
            }
            else if (plugin === false && goals.length > 0) {
                return validateGoalsDatainSnapshots(expData, goals).then(function () {
                    if (expect(expData).to.include("Pageviews") &&
                        expect(expData).to.include("Users") &&
                        expect(expData).to.include("Avg. Session Duration") &&
                        expect(expData).to.include("Traffic Sources") &&
                        expect(expData).to.include("Other Metrics") &&
                        expect(expData).to.include("Looks like you don't have the Quietly Insights analytics code set up on your site.") &&
                        expect(expData).not.to.include("Hmm... It looks like you haven't set up any Goals in your Google Analytics account.")) {
                        resolve(console.log("Goals Specified: Weekly Snapshots Data Validation is Successful"));
                    }
                })
            }
            else if (plugin === true && goals === "") {
                if (expect(expData).to.include("Pageviews") &&
                    expect(expData).to.include("Users") &&
                    expect(expData).to.include("Avg. Session Duration") &&
                    expect(expData).to.include("Traffic Sources") &&
                    expect(expData).to.include("Other Metrics") &&
                    expect(expData).to.include("Normally, you'd see data here about your site's completion rate and average read percentage.") &&
                    expect(expData).to.include("Hmm... It looks like you haven't set up any Goals in your Google Analytics account.")) {
                    resolve(console.log("Plugin Installed: No Goals,Weekly Snapshots Data Validation is Successful"));
                }
            }
            else if (plugin === true && goals.length > 0) {
                return validateGoalsDatainSnapshots(expData, goals).then(function () {
                    if (expect(expData).to.include("Pageviews") &&
                        expect(expData).to.include("Users") &&
                        expect(expData).to.include("Avg. Session Duration") &&
                        expect(expData).to.include("Traffic Sources") &&
                        expect(expData).to.include("Other Metrics") &&
                        expect(expData).to.include("Normally, you'd see data here about your site's completion rate and average read percentage.") &&
                        expect(expData).not.to.include("Hmm... It looks like you haven't set up any Goals in your Google Analytics account.")) {
                        resolve(console.log("Plugin and Goals Specified: Weekly Reports Data Validation is Successful"));
                    }
                })
            }
        }).catch(function (err) {
            reject(console.log("Weekly Reports Data Validation Failed: " + err));
        }).then(function () {
            return driver.switchTo().defaultContent();
        })
    })
};

//20. validate Monthly Reports Reach Data with Key Topics
validateMonthlyReportsReachDataWithKeyTopics = exports.validateMonthlyReportsReachDataWithKeyTopics = function (expData, comp) {
    return new Promise(function (resolve, reject) {
        if (comp.length > 0) {
            return validateTopicsCompetitorData(expData, comp).then(function () {
                if (expect(expData).to.include("Key Takeaways") &&
                    expect(expData).to.include("Pageviews and Avg. Session Duration") &&
                    expect(expData).to.include("Traffic Sources") &&
                    expect(expData).to.include("Users") && expect(expData).to.include("Top Pages") &&
                    expect(expData).to.include("Key topics by competitor")) {
                    resolve(console.log("Reach Data Validation for Monthly Reports with Topics and comp is Successful"));
                }
                else {
                    reject();
                }
            }).catch(function (err) {
                console.log("Reach Data Validation for Monthly Reports with Topics Failed: " + err);
            })
        }
        else if (comp === "") {
            if (expect(expData).to.include("Key Takeaways") &&
                expect(expData).to.include("Pageviews and Avg. Session Duration") &&
                expect(expData).to.include("Traffic Sources") &&
                expect(expData).to.include("Users") && expect(expData).to.include("Top Pages") &&
                expect(expData).to.include("Key Topics")) {
                resolve(console.log("Reach Data Validation for Monthly Reports with Topics and without comp is Successful"));
            }
            else {
                reject();
            }
        }

    })
};

//21. Validate Reports With Respect to Key Topics
validateMonthlyReportsEngageDataWithKeyTopics = exports.validateMonthlyReportsEngageDataWithKeyTopics = function (expData, comp) {
    return new Promise(function (resolve, reject) {
        if (comp.length > 0) {
            return validateCompetitorData(expData, comp, true).then(function () {
                if (expect(expData).to.include("Looks like you don't have the Quietly Insights analytics code set up on your site.") &&
                    expect(expData).to.include("Bounce Rate") &&
                    expect(expData).to.include("Avg. Time on Page") && expect(expData).to.include("Most Engaging Posts this Month") &&
                    expect(expData).to.include("Competitors' Most Engaging Posts this Month") &&
                    expect(expData).to.not.include("Hmm... It looks like you haven't entered any competitors yet.") &&
                    expect(expData).to.not.include("We couldn't find any data from " + comp + " for this month.")) {
                    resolve(console.log("Competitors specified: Engage Data Validation for Monthly Reports is Successful"));
                }
            }).catch(function (err) {
                reject(console.log("Reach Data Validation for Monthly Reports Failed: ") + err);
            })
        }
        else if (comp === "") {
            if (expect(expData).to.include("Key Takeaways") &&
                expect(expData).to.include("Pageviews and Avg. Session Duration") &&
                expect(expData).to.include("Traffic Sources") &&
                expect(expData).to.include("Users") && expect(expData).to.include("Top Pages") &&
                expect(expData).to.include("Key Topics")) {
                resolve(console.log("Reach Data Validation for Monthly Reports is Successful"));
            }
            else {
                reject(console.log("Reach Data Validation for Monthly Reports Failed"));
            }
        }
    }).catch(function (err) {
        console.log("Reach Data Validation for Monthly Reports Failed: " + err);
    })
};

//22. Validate competitors key Topics data in Monthly Reports
validateCompetitorKeyTopics = exports.validateCompetitorKeyTopics = function (expData, competitors) {
    return new Promise(function (resolve, reject) {
        let PromiseContents = competitors.map(function (comp) {
            if (expect(expData).to.include("We couldn't find any data from " + comp + "for this month")) {
                console.log("Competitor which has no data is : " + comp);
            }
        });
        Promise.all(PromiseContents).then(function () {
            resolve(console.log("Competitors data validation is successful"));
        }).catch(function (err) {
            reject(err);
        })
    })
};

//23. Check whether a given element matches with at-least one element in an array
checkElementPresenceInArray = exports.checkElementPresenceInArray = function (arr, expText) {
    return new Promise(function (resolve) {
        let PromiseContents= arr.some(function (elem) {
            return elem.getText().then(function (actText) {
                if (actText === expText) {
                    resolve(true);
                }
            }).catch(function (err) {
                throw err;
            })
        });
        return Promise.all(PromiseContents);
    });

};

//24. Validate the Plan type from the setting page
validatePlanType = exports.validatePlanType = function (planType) {
    return new Promise(function (resolve,reject) {
        return common.goToAccountSettings().then(function () {
            return driver.wait(until.elementsLocated(By.xpath("//div[@class='report-settings__form-col23']")), 30000);
        }).then(function (elems) {
            return delay(2000).then(function () {
                return checkElementPresenceInArray(elems, planType).then(function (res) {
                    if (res === true) {
                        resolve(console.log("plan type is validated"));
                    }
                    else {
                        reject(console.log("Plan type is not what is expected"));
                    }
                }).catch(function (err) {
                    throw err;
                })
            })
        })
    })
};

//25. Validate if the user has no access to the Quietly Analytics Goals
validateNoAccessToGAGoals = exports.validateNoAccessToGAGoals = function () {
    return new Promise(function (resolve, reject) {
        return common.goToGoalsSettings().then(function () {
            return driver.wait(until.elementLocated(By.className("report-settings__form-row")), 30000).then(function (elem) {
                return elem.getText();
            }).then(function (actText) {
                if (actText.includes("It looks like you don't have Quietly Analytics installed on your website.")) {
                    resolve();
                }
                else {
                    reject();
                }
            })
        })
    })
};

//26. Validate GA Goals from the settings page
validateGAGoals=exports.validateGAGoals=async function(goals){
    await common.goToGoalsSettings();
    for (let i=0;i<goals.length;i++)
    {
        await validateSubStringByXpath("//div[@class='goals-list-inner']","GA GOAL: "+goals[i].toUpperCase());
        console.log(goals[i]);
    }
};

//27. Validate competitors from Settings Page
validateCompetitorsSettingsPage = exports.validateCompetitorsSettingsPage = function (competitors) {
        let x = 0;
        return competitors.reduce(function (curElem, nextElem) {
            return curElem.then(function () {
                let result = x + 1;
                x = result;
                return val.validateElementTextByID("competitor"+result,nextElem);
            })
        }, Promise.resolve());
};

//27. Validate competitors from Settings Page
/*validateCompetitorsSettingsPage = exports.validateCompetitorsSettingsPage = async function (competitors) {
    await common.goToCompetitorsSettings();
    for (let i=0;i<competitors.length;i++)
    {
        await validateSubStringByXpath("//div[@class='report-settings__form-row']",competitors[i]);
        console.log(competitors[i]);
    }
};

*/