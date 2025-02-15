const { faker } = require('@faker-js/faker');
/** @import { RandomItem } from './types.js' */

/**
 * Generates random item
 * @returns {RandomItem} A randomly generated item.
 */
function createRandomItem() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    imageUrl: faker.image.url(),
  };
}

/**
 *
 * @param {number} [count=10] - The number of random items to generate.
 * @returns {RandomItem[]} An array of objects containing randomly generated item details.
 */
function generateRandomItems(count = 10) {
  return faker.helpers.multiple(createRandomItem, {
    count,
  });
}

function generateRandomItemsCached(count = 10) {
  let items = [];
  return function () {
    if (items.length > 0) return items;
    items = generateRandomItems(count);
    return items;
  };
}

const getRandomItems = generateRandomItemsCached();

module.exports = getRandomItems;
