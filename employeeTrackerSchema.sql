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


