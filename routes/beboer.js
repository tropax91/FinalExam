const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
var LocalStrategy   = require('passport-local').Strategy;




//Login
router.get('/login', function (req, res) {
    res.render('login.ejs');
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}),
    function (req, res) {
        console.log("hello");

        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }
        res.redirect('/');
    });

    //Register
    router.get('/register', function (req, res) {
        res.render('register');
    });

    router.post('/register', passport.authenticate('local-register', {
        successRedirect: '/profile',
        failureRedirect: '/register',
        failureFlash: true
    }));

    router.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
    });

    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });




function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');

};

module.exports = router;