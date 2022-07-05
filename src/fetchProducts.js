import { allProductsUrl } from './utils.js';

const fetchProducts = async () => {
  try {
    const response = await fetch(allProductsUrl);
    //
    if (response) {
      // if everything is okay in response do this:
      const data = await response.json();
      return data;
    }
    //
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default fetchProducts;
