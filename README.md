# Coral


## Requirements for running locally
* Node (v10 or higher)
* PostgreSQL (v12)


## Installation

Install nodemon globally
```
npm install -g nodemon
```

CD to backend or smart-contracts folder and run the following command
```
npm install
```
For coral-app use either yarn or npm.
```
yarn install
```


## BACKEND DOCUMENTATION

First create a local database with PostgreSQL(logged in as user: postgres). In psql shell run these commands:
```
CREATE DATABASE coral;
\c coral;
```
Copy and paste the content of users.sql in psql shell and then products.sql in the same way. Both files are in the SQL folder of the root directory.

Start server on port 5000
```
npm start
```

## FRONTEND DOCUMENTATION

cd to coral-app and run
```
npm start
```
Coral app will be on port 3000. (localhost:3000)


