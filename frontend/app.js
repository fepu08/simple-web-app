class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint) {
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`);
      if (!res.ok) {
        throw new Error(`Error fetching ${endpoint}: ${res.statusText}`);
      }
      return await res.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

function createTextFromItemObj(item) {
  const parts = [];
  Object.entries(item).forEach(([key, value]) => {
    parts.push(`${key}: ${value}`);
  });

  return parts.join(', ');
}

function renderItems(container, items) {
  if (!items || items.length === 0) {
    container.innerHTML = `<h2>No items to show</h2>`;
    return;
  }

  const itemsList = document.createElement('ul');
  items.forEach((item) => {
    const outerListItem = document.createElement('li');
    const innerList = document.createElement('ul');

    Object.entries(item).forEach(([key, value]) => {
      const innerListItem = document.createElement('li');
      innerListItem.innerText = `${key} - ${value}`;
      innerList.appendChild(innerListItem);
    });

    outerListItem.appendChild(innerList);
    itemsList.appendChild(outerListItem);
  });

  container.appendChild(itemsList);
}

(async function () {
  const apiBaseUrl = 'http://localhost:3000';
  const itemsContainer = document.getElementById('items-container');
  const apiClient = new ApiClient(apiBaseUrl);

  const items = await apiClient.get('/items');
  renderItems(itemsContainer, items);
})();
