//require express module
var express = require('express');
//set the router of the express module
var router = express.Router();
//require the controller script that this page routes to
var ctrlMain = require('../controllers/index');

//get index homepage
router.get('/', ctrlMain.indexView);

//export the router to be used by the app
module.exports = router;