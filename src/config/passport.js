const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) =>{
    
    //comprobar si el correo del usuario coincide con el correo registrado en la base de datos
    const user = await User.findOne({email});
    if (!user){
        return done(null, false, {message: 'no se encontro el usuario'});
    } else {
        //verificación de contraseña
       const match = await user.matchPassword(password);
       if(match){
        return done(null, user);
       }  else {
        return done(null, false, {message: 'contraseña incorrecta'});
       }
    }
}));

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) =>{
        done(err, user);
    });
});