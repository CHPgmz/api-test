const mysql = require('mysql');

const con = mysql.createConnection({
    host: '10.60.63.106',
    user: 'abiud',
    password: 'metal3D',
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