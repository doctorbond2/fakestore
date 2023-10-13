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


async function renderFunc(condition) {


  const products_box = document.getElementById('products-main-box');

  let product_list = '';

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

      const modal = document.createElement('dialog');
      modal.classList.add('card', 'modal-box', 'modal');
      modal.style = 'display: none;'
      modal.setAttribute('data-modal', 'myModal');
      modal.id = `modal-${catForId + (index + 1)}`
  
      document.body.appendChild(modal);
  
      modal.innerHTML += `
      <button class="close-button">X</button>
      <img class="card-img-top w-50" src="${value.image}" alt="Card image cap" style="height: 8rem;">
      <div class="card-body">
      
        <h5 class="card-title">${value.title}</h5>

        <div class="input-button-encase">
        <input class="input-for-numbers" type="number">
        <button 
        class="btn btn-primary cartbutton" 
        onclick="
        console.log('test')
        "
        >Add to cart
        </button>´
        </div>
      </div>`;



      const product = document.createElement('article');

      product.classList.add('card', 'product-box', 'col-12', 'col-md-6', 'col-lg-4');
      product.classList.add(`col`);
      product.classList.add(`js-${catForId}`);
      product.style = "width 18rem; height: 25rem; max-width: 18rem;";
      product.id = `${catForId + (index + 1)}`;
      product.innerHTML += `
      <img class="card-img-top w-50" src="${value.image}" alt="Card image cap" style="height: 8rem;">
      
      <div class="card-body">
        <h5 class="card-title">${value.title}</h5>
        <h6 class="card-text">
        <a class="modal-click" data-target="#${modal.id}" onclick="
        const mode = document.querySelector('#${modal.id}');
        mode.style.display = 'block';
        console.log('check');
        ">Details</a></h6>
        <div class="input-button-encase">
        <input class="input-for-numbers" type="number">
        <button 
        class="btn btn-primary cartbutton"
        >Add to cart
        </button>´
        </div>
      </div>`;
      console.log(product);
      products_box.appendChild(product);

      

    });

    const modalList = document.querySelectorAll('.modal-box');

    console.log(modalList);

      modalList.forEach((value,index) => {
      const closeButton = value.querySelector('.close-button');
      closeButton.id = `close${index+1}`;
      console.log(closeButton);
      closeButton.addEventListener('click',() => {
      console.log('ok');
      value.style.display = 'none';
      });
    })
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

function logIn(name, age) {

}

function cartFunc() {

}

export { fetchProducts, renderFunc, productsSorter, preciseSort };



{/* <div class="product-item card">
          <h2>${value.title}</h2>
          <h4>${value.description}</h4>
          <p>Blabla</p>
        </div> */}