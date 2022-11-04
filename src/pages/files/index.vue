<template>
  <div>
    <!-- <a-page-header title="檔案管理" @back="() => $router.go(-1)" class="p-3">
      <template slot="extra">
        <a-button key="3"> Operation </a-button>
        <a-button key="2"> Operation </a-button>
        <a-button key="1" type="primary"> Primary </a-button>
      </template>
    </a-page-header> -->
    <div class="orz-card2 w-full p-2 mb-5">
      <div class="flex justify-between">
        <div class="text-xl">檔案管理</div>
        <a-button class="orz-btn text-green-500" @click="modal_create = true">
          <a-icon key="edit" type="plus-o" />新增
        </a-button>
      </div>

      <!-- <a-button key="3"> Operation </a-button>
      <a-button key="2"> Operation </a-button>
      <a-button key="1" type="primary"> Primary </a-button> -->
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
              <a-button
                class="orz-btn text-red-500 p-0 ml-1"
                @click="$router.push({ name: '編輯使用者' })"
                type="danger"
                icon="delete"
              >
              </a-button>
            </div>
          </div>
        </div>
        <!-- <a-card hoverable>
       
        </a-card> -->
      </a-col>
    </a-row>
    <a-modal
      v-model="modal_create"
      title="Vertically centered modal dialog"
      centered
      width="60%"
      @ok="() => (modal = false)((image = null))"
    >
      <div class="w-full text-center" v-if="modal">
        <img :src="`${ASSETS_URL}/${image.id}`" alt="" class="w-full mx-auto" />
      </div>
    </a-modal>
    <!-- <a-modal
      v-model="modal"
      title="Vertically centered modal dialog"
      centered
      width="60%"
      @ok="() => (modal = false)((image = null))"
    >
      <div class="w-full text-center" v-if="modal">
        <img :src="`${ASSETS_URL}/${image.id}`" alt="" class="w-full mx-auto" />
      </div>
    </a-modal> -->
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
