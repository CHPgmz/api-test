const mysql = require('mysql');

const con = mysql.createConnection({
    host: '192.168.70.230',
    user: 'abiud',
    password: 'metal3D',
    database: 'deb_prueba',
});

con.connect(function (err) {
    if (err) {
        console.log(err)
    }else {
        console.log('db is connected');
    }
});

module.exports = con;