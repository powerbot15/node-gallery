
function RegistrationController(){
    this.renderSignUp = function(req, res, next){
        res.render('pages/registration')
    };

    this.renderSignIn = function(req, res, next){
        res.render('pages/sign-in');
    };

    this.proceedNewUser = function(req, res){
        console.dir(req.body);
        req.session.user = req.body;
        res.redirect('/');
    };
}

module.exports = new RegistrationController();