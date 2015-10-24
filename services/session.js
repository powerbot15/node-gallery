var sessions = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(sessions),
    config = require('../config/config'),
    store = new MongoDBStore(
        {
            uri: config.sessionStoreURI,
            collection: 'mySessions'
        });

module.exports = sessions({
    secret: 'Jokes on Christmas',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60// one hour * 24 * 7 // 1 week
    },
    store: store
});


