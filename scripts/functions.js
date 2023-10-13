import Cart from './classes.js';



async function fetchProducts(url) {
  try {
    const response = await fetch(url);
    const translate = await response.json();
    return translate;
  }
  catch (error) {
    return console.error(error,'Server did not respond');
  }
}


async function renderFunc(condition) {

  
  const products_box = document.getElementById('products-box');

  let product_list = '';
  if(condition === false) {
    for(let i = 0; i < 9; i++) {

      product.classList.add('card-body','product-box', 'col-12', 'col-md-6', 'col-lg-4');
      product.classList.add('col');
      product.innerHTML = `
        <div class="product-item card">
          <h2>Title</h2>
          <h4>main desc?</h4>
          <p>Blabla</p>
        </div>`;
      products_box.appendChild(product);
      
     
    }
  }

  if (condition === true ) {

    const contentData = await fetchProducts('https://fakestoreapi.com/products');
    console.log(contentData);
    
    contentData.forEach((value,index) => {
      const product = document.createElement('article');
      console.log(value.description);
      product.classList.add('card','product-box', 'col-12', 'col-md-6', 'col-lg-4');
      product.classList.add('col');
      product.style = "width 18rem; height: 25rem";
      product.innerHTML += `
      <img class="card-img-top w-75" src="${value.image}" alt="Card image cap" style="height: 10rem;">
      <div class="card-body">
        <h5 class="card-title">${value.title}</h5>
        <p class="card-text">desc</p>
        <button href="#" class="btn btn-primary">Add to cart</button>
      </div>`;
      products_box.appendChild(product);
    });
     

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
}

function preciseSort(data,c) {
  return data.filter((value,index) => {
    return value.category === `${c}`;
  });
}

function logIn(name, age) {

}

function cartFunc() {
  
}

export {fetchProducts, renderFunc, productsSorter, preciseSort};



{/* <div class="product-item card">
          <h2>${value.title}</h2>
          <h4>${value.description}</h4>
          <p>Blabla</p>
        </div> */}