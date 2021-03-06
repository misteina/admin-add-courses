import {useState} from 'react';
import Head from 'next/head';
import styles from '../styles/students.module.css';
import apiKey from '../auth/apiKey';
import connection from '../database/connection';


export default function Students({students, port}) {

    const [course, setCourse] = useState('');

    const showCourses = (e) => {
        let courseList = e.target.nextSibling;
        if (courseList.style.display === "none" || courseList.style.display.length === 0){
            let divs = document.getElementsByClassName('add');
            for (let i = 0;i < divs.length;i++) {
                divs[i].style.display = "none";
            }
            courseList.style.display = "block";
        } else {
            courseList.style.display = "none";
        }
    }

    const fillCourse = (e) => {
        setCourse(e.target.value);
    }

    const addCourse = (e) => {
        let id = e.target.previousSibling.value;

        fetch(`http://localhost:${port}/api/students/${id}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Credential': apiKey
            },
            body: JSON.stringify({course: course}),
        }).then(
            response => response.json()
        ).then(data => {
            if (data.status === "success"){
                let courseList = e.target.parentElement.children.item(1);
                courseList.innerHTML += `<div>${course}</div>`;
                setCourse('');

                let totalCourses = e.target.parentElement.previousSibling.children.item(2);
                totalCourses.innerHTML = parseInt(totalCourses.innerHTML) + 1;
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Admin Panel</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.listTitle}>Students</div>
                <div className={styles.rowHead}>
                    <div>ID</div>
                    <div>Name</div>
                    <div>Courses</div>
                </div>
                {
                    students.map((student) => 
                        <div key={student.id} className={styles.row}>
                            <div className={styles.student + " item"} onClick={showCourses}>
                                <div>{student.id}</div>
                                <div>{student.name}</div>
                                <div>{JSON.parse(student.courses).length}</div>
                            </div>
                            <div className={styles.addCourse + " add"}>
                                <div className={styles.owner}>Courses for: <b>{student.name}</b></div>
                                <div>
                                    {
                                        JSON.parse(student.courses).map((course, index) => <div key={index}>{course}</div>)
                                    }
                                </div>
                                <input
                                    type="text"
                                    className={styles.newCourse}
                                    onChange={fillCourse}
                                    placeholder="Add Course"
                                    value={course}
                                />
                                <input type="hidden" value={student.id} />
                                <button className={styles.addButton} onClick={addCourse}>ADD</button>
                            </div>
                        </div>
                    )
                }
            </main>
            <footer className="footer">
                Created by <b>Enyinna Iroegbu</b>, enyinna.job@gmail.com
            </footer>
        </div>
    )
}

export async function getServerSideProps(context) {
    const cookie = context.req.cookies;
    const port = process.env.PORT;
    if (typeof cookie.auth !== 'undefined' && cookie.auth === apiKey){
        let students = await getStudents();
        return {
            props: { students, port }
        }
    } else {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
}

function getStudents() {
    return new Promise(resolve => {
        connection.query('SELECT * from students LIMIT 5',
            (error, results, fields) => {
                if (error) throw error;
                if (results.length > 0) {
                    resolve(JSON.parse(JSON.stringify(results)));
                }
            }
        );
    });
}