//Node Modules
const express = require('express');
const router = express.Router();

//Middlewares
const validation = require('../middleware/validate');

//Controllers
const transactionController = require('../controllers/transaction');

router.get('/:id', transactionController.findTransactionById);

router.post('/', validation.saveTransaction, transactionController.createTransaction);

router.put('/:id', validation.saveTransaction, transactionController.updateTransaction);

router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;