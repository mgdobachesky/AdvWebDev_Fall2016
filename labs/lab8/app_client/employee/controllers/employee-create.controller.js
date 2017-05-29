//controller for the create employee pageX
(function() {
	'use strict';
	angular
		.module('app.employee')
		.controller('EmployeeCreateController', EmployeeCreateController);
		
	//inject params to make them immune to minification
	EmployeeCreateController.$inject = ['employeeService'];
	
	function EmployeeCreateController(employeeService) {
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
		vm.title = 'Add Employee';
		
		activate();
		
		//define activate function
		function activate() {}
		
		//define submit function
		function submit() {
			employeeService.createEmployee(vm.data).then(function(data) {
				vm.message = data;
			});
		}
		
	}
})();