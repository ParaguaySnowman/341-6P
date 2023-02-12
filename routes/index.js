const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/transaction', require('./transaction'));

module.exports = router;