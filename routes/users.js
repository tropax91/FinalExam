const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//Bring in User Models
let User = require('../models/user');


// Login Form
router.get('/login', (req, res) => {
    res.render('login');
});

// Register Form
router.get('/register', (req, res) => {
    res.render('register');
    req.session.errors = null;
});

// Change Password Form
router.get('/editPassword',ensureAuthenticated, (req, res) => {
    res.render('editPassword');
});

//Profile page

router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('profile');
});
//Booking Page
router.get('/booking', ensureAuthenticated, (req, res) => {
    res.render('booking');
});


// Register Proccess
router.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    let errors = [];

    //Check required fields
    if (!name || !email || !username || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    //Check passwords match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //Check pass length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            username,
            email,
            password,
            password2
        });
    }
    else {
        User.findOne({ username: username })
            .then(user => {
                if (user) {
                    errors.push({ msg: 'Username is already registered' });
                    res.render('register', {
                        errors,
                        name,
                        username,
                        email,
                        password,
                        password2
                    });
                } else {
                    let newUser = new User({
                        name: name,
                        email: email,
                        username: username,
                        password: password
                    });
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) {
                                console.log(err);
                            }
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in');
                                    res.redirect('/users/login')
                                })
                                .catch(err => console.log(err));
                        });
                    })
                }
            });
    }
});

// Login Process
router.post('/login', (req, res, next) => {
    passport.authenticate('beboer', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});


//Profile change process
router.post('/profile', function (req, res, next) {

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
    bcrypt.compare(old_Password, req.user.password, function (err, isMatch) {
        if (err) {
            console.log("Errors")
        };
        if (isMatch) {
            console.log(bcrypt.hash(new_Password, bcrypt.getSalt(req.user.password), function (err, hash) {
                if (err) {
                    //console.log(err)
                }
                new_Password = hash;
                console.log(hash);
                //var myCollection = User.collection("User");
                //myCollection.updateOne({_id: _uID}, {$set:{password: n_password}}, function(err, res){
                User.findByIdAndUpdate(_uID, { password: hash }, { new: true }, function (err, res) {
                    if (err) {

                    }
                    console.log(res.password)
                    //res.redirect('/');
                })
            }));

        }
    })
    res.render('profile', { name: req.user.name });
});

//Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/');
    console.log("Du er logget ud som User");
});

//Access control for profile page and more, taken from news
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}

module.exports = router;