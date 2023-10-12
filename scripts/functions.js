import Cart from './classes.js';



async function fetchProducts(url) {
  try {
    const response = await fetch(url);
    const translate = await response.json();
    console.log(translate);
    return translate;
  }
  catch (error) {
    return console.error(error,'Server did not respond');
  }
}


function renderFunc(condition) {
  
  const products_box = document.getElementById('products-box');
  let product_list = '';
  if(condition === false) {
    for(let i = 0; i < 8; i++) {

      const product = document.createElement('article');

      product.classList.add('card-body','product-box');
      product.classList.add('col');
      product.innerHTML = `
        <div class="product-item card">
          <h2>Title</h2>
          <h4>main desc?</h4>
          <p>Blabla</p>
        </div>`;
      products_box.appendChild(product);
      
      for(let i = 0; i < 5; i++) {
        product_list += `<div class="product-item">
        <h2>Title</h2>
        <h3>main desc?</h3>
        <p>Lorem89</p>
        </div>`;
      }
    }
  }
}




function productsSorter(data,number) {

  if (number < 0 || undefined) {
    return console.log('Give a number please:');
  } else {
    
  const categories = [];
  
  data.forEach((value,index) => {
    if (!categories.includes(value.category)) {
      categories.push(value.category);
      console.log(categories);
    }
  });
  return categories[number-1];
  }
  // return data.filter((value,index) => {
  //   return value.category === `${c}`;
  // });
}

function logIn(name, age) {

}

function cartFunc() {
  
}

export {fetchProducts, renderFunc, productsSorter};