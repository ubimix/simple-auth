var express = require("express");
var BackofficeAPI = require('./lib/BackofficeAPI');
var BackofficeWebApp = require('./lib/BackofficeWebApp');

var port = 3701;

var app = express();
app.use(express.static(__dirname + '/'));

var api = new BackofficeAPI({})
var webApp = new BackofficeWebApp({
    api : api
});
webApp.initApp(app);

app.listen(port);

console.log('Try to access to these URLs:');
console.log('1) http://localhost:3701/test/hello'
        + '\n    -> Error 401: Forbidden');
console.log('2) http://localhost:3701/test/login'
        + '\n    -> Error 401: Bad credentials');
console.log('3) http://localhost:3701/test/login?login=John&password=Smith'
        + '\n    -> 200: Session ID: 123');
console.log('4) http://localhost:3701/test/hello'
        + '\n    -> 200: {"msg":"Hello, Anonymous!"}');
console.log('5) http://localhost:3701/test/hello?name=John'
        + '\n    -> 200: {"msg":"Hello, John!"}');
console.log('6) http://localhost:3701/test/logout'
        + '\n    -> 200: You are logged out.');
console.log('7) http://localhost:3701/test/hello'
        + '\n    -> Error 401: Forbidden');
