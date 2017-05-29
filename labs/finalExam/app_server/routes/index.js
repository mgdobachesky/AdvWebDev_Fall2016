var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');

router.all('/', ctrlHome.home);
router.get('/add', ctrlHome.formView);
router.post('/add', ctrlHome.formPost);

module.exports = router;
