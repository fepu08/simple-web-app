const express = require('express');
const itemsController = require('./items_controller.js');
const router = express.Router();

router.get('/', itemsController.getAllItems);

module.exports = router;
