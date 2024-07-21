#Sala Comunitaria Inventory Management

Inventory manager for Sala Comunitaria de Elaboracion de Productos con agregado de valor de la Agricultura Familiar

##Overview
This is a web app project that allows user to save cooking recipies as well as retrieve them to prepare and add notes during the cooking session. 
It uses a relational database to store recipies, stocks, schedules, and users for the platform.
users will be able to manage ingredients, products and mantainance resources like cleaning supplies, plan activities for each production iteration and 
allow administrators to manage platforms users as well as consulting a detailed log of changes done in the system by the usres.

##System
The web app architecture is structured in 3 main components

###Database
The data is manage by a mariadb relational database, and uses SQL queries to store, delete, update and retrieve all the information the user may need.

###Backend
The serverside part of the application, besides the database is a Java project that has a Resful API architecture to connect with the frontend module, and a series of services, interfaces and dependency injections to connect the user to the data.

###Frontend
For the user interface the web app was implemented using the Angular framework, html and css.
