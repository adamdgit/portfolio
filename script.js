const mobile_menu_btn = document.querySelector('.mobile-dropdown-toggle');
const navbar = document.querySelector('.navbar');

mobile_menu_btn.addEventListener('pointerdown', () => {
  navbar.classList.toggle("show");
});