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
            const headerHeight = 90;
            const targetPosition = targetSection.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    });
});

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

// ---  TYPING ANIMATION FIX ---
var typed = new Typed(".typing", {
    strings: ["Videographer", "Photographer", "Editor"],
    typeSpeed: 100, // Typing Speed
    backSpeed: 60,  // Erease Speed
    backDelay: 1000, // Wait Time
    loop: true
});
