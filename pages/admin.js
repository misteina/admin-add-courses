import {useState, useRef} from 'react';
import Head from 'next/head';
import styles from '../styles/Admin.module.css';

export default function Admin() {

    const [course, setCourse] = useState('');

    const idRef = useRef();

    const showCourses = (e) => {
        let divs = document.getElementsByClassName('add');
        for (div of divs) div.style.display = "none";
        let div = e.target.children.item(1);
        div.style.display = "block";
    }

    const fillCourse = (e) => {
        setCourse(e.target.value);
    }

    const addCourse = () => {
        let id = idRef.current.value;
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
                <div className={styles.row} onClick={showCourses}>
                    <div className={styles.student}>
                        <div>1</div>
                        <div>Enyinna Iroegbu</div>
                        <div>0</div>
                    </div>
                    <div className={styles.addCourse + " add"}>
                        <div className={styles.owner}>Courses for: <b>Enyinna Iroegbu</b></div>
                        <div>ENG 301</div>
                        <div>ACE 305</div>
                        <input 
                            type="text" 
                            className={styles.newCourse} 
                            onChange={fillCourse} 
                            placeholder="Add Course" 
                            value={course}
                        />
                        <input type="hidden" ref={idRef} value={id} />
                        <button className={styles.addButton} onClick={addCourse}>ADD</button>
                    </div>
                </div>
            </main>
            <footer className="footer">
                Created by Enyinna Iroegbu, enyinna.job@gmail.com
            </footer>
        </div>
    )
}