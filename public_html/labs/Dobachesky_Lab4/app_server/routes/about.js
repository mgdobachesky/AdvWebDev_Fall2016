//require express module
var express = require('express');
//set up express router
var router = express.Router();
//require the controller for about
var ctrlAbout = require('../controllers/about');

//get about page controller function
router.get('/', ctrlAbout.aboutView);

//export the module for the app to use
module.exports = router;