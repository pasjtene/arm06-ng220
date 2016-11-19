var express = require('express');
var app = express();
var path = require('path');
//api is simply a router
var api = require('./api/api');

//moved to arm-middleware
//var morgan = require('morgan');
//var bodyParser = require('body-parser');
//var cors = require('cors');
//var override = require('method-override');

//Authentication route
var auth = require('./auth/authenticate.routes');
var err = require('./middleware/err');

//could be abstracted to arm-.middleware

//app.use(morgan('dev'));
//app.use(bodyParser.urlencoded({ extended: true}));
//app.use(bodyParser.json());
//app.use(cors());
//app.use(override());

require('./middleware/arm-middleware')(app);
//app.use(express.static(path.join(__dirname, 'client2')));
console.log(path.join(__dirname, '../client2'));
//app.engine('.html', require('ejs').__express);
//app.set('views', __dirname + '/client2');
//app.set('view engine', 'html');


//any request to api will use the api router
app.use('/api/', api);
app.use('/auth', auth);

//global error handleling
app.use(err);

module.exports = app;
