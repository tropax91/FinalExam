const express = require('express');
const router = express.Router();

//User model
let User = require('../models/user');
/* Need a schematic for reservations*/
let reservering = require('../models/reservering');

//Reserve route
router.get('/reserver', function(req, res){
    res.render('Reservescreen');
})

//POST route
router.post('/', function(req, res, next){
    var myReserves = req.param('section');
    for (i = 0; myReserves.length > i; i++){
        console.log(myReserves[i])
    }
    res.render('/');
})

/*function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}*/
module.exports = router;