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

// --- ANIMATED NAVIGATION (click + scroll spy) ---
const navigation = document.querySelector(".navigation");
const navItems = document.querySelectorAll(".navigation .list");
const navSections = Array.from(navItems).map(item =>
    document.querySelector(item.querySelector("a").getAttribute("href"))
);

const HEADER_HEIGHT = 80;
let isClickScrolling = false;
let unlockTimer;

// Move the active item + sliding indicator
function setActive(index) {
    navItems.forEach((item, i) => item.classList.toggle("active", i === index));
    navigation.style.setProperty("--active-index", index);
}

// Click on a navigation item -> smooth scroll to the section
navItems.forEach((item, index) => {
    item.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault();

        const section = navSections[index];
        if (!section) return;

        // Pause scroll-spy while the smooth scroll is running
        isClickScrolling = true;
        clearTimeout(unlockTimer);
        unlockTimer = setTimeout(() => { isClickScrolling = false; }, 1000);

        setActive(index);

        const top = section.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
        window.scrollTo({ top: top, behavior: "smooth" });
    });
});

// Scroll spy -> highlight the section currently in view
function updateActiveOnScroll() {
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    let current = 0;

    navSections.forEach((section, i) => {
        if (!section) return;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        if (sectionTop <= scrollPos) current = i;
    });

    // At the very bottom of the page -> last item (Contact)
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) {
        current = navSections.length - 1;
    }

    setActive(current);
}

let ticking = false;
window.addEventListener("scroll", () => {
    if (isClickScrolling) {
        // Unlock shortly after the smooth scroll finishes
        clearTimeout(unlockTimer);
        unlockTimer = setTimeout(() => { isClickScrolling = false; }, 150);
        return;
    }
    if (!ticking) {
        requestAnimationFrame(() => {
            updateActiveOnScroll();
            ticking = false;
        });
        ticking = true;
    }
});

updateActiveOnScroll();

// TYPING ANIMATION
if (typeof Typed !== "undefined") {
    var typed = new Typed(".typing", {
        strings: ["Videographer", "Photographer", "Editor", "Content Creator"],
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 1000,
        loop: true
    });
}

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

// --- FLY BUTTONS (Resume Download / Review Project / Hire Me) ---
// Click -> letters fly into the icon -> button shrinks to a circle
// -> loading ring -> button expands -> letters return -> action runs
document.addEventListener("DOMContentLoaded", () => {

    const flyButtons = document.querySelectorAll(".fly-btn");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const OFFSET = 80; // fixed header height (same as the navigation)

    // Build icon + one <span> per letter
    flyButtons.forEach(btn => {
        const label = btn.textContent.trim();
        const iconClass = btn.dataset.icon || "bx-right-arrow-alt";

        btn.setAttribute("aria-label", label);
        btn.textContent = "";

        const icon = document.createElement("span");
        icon.className = "fly-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.innerHTML = '<i class="bx ' + iconClass + '"></i>';

        const text = document.createElement("span");
        text.className = "fly-text";
        text.setAttribute("aria-hidden", "true");

        Array.from(label).forEach((ch, i) => {
            const letter = document.createElement("span");
            letter.className = "fly-letter";
            letter.textContent = ch === " " ? "\u00A0" : ch;
            letter.style.setProperty("--i", i);
            text.appendChild(letter);
        });

        btn.append(icon, text);
    });

    // Measure how far each letter has to travel to reach the icon
    function measureLetters(btn) {
        const icon = btn.querySelector(".fly-icon");
        const iconX = icon.offsetLeft + icon.offsetWidth / 2;

        btn.querySelectorAll(".fly-letter").forEach(letter => {
            const letterX = letter.offsetLeft + letter.offsetWidth / 2;
            const spin = (Math.random() < 0.5 ? -1 : 1) * (180 + Math.random() * 180);
            letter.style.setProperty("--fly-dist", (letterX - iconX) + "px");
            letter.style.setProperty("--rot", spin + "deg");
        });
    }

    // What the button really does after the animation
    function runAction(btn) {
        const href = btn.getAttribute("href");
        if (!href || href === "#") return;

        // Hire Me -> smooth scroll to the contact form
        if (href.startsWith("#")) {
            const target = document.querySelector(href);
            if (target) {
                const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
                window.scrollTo({ top: top, behavior: "smooth" });
            }
            return;
        }

        // Resume Download -> start the file download
        if (btn.hasAttribute("download")) {
            const a = document.createElement("a");
            a.href = href;
            a.download = btn.getAttribute("download") || "";
            document.body.appendChild(a);
            a.click();
            a.remove();
            return;
        }

        // Review Project -> open the project page
        if (btn.target === "_blank") {
            const win = window.open(href, "_blank");
            if (win) { win.opener = null; } else { window.location.href = href; } // popup blocked -> same tab
            return;
        }

        window.location.href = href;
    }

    function play(btn) {
        const letters = btn.querySelectorAll(".fly-letter").length;
        const startW = btn.offsetWidth;
        const circleW = btn.offsetHeight;

        const stepOut = Math.min(55, 650 / letters);
        const stepIn = Math.min(45, 500 / letters);
        const flyMs = (letters - 1) * stepOut + 500;

        btn.style.setProperty("--step-out", stepOut + "ms");
        btn.style.setProperty("--step-in", stepIn + "ms");
        btn.style.setProperty("--fly-ms", flyMs + "ms");

        btn.classList.add("is-busy");
        btn.style.width = startW + "px"; // freeze the width so it can animate
        measureLetters(btn);

        // 1) letters fly into the icon
        btn.classList.add("is-fly");

        // 2) shrink into a circle
        const tCircle = flyMs + 80;
        setTimeout(() => {
            btn.classList.add("is-circle");
            btn.style.width = circleW + "px";
        }, tCircle);

        // 3) loading rings
        const tLoad = tCircle + 600;
        setTimeout(() => btn.classList.add("is-loading"), tLoad);

        // 4) expand again, letters come back, run the real action
        const tExpand = tLoad + 1300;
        setTimeout(() => {
            btn.classList.remove("is-loading", "is-circle", "is-fly");
            btn.style.width = startW + "px";
            runAction(btn);
        }, tExpand);

        // 5) clean up
        setTimeout(() => {
            btn.classList.remove("is-busy");
            btn.style.width = "";
        }, tExpand + 250 + (letters - 1) * stepIn + 600);
    }

    flyButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            if (btn.classList.contains("is-busy")) return;

            if (reduceMotion) { runAction(btn); return; }
            play(btn);
        });
    });
});
