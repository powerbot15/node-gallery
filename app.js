var express = require('express'),
    bodyParser = require('body-parser'),
    engines = require('consolidate'),
    session = require('./services/session'),
    config = require('./config/config'),
    registrationController = require('./controllers/registration-controller'),

    app = express();

app.engine('html', engines.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(session);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res){
    //req.session.destroy();
    if(req.session && req.session.user){
        res.render('index', {user : req.session.user});
    }
    else{
        registrationController.renderSignUp(req, res);
    }
});

app.get('/sign_in', registrationController.renderSignIn);

app.get('/sign_up', registrationController.renderSignUp);

app.get('*', function(req, res){
    res.render('errors/404');
});

app.post('/registration', registrationController.proceedNewUser);


app.listen(3000);

console.log('server started at :3000');
