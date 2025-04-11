document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is already logged in
    let isLoggedIn = localStorage.getItem("loggedInUser");


});

// Handle login form submission
function handleLogin(event) {
    event.preventDefault(); // Prevent form submission

    // Get user data from the form
    const userName = document.getElementById("userName").value;
    const userPhone = document.getElementById("userPhone").value;
    const userEmail = document.getElementById("userEmail").value;

    // Store user information in local storage
    localStorage.setItem("loggedInUser", JSON.stringify({ userName, userPhone, userEmail }));

    // Alert the user about successful login
    alert("Login Successful. Welcome to the Luxury Jewelry Store!");

    // Redirect to the product page
    window.location.href = "checkout.html"; // Adjust this to your product page URL
}

// Close the login popup
function closeLogin() {
    window.location.href = "checkout.html"; // Redirect to the product page if the login is closed without logging in
}
