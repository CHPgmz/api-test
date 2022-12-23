const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hola',
    database: 'dev',
});

con.connect(function (err) {
    if (err) {
        console.log(err)
    }else {
        console.log('db is connected');
    }
});

module.exports = con;
