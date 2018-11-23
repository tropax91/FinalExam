const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport')

router.get('/register', function(req,res){
    res.render('register')
});