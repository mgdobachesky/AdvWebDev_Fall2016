//require express module
var express = require('express');
//set the router of the express module
var router = express.Router();
//require the controller script that this page routes to
var ctrlIndex = require('../controllers/index');

//set up routing to controller
router.all('/', ctrlIndex.index);
router.all('/index', ctrlIndex.index);
router.all('/update/:id?', ctrlIndex.update);
router.all('/view/:id?', ctrlIndex.view);

//export the router to be used by the app
module.exports = router;