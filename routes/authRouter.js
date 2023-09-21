const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');

router.route('/signup').post(AuthController.register);
router.route('/login').post(AuthController.login);


module.exports = router;