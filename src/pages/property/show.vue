<template>
  <div>
    <a-descriptions :title="`資產: ${data.name}`" bordered v-if="data">
      <a-descriptions-item label="功能">
        {{ data.func | mapFunc }}
      </a-descriptions-item>
      <br />
      <br />

      <a-descriptions-item label="名稱">
        {{ data.name }}
      </a-descriptions-item>
      <br />
      <br />
      <a-descriptions-item label="說明">
        {{ data.description }}
      </a-descriptions-item>

      <br />
      <br />
      <a-descriptions-item label="區域">
        {{ data.area }}
      </a-descriptions-item>

      <br />
      <br />
      <a-descriptions-item label="地址">
        {{ data.address }}
        <iframe
          width="100%"
          height="200"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          :src="`https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${data.address}&z=16&output=embed&t=`"
        ></iframe>
      </a-descriptions-item>
      <br />
      <br />
      <a-descriptions-item label="特色">
        <a-row>
          <a-col v-for="(item, index) in data.spec" :key="index" :span="8">
            <!-- <a-icon :type="item.icon" /> -->
            {{ item }}
          </a-col>
        </a-row>
      </a-descriptions-item>
      <br />
      <br />
      <a-descriptions-item label="價位">
        $ {{ data.price[0] }} ~ {{ data.price[1] }}
      </a-descriptions-item>

      <br /><br />
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
  filters: {
    mapFunc(value) {
      const map = {
        rent: "出租",
        sale: "銷售",
      };
      return map[value];
    },
  },
};
</script>
