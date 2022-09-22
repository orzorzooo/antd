export default {
  namespaced: true,
  state: {
    property: {
      name: "",
      description: "",
      address: "",
      area: "",
      price: [8000, 12000],
      func: "rent",
      spec: null,
      files: [],
    },
  },
  getters: {
    getProperty(state) {
      return state.property;
    },
  },
  mutations: {
    setProperty(state, payload) {
      state.property = payload;
    },
  },
};
