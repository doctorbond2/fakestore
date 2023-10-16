import Cart from './components/cart.js';
import Products from './components/products.js';
const cart_1 = new Cart();
const products_1 = new Products(cart_1.cart);
import {
  fetchProducts,
  productsSorter,
  preciseSort,
} from './functions.js';


const products = await products_1.fetchProducts('https://fakestoreapi.com/products');
products_1.products = products;
let cart = cart_1.cart;
console.log(cart);
console.log(products);

products_1.renderHTML(products);
products_1.getCategoriesForDropdown();
products_1.renderCategoryOptions();
cart_1.renderCart();
eventListeners(products);





function eventListeners(products) {

  // products.forEach((value, index) => {
  //   const newButton = document.querySelector(`.js-modal-button-${value.id}`);
  //   newButton.addEventListener('click', () => {
  //     products_1.renderModalContent(value.id);
  //   });
  // });

  const clearButton = document.querySelector('.clear-button');
  clearButton.addEventListener('click', () => {
    products_1.renderHTML(products);
  });
}











// console.log(products);
// console.log('asdasd')

// renderHTML(products);


// preciseSort(products);









