
import Cart from "./cart.js";

class Products extends Cart {

  constructor(cart) {
    super(cart);
    this.cart = cart;
    this.cartTotalPrice = '';
    this.products = [];
    this.categories = [];
    this.filteredProducts = [];
  }

  renderCategoryOptions() {

    const dropDownMeny = document.querySelector('.category-select');
    const dropDownCategories = this.categories;
    const emptyOption = document.createElement('option');
    emptyOption.innerText = 'All products';
    dropDownMeny.appendChild(emptyOption);

    dropDownCategories.forEach((value, index) => {
      const option = document.createElement('option');
      option.innerText = value;
      dropDownMeny.appendChild(option);
    });

    dropDownMeny.addEventListener('change', () => {

      let y = '';

      if (dropDownMeny.value === 'All products') {
        y = this.products;
      } else {
        y = this.filterByCategory(dropDownMeny.value);
      }
      this.renderHTML(y);
    });
  }

  getCategoriesForDropdown() {
    this.products.forEach((x) => {
      if (!this.categories.includes(x.category)) {
        this.categories.push(x.category);
      }
    });
  }

  filterByCategory(category) {
    this.filteredProducts = this.products.filter((x) => {
      return x.category === category;
    });

    return this.filteredProducts;
  }

  async fetchProducts(url) {
    try {
      const response = await fetch(url);
      const translate = await response.json();
      return translate;
    }
    catch (error) {
      return console.error(error, 'Server did not respond');
    }
  }

  categoryToUpperCase(title) {
    let convert = title.charAt(0).toUpperCase() + title.slice(1);
    return convert;
  }

  renderHTML(products) {


    let products_box = document.getElementById('products-main-box');

    products_box.innerHTML = '';


    products.forEach((value, index) => {

      const catForId = value.category.substring(0, 3);
      const product = document.createElement('article');
      let title = '';

      if (value.title.length > 45) {
        title = `${value.title.slice(0, 45)}...`
      } else {
        title = value.title;
      }

      product.classList.add('card', 'product-box', 'col-12', 'col-md-6', 'col-lg-4', `js-${catForId}`, 'col', 'fade-in');

      product.style = "width 18rem; height: 25rem; max-width: 18rem;";
      product.id = value.id;

      product.innerHTML += `

      <img class="card-img-top" src="${value.image}" alt="Card image cap" style="height: 10rem; width: 10rem;">
      
      <div class="card-body">
        <h3 class="card-title">${title}</h3>

        <div class="info-box">
        <h3 class="price-title">$${value.price}</h3>
        <h4 class="ratings-text">Rating: ${value.rating.rate}/5 (${value.rating.count})</h4>
        
        <h6 class="card-text"><a class=" js-modal-button js-modal-button-${index + 1}" data-bs-toggle="modal" data-bs-target="#exampleModal"">Details</a></h6>
   
        <h6 class="item-category-text">${this.categoryToUpperCase(value.category)}</h6>
        </div>
      </div>`;

      products_box.appendChild(product);


      const newButton = document.querySelector(`.js-modal-button-${index + 1}`);
      newButton.addEventListener('click', () => {
        this.renderModalContent(value.id);
      });
    });


  }

  renderModalContent(ID) {
    let cart = this.cart;
    let products = this.products;
    const eventHandler = this.pushToCartEventListener.bind(this);

    const product = this.products.find(x => x.id === ID);


    const modalHTML = document.querySelector('.js-modal-body');

    modalHTML.innerHTML = `
    <div id="product.${ID}">
    <img class="card-img-top" src="${product.image}" alt="Card image cap" style="height: 10rem; width: 10rem;">
    <h3>${product.title}</h3>
    <h3 class="price-title-modal">$${product.price}</h3>
    <p> ${product.description}</p>
    <h4 class="ratings-text">Rating: ${product.rating.rate}/5 (${product.rating.count})</h4>
    <button type="button" class="btn btn-secondary add-to-cart-button" data-bs-dismiss="modal">Add to cart</button>
    </div>
    `;
    const cartButton = document.querySelector('.add-to-cart-button');
    cartButton.removeEventListener('click', eventHandler);
    cartButton.addEventListener('click', eventHandler);

  }

  getExaktProducts() {
    return this.products;
  }

  pushToCartEventListener() {
    let modal = document.querySelector('.js-modal-body');
    let product_ID = modal.children[0].id;
    product_ID = product_ID.split('.')[1];
    let product = this.products.find(x => x.id.toString() === product_ID);
    this.cart.push(product);
    localStorage.setItem(`cartItems`, JSON.stringify(this.cart));
    this.renderCart();

  }

  // removeEL(button) {
  //   const clone = button.cloneNode(true);

  //   clone.classList.add('add-to-cart-button', 'btn-primary', '')


  // }

}

export default Products;