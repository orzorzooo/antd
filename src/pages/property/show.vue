<template>
  <div>
    <a-descriptions :title="`資產: ${data.name}`" bordered v-if="data">
      <a-descriptions-item label="名稱">
        {{ data.name }}
      </a-descriptions-item>
      <br />
      <br />
      <a-descriptions-item label="地址">
        {{ data.address }}
      </a-descriptions-item>
      <br />
      <br />
      <a-descriptions-item label="說明">
        {{ data.description }}
      </a-descriptions-item>
      <br />
      <br />
      <a-descriptions-item label="圖片">
        <div v-for="(item, index) in data.files" :key="index">
          <img :src="`${STATICURL}/${item.url}`" alt="" />
        </div>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>
<script>
import { findOne } from "@/api/property.js";
import { request, api, STATICURL } from "@/utils/request";
export default {
  data() {
    return {
      data: null,
      STATICURL,
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
