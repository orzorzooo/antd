import { findAll, nominatim, nisc_bus, nisc_bus_v2 } from "@/api/map";

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
        key: "萊爾富",
        name: "萊爾富",
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
    locateData(state) {
      return state.locate;
    },
    locateFeatures(state) {
      return state.locateFeatures;
    },
    bus(state) {
      return state.locateFeatures.bus.datas;
    },
    convinientShops(state) {
      if (state.locateFeatures.bus.datas.length < 1) return [];
      const chartData = {
        labels: [],
        datasets: [],
      };
      let markers = [];
      for (let shop of state.shops) {
        const sum = 0;
        chartData.labels.push(shop.name);
        const shopMarkers = state.locateFeatures.bus.datas.filter((item, index) => {
          if (item.name.match(shop.key)) {
            sum++;
            item.icon = shop.icon;
            return true;
          }
        });
        chartData.datasets.push(sum);
        markers.push(shopMarkers);
      }
      markers = markers.flat(3);
      console.log(markers, chartData);
      return { markers, chartData };
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
    async getLocateFeatures_v2({ commit, state }) {
      const locateFeaturesKeys = Object.keys(state.locateFeatures);
      try {
        for (let feature of locateFeaturesKeys) {
          console.log(feature);
          const condition = {
            type: feature,
            lon: state.locate.geoData.lon,
            lat: state.locate.geoData.lat,
          };
          const { data } = await nisc_bus_v2(condition);
          state.locateFeatures[feature].datas = data;
          console.log("取得周邊資訊:", { feature, data });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async getLocateFeatures({ commit, state }) {
      const condition = {
        lon: state.locate.geoData.lon,
        lat: state.locate.geoData.lat,
      };
      try {
        const { data } = await nisc_bus_v2(condition);
        state.locateFeatures.bus.datas = data;
        console.log("取得工商資訊:", data);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
