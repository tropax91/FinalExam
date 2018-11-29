const express = require('express');
const router = express.Router();
const passport = require('passport');


// Register Form
router.get('/register', function(req, res) {
    res.render('register');
});


// Login Form
router.get('/login', function(req, res) {
    res.render('login');
});

module.exports = router;