//set angular constants
(function() {
	'use strict';
	angular
		.module('app.review')
		.constant('REQUEST', {
			'employees' : '/api/v1/employees'
		});
})();