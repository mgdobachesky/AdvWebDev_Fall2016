//require the data schema
var employee = require('../models/employee');

//export function that gets the index page and allows you to add employees
module.exports.index = function(req, res) {
	//create a message variable that will be used if an employee was added
	var message = "";
	//create a function that will render the page when needed
	var renderIndex = function() {
		res.render('index', {
			'title': 'Home',
			'message': message
		});
	};
		
	//if data is being posted to the page create an employee and render the page again
	if(req.method === 'POST') {
		//only add if all fields are filled in
		if(req.body.firstName && req.body.lastName && req.body.department && req.body.startDate && req.body.jobTitle && req.body.salary) {
			employee.create({
				'firstName': req.body.firstName,
				'lastName': req.body.lastName,
				'department': req.body.department,
				'startDate': req.body.startDate,
				'jobTitle': req.body.jobTitle,
				'salary': req.body.salary
			}, function(error) {
				//change the message value
				message = "Employee Saved!";
				//callback function used to render the page after an attempt to add data
				renderIndex();
			});
		} else {
			message = "All fields required, please try again";
			renderIndex();
		}
	} else {
		//set message to be empty
		message = "";
		//if the data was not being posted then just render the empty page
		renderIndex();
	}
};

//export a function that allows you to view employees and delete an employee
module.exports.view = function(req, res) {
	//get the id from the employee GET URL if it exists
	var id = req.params.id;
	//initialize a sting that will provide feedback as to of whether or not a record was deleted
	var removed = "";
	//a function that will render the views page
	var renderViews = function() {
		employee.find().exec(function(err, results) {
			res.render('view', {
				'title': 'Employees',
				'results': results,
				'message': removed
			});
		});
	};
	
	//if an id was passed through the url then use it to remove that id from the database
	if(id) {
		//create promise to use in removing a record from the database
		var removePromise = new Promise(function(resolve, reject) {
			employee.remove({'_id': id}, function(error) {
				if(!error) {
					resolve(' has been removed!');
				} else {
					reject(' has not been removed!');
				}
			});
		});
		
		//choose what happend after promise runs
		removePromise.then(function(result) {
			removed = id + result;
			renderViews();
		}, function(result) {
			removed = id + result;
			renderViews();
		});
	} else {
		//if there is no id to delete then just render the empty views page
		renderViews();
	}
};

//export a function that will display display the details of a record or update it
module.exports.update = function(req, res) {
	//get the employee id from the GET URL
	var id = req.params.id;
	//create a message to use in giving the user feedback
	var message = "";
	//create a variable to hold the page title
	var title = "Update";
	
	//if the page is loaded with a post request, update a user's details
	if(req.method === 'POST') {
		//only update if all fields are filled in
		if(req.body.firstName && req.body.lastName && req.body.department && req.body.startDate && req.body.jobTitle && req.body.salary) {
			//prepare required update parameters
			var query = {'_id': req.body.id};
			var update = {
				'firstName': req.body.firstName,
				'lastName': req.body.lastName,
				'department': req.body.department,
				'startDate': req.body.startDate,
				'jobTitle': req.body.jobTitle,
				'salary': req.body.salary
			};
			var options = {};
			var callback = function() {};
			id = req.body.id;
			
			//call update method on database model object
			employee.update(query, update, options, callback);
			
			//update the message to provide feedback
			message = "Employee has been updated!";
			
			//update the title of the page
			title = "Update Results";
		} else {
			message = "All fields required, please try again";
		}
	}
	
	//find the employee in question and render the update page with his or her details
	employee.findOne({'_id': id}).exec(function(error, results) {
		if(results) {
			res.render('update', {
				'title': title,
				'message': message,
				'results': results
			});
		} else {
			res.render('notfound', {
				message: 'ID not found'
			});
		}
	});
};