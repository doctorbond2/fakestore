import Cart from './classes.js';

const customer_1 = new Cart();
const allProducts = await fetchProducts('https://fakestoreapi.com/products');

console.log(allProducts);


import {fetchProducts, productsSorter, renderFunc, preciseSort} from './functions.js';

await renderFunc(true);


preciseSort(allProducts,"men's clothing");





