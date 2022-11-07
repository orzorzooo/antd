<template>
  <div>
    <a-checkbox-group v-model="form.files" class="w-full">
      <!-- {{ form.files }} -->
      <a-row>
        <a-col
          :lg="8"
          :md="6"
          :span="12"
          v-for="(item, index) in datas"
          :key="index"
          class="p-1"
        >
          <a-checkbox class="w-full" :value="item">
            <div>
              <a-badge
                class="absolute"
                count="首圖"
                v-if="form.files[0] == item"
                :offset="[0, 0]"
              >
              </a-badge>
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
                  class="orz-img-wrapper object-cover w-full h-full rounded-2xl"
                />
              </div>
            </div>
          </a-checkbox>
        </a-col>
      </a-row>
    </a-checkbox-group>
  </div>
</template>
<script>
import { URL, ASSETS_URL, findAll, create, remove } from "@/api/files";
import { mapMutations, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      datas: [],
    };
  },
  methods: {
    ...mapMutations("property", ["setFiles"]),
    async init() {
      const { data } = await findAll();
      this.datas = data;
    },
  },
  computed: {
    ...mapGetters("property", ["form"]),
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
<style scoped>
.orz-img {
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  position: relative;
}
.orz-img-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
