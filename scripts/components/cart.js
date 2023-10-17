class Cart {

  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cartItems')) || [];
  }

  renderCart() {

    const cartTop = document.querySelector('.cart-title-text');
    const cartbox = document.querySelector('.cart-box');
    cartbox.innerHTML = '';
    let priceTotal = 0;

    this.cart.forEach((value, index) => {
      let title = '';
      title = value.title.length > 17 ? `${value.title.slice(0, 17)}` + '...' : value.title;
      cartbox.innerHTML += `
      <div class="cart-content card" style="position: relative;">
      <div class="cart-top-for-image" style="border-bottom: 1px solid black; display: flex; justify-content: center; height: 50%">
      <img class="cart-product-image" style="padding: 0.1em;" src="${value.image}" alt="cart item image">
      </div>
      <button id="remove-item-${index + 1}" class="x-button">x</button>
      <p style="max-width: 80%; font-size: 0.9em">${title}</p>
      <p>$${value.price}</p>
      </div>
      `;
      priceTotal = (priceTotal * 100 + value.price * 100) / 100;
    });

    const allCartItems = document.querySelectorAll('.cart-content');
    allCartItems.forEach((value, index) => {
      const button = document.getElementById(`remove-item-${index + 1}`);
      button.addEventListener('click', () => {
        this.removeItemFromCart(button.id);
        this.renderCart();
        this.checkoutButton();
      });
    })
    cartTop.innerText = this.cart.length > 0 ? `Cart(${this.cart.length}): $${priceTotal}` : 'Nothing in cart';
    this.checkoutButton();
  }

  removeItemFromCart(buttonId) {

    const index = parseInt(buttonId.split('-')[2]);
    this.cart.splice((index - 1), 1);

    localStorage.setItem('cartItems', JSON.stringify(this.cart));
  }

  cartHelper() {

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
      function (c) {
        var uuid = Math.random() * 16 | 0, v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
        return uuid.toString(16);
      });

  }

  checkoutButton() {
    const checkoutButton = document.querySelector('.checkout-button');
    const cartTopBox = document.querySelector('.cart-icon-and-title');
    let colorSign = false;
    let intervalId = setInterval(() => {
      if (!colorSign) {
        checkoutButton.classList.remove('colorSilver');
        checkoutButton.classList.add('colorGold');
        colorSign = true;
      } else {
        checkoutButton.classList.remove('colorGold');
        checkoutButton.classList.add('colorSilver');
        colorSign = false;
      }
    }, 500);
    // cartTopBox.style.display = this.cart.length > 0 ? 'flex' : 'none';
    checkoutButton.style.display = this.cart.length > 0 ? 'block' : 'none';
  }

  checkoutEL() {
    const cardTop = document.querySelector('.card-title-top');
    const checkoutButton = document.querySelector('.checkout-button');
    checkoutButton.addEventListener('click', () => {
      checkoutButton.innerText = 'Added!';

      setTimeout(() => {
        localStorage.removeItem('cartItems');
        this.cart = [];
        this.renderCart();
        checkoutButton.style.display = 'none';
        checkoutButton.innerText = 'Checkout';
        cardTop.innerText = `Nothing in cart`;
      }, 1000);
    });
  }
}



export default Cart;