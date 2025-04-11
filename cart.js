// cart.js

// Load cart from localStorage or use an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItemsContainer = document.getElementById('cart-items');
const emptyCartMessage = document.getElementById('empty-cart');

// Save cart back to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Remove an item by index
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

// Render all cart items with remove buttons
function renderCart() {
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    emptyCartMessage.style.display = 'block';
    return;
  }

  emptyCartMessage.style.display = 'none';

  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');

    itemDiv.innerHTML = `
      <span>${item.name} - $${item.price}</span>
      <button data-index="${index}">Remove</button>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  // Attach remove button listeners
  const removeButtons = document.querySelectorAll('.cart-item button');
  removeButtons.forEach(button => {
    button.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'));
      removeItem(index);
    });
  });
}

// Initial render on page load
renderCart();
