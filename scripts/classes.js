class Cart {
  constructor() {
    this.cart = [];
  }

  storage(storage) {
    
    if(this.cart === []) {
      console.log('no items in cart');
    } else {
      console.log(this.cart);
    }
  }

  addToCart(x) {
    this.cart.push(x);
  }
  updateCart() {

  }
  
  removeCart(amount) {
    const x = this.cart;
    this.cart.splice(x.length-1,1);
  }

  sortCart() {

  }
}