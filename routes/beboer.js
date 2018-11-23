const express = require('express');
const router = express.Router();
let sql = "";

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

//Simple function to send our new beboer to the database
function sendToDB(){
    
    //The sql satenent
    sql = "CALL createNewUser(?, ?, ?, ?)"
    
    //Query
    dbconnection.query(sql, ['Add value here', 'Add value here', 'Add value here'], function(err, result){
        if(err) throw err
        else {
            console.log(result);
        }
    })
    
}

//Function to get a user or all users from db
function getUsers() {
    

    
}

module.exports = router;
