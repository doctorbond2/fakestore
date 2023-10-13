import Cart from './classes.js';

const customer_1 = new Cart();

import {fetchProducts, productsSorter, renderFunc, preciseSort, returnProduct, eventListeners, getProducts} from './functions.js';

await renderFunc(true);

eventListeners();

const test = await getProducts('https://fakestoreapi.com/products')
test.forEach((value, index) => {
  const newButton = document.querySelector(`.js-modal-button-${value}`);
console.log(newButton);
newButton.addEventListener('click',() => {
  console.log('click');
  returnProduct(value);
});
});





