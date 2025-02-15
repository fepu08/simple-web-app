const express = require('express');
const itemsController = require('./items_controller.js');
const router = express.Router();

router.get('/', itemsController.getAllItems);
router.get('/:id', itemsController.getItemById);

module.exports = router;
