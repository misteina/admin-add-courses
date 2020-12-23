import {useState} from 'react';
import Head from 'next/head';
import styles from '../styles/students.module.css';
import apiKey from '../auth/apiKey';
import connection from '../database/connection';


export default function Students({students}) {

    const [course, setCourse] = useState('');

    const showCourses = (e) => {
        let divs = document.getElementsByClassName('add');
        for (div of divs) div.style.display = "none";
        let div = e.target.nextSibling;
        div.style.display = "block";
    }

    const fillCourse = (e) => {
        setCourse(e.target.value);
    }

    const addCourse = (e) => {
        let id = e.target.previousSibling.value;
        fetch(`http://localhost:3000/api/students/${id}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({course: course}),
        }).then(
            response => response.json()
        ).then(data => {
            console.log(data)
            if (data.status === "success"){
                let courseList = e.target.parentElement.children.item(1);
                courseList.innerHTML += `<div>${course}</div>`
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
                            <div className={styles.student} onClick={showCourses}>
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
    if (typeof cookie.auth !== 'undefined' && cookie.auth === apiKey){
        let students = await getStudents();
        return {
            props: { students }
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