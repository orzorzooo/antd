function init() {
  const obj = {
    address: "",
    area: "",
    space_type: "整層",
    building_type: "透天",
    building_floors: 1,
    floors: 1,
    square_meter: 1, //坪數

    // 格局
    rooms: 1,
    halls: 0,
    bathrooms: 0,
    balconies: 0,
    kitchens: 0,

    parking_space: null, //車位 null:沒車位, car, bike,
    gender_condition: null, // null, male, female

    property_right: 0, //產權登記
    building_square_meter: 0, //建物面積
    use_for: "住家", //法定用途

    lease_term: "一個月", //最短租期
    rent_price: 0, //租金
    deposit: 0, //押金
    management_fee: 0, //管理費

    owner_role: "房東", //身份
    line_id: "",
    cell_phone: "",
    phone: "",

    name: "未命名",
    title: "未命名標題",
    description: "",
    files: [],

    features: [], //特色
    hardwares: [], //傢俱設備
    func: "rent",
    spec: [], //
    status: 0,
  };
  return obj;
}

export default {
  namespaced: true,
  state: {
    selected_images: [],
    property: init(),
    removedFiles: [],
    space_types: ["整層", "獨立套房", "分租套房", "雅房"],
    building_types: ["透天", "公寓", "電梯大樓", "別墅"],
    use_fors: [
      "住家",
      "集合住宅",
      "商用",
      "事務所",
      "工業用途",
      "餐飲",
      "農業",
      "一般零售",
      "其他",
    ],
    owner_roles: ["房東", "仲介", "代管", "代理人"],
    hardwares: [
      "床",
      "桌子",
      "椅子",
      "沙發",
      "衣櫃",
      "鞋櫃",
      "櫃子",
      "瓦斯爐",
      "電磁爐",
      "流理台",
      "電視",
      "第四台",
      "電視盒",
      "冰箱",
      "洗衣機",
      "冷氣",
      "保全設施",
      "網路",
      "熱水器",
      "天然瓦斯",
    ],
    lease_terms: ["一個月", "兩個月", "三個月", "半年", "一年", "兩年", "面議"],
  },
  getters: {
    property(state) {
      return state.property;
    },
    form(state) {
      return state.property;
    },
    options(state) {
      return {
        space_types: state.space_types,
        building_types: state.building_types,
        use_fors: state.use_fors,
        owner_roles: state.owner_roles,
        hardwares: state.hardwares,
        lease_terms: state.lease_terms,
      };
    },
    space_types(state) {
      return state.space_types;
    },

    getProperty(state) {
      return state.property;
    },
    files(state) {
      return state.property.files;
    },
    getFiles(state) {
      return state.property.files;
    },
    getSpecs(state) {
      return state.property.spec;
    },
    fileList(state) {
      return state.property.files;
    },
    removedFiles(state) {
      return state.removedFiles;
    },
    selected_images(state) {
      return state.selected_images;
    },
  },
  mutations: {
    setProperty(state, payload) {
      console.log("setProperty", payload);
      state.selected_images = payload.files.map((item) => {
        return item.directus_files_id;
      });
      state.property = payload;
    },
    setFiles(state, payload) {
      state.property.files = payload;
    },
    setSpecs(state, payload) {
      state.property.spec = payload;
    },
    setSelectedImages(state, payload) {
      state.selected_images = payload;
      const files = payload.map((item) => {
        return { directus_files_id: item };
      });
      state.property.files = files;
    },

    setRemoveFile(state, payload) {
      const index = state.property.files.findIndex((ele) => {
        return ele.uid == payload.uid;
      });
      state.removedFiles.push(payload);
      state.property.files.splice(index, 1);
    },
    clearProperty(state) {
      state.removedFiles = [];
      state.selected_images = [];
      state.property = init();
    },
  },
};
