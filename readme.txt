Short description:
forum webpage based on node js and react.

how to:
1. download whole repository.
2. in terminal navigate to 'server' folder.
3. launch using command 'npm start'.
4. repeat steps 2-3 for 'client' folder.

Additionally for internal database use you need to set up mysql (I recommend XAMMP):
1. setup XAMPP and launch Apache and MySQL.
For easiest setup provided code works with Structure called signup and
login table, but you can go ahead and change the code and structure for your use.
2. In browser launch localhost: 
3. navigate: phpMyAdmin
4. create new structure called "signup"
5. create 5 column table called "login"
6. columns: id - int primary, name - varchar max 20, email -varchar max 30,
password - varchar max 20, verified - varchar max 10 default:0

The rest should work with default localhost server setup. 

