let menuIcon = document.querySelector('#menu-icon');
let menuSymbol = menuIcon.querySelector('i');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');

    let isOpen = navbar.classList.toggle('active');

    menuIcon.setAttribute('aria-expanded', isOpen);
    menuIcon.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');

};