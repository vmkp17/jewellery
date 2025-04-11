// cart.js

// Load cart from localStorage or use an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItemsContainer = document.getElementById('cart-items');
const emptyCartMessage = document.getElementById('empty-cart');

// Save updated cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Remove item by index
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

// Render the cart items
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
      <div class="cart-item-left">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <span>${item.name} - $${item.price}</span>
      </div>
      <button data-index="${index}">Remove</button>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  // Add remove button functionality
  const removeButtons = document.querySelectorAll('.cart-item button');
  removeButtons.forEach(button => {
    button.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'));
      removeItem(index);
    });
  });
}

// Initial render
renderCart();
