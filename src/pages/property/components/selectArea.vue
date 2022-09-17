<template>
  <div id="app">
    <Select v-model="cityIdx" :options="cities" />
    <Select v-model="areaIdx" :options="areas" />
    <!-- <br /> -->
    <!-- <h2>{{ cityIdx }} - {{ areaIdx }} - {{ zip }}</h2> -->
  </div>
</template>

<script>
import Select from "./selectArea_child.vue";
import cities from "./areas.json";

export default {
  name: "App",
  components: {
    Select,
  },
  data() {
    return {
      cityIdx: 0,
      areaIdx: 0,
    };
  },
  computed: {
    cities() {
      return cities;
    },
    areas() {
      return cities[this.cityIdx].areas;
    },
    zip() {
      return this.areas[this.areaIdx].zip;
    },
  },
  watch: {
    cityIdx() {
      this.areaIdx = 0;
      this.$emit("onSelect", {
        city: this.cities[this.cityIdx].name,
        area: this.areas[this.areaIdx].name,
      });
    },
    areaIdx() {
      this.$emit("onSelect", {
        city: this.cities[this.cityIdx].name,
        area: this.areas[this.areaIdx].name,
      });
    },
  },
  created() {
    this.$emit("onSelect", {
      city: this.cities[this.cityIdx].name,
      area: this.areas[this.areaIdx].name,
    });
  },
};
</script>
