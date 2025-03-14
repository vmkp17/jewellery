document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.getElementById("search-box");
    const suggestionsBox = document.getElementById("suggestions");
    const noResults = document.getElementById("no-results");
    const products = document.querySelectorAll(".product-card");
    const wishlistContainer = document.getElementById("wishlist-container");


    // Pre-trained Men's Gold Jewelry Keywords
    const jewelryKeywords = [
        "gold ring", "gold chain", "gold bracelet", "gold cufflinks", "gold watch",
        "gold pendant", "gold necklace", "gold earrings", "gold kada", "gold studs",
        "gold signet ring", "gold tie clip", "gold lapel pin", "gold brooch"
    ];

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

        suggestionsBox.innerHTML = suggestions.map(item => <li>${item}</li>).join("");
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