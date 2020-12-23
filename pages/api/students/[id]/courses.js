import apiKey from '../../../../auth/apiKey';

export default function handler (req, res) {

    if (req.cookies.auth === apiKey){
        const id = req.query.id;
        const course = req.body.course;

        let errors = [];
        if (!Number.isInteger(parseInt(id))) {
            errors.push('Student id not a number');
        }
        if (/^[a-z0-9]+$/i.test(course)) {
            errors.push('Course should be alphabets and numbers');
        }

        if (errors.length === 0) {
            const connection = require('../../../../database/connection');

            connection.query(
                "UPDATE students SET courses = JSON_ARRAY_APPEND(courses, '$', ?) WHERE id = ?",
                [course, id],
                (error, results, fields) => {
                    if (error) throw error;
                    if (results.affectedRows == 1) {
                        res.json({ status: 'success', data: course });
                    } else {
                        res.json({
                            errId: 1,
                            status: 'error',
                            message: 'An error was encountered'
                        });
                    }
                }
            );
        } else {
            res.json({ errId: 2, status: 'error', data: errors });
        }
    } else {
        res.json({ errId: 3, status: 'error', message: 'Unauthorized request' });
    }
}