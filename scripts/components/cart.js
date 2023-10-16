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

      cartbox.innerHTML += `
      <div class="cart-content">
      <button id="remove-item-${index + 1}">X</button>
      <p>${value.title}</p>
      <img class="cart-product-image" src="${value.image}">
      <p>$${value.price}</p>
      </div>
      `;
      priceTotal += value.price;


    });

    const allCartItems = document.querySelectorAll('.cart-content');

    allCartItems.forEach((value, index) => {
      const button = document.getElementById(`remove-item-${index + 1}`);
      button.addEventListener('click', () => {
        this.removeItemFromCart(button.id);
        this.renderCart();
      });
    })


    cartTop.innerText = `Cart(${this.cart.length}): $${priceTotal}`;

  }

  removeItemFromCart(buttonId) {

    const index = parseInt(buttonId.split('-')[2]);
    this.cart.splice((index - 1), 1);
    console.log(this.cart);
    localStorage.setItem('cartItems', JSON.stringify(this.cart));
  }

  cartHelper() {

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
      function (c) {
        var uuid = Math.random() * 16 | 0, v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
        return uuid.toString(16);
      });

  }
}



export default Cart;