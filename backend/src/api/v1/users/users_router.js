const express = require('express');
const router = express.Router();
const userController = require('./users_controller.js');

router.route('/').post(userController.registerUser);
router.route('/login').post(userController.loginUser);
router.route('/logout').post(userController.logoutUser);

module.exports = router;
