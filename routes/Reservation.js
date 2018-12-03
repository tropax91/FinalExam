const express = require('express');
const router = express.Router();
let sql = "";




var date;
var timeperiodStart;
var timeperiodEnd;
var activated = false;

function Reservation (u_date, timeStart, timeEnd) {
this.date = u_date;
this.timeperiodStart = timeStart;
this.timeperiodEnd = timeEnd;
}

function activateReservation () {
    if(timeperiodStart == Date.now() && timeperiodEnd > Date.now()){
        activated = true;
    }
}

/*This needs to moved somewhere else due to the fact that our reservations will have to be automatically created 
every 2 months by the system itself*/
function createReservation(){
    sql = "CALL createNewReservation(?, ?)"

    dbconnection.query(sql, ['Value here', 'Value here'], function(err, result){
        if(err){
            console.log("Something went wrong when creating new reservation");
        }
        console.log(result);
    })
}
/* Funktion til at updatere en reservation for at tilføre en bruger til den*/ 
function reserveReservation(){
    sql = "CALL reserveReservation (?, ?)"

    dbconnection.query(sql, ['value 1', 'value 2'], function(err, result){
        if(err){
            console.log("Error reserve_Reservation");
        }
        console.log(result);
    })
}