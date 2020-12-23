import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: 'school'
});

module.exports = connection;