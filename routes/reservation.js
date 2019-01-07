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

//Add reservation route
router.get('/add_reservation', function(req, res){
    res.render('add_reservation')
})

//SUBMIT add post router
router.post('/add_reservation', function(req, res){

    //Body check
    req.checkBody('startDate', 'A starting date is required').notEmpty();
    req.checkBody('end_Date', 'Ending date and time is required').notEmpty();

    //Errors
    let errors = req.validationErrors();
    if(errors){
        //Render the errors at a later time
        res.render('add_Reservation')
        console.log('Something went wrong during the posting method')
    }
    else
    {   //Get a new reservation
        let mreservering = new reservering();
        //Get data from the body
        mreservering.datestart = req.body.startDate;
        mreservering.dateend = req.body.end_Date;
        //Save the data in the database
        mreservering.save(function(err, res){
            //Check for errors
            if (err){
                console.log('DB thingy not working' + err)
                return;
            }
            //Succesfull post
            else{
                console.log('I posted the data')
            }
        });
    }
    //Redirect to index page
    res.redirect('/')
})

//POST route
router.post('/test_console_output', function(req, res, next){
    var myReserves = req.params('section');
    for (i = 0; myReserves.length > i; i++){
        console.log(myReserves[i])
    }
    console.log("I did it mah")
    //res.render('/');
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