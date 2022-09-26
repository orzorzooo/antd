<template>
  <div>
    <a-descriptions :title="`資產: ${getProperty.name}`" bordered>
      <a-descriptions-item label="功能">
        {{ getProperty.func | mapFunc }}
      </a-descriptions-item>
      <br />
      <br />

      <a-descriptions-item label="名稱">
        {{ getProperty.name }}
      </a-descriptions-item>
      <br />
      <br />
      <a-descriptions-item label="說明">
        {{ getProperty.description }}
      </a-descriptions-item>

      <br />
      <br />
      <a-descriptions-item label="區域">
        {{ getProperty.area }}
      </a-descriptions-item>

      <br />
      <br />
      <a-descriptions-item label="地址">
        {{ getProperty.address }}
        <iframe
          width="100%"
          height="200"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          :src="`https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${getProperty.address}&z=16&output=embed&t=`"
        ></iframe>
      </a-descriptions-item>
      <br />
      <br />
      <a-descriptions-item label="特色">
        <a-row>
          <a-col
            v-for="(item, index) in getProperty.spec"
            :key="index"
            :span="8"
          >
            <!-- <a-icon :type="item.icon" /> -->
            {{ item }}
          </a-col>
        </a-row>
      </a-descriptions-item>
      <br />
      <br />
      <a-descriptions-item label="價位">
        <div v-if="getProperty">
          $ {{ getProperty.priceRange[0] }} ~ {{ getProperty.priceRange[1] }}
        </div>
      </a-descriptions-item>

      <br /><br />
      <a-descriptions-item label="圖片">
        <div v-for="(item, index) in getProperty.files" :key="index">
          <img :src="`${item.thumbUrl}`" alt="" />
        </div>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>
<script>
import { findOne } from "@/api/property.js";
import { request, api, STATICURL } from "@/utils/request";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      STATICURL,
    };
  },
  computed: {
    ...mapGetters("property", ["getProperty", "getFiles"]),
  },
  methods: {
    ...mapMutations("property", ["setProperty"]),
    async init() {
      const { data } = await findOne(this.$route.params.id);
      this.setProperty(data);
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
