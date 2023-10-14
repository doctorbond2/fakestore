class Products {

  constructor() {
    this.products = [];
    this.categories = [];
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
      let y = this.filterByCategory(dropDownMeny.value);
      this.renderHTML(y);
    });
  }

  getCategories() {
    this.products.forEach((x) => {
      if (!this.categories.includes(x.category)) {
        this.categories.push(x.category);
      }
    });
  }

  filterByCategory(category) {

    let filteredProducts = this.products.filter(x => x.category === category);
    return filteredProducts;
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

  renderHTML(products) {

    console.log(products);

    const products_box = document.getElementById('products-main-box');

    products_box.innerHTML = '';

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

      const newButton = document.querySelector(`.js-modal-button-${value.id}`);
      newButton.addEventListener('click', () => {
        this.renderModalContent(value.id);
      });
    });
  }

  renderModalContent(ID) {

    const product = this.products.find(x => x.id === ID);

    const modalHTML = document.querySelector('.js-modal-body');

    modalHTML.innerHTML = `
    <div id="product.${ID}"></div>
    <img class="card-img-top" src="${product.image}" alt="Card image cap" style="height: 10rem; width: 10rem;">
    <h3>${product.title}</h3>
    <p> ${product.description}</p>
    <h4 class="ratings-text">Rating: ${product.rating.rate}(${product.rating.count})</h4>
    `;

    const cartButton = document.querySelector('.add-to-cart-button');
    cartButton.addEventListener('click', () => {

      localStorage.setItem(`item${ID}`, JSON.stringify(product));
      window.location.reload();
    });

  }

}

export default Products;