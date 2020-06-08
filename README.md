# Coral

##Installation
CD to backend or smart-contracts folder and run the following command
```
npm install
```
For coral-app use
```
yarn install
```

##BACKEND DOCUMENTATION

First create a local database with PostgreSQL. In psql shell run these commands:
```
CREATE DATABASE coral;
\c coral;
CREATE TABLE users (
	_id SERIAL PRIMARY KEY NOT NULL,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	role VARCHAR(20) NOT NULL,
  geolocation VARCHAR(255) NOT NULL,
  ethaddress VARCHAR(255) NOT NULL
); 
```

Start server on port 5000
```
npm start
```

##FRONTEND DOCUMENTATION

cd to coral-app and run
```
npm start
```
Coral app will be on port 3000.



##SMART CONTRACTS DOCUMENTATION

Install solidity extension for VScode
https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity

F1 to compile current contract.


