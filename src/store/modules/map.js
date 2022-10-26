import { findAll, nominatim, nisc_bus } from "@/api/maps";

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
    // map: null,
    locate: {
      name: "",
      geoData: null,
    },
    locateFeatures: {
      bus: {
        name: "工商設施",
        datas: [],
      },
      med: {
        name: "醫療設施",
        datas: [],
      },
      edu: {
        name: "文教設施",
        datas: [],
      },
    },
    shops: [
      {
        key: "統一超商",
        name: "7-11",
        icon: require("@/assets/img/logos/sevenEleven_logo.png"),
      },
      {
        key: "全家便利",
        name: "全家便利商店",
        icon: require("@/assets/img/logos/familyMart_logo.png"),
      },
      {
        key: "全聯",
        name: "全聯褔利中心",
        icon: require("@/assets/img/logos/px_logo.png"),
      },
      {
        key: "小北百貨",
        name: "小北百貨",
        icon: require("@/assets/img/logos/showba_logo.png"),
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
    map(state) {
      return state.map;
    },
    locateFeatures(state) {
      return state.locateFeatures;
    },
  },
  mutations: {
    setMap(state, payload) {
      state.map = payload;
    },
    setMapNull(state, payload) {
      state.map = null;
    },
  },
  actions: {
    async getGeoData_nominatim({ dispatch, commit, state }, locate) {
      console.log(locate);
      try {
        const { data } = await nominatim(locate);
        if (data.length < 1) throw "沒有資訊";
        state.locate.name = locate;
        state.locate.geoData = data[0];
        console.log("取得GeoData:", state.locate);
        return data[0];
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async getLocateFeatures({ dcommit, state }) {
      const condition = {
        lon: state.locate.geoData.lon,
        lat: state.locate.geoData.lat,
      };
      try {
        state.locateFeatures.bus = await get_nisc_bus(condition);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async analyzeBUSDatas({ commit, state }) {},
  },
};

async function get_nisc_bus({ lon, lat, radius }) {
  try {
    const { data } = await nisc_bus({ lon, lat, radius });
    console.log("取得工商資訊:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
