export default function handler(req, res){
    const connection = require('../../database/connection');
    connection.query(`UPDATE students SET courses = '["ACE 301"]' WHERE id = 1`);
    res.end('done');
}