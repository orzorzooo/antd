<template>
  <div>
    <div class="orz-card2 w-full p-2 mb-5">
      <div class="flex justify-between">
        <div class="text-xl">檔案管理</div>
        <a-button class="orz-btn text-green-500" @click="modal_create = true">
          <a-icon key="edit" type="plus-o" />新增
        </a-button>
      </div>
    </div>
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
        <div class="orz-card">
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

          <div class="">
            <div class="">
              <div class="text-lg">{{ item.title | title }}</div>

              <div>
                {{ item.type.replace("image/", "") }} |
                {{ (item.filesize / 1024).toFixed(1) }} kb
              </div>
            </div>
            <div class="flex justify-between mt-2">
              <a-button
                class="orz-btn text-green-500"
                @click="$router.push({ name: '編輯使用者' })"
              >
                <a-icon key="edit" type="edit" />
                <!-- 編輯 -->
              </a-button>

              <a-popconfirm
                title="確定刪除?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="handleDelete(item)"
              >
                <a-button
                  class="orz-btn text-red-500 p-0 ml-1"
                  type="danger"
                  icon="delete"
                  @click.stop=""
                >
                </a-button>
              </a-popconfirm>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-modal v-model="modal_create" title="上傳圖片" centered>
      <orzUpload
        v-if="modal_create"
        @onSuccess="
          init();
          modal_create = false;
        "
      ></orzUpload>
    </a-modal>
  </div>
</template>
<script>
// 改用files
import { URL, ASSETS_URL, findAll, create, remove } from "@/api/files";
import orzUpload from "@/components/orz/upload.vue";
export default {
  components: { orzUpload },
  data() {
    return {
      datas: [],
      ASSETS_URL,
      URL,
      modal: false,
      modal_create: false,
      image: null,
    };
  },
  methods: {
    async init() {
      const { data } = await findAll();
      this.datas = data;
      console.log(data);
    },

    async handleDelete(item) {
      try {
        const { data } = await remove(item.id);
        this.init();
      } catch (error) {}
    },
  },
  created() {
    this.init();
  },
  filters: {
    thumbnail(id) {
      return `${ASSETS_URL}/${id}?quality=25&width=300`;
    },
    title(value) {
      return value.length > 8 ? value.substring(0, 8) + "..." : value;
    },
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
