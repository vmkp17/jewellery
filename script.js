document.addEventListener("DOMContentLoaded", () => { 

    // Smooth Page Transitions (Fade-Out Effect)
    document.body.style.opacity = 1;
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            let target = event.target.getAttribute("href");
            if (target) {
                document.body.style.opacity = 0;
                setTimeout(() => {
                    window.location.href = target;
                }, 500);
            }
        });
    });

    // Scrolling Jewelry Showcase (Pause on Hover)
    const scrollingContainer = document.querySelector(".scrolling-images");
    scrollingContainer.addEventListener("mouseenter", () => {
        scrollingContainer.style.animationPlayState = "paused";
    });
    scrollingContainer.addEventListener("mouseleave", () => {
        scrollingContainer.style.animationPlayState = "running";
    });

    // Scroll Reveal for Product Sections (Fade-In Effect)
    const fadeElements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    fadeElements.forEach(element => observer.observe(element));

    // Luxury Hover Animation for Buttons
    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.style.transform = "scale(1.1)";
            button.style.boxShadow = "0px 0px 20px rgba(255, 215, 0, 0.8)";
        });
        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
            button.style.boxShadow = "none";
        });
    });

});
