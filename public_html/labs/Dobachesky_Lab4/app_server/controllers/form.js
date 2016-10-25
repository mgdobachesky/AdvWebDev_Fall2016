//function that gets the form view for the routes
module.exports.formView = function(req, res) {
	res.render('form', {
		"title": "Form"
	});
};

//function that posts the form view for the routes
module.exports.formPost = function(req, res) {
	if(req.method === 'POST') {
		res.render('formResults', {
			"title": "Form Results",
			name: req.body.name,
			email: req.body.email,
			comments: req.body.comments
		});
	} else {
		res.render('formResults', {
			"title": "Form Results",
			name: "No name found",
			email: "No email found",
			comments: "No comments found"
		});
	}
};