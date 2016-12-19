//home controllers
(function() {
	'use strict';
	angular
		.module('app.employee')
		.controller('EmployeeHomeController', EmployeeHomeController);
		
	//inject parameters so they are immune to minification
	EmployeeHomeController.$inject = ['employeeService', '$window'];
	
	function EmployeeHomeController(employeeService, $window) {
		var vm = this;
		
		vm.employees = [];
		vm.deleteEmployee = deleteEmployee;
		vm.message = '';
		
		activate();
		
		//define the activate function
		function activate() {
			getEmployees();
		}
		
		//function to get employees
		function getEmployees() {
			employeeService.getEmployees().then(function(data) {
				vm.employees = data;
			});
		}
		
		//function to delete employee
		function deleteEmployee(_id) {
			var confirm = $window.confirm('Delete Employee?');
			if(confirm) {
				employeeService.deleteEmployee(_id).then(function(message) {
					vm.message = message;
					getEmployees();
				});
			}
		}
		
	}
})();