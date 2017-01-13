# Authentication server

This server handles user authentication. In our very simple case, it will only ask for an username, but we can think of improving it to interact with a LDAP server. Once the user authenticated itself, it server will place a Macaroon in the user's browser, with a status caveat, depending on the route used:

* If the user authed on `/`, they will have the "student" status.
* If the user authed on `/teacher`, they will have the "teacher" status.

## Install & run

Just run `npm install` in this directory to install the dependencies, then run either `npm start` or `node server.js` to start the server.
