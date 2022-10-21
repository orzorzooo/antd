<template>
  <div>
    <div class="orz-card h-screen-120">
      <MglMap
        :accessToken="accessToken"
        :mapStyle="mapStyle"
        container="map-container"
        @load="onMapLoaded"
      />
    </div>
    <a-form-item label="Address">
      <a-input type="address" v-model="locate"></a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        class="orz-btn text-green-500 mb-5"
        @click="search"
        icon="plus-o"
      >
        新建</a-button
      >
    </a-form-item>
    {{ shop }}
  </div>
</template>
<script>
import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";
import { findAll } from "@/api/maps";
import axios from "axios";
const ACCESS_TOKEN =
  "pk.eyJ1Ijoib3J6b3J6b29vIiwiYSI6ImNsOWh1dXpjdTVxeDgzdm9pa2cweG1raHUifQ.WEEOxYk0SqsysjOuOjUTmg";
const MAP_STYLE = "mapbox://styles/orzorzooo/cl9hxghyh000614pj3k07al3w";
// const searchURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/San%20Francisco.json?access_token=pk.eyJ1Ijoib3J6b3J6b29vIiwiYSI6ImNsOWh1dXpjdTVxeDgzdm9pa2cweG1raHUifQ.WEEOxYk0SqsysjOuOjUTmg`;
const SEARCH_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/
`;
export default {
  components: {
    MglMap,
  },
  data() {
    return {
      map: null,
      accessToken: ACCESS_TOKEN, // your access token. Needed if you using Mapbox maps
      mapStyle: MAP_STYLE, // your map style
      locate: "",
      center: [],
      shop: [],
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
    async search() {
      const url = `${SEARCH_URL}` + this.locate + `.json`;
      console.log(url);
      const { data } = await axios.get(url, {
        params: {
          access_token: ACCESS_TOKEN,
          // proximity: `120.232905,22.9903046`,
        },
      });
      this.map.flyTo({ center: data.features[0].center });
      this.shop = await this.searchGEO(data.features[0].center);
      console.log(data);
    },
    async searchGEO(coordinate) {
      const url = `${SEARCH_URL}` + `7-11` + `.json`;
      const { data } = await axios.get(url, {
        params: {
          access_token: ACCESS_TOKEN,
          proximity: coordinate,
        },
      });
      return data;
    },
  },
};
</script>
