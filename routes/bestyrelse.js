const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Bring in Bestyrelse Models
let Bestyrelse = require('../models/bestyrelse');

// Register Form
router.get('/bestyrelseRegister', function(req, res) {
    res.render('bestyrelseRegister');
});

// Register Proccess
router.post('/bestyrelseRegister', function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();
    if(errors) {
        res.render('bestyrelseRegister', {
            errors:errors
        });
    } else {
        let newBestyrelse = new Bestyrelse({
            name:name,
            email:email,
            username:username,
            password:password
        });

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newBestyrelse.password, salt, function(err, hash){
                if(err){
                    console.log(err);
                }
                newBestyrelse.password = hash;
                newBestyrelse.save(function(err) {
                    if(err){
                        console.log(err);
                        return;
                    } else {
                        req.flash('success', 'You are now registered and can log in')
                        res.redirect('/bestyrelse/bestyrelseLogin');
                    }
                });
            });
        })

    }
});

// Login Form
router.get('/bestyrelseLogin', function(req, res) {
    res.render('bestyrelseLogin');
});

// Login Process
router.post('/bestyrelseLogin', function(req, res, next){
    passport.authenticate('bestyrelse', {
        successRedirect: '/',
        failureRedirect: '/bestyrelse/bestyrelseLogin',
        failureFlash: true
    })(req, res, next);
    console.log("Du er nu logget ind med bestyrelsen")
});

//Logout
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/bestyrelse/bestyrelseLogin');
    console.log("Du er logget ud som bestyrelse");
});

module.exports = router;