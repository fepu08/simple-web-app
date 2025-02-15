const getRandomItems = require('../../../mock/items.js');
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

module.exports = { getAllItems, getItemById };
