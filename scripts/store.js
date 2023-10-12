import Cart from './classes.js';


const customer_1 = new Cart();
const allProducts = await fetchProducts('https://fakestoreapi.com/products');

console.log(allProducts);


import {fetchProducts, productsSorter, renderFunc} from './functions.js';
renderFunc(false);
const new2 = productsSorter(allProducts,1);

console.log(new2);





