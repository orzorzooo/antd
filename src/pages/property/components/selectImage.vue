<template>
  <div>
    <div class="h-1/2">
      <a-checkbox-group v-model="selected_images" class="w-full">
        <a-row>
          <a-col
            :lg="8"
            :md="6"
            :span="12"
            v-for="(item, index) in datas"
            :key="index"
            class="p-1"
          >
            <a-checkbox class="w-full" :value="item.id">
              <div>
                <a-badge
                  class="absolute"
                  count="封面"
                  v-if="selected_images[0] == item.id"
                  :offset="[20, 10]"
                >
                  <a href=""></a>
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

    <orzUpload @onSuccess="init()"></orzUpload>
  </div>
</template>
<script>
import { URL, ASSETS_URL, findAll, create, remove } from "@/api/files";
import { mapMutations, mapGetters, mapState } from "vuex";
import orzUpload from "@/components/orz/upload.vue";
export default {
  components: { orzUpload },
  data() {
    return {
      datas: [],
    };
  },
  methods: {
    // ...mapMutations("property", ["setFiles", "setSelectedImages"]),
    async init() {
      const { data } = await findAll();
      console.log(data);
      this.datas = data;
    },
  },
  computed: {
    ...mapGetters("property", ["form"]),
    selected_images: {
      get() {
        return this.$store.state.property.selected_images;
      },
      set(val) {
        this.$store.commit("property/setSelectedImages", val);
      },
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
