const express = require('express');
const itemsController = require('./items_controller.js');
const router = express.Router();

router
  .route('/')
  .get(itemsController.getAllItems)
  .post(itemsController.addItem);
router
  .route('/:id')
  .get(itemsController.getItemById)
  .delete(itemsController.deleteItem);

module.exports = router;
