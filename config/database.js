module.exports = {
    database: 'mongodb://admin:CLC123456@ds127604.mlab.com:27604/vaskeri',
    secret: 'yoursecret'
}

/*module.exports = {
    'connection': {
        'host'     : '35.187.67.40',
        'user'     : 'ext_User',
        'password' : 'user1234',
    },
    'database' : 'laundryservice',

}




/*const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'laundryservice',
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    }
    else{
        console.log("Error connecting database ... nn" + err);
    }
});
module.exports = connection;*/
