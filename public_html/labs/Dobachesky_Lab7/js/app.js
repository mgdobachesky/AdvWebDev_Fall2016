(function() {
	'use strict';
	
	//create the app module and add the ngRoute module to use
	//also set up the config for the module
	angular.module('app', ['ngRoute']).config(config);
	
	//inject the routeProvider into the config so minification has no adverse effects
	config.$inject = ['$routeProvider'];
	
	//write a function that uses the angular $routeProvider as a parameter
	function config($routeProvider) {
		$routeProvider.when('/', {
			//set up the route home page
			templateUrl: 'js/phone-list.template.html',
			controller: 'PhoneListController',
			controllerAs: 'vm'
		}).
		when('/phones/:phoneId', {
			//set up page to view details on a phone
			templateUrl: 'js/phone-detail.template.html',
			controller: 'PhoneDetailController',
			controllerAs: 'vm'
		}).
		otherwise({
			//when anything else is typed redirect to home page
			redirectTo: '/'
		});
	}
})();