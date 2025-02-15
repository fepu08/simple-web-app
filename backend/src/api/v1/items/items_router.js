const express = require('express');
const itemsController = require('./items_controller.js');
const router = express.Router();

router.route('/').get(itemsController.getAllItems).post();
router.route('/:id').get(itemsController.getItemById);

module.exports = router;
