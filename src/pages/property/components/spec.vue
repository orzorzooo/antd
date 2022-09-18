<template>
  <div>
    <!-- <a-checkbox-group @change="onChange" v-model="specs">
      <a-row>
        <a-col v-for="(item, index) in specs" :key="index" :span="8">
          <a-checkbox v-model="item.value">
            <a-icon :type="item.icon" />
            {{ item.name }}
          </a-checkbox>
        </a-col>
      </a-row>
    </a-checkbox-group> -->
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
      this.$emit("onChange", value);
    },
  },
  props: ["propertySpecs"],
  watch: {
    propertySpecs() {
      this.checked = this.propertySpecs;
    },
  },
  async created() {
    console.log("fuck", this.propertySpecs);
    this.checked = this.propertySpecs;
    // if (this.propertySpecs) {
    //   for (let index in this.specs) {
    //     this.specs[index].value = true;
    //     for (let proertySpec of this.propertySpecs) {
    //     }
    //   }
    // }
  },
};
</script>
