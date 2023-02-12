const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const createTransaction = async (req, res) => {
  const transaction = {
    amount: req.body.amount,
    date: req.body.date,
    merchant: req.body.merchant,
    category: req.body.category,
    description: req.body.description,
    account: req.body.account,
    taxRelated: req.body.taxRelated
  };
  const response = await mongodb.getDb().db().collection('transactions').insertOne(transaction);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the transaction.');
  }
};

const findTransactionById = async (req, res) => {
  const transactionId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('transactions').find({ _id: transactionId });
  result.toArray().then((lists) => {
    if (lists.length === 0) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const updateTransaction = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid transaction id to update a transaction.');
  }
  const transactionId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const transaction = {
    amount: req.body.amount,
    date: req.body.date,
    merchant: req.body.merchant,
    category: req.body.category,
    description: req.body.description,
    account: req.body.account,
    taxRelated: req.body.taxRelated
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('transactions')
    .replaceOne({ _id: transactionId }, transaction);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the transaction.');
  }
};

const deleteTransaction = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid transaction id to delete a transaction.');
  }
  const transactionId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('transactions').deleteOne({ _id: transactionId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the transaction.');
  }
};

module.exports = {
  findTransactionById, 
  createTransaction, 
  updateTransaction,
  deleteTransaction
}