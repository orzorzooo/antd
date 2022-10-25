<template>
  <div>
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
    <!-- <a-form-item>
      <a-button
        class="orz-btn text-green-500 mb-5"
        @click="handleSearch"
        icon="plus-o"
      >
        新建</a-button
      >
    </a-form-item> -->
    <div>
      {{ shops }}
    </div>
    <bar></bar>
  </div>
</template>
<script>
import { MglMap, MglMarker, MglPopup } from "vue-mapbox";
import { findAll, nominatim, nisc_bus } from "@/api/maps";
import { mapGetters } from "vuex";
import bar from "./charts/bar.vue";

const ACCESS_TOKEN =
  "pk.eyJ1Ijoib3J6b3J6b29vIiwiYSI6ImNsOWh1dXpjdTVxeDgzdm9pa2cweG1raHUifQ.WEEOxYk0SqsysjOuOjUTmg";
const MAP_STYLE = "mapbox://styles/orzorzooo/cl9mf86c1001e16pow4fu38qt";

// const MAP_STYLE = "mapbox://styles/mapbox/streets-v11";
// const SEARCH_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/ `;

import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

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

  created() {
    // mapbox 要用這種方式宣告
    this.map = null;
    // We need to set mapbox-gl library here in order to use it in template
  },

  computed: {
    ...mapGetters("map", ["shops", "shopNames"]),
  },

  methods: {
    async createMap() {
      mapboxgl.accessToken = ACCESS_TOKEN;
      const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/orzorzooo/cl9mf86c1001e16pow4fu38qt", // style URL
        center: [120.232905, 22.9903046], // starting position [lng, lat]
        zoom: 9, // starting zoom
        projection: "globe", // display the map as a 3D globe
      });
    },

    async onMapLoaded(event) {
      // in component
      this.map = event.map;
      // or just to store if you want have access from other components
      // this.$store.map = event.map;
      // const asyncActions = event.component.actions;
      // const newParams = await asyncActions.flyTo({
      //   center: [120.232905, 22.9903046],
      //   zoom: 16,
      //   speed: 2,
      // });
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
      // const shopSum = {};
      for (let shop of this.shops) {
        // shopSum[shop.name] = 0;
        shop.sum = 0;
      }
      const markers = datas.filter((item, index) => {
        // shops資料在vuex
        for (let shop of this.shops) {
          if (item.name.match(shop.key)) {
            item.icon = shop.icon;
            shop.sum += 1;
            return true;
          }
        }
      });

      return { markers };
    },

    // 利用nominatim反查geocode 的data
    async getGeoData_nominatim(locate) {
      try {
        const { data } = await nominatim(this.locate);
        if (data.length < 1) throw "沒有資訊";
        console.log("取得GeoData:", data);
        return data[0];
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async onSearch() {
      const geoData = await this.getGeoData_nominatim(this.locate);
      if (!geoData) return;
      const busDatas = await this.getBUS({
        lon: geoData.lon,
        lat: geoData.lat,
        radius: 1000,
      });
      this.busDatas = await this.analyzeBusDatas(busDatas);
      this.map.flyTo({ center: [geoData.lon, geoData.lat] });
    },
  },
};
</script>
<style>
/* @import "https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"; */
</style>
