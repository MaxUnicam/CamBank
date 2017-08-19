var express = require('express');
var router = express.Router();
var transactionsController = require('../Controllers/transactions')


router.get("/:id", transactionsController.Detail);

router.post("/add/transfer", transactionsController.AddTransfer);
router.post("/add/phonecharging", transactionsController.AddPhoneCharging);
router.post("/add/mav", transactionsController.AddMav);

router.get('/', transactionsController.GetIbanTransactions);

module.exports = router;