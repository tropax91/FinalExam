const express = require('express');
const router = express.Router();

router.get('/testing.html', function(req, res){
    res.sendFile(__dirname + 'testing.html');
});

var occupantName = "";
var occupantId;
var occupantRole;
var occupantbuildingId;
var occupantusername = "";
var occupantpassword = "";


function Beboer (name, id, role, buildingnr, username, password){
    this.occupantName = name;
    this.occupantId = id;
    this.occupantRole = role;
    this.occupantbuildingId = buildingnr;
    this.occupantusername = username;
    this.occupantpassword = password;
}

module.exports = router;
