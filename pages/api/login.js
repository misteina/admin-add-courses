export default (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    let errors = [];
    let validator = require('email-validator');
    if (!validator.validate(email)){
        errors.push('Please enter a valid email address');
    } 
    if (password.length > 30 && password.length < 4){
        errors.push('Please enter a valid password');
    }

    if (errors.length === 0){
        
        const connection = require('../../../../database/connection');

        connection.query(
            "UPDATE students SET courses = IF(NULL, JSON_ARRAY_APPEND('[]', '$', ?), JSON_ARRAY_APPEND(courses, '$', ?)) WHERE id = ?",
            [course, course, id],
            (error, results, fields) => {
                if (error) throw error;
                if (results.affectedRows == 1) {
                    res.statusCode(200).json({ status: 'success' })
                } else {
                    res.json({
                        errId: 1,
                        status: 'error', message: 'An error was encountered'
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