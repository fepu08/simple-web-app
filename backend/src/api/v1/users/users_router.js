const express = require('express');
const router = express.Router();
const userController = require('./users_controller.js');

router.route('/').post(userController.registerUser);
router.route('/login').get(userController.loginUser);
router.route('/logout').get(userController.logoutUser);

module.exports = router;
