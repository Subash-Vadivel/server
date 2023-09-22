const express = require('express');
const router = express.Router();

const certificateController = require('../controllers/certificateController');

router.route('/add').post(certificateController.addCertificate);
router.route('/:id').get(certificateController.getCertificate);



module.exports = router;