const express = require('express');
const router = express.Router();
const passport = require('passport');
let sql = "";

router.get('/frontpage', function(req, res){
    res.render('frontpage');
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

/*Function to get a user or all users from db, the function checks if 
there have been any input in a string. 
If empty, return all users from DB table*/
function getUsers(in_Username) {
    //Checks if username is not empty
    if(in_Username != "")
    {
        sql = "CALL getUser(?)"
        dbconnection.query(sql, ['username'], function(err, row)
        {
            if(err)
            {
                console.log("Query fucked up when fetching one user")
            } else
            {
                //Add logic for where you want the resultset to put data from the row in
                console.log(row[0].b_user + " was fetched")
            }
        })
        
    } else
    {
        sql = "CALL getAllUsers()";
        dbconnection.query(sql, function(err, rows){
            if(err)
            {
                console.log("Query fuked up")
            } else
            {
               //Add logic for rows here, rows is the resultset. 
            }
        })
    }

}

function checkUserExists(username, password, dbconnection) {
    //SQL statement
    let sql = 'CALL checkUser(?, ?)'

    //Query with some error handling for good measure and a result which we check to see if its bigger than zero
    dbconnection.query(sql, ['inser username here', 'insert password here'], function(err, result){
        if(err){
            console.log("something went wrong")
        } else{
            if(result > 0 ){
                console.log("user exists")
                //do some code to send the app user further into the app
            }
        }
    })
}

module.exports = router;
