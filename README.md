SETUP STEPS
-----------

1. Download the repository

2. cd into the downloaded folder

3. Run `npm install` to install the dependencies.

4. Edit the `./.env` file and add your database user name and password.

5. Run `yarn start` to start server.

6. Visit `http://localhost:3000 on the browser.

7. Use email: `admin@xyz.com` and password: `hf7rytrgt` as the administrator login credentials.

8. To run the test coverage, run `npx cypress open` from within the downloaded project folder. The cypress GUI opens and then click on the button to run integration spec.

9. To use docker containers, run `docker-compose up` to build and start the containers.

10. Execute an interactive bash shell on the db container using `docker-compose exec db bash`

11. Inside the container, log into the MySQL root administrative account: `mysql -u root -p` and type in `9j5gyg5t` as the root password.

12. Create a database user and password by issuing the following mysql prompt command: 
`GRANT ALL ON school.* TO 'admin'@'%' IDENTIFIED BY 'rurh64u493s';`

13. Flush privileges `FLUSH PRIVILEGES;`

14. Still at the mysql prompt, import the `./database/schema.sql` file into the database to seed data by first running `use school;` and then running `source /home/node/app/database/schema.sql;`

15. Exit from the mysql prompt and then the container by typing `exit`
