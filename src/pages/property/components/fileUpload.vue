<template>
  <div>
    <a-upload
      list-type="picture-card"
      accept=".jpg, .png, .jpeg"
      :action="UPLOAD_URL"
      :multiple="true"
      :fileList="files"
      @change="handleChange"
      @preview="handlePreview"
      :remove="remove"
      :data="{ type: 'property' }"
    >
      <div v-if="fileList.length < 8">
        <a-icon type="plus" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal
      :visible="previewVisible"
      :footer="null"
      @cancel="previewVisible = false"
    >
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import { BASEURL, STATICURL } from "@/utils/request";
import { remove, upload, UPLOAD_URL } from "@/api/file";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      BASEURL,
      UPLOAD_URL,
      previewVisible: false,
      previewImage: "",
    };
  },
  computed: {
    ...mapGetters("property", ["files", "fileList", "removedFiles"]),
  },
  methods: {
    ...mapMutations("property", ["setFiles", "setRemoveFile"]),
    handleChange(file) {
      this.setFiles(file.fileList);
    },

    async handlePreview(file) {
      this.previewImage = `${STATICURL}/${file.response.url}`;
      this.previewVisible = true;
    },

    async remove(file) {
      this.setRemoveFile(file); //vuex處理資料
    },
  },
};
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
