<template>
  <div>
    <a-upload
      list-type="picture-card"
      accept=".jpg, .png, .jpeg"
      :action="UPLOAD_URL"
      :multiple="true"
      :fileList="getFiles"
      @change="handleChange"
      :remove="remove"
      :data="{ type: 'property' }"
    >
      <div v-if="fileList.length < 8">
        <a-icon type="plus" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
  </div>
</template>

<script>
import { BASEURL } from "@/utils/request";
import { remove, upload, UPLOAD_URL } from "@/api/file";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      BASEURL,
      UPLOAD_URL,
    };
  },
  computed: {
    ...mapGetters("property", ["getFiles", "fileList"]),
  },
  methods: {
    ...mapMutations("property", ["setFiles", "removeFile"]),
    handleChange(file) {
      this.setFiles(file.fileList);
    },
    async remove(file) {
      const index = this.getFiles.findIndex((ele) => {
        return (ele.uid = file.uid);
      });

      this.removeFile(index);
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
