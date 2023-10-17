import Cart from './components/cart.js';
import Products from './components/products.js';
const cart_1 = new Cart();
const products_1 = new Products(cart_1.cart);
import {
  loginEL
} from './components/event-handlers.js';

const products = await products_1.fetchProducts('https://fakestoreapi.com/products');
products_1.products = products;
let cart = cart_1.cart;
products_1.renderHTML(products);
loginEL();
products_1.getCategoriesForDropdown();
products_1.renderCategoryOptions();
cart_1.renderCart();
cart_1.checkoutEL();
products_1.sortBy(products);
products_1.sortEventListener();
products_1.resetButtonEventListener();











