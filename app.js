var express = require('express'),
    bodyParser = require('body-parser'),
    engines = require('consolidate'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),


    app = express(),
    store = new MongoDBStore(
        {
            uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
            collection: 'mySessions'
        });

app.engine('html', engines.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'Jokes on Christmas',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60// one hour * 24 * 7 // 1 week
    },
    store: store
}));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res){
    //req.session.destroy();
    if(req.session && req.session.user){
        res.render('index', {user : req.session.user});
    }
    else{
        res.render('pages/registration');
    }

});

app.get('*', function(req, res){
    res.render('errors/404');
});

app.post('/registration', function(req, res){
    console.dir(req.body);
    req.session.user = req.body;
    res.redirect('/');
});


app.listen(3000);

console.log('server started at :3000');
