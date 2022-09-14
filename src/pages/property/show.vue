<template>
  <div>
    <a-descriptions title="User Info" bordered v-if="data">
      <a-descriptions-item label="名稱">
        {{ data.name }}
      </a-descriptions-item>
      <a-descriptions-item label="地址">
        {{ data.address }}
      </a-descriptions-item>
      <a-descriptions-item label="說明">
        {{ data.description }}
      </a-descriptions-item>
      <a-descriptions-item label="圖片">
        <div v-for="(item, index) in data.files" :key="index">
          <img :src="`localhost:3000/${item.url}`" alt="" />
        </div>
      </a-descriptions-item>
    </a-descriptions>
    <div>show {{ $route.params.id }}, {{ data }}</div>
  </div>
</template>
<script>
import { findOne } from "@/api/property.js";
export default {
  data() {
    return {
      data: null,
    };
  },
  methods: {
    async init() {
      const { data } = await findOne(this.$route.params.id);
      console.log(data);
      this.data = data;
    },
  },
  created() {
    this.init();
  },
};
</script>
