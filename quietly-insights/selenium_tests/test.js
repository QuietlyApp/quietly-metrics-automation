const db = require('./common/database.js');
const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);

describe('Quietly Insights', function () {
    this.timeout(43200000);
    before(function () {
        return db.connectToDatabase();
    });
    after(function () {
        return db.disconnectFromDatabase();
    });

    fs.readdirSync(path.join(__dirname, '/test_sets')).map(file => {
        if( (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js') ) {
            require(path.join(__dirname, '/test_sets', file));
        }
    });
});
