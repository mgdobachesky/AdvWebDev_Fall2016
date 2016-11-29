//define controller for update pageX
(function() {
	'use strict';
	angular
		.module('app.employee')
		.controller('EmployeeUpdateController', EmployeeUpdateController);
		
	//inject params to make them immune to minification
	EmployeeUpdateController.$inject = ['employeeService', '$routeParams'];
	
	function EmployeeUpdateController(employeeService, $routeParams) {
		var vm = this;
		
		vm.data = {
			'firstName' : '',
			'lastName' : '',
			'department' : '',
			'startDate' : '',
			'jobTitle' : '',
			'salary' : ''
		};
		vm.submit = submit;
		vm.message = '';
		vm.title = 'Update Employee';
		
		var _id = $routeParams.id;
		
		activate();
		
		//define activate function
		function activate() {
			getEmployee();
		}
		
		//function that will get the employee to be updated
		function getEmployee() {
			employeeService.getEmployee(_id).then(function(data) {
				vm.data.firstName = data.firstName;
				vm.data.lastName = data.lastName;
				vm.data.department = data.department;
				vm.data.startDate = data.startDate;
				vm.data.jobTitle = data.jobTitle;
				vm.data.salary = data.salary;
			});
		}
		
		//function that updates the employee
		function submit() {
			employeeService.updateEmployee(_id, vm.data).then(function(data) {
				vm.message = data;
			});
		}
		
	}
})();