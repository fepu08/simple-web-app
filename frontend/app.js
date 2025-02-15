class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getItems() {
    const res = await fetch(this.baseUrl + '/items');
    if (!res.ok) {
      console.error('Something went wrong...');
    }
    return res.json();
  }
}

function createTextFromItemObj(item) {
  const parts = [];
  Object.entries(item).forEach(([key, value]) => {
    parts.push(`${key}: ${value}`);
  });

  return parts.join(', ');
}

(async function () {
  const apiBaseUrl = 'http://localhost:3000';
  const itemsContainer = document.getElementById('items-container');
  const apiClient = new ApiClient(apiBaseUrl);
  const items = await apiClient.getItems();

  if (!items || items.length < 1) {
    const error = document.createElement('h2');
    error.innerText = 'No items to show';
    itemsContainer.appendChild(error);
  }

  const itemsList = document.createElement('ul');
  for (let i = 0; i < items.length; i++) {
    const outerListItem = document.createElement('li');
    const innerList = document.createElement('ul');
    outerListItem.appendChild(innerList);

    Object.entries(items[i]).forEach(([key, value]) => {
      const innerListItem = document.createElement('li');
      innerListItem.innerText = `${key} - ${value}`;
      innerList.appendChild(innerListItem);
    });

    itemsList.appendChild(outerListItem);
  }
  itemsContainer.appendChild(itemsList);
})();
