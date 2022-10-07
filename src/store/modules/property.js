function init() {
  const obj = {
    address: "",
    area: "",
    space_type: "",
    building_type: "",
    building_floors: "",
    floors: "",
    square_meter: 0, //坪數

    // 格局
    rooms: 0,
    halls: 0,
    bathrooms: 0,
    balconies: 0,
    kitchens: 0,

    parking_space: null, //車位 null:沒車位, car, bike,
    gender_condition: null, // null, male, female

    property_right: false, //產權登記
    building_square_meter: 0, //建物面積
    use_for: "", //法定用途

    lease_term: "", //最短租期
    rent_price: 0, //租金
    deposit: 0, //押金
    management_fee: 0, //管理費

    owner_role: "房東", //身份
    line_id: "",
    cell_phone: "",
    phone: "",

    name: "",
    title: "",
    description: "",
    files: [],

    features: [], //特色
    hardwares: [], //傢俱設備
    func: "rent",
    spec: null, //
    status: 0,
  };
  return obj;
}

export default {
  namespaced: true,
  state: {
    property: init(),
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
    getFiles(state) {
      return state.property.files;
    },
    getSpecs(state) {
      return state.property.spec;
    },
    fileList(state) {
      return state.property.files;
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
