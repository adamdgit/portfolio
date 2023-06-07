// get current wishlist items
const wishlistItems = localStorage.getItem("wishlist") !== null ? JSON.parse(localStorage.getItem("wishlist")) : [];

const wishlist = document.querySelector(".wishlist-items");

const items = [];

// create html string with product info, save to array
wishlistItems.forEach(item => {
	items.push(
  `<div class="product-info">
    <p class="product-name">${item.name}</p>
    <img src=${item.src} alt="TipToe Clancy Blue Shoe"/>
    <p class="desc">${item.description}</p>
    <p class="price">${item.price}</p>
    <p>Shoe Size: ${item.size}</p>
  </div>`)
})

// update wishlist innerHTML with html strings in items array
items.forEach(item => {
	wishlist.innerHTML += item;
})