const mobile_menu_btn = document.querySelector('.mobile-dropdown-toggle');
const navbar = document.querySelector('.navbar');

mobile_menu_btn.addEventListener('click', () => {
  navbar.classList.toggle("show");
});