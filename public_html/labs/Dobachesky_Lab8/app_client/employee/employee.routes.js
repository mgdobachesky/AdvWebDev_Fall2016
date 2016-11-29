//set the routes for the angular app
(function() {
	'use strict';
	angular
		.module('app.employee')
		.config(config);
		
	config.$inject = ['$routeProvider'];
	
	function config($routeProvider) {
		$routeProvider.
			when('/', {
				'templateUrl': '/employee/views/employee-home.view.html',
				'controller': 'EmployeeHomeController',
				'controllerAs': 'vm'
			}).
			when('/create', {
				'templateUrl': '/employee/views/employee-form.view.html',
				'controller': 'EmployeeCreateController',
				'controllerAs': 'vm'
			}).
			when('/update/:id', {
				'templateUrl': '/employee/views/employee-form.view.html',
				'controller': 'EmployeeUpdateController',
				'controllerAs': 'vm'
			}).
			otherwise({
				'redirectTo': '/'
			});
	}
})();