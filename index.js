const inquirer = require("inquirer");
const mysql = require("mysql");
require("dotenv").config();

const dotenvConnection = mysql.createConnection({
  host: "localhost",
  port: 3306,
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
          ViewAllEmployees();
          break;

        case "View All Employees By Department":
          ViewAllEmployeesByDepartment();
          break;

        case "View All Employees By Manager":
          ViewAllEmployeesByManager();
          break;

        case "Add Employee":
          AddEmployee();
          break;

        case "Remove Employee":
          RemoveEmployee();
          break;

        case "Update Employee":
          UpdateEmployee();
          break;

        case "Update Employee Role":
          UpdateEmployeeRole();
          break;

        case "Update Employee Manager":
          UpdateEmployeeManager();
          break;

        case "View All Roles":
          ViewAllRoles();
          break;

        case "Add Role":
          AddRole();
          break;

        case "Remove Role":
          RemoveRole();
          break;

        case "View All Departments":
          ViewAllDepartments();
          break;

        case "Add Department":
          AddDepartment();
          break;

        case "Remove Department":
          RemoveDepartment();
          break;

        case "View Total Budget By Department":
          ViewTotalBudgetByDepartment();
          break;

        case "Exit":
          dotenvConnection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

// function to view all of the employees
const ViewAllEmployees = () => {
  const query =
    "select " +
    "employee.first_name, " +
    "employee.last_name, " +
    "role.title as `role`, " +
    "role.salary, " +
    "department.name as `department`, " +
    "concat(manager.first_name, ' ', manager.last_name) as manager " +
    "from employee as employee " +
    "left outer join employee as manager on employee.manager_id = manager.id " +
    "inner join `role` AS role on employee.role_id = role.id " +
    "inner join department as department on role.department_id = department.id " +
    "order by employee.first_name, employee.last_name;";
  dotenvConnection.query(query, (err, res) => {
    if (err) throw err;
    console.log("Now viewing all employees");
    console.log(res);
    startTask();
  });
};

// function to view all employees by department
const ViewAllEmployeesByDepartment = () => {
  const query =
    "select " +
    "department.name as `department`, employee.first_name, employee.last_name, " +
    "role.title as `role` , role.salary, " +
    "concat(manager.first_name, ' ', manager.last_name) as manager from employee as employee " +
    "left outer join employee as manager on employee.manager_id = manager.id " +
    "inner join `role` as role on employee.role_id = role.id " +
    "inner join department as department on role.department_id = department.id " +
    "order by `department`, employee.first_name, employee.last_name ";
  dotenvConnection.query(query, (err, res) => {
    if (err) throw err;
    console.log("Now viewing all employees by department");
    console.log(res);
    startTask();
  });
};

// function to view all employees by manager
const ViewAllEmployeesByManager = () => {
  const query =
    "select concat(manager.first_name, ' ', manager.last_name) as manager, " +
    "employee.first_name, employee.last_name, role.title as `role`, role.salary, " +
    "department.name as `department` from employee as employee " +
    "left outer join employee as manager on employee.manager_id = manager.id " +
    "inner join `role` as role on employee.role_id = role.id " +
    "inner join department as department on role.department_id = department.id order by manager";
  dotenvConnection.query(query, (err, res) => {
    if (err) throw err;
    console.log("Now viewing all employees by manager");
    console.log(res);
    startTask();
  });
};
