# Employee-Tracker

## App Description

The purpose of this app is to serve as a employee tracker. The app allows the user to do the following :
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
"Add Department", and
"Remove Department".

## Motivation Behind the project/why I built it

My motivation behind creating this project was to be able to create teams with ease, while also bettering my abilities with mysql

## Problems I came across during development

Although this project was very entertaining to create, I did come across many problems during development which troubled me during the beginning of this project. The big group of problems I came across when I first started this project was improper sql syntax, since I was modeling most of my queries based off of in class activities, the problems came from shifting the in class activities to fit my purpose for this assignment

## What I learned from this project

From this project I better learned sql syntax as well as gained experience with routes and how to better use them. Although I believe I still have a ways to go before I'm good with routes, this project greatly helped improve my ability with them.

## App usage

To use this app simply clone this repo, then find the .env.EXAMPLE file, copy and paste it, and change one of the two versions to be titled .env . After changing the title, on the file titled .env fill in the blanks with your information and save the file. Next open the console/git bash and go to this file directory and perform an npm i, this will install all of the needed files to continue. After performing an npm i, open up mysql workbench and sign in, make sure to take note of which port your mysql workbench is on because you may need to change that in a moment. Once you've logged in, come back to VS Code and copy all the code on the file titled "employeeTrackerSchema.sql" and paste that on a file in your workbench and run it. You will now see seed data which you can either delete or keep. At this point you will have done an npm i, and seeded the data, the next thing to do is to make sure that your workbench port and the port on the connection are the same. To do this head over to the index.js file and on line 8 inside of the const titled "dotenvConnection" you will find a line that says "port: 3306". If your workbench is already running on port 3306, no need to change it, but if your workbench is on any other port, change line 8 to match your port. Now you should have everything in order to run the code. Open up the terminal/ gitbash and head over this directory. Once inside, type in node index.js and follow the prompts on screen.

## Link to a video walkthrough of the app running

https://drive.google.com/file/d/1KfK4Yvsnimxf88o7oy_VqvTLsX5mdfoz/view
