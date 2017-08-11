var express = require('express');
var router = express.Router();
var authController = require('../Controllers/authenticate');

router.post("/", authController.Authenticate);
router.post("/register", authController.Register);

module.exports = router;