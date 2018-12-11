/*var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

//Connection to Mysql
/*connection.connect(function (err) {
    if (!err) {
        console.log('connected to MySQL DB!');
    } else {
        console.log('cannot connect' + err);
    }
})
connection.query('USE ' + dbconfig.database);



module.exports = function (passport) {
        // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

        // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        connection.query("SELECT * FROM occupant WHERE id = ? ", [id], function (err, rows) {
            done(err, rows[0]);
        });
    });


    passport.use(
        'local-register',
        new LocalStrategy({

            firstNameField: 'firstName',
            lastNameField: 'lasName',
            usernameField: 'Email',
            passwordField: 'password',
            buildingIDField: 'buildingID',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
            function (req, firstName, lasName, Email, password, buildingID, done) {
                console.log(firstame);
                
                connection.query("SELECT * FROM occupant WHERE Email = ?", [Email], function (err, rows) {
                    if (err)
                        return done(err);
                    if (rows.length) {
                        return done(null, false);
                    } else {

                        var newUserMysql = {
                            firstname: firstName,
                            lastname: lasName,
                            email: Email,
                            password: bcrypt.hashSync(password, null, null),
                            building: buildingID
                        };

                        var insertQuery = "INSERT INTO occupant ( firstName, lastName, Email, password, buildingID ) values (?,?)";

                        connection.query(insertQuery, [newUserMysql.firstname, newUserMysql.lastname, newUserMysql.email,
                        newUserMysql.password, newUserMysql.building], function (err, rows) {
                            newUserMysql.id = rows.insertId;

                            return done(null, newUserMysql);
                        });
                    }
                });
            })
    );

    passport.use(
        'local-login',
        new LocalStrategy({

            emailField: 'Email',
            passwordField: 'password',
            passReqToCallback: true
        },
            function (req, Email, password, done) {
                connection.query("SELECT * FROM occupant WHERE email = ?", [Email], function (err, rows) {
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false);
                    }


                    if (!bcrypt.compareSync(password, rows[0].password))
                        return done(null, false);


                    return done(null, rows[0]);
                });
            })
    );
};
*/