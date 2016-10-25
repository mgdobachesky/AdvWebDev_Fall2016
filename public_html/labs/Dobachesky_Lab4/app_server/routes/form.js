//require express module
var express = require('express');
//set up express router
var router = express.Router();
//require the form controllers
var ctrlForm = require('../controllers/form');

//get form page
router.get('/', ctrlForm.formView);
//post form page
router.post('/', ctrlForm.formPost);

//export router for the app to use
module.exports = router;