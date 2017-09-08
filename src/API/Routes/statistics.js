var express = require('express');
var router = express.Router();
var statisticsController = require('../Controllers/statistics')

router.get("/outgoings", statisticsController.Outgoings);

module.exports = router;