// global imports
import './src/toggleSidebar.js';
import './src/cart/toggleCart.js';
import './src/cart/setupCart.js';
// specific imports
import fetchProducts from './src/fetchProducts.js';
import { setupStore, store } from './src/store.js';
import display from './src/displayProducts.js';
import { getElement } from './src/utils.js';

const init = async () => {
  const products = await fetchProducts();
  // console.log(products);
  //
  //if products are truthy and NOT null do this:
  if (products) {
    // add products tp store
    setupStore(products);
    //
    // get the product from store(local storage) using filter that has featured === true
    const featured = store.filter((product) => product.featured === true);
    // console.log(featured);
    //
    //
    display(featured, getElement('.featured-center'));
  }
};

window.addEventListener('DOMContentLoaded', init);
