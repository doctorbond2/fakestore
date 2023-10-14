import Cart from './classes.js';

function categoryList(products) {
  const select = document.querySelector('.category-select');

  products.forEach((value,index) => {

  });
}
 
async function fetchProducts(url) {

  try {
    const response = await fetch(url);
    const translate = await response.json();
    return translate;
  }
  catch (error) {
    return console.error(error, 'Server did not respond');
  }
}


function renderHTML(products) {


  const products_box = document.getElementById('products-main-box');

  products.forEach((value, index) => {

    const catForId = value.category.substring(0, 3);

    const product = document.createElement('article');

    product.classList.add('card', 'product-box', 'col-12', 'col-md-6', 'col-lg-4', `js-${catForId}`, 'col');

    product.style = "width 18rem; height: 25rem; max-width: 18rem;";
    product.id = value.id;

    product.innerHTML += `

      <img class="card-img-top" src="${value.image}" alt="Card image cap" style="height: 10rem; width: 10rem;">
      
      <div class="card-body">
        <h3 class="card-title">${value.title}</h3>

        <div class="info-box">
        <h3>$${value.price}</h3>
        <h4 class="ratings-text">Rating: ${value.rating.rate}(${value.rating.count})</h4>
        
        <h6 class="card-text"><a class=" js-modal-button js-modal-button-${index + 1}" data-bs-toggle="modal" data-bs-target="#exampleModal"">Details</a></h6>
   
        <h6 class="item-category-text">${value.category}</h6>
        </div>
      </div>`;

    products_box.appendChild(product);
  });

}


function productsSorter(data, number) {
  if (number < 0 || undefined) {
    return console.log('Give a number please:');
  } else {
    const categories = [];
    data.forEach((value, index) => {
      if (!categories.includes(value.category)) {
        categories.push(value.category);
        console.log(categories);
      }
    });
    return categories[number - 1];
  }
}

function preciseSort(data, c) {
  console.log('hey');
  return data.filter((value, index) => {
    console.log(value.category);
    return value.category === `${c}`;
  });
}

function eventListeners(products) {
  console.log(products);
  products.forEach((value, index) => {
    const newButton = document.querySelector(`.js-modal-button-${value.id}`);
    newButton.addEventListener('click', () => {
      returnProduct(value.id);
    });
  });

  const cartButton = document.querySelector('.add-to-cart-button');
  cartButton.addEventListener('click',() => {
    
  });

}

async function returnProduct(ID) {

  const product = await fetchProducts(`https://fakestoreapi.com/products/${ID}`);
  const modalHTML = document.querySelector('.js-modal-body');
  console.log(product);
  modalHTML.innerHTML = `
  <img class="card-img-top" src="${product.image}" alt="Card image cap" style="height: 10rem; width: 10rem;">
  <h3>${product.title}</h3>
  <p> ${product.description}</p>
  <h4 class="ratings-text">Rating: ${product.rating.rate}(${product.rating.count})</h4>
  `;

  console.log(modalHTML);
}

async function getProducts(url) {
  const productArray = await fetchProducts(url);
  const idArray = [];
  productArray.forEach((value, index) => {
    idArray.push(value.id);
  });
  console.log(idArray);
  return idArray;
}

export {
  fetchProducts,
  renderHTML,
  productsSorter,
  preciseSort,
  returnProduct,
  eventListeners,
  getProducts
};


{/* <button type="button" class="btn btn-primary js-modal-button-${index + 1}" data-bs-toggle="modal" data-bs-target="#exampleModal">
GO
</button> */}