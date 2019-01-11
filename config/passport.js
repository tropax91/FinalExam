const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
    //Local Strategy
    passport.use('beboer',new LocalStrategy({usernameField: 'username'},(username, password, done) => {
        // Match Username
        User.findOne({username: username})
        .then(user => {
            if (!user) {
                return done(null, false, {message: 'That Username is not registered!'});
            }

             //Match Password
             bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;

                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Incorrect Password'});
                }
            });
        })
        .catch(err => console.log(err));
        
        })
           
    );

    passport.serializeUser(function(user, done) {
            done(null, user.id);
        });
      
      passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}
