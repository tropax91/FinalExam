const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const expressValidator = require('express-validator');


//Bring in User Models
let User = require('../models/user');

// Register Form
router.get('/register', function(req, res) {
    res.render('register');
});

// Register Proccess
router.post('/register', function(req, res){
   
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
        res.render('register', {
            errors:errors
        });
    } else {
        let newUser = new User({
            name:name,
            email:email,
            username:username,
            password:password
        });

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash){
                if(err){
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function(err) {
                    if(err){
                        console.log(err);
                        return;
                    } else {
                        req.flash('success', 'You are now registered and can log in')
                        res.redirect('/users/login');
                    }
                });
            });
        })

    }
});

// Login Form
router.get('/login', function(req, res) {
    res.render('login');
});

// Login Process
router.post('/login', function(req, res, next){
    passport.authenticate('beboer', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
    console.log("Du er nu logget ind med beboer")
});
router.get('/profile', ensureAuthenticated, function(req, res) {
    res.render('profile');
});

router.get('/booking', ensureAuthenticated,function(req, res) {
    res.render('booking');
});

//Logout
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/');
    console.log("Du er logget ud som User");
});

//Profile change process
router.post('/profile', function(req, res, next){
    
    //let User = {};
    let old_Password;
    let new_Password;
    var _uID = req.user._id
    //console.log(req.user.password);
    //console.log(User.password);
    req.checkBody('o_password', 'Old password').notEmpty();
    req.checkBody('n_password', 'New password').notEmpty();
    old_Password = req.body.o_password;
    new_Password = req.body.n_password;
    
    //console.log(old_Password + "" + new_Password);
    //Check if form is empty
    
    
        //Match old password with bcrypt salted password
        bcrypt.compare(old_Password, req.user.password, function(err, isMatch){
            if(err){
                console.log("Errors")
            };
            if(isMatch){
                console.log(bcrypt.hash(new_Password, bcrypt.getSalt(req.user.password), function(err, hash){
                    if (err) 
                    {
                        //console.log(err)
                    }
                    new_Password = hash;
                    console.log(hash);
                    //var myCollection = User.collection("User");
                    //myCollection.updateOne({_id: _uID}, {$set:{password: n_password}}, function(err, res){
                    User.findByIdAndUpdate(_uID, {password: hash}, {new: true}, function(err, res){
                        if (err){

                        }
                        console.log(res.password)
                        //res.redirect('/');
                    })
                }));
                
            }
        })
    res.render('profile', {name: req.user.name});
});

//Access control for profile page and more, taken from news
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}

module.exports = router;