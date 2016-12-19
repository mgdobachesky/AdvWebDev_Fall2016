//require required modules
var mongoose = require('mongoose');
var employees = mongoose.model('employee');

//function that allows a call to read all employees
function employeesReadAll() {
	var promise = new Promise(function(resolve, reject) {
		employees.find().exec(function(err, results) {
			if(err) {
				reject(err);
			} else {
				results = fixReviewData(results);
				resolve(results);
			}
		});
	});
	return promise;
}

//function that allows a call to read one employee
function employeesReadOne(id) {
	var promise = new Promise(function(resolve, reject) {
		if(!id) {
			reject('Employee id not found!');
		} else {
			employees.findById(id).exec(function(err, results) {
				if(err) {
					reject(err);
				} else {
					results = fixData(results);
					resolve(results);
				}
			});
		}
	});
	return promise;
}

//function that allows a call to create an employee
function employeesCreate(req) {
	var promise = new Promise(function(resolve, reject) {
		employees.create({
			'firstName': req.body.firstName,
			'lastName': req.body.lastName,
			'department': req.body.department,
			'startDate': req.body.startDate,
			'jobTitle': req.body.jobTitle,
			'salary': req.body.salary
		}, function(err, dataSaved) {
			if(err) {
				reject(err);
			} else {
				resolve(dataSaved);
			}
		});
	});
	return promise;
}

//function that allows a call to update an employee
function employeesUpdateOne(req) {
	var promise = new Promise(function(resolve, reject) {
		if(!req.params.employeeid) {
			reject('Employee id required!');
		}
		employees.findById(req.params.employeeid).exec(function(err, employeeData) {
			if(!employeeData) {
				reject('Employee id not found!');
			} else if (err) {
				reject(err);
			}
			employeeData.firstName = req.body.firstName;
			employeeData.lastName = req.body.lastName;
			employeeData.department = req.body.department;
			employeeData.startDate = req.body.startDate;
			employeeData.jobTitle = req.body.jobTitle;
			employeeData.salary = req.body.salary;
			
			employeeData.save(function(err, data) {
				if(err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	});
	return promise;
}

//function that allows a call to delete an employee
function employeesDeleteOne(id) {
	var promise = new Promise(function(resolve, reject) {
		if(!id) {
			reject("Employee id required!");
		}
		employees.findByIdAndRemove(id).exec(function(err, reviewData) {
			if(err) {
				reject(err);
			} else {
				resolve('Successfully Deleted Employee!');
			}
		});
	});
	return promise;
}

//function that pushes and returns formatted data
function fixReviewData(results) {
	var finalData = [];
	results.forEach(function(doc) {
		finalData.push(fixData(doc));
	});
	return finalData;
}

//function that formats data
function fixData(doc) {
	if(doc) {
		var startDate = new Date(doc.startDate).toJSON().slice(0, 10);
		return {
			"_id" : doc._id,
			"firstName" : doc.firstName,
			"lastName" : doc.lastName,
			"department" : doc.department,
			"startDate" : startDate.replace(/^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$/, "$2/$3/$1"),
			"jobTitle" : doc.jobTitle,
			"salary" : doc.salary
		};
	}
}

//export functions that are for public use
module.exports.employeesReadAll = employeesReadAll;
module.exports.employeesReadOne = employeesReadOne;
module.exports.employeesCreate = employeesCreate;
module.exports.employeesUpdateOne = employeesUpdateOne;
module.exports.employeesDeleteOne = employeesDeleteOne;