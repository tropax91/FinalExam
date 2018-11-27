const express = require('express');
const router = express.Router();
let occupantName = "Admin";
var sql;

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

/*function to remove record based on id and tablename. Check the stored procedure in DB if you want to see how SQL can
do a statement like that*/
function removeRecord (tablename, id)
{
   sql = 'CALL removeRecord(?, ?)';
   
   dbconnection.query(sql, ['tablename', 'ID'], function(err, result){
       if(err)
       {
           console.log("Something went wrong when deleting entry");
       }
       console.log(result);
   });
}

//module.exports = router;