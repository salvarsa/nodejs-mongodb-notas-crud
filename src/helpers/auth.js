const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', 'Debes tener un usuario');
    res.redirect('/users/singin');
};

module.exports = helpers;