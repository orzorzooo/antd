<template>
  <div>
    <a-checkbox-group @change="onChange" :options="specs" :value="checked">
      <span slot="label" slot-scope="{ value }"> {{ value }}</span>
    </a-checkbox-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked: [],
      specs: [
        { label: "洗衣機", value: "洗衣機", icon: "skin" },
        { label: "烘衣機", value: "烘衣機", icon: "skin" },
        { label: "瓦斯爐", value: "瓦斯爐", icon: "fire" },
        { label: "智能防護", value: "智能防護", icon: "insurance" },
        { label: "一級節能", value: "一級節能", icon: "thunderbolt" },
        { label: "智慧鎖", value: "智慧鎖", icon: "lock" },
      ],
    };
  },
  methods: {
    onChange(value) {
      console.log("bb", value);
      this.checked = value;
      this.$emit("onChange", value);
    },
  },
  props: ["propertySpecs"],
  watch: {
    propertySpecs() {
      this.checked = this.propertySpecs.split(",");
    },
  },
  async created() {},
};
</script>
