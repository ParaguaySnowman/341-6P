const validator = require('../helpers/validate');

const saveTransaction = (req, res, next) => {
  const validationRule = {
    amount: 'required|string',
    date: 'required|string',
    merchant: 'required|string',
    category: 'required|string',
    description: 'required|string',
    account: 'required|string',
    taxRelated: 'required|string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveTransaction
};