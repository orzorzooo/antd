<template>
  <div>
    <a-checkbox-group @change="onChange">
      <a-row>
        <a-col v-for="(item, index) in specs" :key="index" :span="8">
          <a-checkbox @change="onChange" :value="item">
            <a-icon :type="item.icon" />
            {{ item.name }}
          </a-checkbox>
        </a-col>
      </a-row>
    </a-checkbox-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      specs: [
        { name: "洗衣機", value: false, icon: "skin" },
        { name: "烘衣機", value: false, icon: "skin" },
        { name: "瓦斯爐", value: false, icon: "fire" },
        { name: "智能防護", value: false, icon: "insurance" },
        { name: "一級節能", value: false, icon: "thunderbolt" },
        { name: "智慧鎖", value: false, icon: "lock" },
      ],
    };
  },
  methods: {
    onChange(value) {
      console.log(value);
      this.$emit("onChange", value);
    },
  },
};
</script>
