function placeOrder() {
    alert("🎉 Order placed successfully!");
    // You can redirect or perform other logic here
  }
  
  function cancelOrder() {
    if (confirm("Are you sure you want to cancel this order?")) {
      alert("Order cancelled.");
      // You can also redirect or update UI
    }
  }


  // Mock cart data (in real case, fetch this from backend)
const cartData = {
    price: 7992,
    discount: 6760,
    coupon: 64,
    platformFee: 3,
    delivery: 0, // 0 = FREE
  };
  
  // Load & calculate totals
  document.addEventListener("DOMContentLoaded", () => {
    const total = cartData.price - cartData.discount - cartData.coupon + cartData.platformFee + cartData.delivery;
  
    document.querySelector(".price-row:nth-child(2) span:last-child").innerText = `₹${cartData.price}`;
    document.querySelector(".discount span:last-child").innerText = `- ₹${cartData.discount}`;
    document.querySelector(".price-row:nth-child(4) span:last-child").innerText = `- ₹${cartData.coupon}`;
    document.querySelector(".price-row:nth-child(5) span:last-child").innerText = `₹${cartData.platformFee}`;
    document.querySelector(".price-row:nth-child(6) span:last-child").innerHTML =
      cartData.delivery === 0 ? '<s>₹160</s> <span class="free">FREE</span>' : `₹${cartData.delivery}`;
    document.querySelector(".total span:last-child").innerText = `₹${total}`;
    document.querySelector(".offer-msg").innerText = `🎉 You'll save ₹${cartData.discount + cartData.coupon} on this order!`;
  });
  
  // Handle place order
  function placeOrder() {
    const button = document.querySelector(".place-order-btn");
    button.disabled = true;
    button.innerText = "Placing...";
  
    // Animate success message
    setTimeout(() => {
      showToast("🎉 Order placed successfully!");
      button.innerText = "Order Placed ✅";
      button.style.backgroundColor = "#00ff88";
    }, 1000);
  }
  
  // Handle cancel
  function cancelOrder() {
    const confirmBox = confirm("Are you sure you want to cancel this order?");
    if (confirmBox) {
      showToast("❌ Order cancelled.");
      document.querySelector(".checkout-container").classList.add("fade-out");
      setTimeout(() => {
        document.querySelector(".checkout-container").remove();
      }, 1000);
    }
  }
  
  // Toast message system
  function showToast(message) {
    let toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.innerText = message;
    document.body.appendChild(toast);
  
    setTimeout(() => {
      toast.classList.add("show");
    }, 100);
  
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }
  