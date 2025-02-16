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

  const itemContainer = document.getElementById('items-container');
  const itemRow = document.createElement('div');
  itemRow.classList.add('items-row');
  for (let i = 0; i < items.length; i++) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.innerHTML = `
			<div class="item-header">
				<h2 class="item-name">${items[i].name}</h2>
				<h2 class="item-price">$${items[i].price}</h2>
			</div>
			<p class="item-description">
			${items[i].description}
			</p>
			<p class="category">#${items[i].category.toLowerCase()}</p>
		`;
    itemRow.appendChild(itemDiv);
  }
  itemContainer.appendChild(itemRow);
  container.appendChild(itemContainer);
}

(async function () {
  const apiBaseUrl = 'http://localhost:3000';
  const itemsContainer = document.getElementById('items-container');
  const apiClient = new ApiClient(apiBaseUrl);

  const items = await apiClient.get('/items');
  renderItems(itemsContainer, items);
})();
