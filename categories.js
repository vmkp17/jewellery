document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".category-item");

    // Fade-in effect on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));
});

// Open Jewelry Details Page
function openDetails(category) {
    window.location.href = `${category}-details.html`;
}
