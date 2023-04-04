const Login = require('../models/loginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado');
    return res.render('login');
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

exports.login = async (req, res) => {
    const login = new Login(req.body);
    try {
        await login.login();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/login/index');
            });

            return;
        }

        req.flash('success', 'Você entrou no sistema');
        req.session.user = login.user;
            req.session.save(function() {
                return res.redirect('/login/index');
            });
    } catch(err) {
        console.log(err);
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}