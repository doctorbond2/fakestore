import Cart from './classes.js';

const products_box = document.getElementById('products-box');
const textItem = document.createElement('div');
textItem.innerText = `Product 1`;
textItem.className =`product-item`;
products_box.appendChild(textItem);



async function fetchProducts(url) {
  console.log('fetching?');
  try {
    const response = await fetch(url);
    const translate = translate.json();
    console.log(translate);
    return translate;
  }
  catch (error) {
    return console.error(error,'Server did not respond');
  }
}
export {fetchProducts};

function renderFunc() {
  
}
function logIn(name, age) {

}