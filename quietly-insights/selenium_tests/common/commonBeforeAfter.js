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
