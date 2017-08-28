var express = require('express');
var router = express.Router();
var reportsController = require('../Controllers/reports')

router.get("/status", reportsController.StatusReport);
router.get("/:id", reportsController.TransactionReport);

module.exports = router;