const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let user = require('../models/user');

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
        successRedirect: '/bestyrelse/adminIndex',
        failureRedirect: '/bestyrelse/adminLogin',
        failureFlash: true
    })(req, res, next);
    console.log("Du er nu logget ind med bestyrelsen")
});

router.get('/adminIndex', function(req, res) {
    res.render('adminIndex');
});
router.get('/users', function(req, res) {
    res.render('users');
});
router.get('/adminPages', function(req, res) {
    res.render('adminPages');
});
router.get('/adminPosts', function(req, res) {
    res.render('adminPosts');
});
router.get('/adminEdit', function(req, res) {
    res.render('adminEdit');
});
router.get('/adminLogin', function(req, res) {
    res.render('adminLogin');
});

//Logout
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/bestyrelse/bestyrelseLogin');
    console.log("Du er logget ud som bestyrelse");
});

//Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/bestyrelse/adminLogin');
    }
}

module.exports = router;