document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.getElementById("search-box");
    const suggestionsBox = document.getElementById("suggestions");
    const noResults = document.getElementById("no-results");
    const products = document.querySelectorAll(".product-card");
    const wishlistContainer = document.getElementById("wishlist-container");
    // Pre-trained Jewelry Keywords
    const jewelryKeywords = ["ring", "bracelet", "earrings", "necklace", "pendant", "gold chain", "bangle", "watch", "Tiger's Eye Ring","Lapis Lazuli Bracelet","Ruby Pendant","Emerald Cufflinks","Smoky Quartz Ring",
        "Amethyst Chain","Peridot Bracelet","Citrine Pendant","Zircon Cufflinks","Garnet Ring"];

    // Live search function
    searchBox.addEventListener("keyup", () => {
        let searchValue = searchBox.value.toLowerCase().trim();
        let found = false;

        // Show autocomplete suggestions
        let matchedSuggestions = jewelryKeywords.filter(item => item.includes(searchValue));
        showSuggestions(matchedSuggestions);

        products.forEach(product => {
            let productName = product.querySelector("h3").textContent.toLowerCase();
            
            if (productName.includes(searchValue)) {
                product.style.display = "block";
                product.classList.add("highlight");
                found = true;
            } else {
                product.style.display = "none";
                product.classList.remove("highlight");
            }
        });

        // Show "No results found" if no match
        noResults.style.display = found ? "none" : "block";

        // If search is cleared, show all items
        if (searchValue === "") {
            showAllProducts();
            suggestionsBox.style.display = "none";
        }
    });

    // Function to show autocomplete suggestions
    function showSuggestions(suggestions) {
        if (suggestions.length === 0) {
            suggestionsBox.style.display = "none";
            return;
        }

        suggestionsBox.innerHTML = suggestions.map(item => `<li>${item}</li>`).join("");
        suggestionsBox.style.display = "block";

        // Click on suggestion to autofill search box
        document.querySelectorAll(".suggestions li").forEach(item => {
            item.addEventListener("click", () => {
                searchBox.value = item.textContent;
                suggestionsBox.style.display = "none";
                searchBox.dispatchEvent(new Event("keyup")); // Trigger search
            });
        });
    }

    // Function to show all products
    function showAllProducts() {
        products.forEach(product => {
            product.style.display = "block";
            product.classList.remove("highlight");
        });
        noResults.style.display = "none";
    }
});

 {


    function updateWishlistUI() {
        wishlistContainer.innerHTML = "";
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        if (wishlist.length === 0) {
            wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
        } else {
            wishlist.forEach(item => {
                wishlistContainer.innerHTML += `
                    <div class="wishlist-item">
                        <img src="${item.image}" alt="${item.name}">
                        <p>${item.name} - $${item.price}</p>
                    </div>
                `;
            });
        }
    }

    window.addToWishlist = function (name, image, price) {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        if (!wishlist.some(item => item.name === name)) {
            wishlist.push({ name, image, price });
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            updateWishlistUI();
        }
    };

    window.shareProduct = function (name, image) {
        if (navigator.share) {
            navigator.share({
                title: name,
                text: `Check out this amazing ${name}!`,
                url: window.location.href
            }).catch(console.error);
        } else {
            alert("Sharing not supported on this browser.");
        }
    };

    updateWishlistUI();
}
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
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Optional: prevent duplicates
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} has been added to your cart!`);
}
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    const isLoggedIn = localStorage.getItem("loggedInUser");

    if (isLoggedIn) {
        loginBtn.textContent = "Logged In";
        loginBtn.href = "#";
        loginBtn.style.pointerEvents = "none";
        loginBtn.style.opacity = "0.6";
        loginBtn.title = "You are already logged in";
    }
});

