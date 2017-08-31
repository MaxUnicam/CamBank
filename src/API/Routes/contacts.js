var express = require('express');
var router = express.Router();
var contactsController = require('../Controllers/contacts')

router.get("/", contactsController.List);
router.get("/:iban", contactsController.Detail);
router.post("/add", contactsController.Add);
router.put("/update/:iban", contactsController.Update);
router.delete("/delete/:iban", contactsController.Delete);

module.exports = router;