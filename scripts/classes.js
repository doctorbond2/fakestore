class Cart {

  constructor() {
    this.cart = [];
  }

  storage() {
    if (this.cart.length === 0) {
      console.log('No items in cart');
    } else {
      console.log(this.cart);
    }
  }

  addToCart(item) {
    this.cart.push(item);
  }
  updateCart() {

  }

  removeCart(amount) {
    const x = this.cart;
    this.cart.splice(x.length - 1, 1);
  }

  cartQuantity() {
    console.log(this.cart);
    return this.cart;
  }

  sortCart() {

  }
}



export default Cart;