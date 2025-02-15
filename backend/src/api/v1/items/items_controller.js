const getRandomItems = require('../../../mock/items.js');
const { v4: uuidv4 } = require('uuid');
const items = getRandomItems();

function getAllItems(req, res) {
  console.log('Getting all items...');
  res.json([...items]);
}

function getItemById(req, res) {
  console.log(`Getting item by ID: ${req.params.id}`);
  if (!req.params.id) {
    res.status(400).json({ msg: 'No ID provided' });
    return;
  }
  const item = items.find((item) => item.id === req.params.id);
  if (!item) {
    res.status(404).json({ msg: 'No items found' });
    return;
  }
  res.json(item);
}

function addItem(req, res) {
  console.log('Adding new item...');
  const item = req.body;
  // TODO: add validation
  item.id = uuidv4();
  items.push(item);
  res.location(`/items/${item.id}`);
  res.send(200);
}

function deleteItem(req, res) {
  console.log(`Deleting item by ID: ${req.params.id}`);
  const index = items.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ msg: 'No item found with the provided ID' });
    return;
  }

  items.splice(index, 1);
  res.status(204).send();
}

module.exports = { getAllItems, getItemById, addItem, deleteItem };
