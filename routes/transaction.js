const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactionController');

router.route('/log').post(transactionController.log);
router.route('/:id').get(transactionController.uploads);



module.exports = router;