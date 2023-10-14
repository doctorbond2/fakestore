class Cart {

  constructor() {
    this.cart = [];
  }

  readFromLocalStorage() {

    const keys = Object.keys(localStorage);
    let i = keys.length;

    while (i--) {
      this.cart.push(JSON.parse(localStorage.getItem(keys[i])));
    }

  }

  renderCart() {
    
    const cartbox = document.querySelector('.cart-box');
    cartbox.innerHTML = '';
    
    this.cart.forEach((value, index) => {

      cartbox.innerHTML += `
      <div class="cart-content">
      <button id="remove-item-${index+1}">X</button>
      <p>${value.title}</p>
      <img class="cart-product-image" src="${value.image}">
      <p>$${value.price}</p>
      </div>
      `;

      const button = document.getElementById(`remove-item-${index+1}`);
      button.addEventListener('click',() => {
        this.removeItemFromCart(button.id);
        console.log(this.cart);
        localStorage.removeItem(`item${value.id}`);
      });
    });

    

  }

  removeItemFromCart(buttonId) {

    const index = buttonId.split('-')[2];
    console.log(index);    
    this.cart.splice((index-1), 1);

  }




}





export default Cart;