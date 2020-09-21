// Menu toggle function. Toggle class active on nav elements
function toggleMenu() {
    var newHamburgerMenuEl = document.getElementById("hamburgerMenu");
    var newcloseMenuEl = document.getElementById("closeMenu");
    var newnavMenuEl = document.getElementById("navMenu");
    newHamburgerMenuEl.classList.toggle("active");
    newcloseMenuEl.classList.toggle("active");
    newnavMenuEl.classList.toggle("active");
}