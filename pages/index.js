import {useState} from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';


export default function Home() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = (e) => {
        fetch(`http://localhost:3000/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
        }).then(
            response => response.json()
        ).then(data => {
            if (data.status === 'error'){
                setError();
            } else {
                e.target.submit();
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
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
                    {error}
                    <form onSubmit={login}>
                        <input
                            type="text"
                            className={styles.input}
                            maxLength="60" 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            className={styles.input}
                            maxLength="60"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Password"
                        />
                        <div className={styles.buttonCase}>
                            <button type="submit" className={styles.loginButton} >LOGIN</button>
                        </div>
                    </form>
                </div>
            </main>
            <footer className="footer">
                Created by Enyinna Iroegbu, enyinna.job@gmail.com
            </footer>
        </div>
    )
}
