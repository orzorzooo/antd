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
    getFiles(state) {
      return state.property.files;
    },
    getSpecs(state) {
      return state.property.spec;
    },
  },
  mutations: {
    setProperty(state, payload) {
      console.log("setProperty", payload);
      state.property = payload;
    },
    setFiles(state, payload) {
      state.property.files = payload;
    },
    setSpecs(state, payload) {
      state.property.spec = payload;
    },
    removeFile(state, payload) {
      state.property.files.splice(payload, 1);
    },
  },
};
