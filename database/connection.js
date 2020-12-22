import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: 'shorturls'
});

export default connection;