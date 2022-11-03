<template>
  <div>
    <h1>files</h1>
    <a-row>
      <a-col span="6" v-for="(item, index) in datas" :key="index" class="p-2">
        <div>
          <div class="rounded-2xl">
            <img
              :src="`${ASSETS_URL}/${item.id}`"
              alt=""
              class="h-40 w-auto mx-auto rounded-2xl"
            />
          </div>
          <h2 class="text-md text-gray-500">{{ item.title }}</h2>
        </div>

        <!-- <a-card hoverable>
          <img slot="cover" alt="example" :src="`${ASSETS_URL}/${item.id}`" />
          <a-card-meta :title="item.filename_download">
            <template slot="description">
              {{ item.title }}
            </template>
          </a-card-meta>
        </a-card> -->
      </a-col>
    </a-row>
  </div>
</template>
<script>
// 改用files
import { ASSETS_URL, findAll } from "@/api/files";
export default {
  data() {
    return {
      datas: [],
      ASSETS_URL,
    };
  },
  methods: {
    async init() {
      const { data } = await findAll();
      this.datas = data;
      console.log(data);
    },
  },
  created() {
    this.init();
  },
};
</script>
