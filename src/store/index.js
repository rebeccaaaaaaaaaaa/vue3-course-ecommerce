import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    // os dados, como se fosse o nosso data()
    products: [],
    productsInBag: []
  },
  mutations: {
    // para chamar uma mutation usamos o commit e são sincronas
    loadProducts(state, products){
      state.products = products
    },
    addToBag(state, product){
      state.productsInBag.push(product);
    },
    removeFromBag(state, productId) {
      var updatedBag = state.productsInBag
      .filter(item => productId != item.id);
      state.productsInBag = updatedBag;
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    },
  },
  actions: {
    // para chamar uma action usamos o dispatch e podem ser asincronas
    loadProducts({ commit }){
      axios.get('https://fakestoreapi.com/products')
      .then((result) => {
       commit('loadProducts', result.data);
      }).catch((err) => {
        console.log(err);
      });
    },
    addToBag({commit}, product){
      commit('addToBag', product);
    },
    removeFromBag({commit}, productId){
      commit('removeFromBag', productId);
    }
  },
  modules: {
  }
})
