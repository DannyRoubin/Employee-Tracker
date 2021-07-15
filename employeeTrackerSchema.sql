-- creates the database employeeTrackerDB and sets it as the one in use
drop database if exists employeeTrackerDB
create database employeeTrackerDB
use employeeTrackerDB

-- add department name and id here
create table department(
id int not null auto_increment
name varchar(30)
primary key (id)

)

-- add title, salary, and department id
create table 'role'(
id int not null auto_increment
title varchar(30)
salery decimal (10,2)
department_id int not null
primary key (id)
)

-- add first and last name, role id, and manager id
create table employee(
id int not null auto_increment
first_name varchar(30) not null
last_name varchar(30) not null
role_id int not null
manager_id int
primary key (id)
)

-- adding new info to tables

-- creates a new dapartment titled software engineers
insert into department (name)
value ("Software Engineers")

-- creating the following four roles
insert into 'role' (title, salary, department_id)
values (Front-end developer, 90,000, 19)

insert into 'role' (title, salary, department_id)
values (Back-end developer, 92,000, 11)

insert into 'role' (title, salary, department_id)
values (project manager, 120,000, 16)

insert into 'role' (title, salary, department_id)
values (front-end designer, 88,000, 12)

-- creates new employees

insert into employee (first_name, last_name, role_id, manager_id)
values ("Bill", "Rockington", 19, 5)

insert into employee (first_name, last_name, role_id, manager_id)
values ("Jill", "Doe", 16, 5)

insert into employee (first_name, last_name, role_id, manager_id)
values ("Garrett", "Grant", 11, 5)

insert into employee (first_name, last_name, role_id, manager_id)
values ("Vincent", "Burns", 12, 5)