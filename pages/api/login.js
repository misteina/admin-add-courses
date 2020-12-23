export default function handler(req, res) {

    const email = req.body.email;
    const password = req.body.password;

    let errors = 0;
    let validator = require('email-validator');

    if (!validator.validate(email) || password.length > 30 || password.length < 4){
        errors++;
    } 

    if (errors === 0){
        
        const connection = require('../../database/connection');

        // To keep things simple simple for the task the password will not be hashed

        connection.query(
            "SELECT id FROM admin WHERE email = ? AND password = ?",
            [email, password],
            (error, results, fields) => {
                if (error) throw error;
                if (results.length == 1) {

                    const Cookies = require('cookies');
                    const cookies = new Cookies(req, res);
                    const apiKey = require('../../auth/apiKey');

                    cookies.set('auth', apiKey);

                    res.json({ status: 'success' });
                } else {
                    res.json({
                        errId: 1,
                        status: 'error', 
                        message: 'Admin user not found'
                    });
                }
            }
        );
    } else {
        res.json({
            errId: 2,
            status: 'error', data: 'Incorrect credentials'
        });
    }
}