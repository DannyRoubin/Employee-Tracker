-- creates the database employeeTrackerDB and sets it as the one in use
drop database if exists employeeTrackerDB;
create database employeeTrackerDB;
use employeeTrackerDB;

-- add department name and id here
create table department(
id int not null auto_increment,
name varchar(30),
primary key (id)

);

-- add title, salary, and department id
create table `role` (
id int not null auto_increment,
title varchar(30),
salary decimal (10,2),
department_id int not null,
primary key (id),
foreign key fkey_department (department_id) references department(id)
);

-- add first and last name, role id, and manager id
create table employee(
id int not null auto_increment,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id int not null,
manager_id int,
primary key (id),
foreign key fkey_manager (manager_id) references employee(id),
foreign key fkey_role (role_id) references `role`(id)
);




-- adding new info to tables

-- creates a new dapartment titled software engineers
insert into department (name)
value ("Software Engineers");

-- creating the following four roles
insert into `role` (title, salary, department_id)
values ('Front end developer', 90000, 1);

insert into `role` (title, salary, department_id)
values ('Back end developer', 92000, 1);

insert into `role` (title, salary, department_id)
values ('project manager', 120000, 1);

insert into `role` (title, salary, department_id)
values ('front end designer', 88000, 1);

-- creates new employees

insert into employee (first_name, last_name, role_id, manager_id)
values ("Bill", "Rockington", 3, 1 );

insert into employee (first_name, last_name, role_id, manager_id)
values ("Jill", "Doe", 2, 1);

insert into employee (first_name, last_name, role_id, manager_id)
values ("Garrett", "Grant", 1, 1);

insert into employee (first_name, last_name, role_id, manager_id)
values ("Vincent", "Burns", 4, 1);

 select 
   employee.*, 
   employeeManager.first_name as manager_first, 
   employeeManager.last_name as manager_last,
   `role`.title as role_title,
   `role`.salary as role_salary,
   department.name as department_name
 from employee
 inner join employee as employeeManager on employee.manager_id = employeeManager.id
 inner join `role` on employee.role_id = `role`.id
 inner join department on `role`.department_id = department.id