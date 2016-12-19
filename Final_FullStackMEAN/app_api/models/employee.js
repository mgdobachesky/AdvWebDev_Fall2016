//require mongoose to make a schema on
var mongoose = require('mongoose');

//create a schema for employees
var employeeSchema = new mongoose.Schema({
	'firstName': {
		'type': String,
		'required': true
	},
	'lastName': {
		'type': String,
		'required': true
	},
	'department': {
		'type': String,
		'required': true
	},
	'startDate': {
		'type': Date,
		'required': true
	},
	'jobTitle': {
		'type': String,
		'required': true
	},
	'salary': {
		'type': Number,
		'required': true
	}
});

//create database model off of that schema
var employee = mongoose.model('employee', employeeSchema);

//export the schema to be used by other parts of the app
module.exports = employee;