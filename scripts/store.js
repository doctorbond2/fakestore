import Cart from './classes.js';
const customer_1 = new Cart();
import {
  fetchProducts,
  productsSorter,
  renderHTML,
  preciseSort,
  returnProduct,
  eventListeners,
  getProducts
} from './functions.js';


const products = await fetchProducts('https://fakestoreapi.com/products');
console.log(products);

renderHTML(products);
eventListeners(products);

preciseSort(products);









