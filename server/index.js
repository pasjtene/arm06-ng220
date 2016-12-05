var express = require('express');
var app = express();
var path = require('path');
//api is simply a router
var api = require('./api/api');

//Authentication route
var auth = require('./auth/authenticate.routes');
var err = require('./middleware/err');

require('./middleware/arm-middleware')(app);

console.log(path.join(__dirname, '../client2'));

//any request to api will use the api router
app.use('/api/', api);
app.use('/auth', auth);

//global error handleling
app.use(err);

module.exports = app;
