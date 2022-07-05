import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupPrice = (store) => {
  const priceInput = getElement('.price-filter');
  const priceValue = getElement('.price-value');

  // setup filter
  let maxPrice = store.map((product) => {
    return product.price;
  });
  // console.log(maxPrice);
  //
  maxPrice = Math.max(...maxPrice);
  // console.log(maxPrice);
  //
  maxPrice = Math.ceil(maxPrice / 100);
  //
  priceInput.value = maxPrice;
  priceInput.max = maxPrice;
  priceInput.min = 0;
  priceValue.textContent = `Value: $${maxPrice}`;
  //
  //
  priceInput.addEventListener('input', function () {
    const value = parseInt(priceInput.value); // need to be integer/number type and NOT STRING

    priceValue.textContent = `Value : $${value}`;
    //
    //
    let newStore = store.filter((product) => {
      return product.price / 100 <= value;
    });
    if (newStore.length < 1) {
      const product = getElement('.products-container');
      return (product.innerHTML = `<h3 class="filter-error"> sorry, no products matched your search</h3>`);
    }
    // else do this:
    display(newStore, getElement('.products-container'), true);
  });
};

export default setupPrice;
