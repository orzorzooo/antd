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
    <div class="orz-card h-screen-120" v-if="locateData.geoData">
      <MglMap
        :accessToken="accessToken"
        :mapStyle="mapStyle"
        @load="onMapLoaded"
      >
        <MglMarker
          v-for="(item, index) in convinientShops.markers"
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

        <MglMarker
          v-for="(item, index2) in edu"
          :key="index2"
          :coordinates="[item.lon, item.lat]"
        >
          <div slot="marker">
            <a-icon type="bank" theme="filled" :style="{ fontSize: '32px' }" />
          </div>
          <MglPopup>
            <a-card :title="item.name">
              <div>地址: {{ item.addr }}</div>
              <div>距離: {{ item.distance }} 公尺</div>
            </a-card>
          </MglPopup>
        </MglMarker>

        <MglMarker
          v-for="(item, index3) in med"
          :key="index3"
          :coordinates="[item.lon, item.lat]"
        >
          <div slot="marker">
            <a-icon
              type="plus-circle"
              theme="filled"
              :style="{ fontSize: '32px' }"
            />
          </div>
          <MglPopup>
            <a-card :title="item.name">
              <div>地址: {{ item.addr }}</div>
              <div>距離: {{ item.distance }} 公尺</div>
            </a-card>
          </MglPopup>
        </MglMarker>
        <MglMarker
          color="red"
          :coordinates="[locateData.geoData.lon, locateData.geoData.lat]"
        >
          <MglPopup showed :closeButton="false" :closeOnClick="false">
            <div>{{ locateData.name }}</div>
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

    <div class="flex justify-between">
      <mapDataTable
        :datas="bus"
        :title="'商家'"
        v-if="bus.length"
      ></mapDataTable>
      <mapDataTable
        :datas="edu"
        :title="'文教'"
        v-if="edu.length"
      ></mapDataTable>
      <mapDataTable
        :datas="med"
        :title="'醫療'"
        v-if="med.length"
      ></mapDataTable>
    </div>
  </div>
</template>
<script>
import { MglMap, MglMarker, MglPopup } from "vue-mapbox";
import { mapGetters, mapMutations, mapActions } from "vuex";
import bar from "./charts/bar.vue";
import tableBus from "./charts/tableBUS.vue";
import mapDataTable from "./charts/mapDataTable.vue";

const ACCESS_TOKEN =
  "pk.eyJ1Ijoib3J6b3J6b29vIiwiYSI6ImNsOWh1dXpjdTVxeDgzdm9pa2cweG1raHUifQ.WEEOxYk0SqsysjOuOjUTmg";
const MAP_STYLE = "mapbox://styles/orzorzooo/cl9mf86c1001e16pow4fu38qt";

export default {
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    bar,
    tableBus,
    mapDataTable,
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
    this.locate = this.locateData.name ? this.locateData.name : "";
  },

  computed: {
    ...mapGetters("map", [
      "shops",
      "shopNames",
      "locateFeatures",
      "convinientShops",
      "locateData",
      "bus",
      "med",
      "edu",
    ]),
  },

  methods: {
    ...mapMutations("map", ["setMap", "setMapNull"]),
    ...mapActions("map", ["getGeoData_nominatim", "getLocateFeatures_v2"]),

    async onMapLoaded(event) {
      // in component
      this.map = event.map;
      if (this.locateData.geoData) {
        this.map.flyTo({
          center: [this.locateData.geoData.lon, this.locateData.geoData.lat],
          zoom: 15,
        });
      }
    },

    async onSearch() {
      const getLocateGeo = await this.getGeoData_nominatim(this.locate);
      if (!getLocateGeo) return;
      const getLocateFeatures = await this.getLocateFeatures_v2();
      if (!getLocateFeatures) return;
      this.map.flyTo({
        center: [this.locateData.geoData.lon, this.locateData.geoData.lat],
        zoom: 15,
      });
    },
  },
};
</script>
