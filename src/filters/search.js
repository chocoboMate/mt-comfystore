import { getElement } from '../utils.js';
import display from '../displayProducts.js';

//
//
const setupSearch = (store) => {
  const form = getElement('.input-form');
  const nameInput = getElement('.search-input');

  form.addEventListener('keyup', function () {
    const value = nameInput.value;
    // console.log(value);
    //
    if (value) {
      // if the value is true and not empty do this:
      const newStore = store.filter((product) => {
        let { name } = product;
        name = name.toLowerCase();
        //
        if (name.startsWith(value)) {
          return product;
        }
      });
      display(newStore, getElement('.products-container'), true);
      //
      // if the newStore does not find match do this:
      if (newStore.length < 1) {
        const products = getElement('.products-container');
        products.innerHTML = `<h3 class="filter-error">Sorry, no products matched your search</h3>`;
      }
    }
    //
    //
    //
    else {
      //else if the value is empty, display the default(all) products
      display(store, getElement('.products-container'), true);
    }
  });
};

export default setupSearch;
