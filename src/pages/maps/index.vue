<template>
  <div>
    <div class="orz-card h-screen-120">
      <MglMap
        :accessToken="accessToken"
        :mapStyle="mapStyle"
        container="map-container"
        @load="onMapLoaded"
      >
        <MglMarker
          v-for="(item, index) in busDatas"
          :key="index"
          :coordinates="[item.lon, item.lat]"
          color="red"
        >
          <MglPopup>
            <a-card :title="item.name">
              <div>地址: {{ item.addr }}</div>
              <div>距離: {{ item.distance }} 公尺</div>
            </a-card>
          </MglPopup>
        </MglMarker>
      </MglMap>
    </div>
    <a-form-item label="Address">
      <a-input type="address" v-model="locate"></a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        class="orz-btn text-green-500 mb-5"
        @click="handleSearch"
        icon="plus-o"
      >
        新建</a-button
      >
    </a-form-item>
    {{ busDatas }}
  </div>
</template>
<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker, MglPopup } from "vue-mapbox";
import { findAll, nominatim, nisc_bus } from "@/api/maps";
import axios from "axios";
const ACCESS_TOKEN =
  "pk.eyJ1Ijoib3J6b3J6b29vIiwiYSI6ImNsOWh1dXpjdTVxeDgzdm9pa2cweG1raHUifQ.WEEOxYk0SqsysjOuOjUTmg";
// const MAP_STYLE = "mapbox://styles/orzorzooo/cl9mf86c1001e16pow4fu38qt";
const MAP_STYLE = "mapbox://styles/mapbox/streets-v11";
const SEARCH_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/ `;
export default {
  components: {
    MglMap,
    MglMarker,
    MglPopup,
  },
  data() {
    return {
      map: null,
      accessToken: ACCESS_TOKEN, // your access token. Needed if you using Mapbox maps
      mapStyle: MAP_STYLE, // your map style
      locate: "",
      center: [],
      shop: [],
      busDatas: [],
    };
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },
  methods: {
    async onMapLoaded(event) {
      // in component
      this.map = event.map;
      // or just to store if you want have access from other components
      // this.$store.map = event.map;

      const asyncActions = event.component.actions;
      const newParams = await asyncActions.flyTo({
        center: [120.232905, 22.9903046],
        zoom: 16,
        speed: 2,
      });
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
      const sevenElevens = datas.filter((item, index) => {
        return item.name.match("統一超商");
      });
      const familyMarts = datas.filter((item, index) => {
        return item.name.match("全家便利");
      });
      console.log("便利商店資訊:", { "7-11": sevenElevens, 全家: familyMarts });
      return [...sevenElevens, ...familyMarts];
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
    async handleSearch() {
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
@import "https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css";
</style>
