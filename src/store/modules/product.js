export default {
  namespaced: true,
  state: {
    product: {
      id: null,
      name: "",
      description: "",
      brand: "",
      sell_price: 0,
      purchase_price: 0,
    },
  },
  getters: {
    product(state) {
      return state.product;
    },
    form(state) {
      return state.product;
    },
  },
  mutations: {
    setProduct(state, payload) {
      state.product = payload;
    },
    clearProduct(state) {
      state.product = {
        id: null,
        name: "",
        description: "",
        brand: "",
        sell_price: 0,
        purchase_price: 0,
      };
    },
  },
};
