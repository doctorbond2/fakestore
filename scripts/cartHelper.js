// import Products from './components/products.js';

// class CartHelper {

//   constructor(cart, products) {
//     this.products = products;
//     this.cart = cart;
//   }

//   updateCartEvent() {
    

//     let product_ID = document.querySelector('.product')
//     let cart = this.cart;
//     cart.push(product);
//     console.log(cart);
//     localStorage.setItem(`cartItems`, JSON.stringify(cart));
//     this.renderCart();
//   }
// }






function generate_uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
  function(c) {
     var uuid = Math.random() * 16 | 0, v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
     return uuid.toString(16);
  });
}

// export {generate_uuidv4};

