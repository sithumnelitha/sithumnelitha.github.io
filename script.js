// TAB BUTTON FUNCTION
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(btn => btn.classList.remove("active"));
        contents.forEach(content => content.classList.remove("active"));
        tab.classList.add("active");

        const target = tab.getAttribute("data-tab");
        document.getElementById(target).classList.add("active");
    });
});

// SMOOTH SCROLL NAVIGATION
const navLinks = document.querySelectorAll("header nav a");

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        if (link.hash !== "") {
            e.preventDefault();

            const targetId = link.hash;
            const targetSection = document.querySelector(targetId);
            const headerHeight = 80;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    });
});

// MOBILE MENU TOGGLE
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// TYPING ANIMATION
var typed = new Typed(".typing", {
    strings: ["Videographer", "Photographer", "Editor", "Content Creator"],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1000,
    loop: true
});

// --- ADVANCED SCROLL REVEAL ANIMATION SYSTEM ---
// Animate elements when scrolling through the website
const observerOptions = {
    root: null,
    threshold: 0.15, // Animation starts when 15% of the element becomes visible
    rootMargin: "0px 0px -50px 0px"
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");

            // Remove the line below if you want the animation to happen only once
        } else {
            // Re-animate when the user scrolls back up
            entry.target.classList.remove("show");
        }
    });
}, observerOptions);

// Select all elements that need animation and observe them
document.querySelectorAll(".scroll-animate").forEach(el => {
    scrollObserver.observe(el);
});


// SECURITY FIXES (Optional - Keep disabled if you need it for testing)
document.addEventListener('contextmenu', (e) => e.preventDefault());

document.onkeydown = function(e) {
    if (e.keyCode == 123) return false;

    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;

    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;

    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;

    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
};


// --- COUNTER ANIMATION LOGIC ---
// Animated number counter from 0 to target value
document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Lower value = faster animation

    const animateCounter = (counter) => {

        const updateCount = () => {

            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            // Increase value in small steps
            const increment = Math.ceil(target / speed);

            if (count < target) {
                counter.innerText = count + increment;
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    };

    // Trigger animation when element becomes visible during scroll
    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                animateCounter(entry.target);

                // Stop observing after animation runs once
                counterObserver.unobserve(entry.target);
            }
        });

    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
});


// --- RADIAL MENU INTERACTION LOGIC ---
document.addEventListener("DOMContentLoaded", () => {

    const radialMenu = document.getElementById("radialMenu");
    const menuToggle = document.querySelector(".menu-toggle");
    const toggleIcon = document.querySelector(".menu-toggle i");

    if (menuToggle && radialMenu && toggleIcon) {

        // Open and close menu on click
        menuToggle.addEventListener("click", (e) => {

            e.stopPropagation();
            radialMenu.classList.toggle("active");

            // Change center icon into close icon when menu is active
            if (radialMenu.classList.contains("active")) {

                toggleIcon.className = "bx bx-x";
                toggleIcon.style.color = "#ff1d15";

            } else {

                // Restore original color when menu closes
                toggleIcon.style.color = "";
            }
        });

        // Close menu when clicking outside
        document.addEventListener("click", () => {

            radialMenu.classList.remove("active");
            toggleIcon.style.color = "";
        });

        // --- AUTOMATIC LOGO CHANGER (FOR YOUR LINKS ONLY) ---
        // Social media logos with their original brand colors
        const brandLogos = [
            { icon: "bxl-behance", color: "#1769ff" },
            { icon: "bxl-github", color: "#ffffff" },
            { icon: "bxl-linkedin-square", color: "#0077b5" },
            { icon: "bxl-whatsapp", color: "#25d366" }
        ];

        let logoIndex = 0;

        setInterval(() => {

            // Run only when menu is closed
            if (!radialMenu.classList.contains("active")) {

                toggleIcon.style.opacity = "0";
                toggleIcon.style.transform = "scale(0.5) rotate(-90deg)";

                setTimeout(() => {

                    // Switch to next logo and color
                    toggleIcon.className = "bx " + brandLogos[logoIndex].icon;
                    toggleIcon.style.color = brandLogos[logoIndex].color;

                    toggleIcon.style.opacity = "1";
                    toggleIcon.style.transform = "scale(1) rotate(0deg)";

                    logoIndex = (logoIndex + 1) % brandLogos.length;

                }, 300);
            }

        }, 3000); // Change logo every 3 seconds smoothly
    }
});






