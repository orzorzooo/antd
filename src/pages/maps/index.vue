<template>
  <div>
    <a-form-item
      label="查詢地點"
      :labelCol="{ span: 4 }"
      :wrapperCol="{ span: 10 }"
    >
      <a-input-search
        type="address"
        placeholder="輸入地址或地名"
        v-model="locate"
        @search="onSearch"
      ></a-input-search>
    </a-form-item>
    <div class="orz-card h-screen-120">
      <MglMap
        :accessToken="accessToken"
        :mapStyle="mapStyle"
        @load="onMapLoaded"
      >
        <MglMarker
          v-for="(item, index) in busDatas.markers"
          :key="index"
          :coordinates="[item.lon, item.lat]"
        >
          <div slot="marker">
            <img :src="item.icon" alt="" />
          </div>
          <MglPopup>
            <a-card :title="item.name">
              <div>地址: {{ item.addr }}</div>
              <div>距離: {{ item.distance }} 公尺</div>
            </a-card>
          </MglPopup>
        </MglMarker>
      </MglMap>
    </div>

    <div class="flex justify-between">
      <div>
        <!-- <bar :chartData="busDatas.chartDatas"></bar> -->
      </div>
      <!-- <div>
        <bar :chartData="busDatas.chartDatas"></bar>
      </div> -->
    </div>
    {{ locateFeatures }}
  </div>
</template>
<script>
import { MglMap, MglMarker, MglPopup } from "vue-mapbox";
import { findAll, nominatim, nisc_bus } from "@/api/maps";
import { mapGetters, mapMutations, mapActions } from "vuex";
import bar from "./charts/bar.vue";

const ACCESS_TOKEN =
  "pk.eyJ1Ijoib3J6b3J6b29vIiwiYSI6ImNsOWh1dXpjdTVxeDgzdm9pa2cweG1raHUifQ.WEEOxYk0SqsysjOuOjUTmg";
const MAP_STYLE = "mapbox://styles/orzorzooo/cl9mf86c1001e16pow4fu38qt";

export default {
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    bar,
  },
  data() {
    return {
      accessToken: ACCESS_TOKEN, // your access token. Needed if you using Mapbox maps
      mapStyle: MAP_STYLE, // your map style
      locate: "",
      center: [],
      shop: [],
      busDatas: [],
      locateGeoInfo: null,
    };
  },

  async created() {
    // mapbox 要用這種方式宣告
    // this.map = null;
    // this.mapbox = Mapbox;
    // We need to set mapbox-gl library here in order to use it in template
  },

  computed: {
    ...mapGetters("map", ["shops", "shopNames", "locateFeatures"]),
  },

  methods: {
    ...mapMutations("map", ["setMap", "setMapNull"]),
    ...mapActions("map", ["getGeoData_nominatim", "getLocateFeatures"]),

    async onMapLoaded(event) {
      // in component
      this.map = event.map;
    },

    // get business 取得鄰近工商資訊
    async getBUS({ lon, lat, radius }) {
      try {
        const { data } = await nisc_bus({ lon, lat, radius });
        console.log("取得工商資訊:", data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    async analyzeBusDatas(datas = []) {
      const shopInfo = {};
      const datasets = [];
      for (let shop of this.shops) {
        shopInfo[shop.name] = { sum: 0 };
      }
      const markers = datas.filter((item, index) => {
        // shops資料在vuex
        for (let shop of this.shops) {
          if (item.name.match(shop.key)) {
            shopInfo[shop.name].sum += 1;
            item.icon = shop.icon;
            return true;
          }
        }
      });

      const labels = Object.keys(shopInfo);
      const data = Object.values(shopInfo).map((item) => item.sum);
      datasets.push({ data, label: "1km", borderRadius: 3 });
      const chartDatas = { labels, datasets };
      const res = { markers, chartDatas };
      console.log("res", res);
      return res;
    },

    async onSearch() {
      const getLocateGeo = await this.getGeoData_nominatim(this.locate);
      if (!getLocateGeo) return;
      const getLocateFeatures = await this.getLocateFeatures();
      if (!getLocateFeatures) return;

      // const geoData = await this.getGeoData_nominatim(this.locate);
      // if (!geoData) return;
      // const busDatas = await this.getBUS({
      //   lon: geoData.lon,
      //   lat: geoData.lat,
      //   radius: 1000,
      // });
      // this.busDatas = await this.analyzeBusDatas(busDatas);
      // this.map.flyTo({ center: [geoData.lon, geoData.lat], zoom: 15 });
    },
  },
};
</script>
<style>
/* @import "https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"; */
</style>
