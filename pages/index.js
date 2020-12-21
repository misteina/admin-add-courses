import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {

    const setEmail = () => {

    }
    const setPassword = () => {

    }

    const login = () => {

    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Admin Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.login}>
                    <div className={styles.formTitle}>Admin Login</div>
                    <input type="text" className={styles.input} maxLength="60" onChange={setEmail} placeholder="Email" />
                    <input type="password" className={styles.input} maxLength="60" onChange={setPassword} placeholder="Password" />
                    <div className={styles.buttonCase}>
                        <button className={styles.loginButton} onClick={login}>LOGIN</button>
                    </div>
                </div>
            </main>
            <footer className="footer">
                Created by Enyinna Iroegbu, enyinna.job@gmail.com
            </footer>
        </div>
    )
}
