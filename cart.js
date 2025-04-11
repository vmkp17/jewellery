// Load cart items dynamically (from localStorage)
document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  const emptyCart = document.getElementById("empty-cart");

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartItems.length === 0) {
    emptyCart.style.display = "block";
  } else {
    emptyCart.style.display = "none";
    cartItems.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      itemDiv.innerHTML = `
        <img src="${item.image}" width="50" style="vertical-align: middle; border-radius: 5px;" />
        <strong>${item.name}</strong> - $${item.price}
        <button onclick="removeItem(${index})" style="float: right; background-color: gold; color: black; border: none; padding: 5px 10px; border-radius: 5px;">Remove</button>
      `;
      cartContainer.appendChild(itemDiv);
    });
  }
});

function removeItem(index) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  window.location.reload();
}


function handleBuyNow() {
  const user = localStorage.getItem("loggedInUser");

  if (!user) {
    const msg = document.getElementById("loginMsg");
    msg.classList.add("show");

    // Optionally, disable button while redirecting
    const btn = document.querySelector(".buy-now-btn");
    btn.disabled = true;
    btn.style.opacity = 0.6;
    btn.innerText = "Redirecting to Login...";

    // Redirect after short delay
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2500);
  } else {
    window.location.href = "login.html";
  }
}

