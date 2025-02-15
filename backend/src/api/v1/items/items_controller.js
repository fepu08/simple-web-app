const getRandomItems = require('../../../mock/items.js');

function getAllItems(req, res) {
  console.log('Getting all items...');
  const items = getRandomItems();
  res.json(...items);
}

module.exports = { getAllItems };
