var express = require('express');
var router = express.Router();
var utilsController = require('../Controllers/utils')

router.get("/userIban", utilsController.UserIban);

router.get("/operators", utilsController.Operators);

module.exports = router;