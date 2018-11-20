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