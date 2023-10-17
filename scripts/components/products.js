
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
    const dropDownRatingMeny = document.querySelector('.rating-select');
    emptyOption.innerText = 'All products';
    dropDownMeny.appendChild(emptyOption);

    dropDownCategories.forEach((value, index) => {
      const option = document.createElement('option');
      option.innerText = value;
      dropDownMeny.appendChild(option);
    });

    dropDownMeny.addEventListener('change', () => {
      let y = '';
      y = dropDownMeny.value === 'All products' ? this.products : this.filterByCategory(dropDownMeny.value);
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

  sortBy(sortingFrom, products) {
    let productsSortBy = products;
    if (sortingFrom === 'Highest rating') {
      productsSortBy.sort((rating1, rating2) => {
        let x = rating1.rating.rate;
        let y = rating2.rating.rate;
        return y - x;
      });
    } else if (sortingFrom === 'Lowest rating') {
      productsSortBy.sort((rating1, rating2) => {
        let x = rating1.rating.rate;
        let y = rating2.rating.rate;
        return x - y;
      });
    } else if (sortingFrom === 'Highest price') {
      productsSortBy.sort((price1, price2) => {
        let x = price1.price;
        let y = price2.price;
        return y - x;
      });
    } else if (sortingFrom === 'Lowest price') {
      productsSortBy.sort((price1, price2) => {
        let x = price1.price;
        let y = price2.price;
        return x - y;
      });
    }
    return productsSortBy;
  }

  filterByCategory(category) {
    this.filteredProducts = this.products.filter((x) => {
      return x.category === category;
    });
    console.log(this.filteredProducts);
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
      title = value.title.length > 45 ? `${value.title.slice(0, 45)}...` : value.title;
      product.classList.add('card', 'product-box', 'col-12', 'col-md-6', 'col-lg-4', `js-${catForId}`, 'col');
      // , 'shadow-sm', 'p-3', 'mb-5', 'bg-body-tertiary', 'rounded'
      product.style = "width 18rem; height: 25rem; max-width: 18rem; margin: 0.3em";
      product.setAttribute('data-rating', `${value.rating.rate}`);
      product.setAttribute('data-count', `${value.rating.count}`);
      product.id = value.id;

      product.innerHTML += `
      <img class="card-img-top" src="${value.image}" alt="Card image cap" style="height: 10rem; width: 10rem;">
      <div class="card-body" style="border-top: 1px solid lightgray">
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
        const removeTarget = document.querySelector('.modal-open');
        removeTarget.style.overflow = 'scroll';
        removeTarget.style.paddingRight = '';
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
    <h4 class="ratings-text">Rating: ${product.rating.rate}/5 (${product.rating.count})</h4>
    <p> ${product.description}</p>
    <button type="button" class="btn btn-secondary add-to-cart-button" data-bs-dismiss="modal" style="background-color: rgb(154, 172, 147); color: black; font-weight: bold; width: 7rem;">Add to cart</button>
    </div>`;
    const cartButton = document.querySelector('.add-to-cart-button');
    cartButton.removeEventListener('click', eventHandler);
    cartButton.addEventListener('click', eventHandler);

  }

  getExaktProducts() {
    return this.products;
  }

  pushToCartEventListener() {
    let login = document.querySelector('.place-the-login-name-here');
    if (this.cart.length >= 5) {
      alert('Cart full!');
    } else if (login.innerText === 'Log in!') {
      alert('You need to log in!');
    } else {
      let modal = document.querySelector('.js-modal-body');
      let product_ID = modal.children[0].id;
      product_ID = product_ID.split('.')[1];
      let product = this.products.find(x => x.id.toString() === product_ID);
      this.cart.push(product);
      localStorage.setItem(`cartItems`, JSON.stringify(this.cart));
      this.renderCart();
    }
  }

  sortEventListener() {

    let sortList = document.querySelector('.rating-select');
    sortList.addEventListener('change', () => {
      let y = [];
      let cSelect = document.querySelector('.category-select');
      let cValue = cSelect.value;
      let x = cValue === 'All products' ? this.products : this.filterByCategory(cValue);

      if (sortList.value === 'Highest rating') {
        y = this.sortBy('Highest rating', x);
      } else if (sortList.value === 'Lowest rating') {
        y = this.sortBy('Lowest rating', x);
      } else if (sortList.value === 'Highest price') {
        y = this.sortBy('Highest price', x);
      } else if (sortList.value === 'Lowest price') {
        y = this.sortBy('Lowest price', x);
      }
      this.renderHTML(y);
    });
  }
  resetButtonEventListener() {
    const category = document.querySelector('.category-select');
    const rating = document.querySelector('.rating-select');
    const resetButton = document.querySelector('.reset-button');

    resetButton.addEventListener('click', () => {
      category.selectedIndex = 0;
      rating.selectedIndex = 0;
      this.renderHTML(this.products);
    });
  }

  // removeEL(button) {
  //   const clone = button.cloneNode(true);

  //   clone.classList.add('add-to-cart-button', 'btn-primary', '')


  // }

}

export default Products;