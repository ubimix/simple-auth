# Test application

This application shows how to implement an API and 
a REST binding for this API. The API implements the 
following methods:
* '/test/login' - log-in with login=John&password=Smith
* '/test/hello' - says Hello if you are logged in
  or return a "401: Forbidden" error otherwise.
* '/test/logout' - log the user out if it was logged in

## Running The App

> npm install
> npm start

