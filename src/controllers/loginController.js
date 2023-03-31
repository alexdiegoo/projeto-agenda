const Login = require('../models/loginModel');

exports.index = (req, res) => {
    res.render('login');
}

exports.register = async (req, res) => {
    const login = new Login(req.body);
    try {
        await login.register();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/login/index');
            });

            return;
        }

        req.flash('success', 'Seu usuario foi criado com sucesso');
            req.session.save(function() {
                return res.redirect('/login/index');
            });
    } catch(err) {
        console.log(err);
    }
  

}