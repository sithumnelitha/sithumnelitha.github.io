// TAB BUTTON FUNCTION
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        // remove active class
        tabs.forEach(btn => btn.classList.remove("active"));
        contents.forEach(content => content.classList.remove("active"));

        // add active class to clicked tab
        tab.classList.add("active");

        // show correct content
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

            // header height adjust
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
    // Toggles the hamburger icon to an 'X' icon
    menuIcon.classList.toggle('bx-x');
    // Shows or hides the navbar menu
    navbar.classList.toggle('active');
};

// Automatically hides the menu when you scroll
window.onscroll = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};