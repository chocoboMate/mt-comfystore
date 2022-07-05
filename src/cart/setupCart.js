// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items

const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart');

export const addToCart = (id) => {
  // console.log(id);
  let item = cart.find((cartItem) => cartItem.id === id);
  if (!item) {
    // console.log(id);
    // if item is not in the cart
    let product = findProduct(id);
    // console.log(product);
    //
    // add item to the cart
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    //
    // add item to the DOM
    addToCartDOM(product);
  } else {
    // if item is in the cart, update the values
    const amount = increaseAmount(id);

    const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
    const newAmount = items.find((value) => value.dataset.id === id);
    newAmount.textContent = amount;
  }
  //
  //
  //
  // add one to the item count
  displayCartItemCount();

  // display cart totals
  displayCartTotal();

  // set cart in local storage
  setStorageItem('cart', cart);

  //
  //
  openCart();
};
//
//
//
//
//
//
//
function displayCartItemCount() {
  // const amount = cart.reduce((total, cartItem) => {
  //   return (total += cartItem.amount);
  // }, 0);
  //
  // or use For Of loo instead of reduce
  let amount = 0;
  for (const cartItem of cart) {
    amount += cartItem.amount;
  }

  cartItemCountDOM.textContent = amount;
}

//
//
//
//
//
//
function displayCartTotal() {
  // let total = cart.reduce((total, cartItem) => {
  //   return (total += cartItem.price * cartItem.amount);
  // }, 0);
  //
  // or use For Of loo instead of reduce
  let total = 0;
  for (const cartItem of cart) {
    total += cartItem.price * cartItem.amount;
  }

  cartTotalDOM.textContent = `Total : ${formatPrice(total)}`;
}
//
//
//
//
//
//
//
function displayCartItemsDOM() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}
//
//
//
//
//
//
function remove(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}
//
//
//
//
//
//
function increaseAmount(id) {
  let newAmount;
  //
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem; // this will return the default cartItem if id and cartItem.id is FALSE
  });
  //
  //
  return newAmount;
}
//
//
//
//
//
//
function decreaseAmount(id) {
  let newAmount;
  //
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem; // this will return the default cartItem if id and cartItem.id is FALSE
  });
  //
  //
  return newAmount;
}
//
//
//
//
//
//

function setupCartFunctionality() {
  cartItemsDOM.addEventListener('click', function (e) {
    // for remove
    const element = e.target;
    const id = e.target.dataset.id;

    // for chevron increase/decrease
    const parent = e.target.parentElement;
    const parentID = e.target.parentElement.dataset.id;
    //
    //
    // remove
    if (element.classList.contains('cart-item-remove-btn')) {
      remove(id);
      // parent.parentElement.remove()
      // or
      element.parentElement.parentElement.remove();
    }
    //
    // increase
    if (parent.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parentID);
      // add the newAmount in the cart-item-amount text content
      parent.nextElementSibling.textContent = newAmount;
    }
    //
    // decrease
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount === 0) {
        remove(parentID);
        parent.parentElement.parentElement.remove();
      } else {
        // add the newAmount in the cart-item-amount text content
        parent.previousElementSibling.textContent = newAmount;
      }
    }
    //
    //
    //
    displayCartItemCount();
    displayCartTotal();
    setStorageItem('cart', cart);
  });
}
//
//
//
//
//
// to display in different pages like home, products and about
const init = () => {
  // console.log(cart);
  // display amount of cart items
  displayCartItemCount();

  // display total
  displayCartTotal();

  // add al cart items to the dom
  displayCartItemsDOM();

  // setup cart functionality like buttons
  setupCartFunctionality();
};
init();
