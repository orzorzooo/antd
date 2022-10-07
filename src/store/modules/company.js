export default {
  namespaced: true,
  state: {
    company: {
      id: null,
      name: "",
      description: "",
      phone: "",
      address: "",
    },
  },
  getters: {
    product(state) {
      return state.company;
    },
    form(state) {
      return state.company;
    },
  },
  mutations: {
    setCompany(state, payload) {
      state.company = payload;
    },
    clearCompany(state) {
      state.company = {
        id: null,
        name: "",
        description: "",
        phone: "",
        address: "",
      };
    },
  },
};
