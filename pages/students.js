import {useState} from 'react';
import Head from 'next/head';
import styles from '../styles/Admin.module.css';
import apiKey from '../auth/apiKey';
import connection from '../database/connection';


export default function Students({students}) {

    const [course, setCourse] = useState('');

    const showCourses = (e) => {
        let divs = document.getElementsByClassName('add');
        for (div of divs) div.style.display = "none";
        let div = e.target.children.item(1);
        div.style.display = "block";
    }

    const fillCourse = (e) => {
        setCourse(e.target.value);
    }

    const addCourse = (e) => {
        let id = e.target.previousSibling.value;
        fetch(`http://localhost:3000/api/student/${id}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({course: course}),
        }).then(
            response => response.json()
        ).then(data => {
            console.log('Success:', data);
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
                    students.map((student) => {
                        <div key={student.id} className={styles.row} onClick={showCourses}>
                            <div className={styles.student}>
                                <div>{student.id}</div>
                                <div>{student.name}</div>
                                <div>{student.totalCourses}</div>
                            </div>
                            <div className={styles.addCourse + " add"}>
                                <div className={styles.owner}>Courses for: <b>{student.name}</b></div>
                                {
                                    student.courses.map((course, index) => <div key={index}>{course}</div>)
                                }
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
                    })
                }
            </main>
            <footer className="footer">
                Created by Enyinna Iroegbu, enyinna.job@gmail.com
            </footer>
        </div>
    )
}

export async function getServerSideProps(context) {

    const cookie = context.req.cookies;

    if (typeof cookie['key'] !== 'undefined' && cookie['key'] === apiKey){

        let students = [];
        await connection.query('SELECT * from students LIMIT 5', 
            (error, results, fields) => {
                if (error) throw error;
                if (results.length > 0){
                    students = [...results];
                }
            }
        );
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