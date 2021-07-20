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

// function to add an employee
const AddEmployee = () => {
  let query = "select id, title from `role` ";
  dotenvConnection.query(query, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "employeeFirstName",
          type: "input",
          message: "What is the first name of the employee?",
        },
        {
          name: "employeeLastName",
          type: "input",
          message: "What is the last name of the employee?",
        },
        {
          name: "employeeRole",
          type: "rawlist",
          message: "What is the role of the employee?",
          choices: res.map((role) => role.title),
        },
      ])
      .then((answer) => {
        const roleId = res.findIndex(
          (role) => role.title === answer.employeeRole
        );
        const employeeRoleId = res[roleId].id;
        AddEmployeeP2(
          answer.employeeFirstName,
          answer.employeeLastName,
          employeeRoleId
        );
      });
  });
};

const AddEmployeeP2 = (employeeFirstName, employeeLastName, employeeRoleId) => {
  let query =
    "select id, concat(`first_name`, ' ' , `last_name`) as fullName from employee;";
  dotenvConnection.query(query, (err, managers) => {
    if (err) throw err;
    managers.unshift({ id: null, fullName: "none" });
    inquirer
      .prompt([
        {
          name: "manager",
          type: "rawlist",
          message: `Who is the manager of this employee?`,
          choices: managers.map((manager) => manager.fullName),
        },
      ])
      .then((answer) => {
        const roleId = managers.findIndex(
          (manager) => manager.fullName === answer.manager
        );
        const managerId = managers[roleId].id;
        query =
          `insert into employee (first_name, last_name, role_id, manager_id) ` +
          `values ("${employeeFirstName}", "${employeeLastName}", ${employeeRoleId}, ${managerId})`;
        dotenvConnection.query(query, (err) => {
          if (err) throw err;
          console.log("employee now added");
          startTask();
        });
      });
  });
};

// function to remove an employee
const RemoveEmployee = () => {
  const query =
    "select id, concat(`first_name`, ' ', `last_name`) as fullName from employee;";
  dotenvConnection.query(query, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "employee",
          type: "rawlist",
          message: `Select which employee to remove: `,
          choices: res.map((employee) => employee.fullName),
        },
      ])
      .then((choice) => {
        const empId = res.findIndex(
          (employee) => employee.fullName === choice.employee
        );
        const employeeId = res[empId].id;
        const employeeFullName = res[empId].fullName;
        RemoveEmployeeP2(employeeId, employeeFullName);
      });
  });
};

const RemoveEmployeeP2 = (employeeId, employeeFullName) => {
  let query =
    "select concat(`first_name`, ' ', `last_name`) as fullName " +
    "from employee " +
    `where manager_id = ${employeeId}`;
  dotenvConnection.query(query, (err, res) => {
    if (err) throw err;
    if (res.length > 0) {
      console.log(
        `cannot remove "${employeeFullName}" because they are the manager of the following employees: `
      );
      console.log(res);
    } else {
      query = `delete from employee where id = ${employeeId}`;
      dotenvConnection.query(query, (err) => {
        if (err) throw err;
      });
    }
    console.log("Employee now removed");
    startTask();
  });
};

// function to update an employee role
const UpdateEmployeeRole = () => {
  let query =
    "select id, concat(`first_name`, ' ' , `last_name`) as fullName from employee";
  dotenvConnection.query(query, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "employee",
          type: "rawlist",
          message: `Which employee would you like to update? : `,
          choices: res.map((employee) => employee.fullName),
        },
      ])
      .then((answer) => {
        const employeeIdHolder = res.findIndex(
          (employee) => employee.fullName === answer.employee
        );
        const employeeId = res[employeeIdHolder].id;
        UpdateEmployeeRoleP2(employeeId);
      });
  });
};

const UpdateEmployeeRoleP2 = (employeeId) => {
  let query = "select id, title from `role` ";
  dotenvConnection.query(query, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "role",
          type: "rawlist",
          message: `What would you like the employee's new role to be? : `,
          choices: res.map((role) => role.title),
        },
      ])
      .then((answer) => {
        const employeeRoleHolder = res.findIndex(
          (role) => role.title === answer.role
        );
        const roleId = res[employeeRoleHolder].id;
        query = `update employee set role_id = ${roleId} where id = ${employeeId}`;
        dotenvConnection.query(query, (err) => {
          if (err) throw err;
          console.log("employee role successfully updated");
          startTask();
        });
      });
  });
};

// function to update an employee manager
const UpdateEmployeeManager = () => {
  const query =
    "select id, concat(`first_name`, ' ' , `last_name`) as fullName from employee";
  dotenvConnection.query(query, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "employee",
          type: "rawlist",
          message: `Which employee would you like to update? : `,
          choices: res.map((employee) => employee.fullName),
        },
      ])
      .then((answer) => {
        const employeeIdHolder = res.findIndex(
          (employee) => employee.fullName === answer.employee
        );
        const employeeId = res[employeeIdHolder].id;
        UpdateEmployeeManagerP2(employeeId);
      });
  });
};

const UpdateEmployeeManagerP2 = (employeeId) => {
  let query =
    "select id, concat(`first_name`, ' ', `last_name`) as fullName from employee ";
  dotenvConnection.query(query, (err, res) => {
    if (err) throw err;
    res.unshift({ id: null, fullName: "none" });
    inquirer
      .prompt([
        {
          name: "manager",
          type: "rawlist",
          message: `Who is the employees new manager? : `,
          choices: res.map((manager) => manager.fullName),
        },
      ])
      .then((answer) => {
        const managerIdHolder = res.findIndex(
          (manager) => manager.fullName === answer.manager
        );
        const managerId = res[managerIdHolder].id;
        query = `update employee set manager_id = ${managerId} where id = ${employeeId}`;
        dotenvConnection.query(query, (err) => {
          if (err) throw err;
          console.log("employee manager successfully updated");
          startTask();
        });
      });
  });
};

const ViewAllRoles = () => {
  const query =
    "select title, salary, department_id from `role` " +
    "inner join department on role.department_id = department.id order by `title` ";
  dotenvConnection.query(query, (err, res) => {
    if (err) throw err;
    console.log(res);
    startTask();
  });
};

const AddRole = () => {
  let query = `select id, name from department`;
  dotenvConnection.query(query, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "newTitle",
          type: "input",
          message: `What is the title for the new role? `,
        },
        {
          name: "newSalary",
          type: "input",
          message: `What is the salary for the new role? `,
        },
        {
          name: "newDepartment",
          type: "rawlist",
          message: `What is the department for the new role? `,
          choices: res.map((department) => department.name),
        },
      ])
      .then((answer) => {
        const departmentIdHolder = res.findIndex(
          (department) => department.name === answer.newDepartment
        );
        const departmentId = res[departmentIdHolder].id;
        query = `insert into \`role\` (title, salary, department_id) values ("${answer.newTitle}", ${answer.newSalary}, ${departmentId})`;
        dotenvConnection.query(query, (err) => {
          if (err) throw err;
          console.log("New role successfully added");
          startTask();
        });
      });
  });
};

const RemoveRole = () => {
  const query = "select id, title from role";
  dotenvConnection.query(query, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "role",
          type: "rawlist",
          message: `What role do you want to remove? : `,
          choices: res.map((role) => role.title),
        },
      ])
      .then((answer) => {
        const roleIdHolder = res.findIndex(
          (role) => role.title === answer.role
        );
        const roleId = res[roleIdHolder].id;
        RemoveRoleP2(roleId);
      });
  });
};

const RemoveRoleP2 = (roleId) => {
  let query =
    "select concat (`first_name`, ' ', `last_name`) as fullName from employee " +
    "inner join `role` on employee.role_id = `role`.id " +
    `where \`role\`.id = ${roleId}`;
  dotenvConnection.query(query, (err, res) => {
    if (err) throw err;
    if (res.length > 0) {
      console.log(
        "You cannot remove this role because the following employees are still assigned to it:"
      );
      console.log(res);
    } else {
      query = `delete from \`role\` where id = ${roleId}`;
      dotenvConnection.query(query, (err) => {
        if (err) throw err;
      });
    }
    console.log("role successfully removed");
    startTask();
  });
};

const ViewAllDepartments = () => {
  const query = `select name from department order BY name`;
  dotenvConnection.query(query, (err, res) => {
    if (err) throw err;
    console.log(res);
    startTask();
  });
};

const AddDepartment = () => {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: `What department would you like to add? `,
      },
    ])
    .then((answer) => {
      const query = `insert into department (name) value ("${answer.newDepartment}")`;
      dotenvConnection.query(query, (err) => {
        if (err) throw err;
        console.log("New department added");
        startTask();
      });
    });
};
