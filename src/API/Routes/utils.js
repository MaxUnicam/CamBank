var express = require('express');
var router = express.Router();
var utilsController = require('../Controllers/utils')

router.get("/userIban", utilsController.UserIban);
router.get("/user/detail", utilsController.UserDetail);
router.put("/user/edit", utilsController.EditProfile);

router.get("/operators", utilsController.Operators);

module.exports = router;