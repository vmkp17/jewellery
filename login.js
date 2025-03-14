document.addEventListener("DOMContentLoaded", () => {
    // Show login popup when Add to Cart is clicked
    window.showLoginPopup = function (productId, name, price, image) {
        localStorage.setItem("pendingProduct", JSON.stringify({ productId, name, price, image }));
        document.getElementById("loginPopup").style.display = "flex";
    };

    // Submit login details
    window.submitLogin = function () {
        const userName = document.getElementById("userName").value;
        const userPhone = document.getElementById("userPhone").value;
        const userEmail = document.getElementById("userEmail").value;

        if (userName && userPhone && userEmail) {
            localStorage.setItem("userDetails", JSON.stringify({ userName, userPhone, userEmail }));
            alert("Login successful! You can now add items to the cart.");
            document.getElementById("loginPopup").style.display = "none";
            addToCart();
        } else {
            alert("Please fill in all details.");
        }
    };

    // Close Login Popup
    window.closeLogin = function () {
        document.getElementById("loginPopup").style.display = "none";
    };

    // Add to Cart Function
    window.addToCart = function () {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const product = JSON.parse(localStorage.getItem("pendingProduct"));

        if (!userDetails) {
            alert("Please log in first.");
            return;
        }

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        alert(`${product.name} added to cart!`);
    };
});
