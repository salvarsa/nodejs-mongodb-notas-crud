const usersCtrl = {};

const passport = require('passport');

const user = require('../models/user');

usersCtrl.renderSingUpForm = (req, res) =>{
    res.render('users/singup');
};

usersCtrl.singup = async (req, res)=>{
    const errors = [];
    const {name, email, password,confirm_password} = req.body;
    if (password != confirm_password){
        errors.push({text: 'las contraseñas no coinciden'});
    }
    if (password.length < 5){
        errors.push({text: 'La contraseña debe tener 5 caracteres'});
    }
    if (errors.length > 0){
        res.render('users/singup',{
            errors,
            name,
            email
        })
    } else {
        const emailUser = await user.findOne({email: email});
        if (emailUser){
            req.flash('error_msg', 'email en uso');
            res.redirect('/users/singup');
        }else{
            const newUser = new user({name, email, password});
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save();
            req.flash('succes_msg', 'nuevo usuario creado exitosamente');
            res.redirect('/users/singin');
        }
    }
};

usersCtrl.renderSingInForm = (req, res) => {
    res.render('users/singin')
};

usersCtrl.singin = passport.authenticate('local', {
    failureRedirect: '/users/singin',
    successRedirect: '/notas',
    failureFlash: true
});

//cerrar sesion

// usersCtrl.logout = (req, res) =>{
//     req.logout();
//     req.flash('succes_msg', 'sesion cerrada correctamente');
//     res.redirect('/users/singin');
// };

usersCtrl.logout = (req, res) => {

    

    req.logout( (err) => {


        if (err) { return next(err); }

        req.flash( "success_msg" , "Session cerrada" );

        res.redirect( "/users/singin" );


    });

};


module.exports = usersCtrl