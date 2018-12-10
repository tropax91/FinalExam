const LocalStrategy = require('passport-local').Strategy;
const Bestyrelse = require('../models/bestyrelse');
const config = require('./database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
    //Local Strategy
    passport.use('bestyrelse',new LocalStrategy(function(username, password, done){
        // Match Username
        let query = {username:username};
        Bestyrelse.findOne(query, function(err, bestyrelse) {
            if(err) throw err;
            if(!bestyrelse){
                return done(null, false, console.log("ingen bruger"),{message: 'No user found'});
            }
            //Match Password
            bcrypt.compare(password, bestyrelse.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    console.log("bestyrelse fundet");
                    return done(null, bestyrelse);
                } else {
                    return done(null, false, {message: 'Wrong password'});
                }
            });

        });
    }));

    passport.serializeUser(function(bestyrelse, done) {
            done(null, bestyrelse.id);
        });
      
      passport.deserializeUser(function(id, done) {
            Bestyrelse.findById(id, function(err, bestyrelse) {
            done(err, bestyrelse);
        });
    });
}