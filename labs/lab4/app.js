//require required modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//require the routes this app is going to use
var routes = require('./app_server/routes/index');
var routesForm = require('./app_server/routes/form');
var routesAbout = require('./app_server/routes/about');

//create an express object named app
var app = express();

//set up the apps default view location
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

//place favicon in "/public" then uncomment following line
//app.use(favicon(__dirname + '/public/favicon.ico'));

//set app to use required modules
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//set up routes that this app is going to use
app.use('/', routes);
app.use('/index', routes);
app.use('/form', routesForm);
app.use('/about', routesAbout);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//**error handlers**

//development error handler, prints stack trace
if(app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

//production error handler, no stack trace for security
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

//export app to be used by server
module.exports = app;
