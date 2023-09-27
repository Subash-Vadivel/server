const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactionController');

router.route('/log').post(transactionController.log);
router.route('/:id').get(transactionController.uploads);
router.route('/addblock').post(transactionController.addBlock);



module.exports = router;