function init() {
  const obj = {
    id: null,
    name: "",
    description: "",
    phone: "",
    address: "",
  };
  return obj;
}

export default {
  namespaced: true,
  state: {
    company: init(),
  },
  getters: {
    company(state) {
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
      state.company = init();
    },
  },
};
