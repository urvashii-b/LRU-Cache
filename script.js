let cache = new LRUCache(3); // Initial capacity is 3

function put() {
    const keyInput = document.getElementById('keyInput');
    const valueInput = document.getElementById('valueInput');
    const capacityInput = document.getElementById('capacityInput');
    const key = parseInt(keyInput.value);
    const value = parseInt(valueInput.value);
    const capacity = parseInt(capacityInput.value);
    
    if (!isNaN(key) && !isNaN(value) && !isNaN(capacity)) {
        cache = new LRUCache(capacity); // Update capacity if changed
        cache.put(key, value);
        displayCache();
        showNotification(`{${key}, ${value}} added to cache.`);
        displayKeyValue(key, value); // Display the new key-value pair
    } else {
        alert('Please enter valid key, value, and capacity.');
    }
    
    keyInput.value = '';
    valueInput.value = '';
}

function get() {
    const keyInput = document.getElementById('keyInput');
    const key = parseInt(keyInput.value);
    
    if (!isNaN(key)) {
        const value = cache.get(key);
        if (value !== -1) {
            showNotification(`Value for key ${key}: ${value}`);
        } else {
            showNotification(`Key ${key} not found in cache.`);
        }
        displayCache();
    } else {
        alert('Please enter a valid key.');
    }
    
    keyInput.value = '';
}

function displayCache() {
    let cacheContent = '';
    for (const [key, node] of Object.entries(cache.m)) {
        cacheContent += `<div class="output-item">Key: ${key}, Value: ${node.val}</div>`;
    }
    document.getElementById('output').innerHTML += cacheContent;
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerHTML = message;
    setTimeout(() => {
        notification.innerHTML = '';
    }, 2000); // Hide notification after 2 seconds
}

function displayKeyValue(key, value) {
    const outputDiv = document.getElementById('output');
    const newItem = document.createElement('div');
    newItem.className = 'output-item';
    newItem.textContent = `Key: ${key}, Value: ${value}`;
    outputDiv.appendChild(newItem);
}

