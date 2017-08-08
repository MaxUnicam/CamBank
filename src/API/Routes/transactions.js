var express = require('express');
var router = express.Router();
var transactionsController = require('../Controllers/transactions')


router.get("/:id", transactionsController.Detail);

router.post("/transfers/add", transactionsController.AddTransfer);
router.post("/phonecharging/add", transactionsController.AddPhoneCharging);
router.post("/mav/add", transactionsController.AddMav);

router.get('/iban/:id', transactionsController.GetIbanTransactions);

module.exports = router;