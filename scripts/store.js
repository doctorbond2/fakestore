import Cart from './components/cart.js';
import Products from './components/products.js';
const cart_1 = new Cart();
const products_1 = new Products();
import {
  fetchProducts,
  productsSorter,
  preciseSort,
} from './functions.js';


const products = await products_1.fetchProducts('https://fakestoreapi.com/products');
products_1.products = products;

products_1.renderHTML(products);
products_1.getCategories();
products_1.renderCategoryOptions();

eventListeners(products);

cart_1.readFromLocalStorage();
cart_1.renderCart();



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









