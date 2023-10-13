import Cart from './classes.js';



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


async function renderFunc(condition, products) {


  const products_box = document.getElementById('products-main-box');

  if (condition === false) {
    for (let i = 0; i < 9; i++) {

      product.classList.add('card-body', 'product-box', 'col-12', 'col-md-6', 'col-lg-4');
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

  if (condition === true) {

    const contentData = await fetchProducts('https://fakestoreapi.com/products');

    console.log(contentData);

    contentData.forEach((value, index) => {

      const catForId = value.category.substring(0, 3);

      const product = document.createElement('article');

      product.classList.add('card', 'product-box', 'col-12', 'col-md-6', 'col-lg-4');
      product.classList.add(`col`);
      product.classList.add(`js-${catForId}`);

      product.style = "width 18rem; height: 25rem; max-width: 18rem;";
      product.id = value.id;
      // product.id = `${catForId + (index + 1)}`;
      product.innerHTML += `

      <img class="card-img-top" src="${value.image}" alt="Card image cap" style="height: 10rem; width: 10rem;">
      
      <div class="card-body">
        <h5 class="card-title">${value.title}</h5>
        <h6 class="card-text">
        <button type="button" class="btn btn-primary js-modal-button-${index+1}" data-bs-toggle="modal" data-bs-target="#exampleModal">
          GO
        </button>
        <a>Details</a></h6>
      </div>`;

      console.log(product);

      // const myModal = document.getElementById('myModal')
      // const myInput = document.getElementById('myInput')
    
      // myModal.addEventListener('shown.bs.modal', () => {
      // myInput.focus()
      // });

      products_box.appendChild(product);
    });
  }
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
    return value.category === `${c}`;
  });
}

function eventListeners() {
  
  const allButtons = document.querySelectorAll('.js-modal-button');
  console.log(allButtons);
  allButtons.forEach((value,index) => {
    const button = document.querySelector('.js-modal-button');
    button.addEventListener('click',() => {
      console.log('hello');
    });
  });

}

async function returnProduct(ID) {

  const product = await fetchProducts(`https://fakestoreapi.com/products/${ID}`);
  console.log(product);
  const modalHTML = document.querySelector('.js-modal-body');
  modalHTML.innerHTML = `
  <img class="card-img-top" src="${product.image}" alt="Card image cap" style="height: 10rem; width: 10rem;">
  <h3>${product.title}</h3>
  <p> ${product.description}</p>
  `;

  console.log(modalHTML);
}

async function getProducts(url) {
  const productArray = await fetchProducts(url);
  const idArray = [];
  productArray.forEach((value,index) => {
    idArray.push(value.id);
  });
  console.log(idArray);
  return idArray;
}

export { fetchProducts, renderFunc, productsSorter, preciseSort, returnProduct, eventListeners, getProducts };



{/* <div class="product-item card">
          <h2>${value.title}</h2>
          <h4>${value.description}</h4>
          <p>Blabla</p>
        </div> */}