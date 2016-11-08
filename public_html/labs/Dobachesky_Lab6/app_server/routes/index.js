//require express module
var express = require('express');
//set the router of the express module
var router = express.Router();
//require the controller script that this page routes to
var ctrlIndex = require('../controllers/home');

//set up routing to controller
router.all('/', ctrlIndex.home);
router.all('/home', ctrlIndex.home);
router.get('/form', ctrlIndex.form);
router.post('/form', ctrlIndex.createEmployee);

//export the router to be used by the app
module.exports = router;