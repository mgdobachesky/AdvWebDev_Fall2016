//include required modules
var mongoose = require('mongoose');

//set the database uri
var dbURI = 'mongodb://localhost/Loc8r';

//function that handles shutdown and restart events
var gracefulShutdown = function(message, callback) {
	mongoose.connection.close(function() {
		console.log("Mongoose disconnected through " + message);
		callback();
	});
};

//connect to the database
mongoose.connect(dbURI);

//run when database connects
mongoose.connection.on('connected', function() {
	console.log("Mongoose connected to " + dbURI);
});

//run when there is an error connecting
mongoose.connection.on('error', function(error) {
	console.log("Mongoose connection error: " + error);
	process.exit(0);
});

//run after disconnecting
mongoose.connection.on('disconnected', function() {
	console.log("Mongoose disconnected");
});

//run when the app terminates
process.on('SIGINT', function() {
	gracefulShutdown('app termination', function() {
		process.exit(0);
	});
});

//run when the app exits
process.on('exit', function(code) {
	console.log('About to exit with code:', code);
});

//bring in schemas and models
require('./employee');