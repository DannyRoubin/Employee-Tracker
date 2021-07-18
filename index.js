const inquirer = require("inquirer");
const mysql = require("mysql");
require("dotenv").config();

const dotenvConnection = mysql.createConnection({
  host: "localhost",
  port: 3301,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

dotenvConnection.connect((err) => {
  if (err) throw err;
  startTask();
});

const startTask = () => {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "Add Role",
        "Remove Role",
        "View All Departments",
        "Add Department",
        "Remove Department",
        "View Total Budget By Department",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          artistSearch();
          break;

        case "View All Employees By Department":
          multiSearch();
          break;

        case "View All Employees By Manager":
          rangeSearch();
          break;

        case "Add Employee":
          songSearch();
          break;

        case "Remove Employee":
          songSearch();
          break;

        case "Update Employee":
          songSearch();
          break;

        case "Update Employee Role":
          songSearch();
          break;

        case "Update Employee Manager":
          songSearch();
          break;
      }
    });
};
