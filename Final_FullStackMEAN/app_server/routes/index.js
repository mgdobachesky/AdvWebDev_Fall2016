//require express module
var express = require('express');
//set the router of the express module
var router = express.Router();
//require the controller script that this page routes to
var ctrlHome = require('../controllers/home');

//set up routing to controller
router.all('/', ctrlHome.angularApp);

//export the router to be used by the app
module.exports = router;