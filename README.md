# Probafeladat

## SQL

-mariadb 10.4.12 Stable used for relational database (find installer in "installers" folder)
-Access: root/root
-database is stored in the sql.txt file, copying it to heidiSQL is enough

## Back-end

-In backendApp folder: $npm i, $npm run dev
-Made with express & pug template engine
-Connection with database can be checked at http://localhost:3000/api

## Front-end

-In frontendApp folder: $npm i, $ng serve -o

### Users

-CRUD works
-New user can be added with a hashed password (no validation)
-User can be edited (no validation or hashin)
-User can be deleted

### Products

-No CRUD
-New order is created by pressing the „Megrendelés” button
-A unique code is also generated with it

### Orders

-No CRUD
-Searching orders by ordercode available
-Search function works with the LIKE operator
