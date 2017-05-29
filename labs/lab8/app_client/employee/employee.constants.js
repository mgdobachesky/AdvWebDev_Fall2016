//set angular constants
(function() {
	'use strict';
	angular
		.module('app.employee')
		.constant('REQUEST', {
			'employees' : '/api/v1/employees'
		});
})();