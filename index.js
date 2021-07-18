const inquirer = require("inquirer");
const mysql = require("mysql");
require("dotenv").config();

const dotenvConnection = mysql.createConnection({
    host: "localhost", 
    port: 3301,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})



// Refer to week 12 activity 14 for how to set this all up

//refer to week 13 activity 16 to see how to get the .env up and running
