const mysql = require('mysql');
const sqlString = require('sqlstring');
const {db: dbParams, app: appParams} = require('./common_data');
let stripe = require("stripe")(appParams.stripeKey);

//Number of functions: 16

let connection = mysql.createConnection({
    host: dbParams.host,
    user: dbParams.userName,
    password: dbParams.password,
    database: dbParams.name,
    multipleStatements: true
});

function query(sql) {
    return new Promise(function(resolve) {
        connection.query(sql, function (err, results) {
            if (results) {
                resolve(results);
            } else {
                resolve(null);
            }
        })
    })
}

async function queryOne(sql) {
    let results = await query(sql);
    if (results && results[0]) {
        return results[0];
    }
    return null;
}

//1. Connect to the database
connectToDatabase = exports.connectToDatabase = function () {
    return new Promise(function (resolve, reject) {
        //Connect to the database
        connection.connect(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
                console.log("Data base connection is successful");
            }
        });
    })
};

//2. Disconnect from the database
disconnectFromDatabase = exports.disconnectFromDatabase = function () {
    return new Promise(function (resolve, reject) {
        //End the Connection
        connection.end(function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve();
                console.log("The database connection is terminated");
            }
        })
    })
};

//3. Execute a query to get the customerID from the database
getCustomerID = exports.getCustomerID = function (email) {
    //Get the customer id for the email specified
    return new Promise(function (resolve) {
        //Execute query to get the customer ID specific to an email
        let myQuery = "select stripeCustomerId from accounts WHERE email=" + sqlString.escape(email);
        connection.query(myQuery, function (err,result) {
            if(result[0]!==undefined) {
                let customerID = result[0].stripeCustomerId;
                resolve(customerID);
            }
            else
            {
                resolve(result[0]);
            }
        })
    })
};

//4. Delete the account, reports and property ID
deleteAccountInDatabase = exports.deleteAccountInDatabase = function (email) {
    return new Promise(function (resolve) {
        console.log("Email received is: "+email);
        //Execute query to delete the user account, reports, property ID and goals
        let myQuery = "SET FOREIGN_KEY_CHECKS = 0; DELETE goals FROM accounts JOIN properties ON accounts.aid = properties.aid JOIN goals ON properties.pid = goals.pid WHERE accounts.email =" + sqlString.escape(email) + ";DELETE reports FROM accounts JOIN properties ON accounts.aid = properties.aid JOIN reports ON properties.pid = reports.pid WHERE accounts.email =" + sqlString.escape(email) + ";DELETE properties FROM accounts JOIN properties ON accounts.aid = properties.aid WHERE accounts.email =" + sqlString.escape(email) + ";DELETE accounts FROM accounts WHERE accounts.email =" + sqlString.escape(email);
        connection.query(myQuery, function (err, result) {
            if (result) {
                resolve(console.log("deleteAccountInDatabase Query execution successful"));
            } else {
                resolve(console.log("deleteAccountInDatabase Query execution unsuccessful but ignored"));
            }
        })
    })
};

//5. Delete customer from stripe
deleteStripeCustomer = exports.deleteStripeCustomer = function (email) {
    return new Promise(function (resolve) {
        getCustomerID(email)
        .then(function (customerId) {
            console.log("customer ID is: "+customerId);
            if (customerId!==undefined && customerId!==null) {
                stripe.customers.del(customerId, function (err, confirmation) {
                    if (confirmation) {
                        resolve(console.log("Delete customer from stripe is successful"));
                    }
                    else {
                        resolve(console.log("Delete customer from stripe failed: ") + err);
                    }
                })
            }
            else {
                resolve(console.log("Customer ID is null or undefined"));
            }
        })
    })
};

//6. Get the customer ID by providing aid
getCustomerIDByAid = exports.getCustomerIDByAid = async function (aid) {
    let account = await queryOne(`SELECT * FROM accounts WHERE aid=${aid}`);
    if (account && account.stripeCustomerId) {
        return account.stripeCustomerId;
    }
    return null;
};

//7. Delete customer in Stripe by providing Stripe Customer Id
deleteStripeCustomerById = exports.deleteStripeCustomerById = function (stripeCustomerId) {
    return new Promise(function (resolve) {
        if (stripeCustomerId) {
            stripe.customers.del(stripeCustomerId, function (err, confirmation) {
                if (confirmation) {
                    resolve(console.log("Delete customer from stripe is successful"));
                }
                else {
                    resolve(console.log("Delete customer from stripe failed: ") + err);
                }
            })
        } else {
            resolve();
        }
    })
};

//8. Retrieve card number for a customer ID from Stripe
getCardNumberFromStripe = exports.getCardNumberFromStripe = function (email) {
    return new Promise(function (resolve, reject) {
        getCustomerID(email).then(function (customerID) {
            stripe.customers.listCards(customerID, function (err, result) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(result);
                }
            })
        })
    })
};

//9. Query to get the "deleted" status of the user from the database using customer ID
getStatusByCustID = exports.getStatusByCustID = function (customerID) {
    return new Promise(function (resolve, reject) {
        //Execute query to get the deleted column value of the user account
        let myQuery = "select deleted from accounts WHERE stripeCustomerId=" + sqlString.escape(customerID);
        connection.query(myQuery, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                let status = result[0].deleted;
                resolve(status);
            }
        })
    })
};

//10. Query to get the "deleted" status of the user from the database using email
getStatusByEmail = exports.getStatusByEmail = function (email) {
    return new Promise(function (resolve, reject) {
        //Execute query to get the deleted column value of the user account
        let myQuery = "select deleted from accounts where email=" + sqlString.escape(email);
        connection.query(myQuery, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                let status = result[0].deleted;
                resolve(status);
            }
        })
    })
};

//11. Query to get the "email" of a specific customerID
getEmail = exports.getEmail = function (customerID) {
    return new Promise(function (resolve, reject) {
        //Execute the query to get the email address of a given customer ID
        let myQuery = "select email from accounts WHERE stripeCustomerId=" + sqlString.escape(customerID);
        connection.query(myQuery, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                let email = result[0].email;
                resolve(email);
                console.log("Text of the email: " + email);
            }
        })
    })
};


//12. Query to just delete the account
deleteAccount = exports.deleteAccount = function (email) {
    return new Promise(function (resolve, reject) {
        //Execute Query to delete the account
        let myQuery = "DELETE account FROM accounts WHERE accounts.email =" + sqlString.escape(email);
        connection.query(myQuery, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(console.log("Account Deleted " + result));
            }
        })
    })
};

//13. Update the "Features" column in the database to include "topics"
updateFetaures = exports.updateFeatures = function (email) {
    return new Promise(function (resolve, reject) {
        //Update "Features" column in the database to include "topics" value
        let myQuery = "UPDATE accounts set features='topics' WHERE email=" + sqlString.escape(email);
        connection.query(myQuery, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(console.log(result));
            }
        })
    })
};

//14. Get the account ID by providing email
getAccountId = exports.getAccountId = function (email) {
    return new Promise(function (resolve,reject) {
        let myQuery = "SELECT accounts.aid FROM accounts WHERE email=" + sqlString.escape(email);
        connection.query(myQuery, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                let aid = result[0].aid;
                resolve(aid);
                console.log("aid is: "+aid);
            }
        })
    })
};

//15. Delete Account by providing aid
deleteAccountById = exports.deleteAccountById = async function (_aid) {
    try {
        let aid = sqlString.escape(_aid);
        let stripeCustomerId = await getCustomerIDByAid(aid);
        await deleteStripeCustomerById(stripeCustomerId);
        await query(`DELETE goals FROM accounts JOIN properties ON accounts.aid = properties.aid JOIN goals ON properties.pid = goals.pid WHERE accounts.aid = ${aid}`);
        await query(`DELETE reports FROM accounts JOIN properties ON accounts.aid = properties.aid JOIN reports ON properties.pid = reports.pid WHERE accounts.aid = ${aid}`);
        await query(`DELETE properties FROM accounts JOIN properties ON accounts.aid = properties.aid WHERE accounts.aid = ${aid}`);
        await query(`DELETE accounts FROM accounts WHERE accounts.aid = ${aid}`);
    } catch (err) {
        console.log(err);
    }
};

//16. Over write the tracker install status in the database
overwriteTrackerInstalledStatus = exports.overwriteTrackerInstalledStatus = async function (_pid, _status) {
    let pid = sqlString.escape(_pid);
    let status = sqlString.escape(_status);
    await query(`UPDATE properties SET trackerInstalled=${status} WHERE pid=${pid}`);
};
