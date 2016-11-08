//require required modules
var express = require('express');
var router = express.Router();
var ctrlEmployees = require('../controllers/employees');

//create routes for api requests
router.get('/employees', ctrlEmployees.employeesReadAll);
router.get('/employees/:employeeid', ctrlEmployees.employeesReadOne);
router.post('/employees', ctrlEmployees.employeesCreate);
router.put('/employees/:employeeid', ctrlEmployees.employeesUpdateOne);
router.delete('/employees/:employeeid', ctrlEmployees.employeesDeleteOne);

//export the router to be used by the app
module.exports = router;