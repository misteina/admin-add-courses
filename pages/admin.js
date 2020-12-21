import React from 'react';
import Head from 'next/head';
import styles from '../styles/Admin.module.css';

export default function Admin() {

    const showCourses = () => {

    }

    const fillCourse = () => {

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
                    <div className={styles.addCourse}>
                        <div className={styles.owner}>Courses for: <b>Enyinna Iroegbu</b></div>
                        <div>ENG 301</div>
                        <div>ACE 305</div>
                        <input type="text" className={styles.newCourse} onChange={fillCourse} placeholder="Add Course" />
                        <button className={styles.addButton}>ADD</button>
                    </div>
                </div>
            </main>
            <footer className="footer">
                Created by Enyinna Iroegbu, enyinna.job@gmail.com
            </footer>
        </div>
    )
}