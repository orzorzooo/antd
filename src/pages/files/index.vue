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
                @cancel="cancel"
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
      <a-upload-dragger
        v-if="modal_create"
        name="file"
        :multiple="true"
        :customRequest="customRequest"
        @change="handleChange"
        :data="uploadParam"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">點擊或拖動檔案到此上傳</p>
        <p class="ant-upload-hint">支援單一檔案或多檔同時上傳</p>
      </a-upload-dragger>
    </a-modal>
  </div>
</template>
<script>
// 改用files
import { URL, ASSETS_URL, findAll, create, remove } from "@/api/files";
export default {
  data() {
    return {
      datas: [],
      ASSETS_URL,
      URL,
      modal: false,
      modal_create: false,
      image: null,
      uploadParam: {
        type: "file",
      },
    };
  },
  methods: {
    async init() {
      const { data } = await findAll();
      this.datas = data;
      console.log(data);
    },
    handleChange(info) {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    async handleDelete(item) {
      try {
        const { data } = await remove(item.id);
        this.init();
      } catch (error) {}
    },
    async customRequest(filedata) {
      const formData = new FormData();
      formData.append("file", filedata.file);
      formData.append("type", "file");
      try {
        const { data } = await create(formData);
        console.log(data);
        filedata.onSuccess(data, filedata);
        this.modal_create = false;
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
