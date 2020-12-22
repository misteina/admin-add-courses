export default (req, res) => {

    const id = req.body.id;
    const course = req.body.course;

    let errors = [];
    if (!Number.isInteger(id)){
        errors.push('Student id not a number');
    }
    if (/^[a-z0-9]+$/i.test(parseInt(course))) {
        errors.push('Course should be alphabets and numbers');
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
            status: 'error', data: errors
        });
    }
}