const common = require('./common_functions');
const db = require('./database.js');
const {user, app} = require('./common_data');

let accountDeletionList = [];

exports.loadBeforeAndAfterEach = function() {

    beforeEach( async function() {
        try {
            await common.openBrowser(app.browser,app.server);
        } catch (error) {
            console.log(error);
        }

    });

    afterEach( async function() {
        try {
            await db.deleteStripeCustomer(user.userName);
            await db.deleteAccountInDatabase(user.userName);
            for (let i = 0; i < accountDeletionList.length; i++) {
                await db.deleteAccountById(accountDeletionList[i]);
            }
            accountDeletionList = [];

            let session = await driver.getSession();
            if (session && session.getId()) {
                console.log('sessionId', session.getId());
                await driver.quit();
                console.log('driver cleaned up successfully');
            }
        } catch (error) {
            console.log(error);
        }
    })

};

addToDeletionList=exports.addToDeletionList = async function(email) {
    const retryOptions = {
        retries: 10,
        minTimeout: 2000
    };
    for (let i = 0; i < retryOptions.retries; i++) {
        let aid = await db.getAccountId(email);
        if (aid) {
            accountDeletionList.push(aid);
            console.log(`${aid} will be automatically deleted after the test`);
            return;
        }
        console.log(`addToDeletionList ${email} retry`);
        await common.delay(retryOptions.minTimeout);
    }
    throw Error(`Unable to retrieve aid for ${email}`)
};

exports.removeFromDeletionList = async function(aid) {
    let index = accountDeletionList.indexOf(aid);
    if (index !== -1) {
        accountDeletionList.splice(index, 1);
        console.log(`removeFromDeletionList ${aid} aid`);
    }
};
