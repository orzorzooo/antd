<template>
  <div>
    <a-row>
      <a-col
        :xl="4"
        :lg="6"
        :md="8"
        :sm="12"
        v-for="(item, index) in datas"
        :key="index"
        class="p-2"
      >
        <div>
          <div
            class="orz-img mb-3"
            slot="cover"
            @click="
              modal = true;
              image = item;
            "
          >
            <img
              :src="item.id | thumbnail"
              alt=""
              class="orz-img-wrapper object-cover w-full h-full rounded-xl"
            />
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { URL, ASSETS_URL, findAll, create, remove } from "@/api/files";
export default {
  data() {
    return {
      datas: [],
    };
  },
  methods: {
    async init() {
      const { data } = await findAll();
      this.datas = data;
    },
  },
  filters: {
    thumbnail(id) {
      return `${ASSETS_URL}/${id}?quality=25&width=300`;
    },
    title(value) {
      return value.length > 8 ? value.substring(0, 8) + "..." : value;
    },
  },
  created() {
    this.init();
  },
};
</script>
