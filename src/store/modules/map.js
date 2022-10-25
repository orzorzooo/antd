function init() {
  const obj = {
    // id: null,
    // name: "",
    // description: "",
    // phone: "",
    // address: "",
  };
  return obj;
}

export default {
  namespaced: true,
  state: {
    // company: init(),
    shops: [
      {
        key: "統一超商",
        name: "7-11",
        icon: require("@/assets/img/sevenEleven_logo.png"),
      },
      {
        key: "全家便利",
        name: "全家便利商店",
        icon: require("@/assets/img/familyMart_logo.png"),
      },
    ],
  },
  getters: {
    shops(state) {
      return state.shops;
    },
    shopNames(state) {
      const shops = state.shops.map((item, index) => {
        return item.name;
      });
      console.log(shops);
      return shops;
    },
  },
  mutations: {
    // setCompany(state, payload) {
    //   state.company = payload;
    // },
    // clearCompany(state) {
    //   state.company = init();
    // },
  },
};
