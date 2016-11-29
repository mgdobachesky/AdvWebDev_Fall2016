//create a service for the angular app to use based on the app api
(function() {
	'use strict';
	angular
		.module('app.employee')
		.factory('employeeService', employeeService);
		
		//inject the required params to allow for minification
		employeeService.$inject = ['$http', 'REQUEST'];
		
		function employeeService($http, REQUEST) {
			//service
			var url = REQUEST.employees;
			var service = {
				'getEmployee' : getEmployee,
				'getEmployees' : getEmployees,
				'createEmployee' : createEmployee,
				'updateEmployee' : updateEmployee,
				'deleteEmployee' : deleteEmployee
			};
			return service;
			
			//method to get an employee
			function getEmployee(_id) {
				var oneUrl = url + '/' + _id;
				return $http.get(oneUrl).then(getComplete, getFailed);
				
				function getComplete(response) {
					return response.data;
				}
				
				function getFailed(error) {
					return [];
				}
			}
			
			//method to get all employees
			function getEmployees() {
				return $http.get(url).then(getComplete, getFailed);
				
				function getComplete(response) {
					return response.data;
				}
				
				function getFailed(error) {
					return [];
				}
			}
			
			//method to add an employee
			function createEmployee() {
				return $http.post(url, data).then(createComplete, createFailed);
				
				function createComplete(response) {
					return 'Employee Added!';
				}
				
				function createFailed(error) {
					return 'Failed to Add Employee!';
				}
			}
			
			//method to update an employee
			function updateEmployee(_id, data) {
				var updateUrl = url + '/' + _id;
				return $http.put(updateUrl, data).then(updateComplete, updateFailed);
				
				function updateComplete(response) {
					return 'Employee Updated!';
				}
				
				function updateFailed(error) {
					return 'Failed to Update Employee!';
				}
			}
			
			//method to delete and employee
			function deleteEmployee(_id) {
				var deleteUrl = url + '/' + _id;
				
				return $http.delete(delUrl).then(deleteComplete, deleteFailed);
				
				function deleteComplete(response) {
					return 'Delete Completed!';
				}
				
				function deleteFailed(error) {
					return 'Delete Failed!';
				}
			}
			
		}
})();