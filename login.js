function checkLoginBeforeCart(productName, price) {
    let isLoggedIn = localStorage.getItem("loggedInUser"); // Check if user is logged in

    if (!isLoggedIn) {
        alert("Please log in to continue.");
        window.location.href = "login.html"; // Redirect to login page
    } else {
        addToCart(productName, price);
    }
}

function addToCart(productName, price) {
    alert(`${productName} added to cart for ₹${price}`);
    // Your cart logic here
}
