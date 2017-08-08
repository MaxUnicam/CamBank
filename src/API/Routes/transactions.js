var express = require('express');
var router = express.Router();
var transactionsController = require('../Controllers/transactions')


router.get("/:id", transactionsController.Detail);

router.post("/add", transactionsController.Create);

router.get('/iban/:id', transactionsController.GetIbanTransactions);

router.get('/report/:id', transactionsController.GetTransactionsReport);


// router.put("/update/:id", usersController.Update);
// router.delete("/delete/:id", usersController.Delete);

module.exports = router;