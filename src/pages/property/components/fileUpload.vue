<template>
  <div>
    <a-upload
      list-type="picture"
      class="upload-list-inline"
      :customRequest="handleRequest"
      @change="handleChange"
      accept=".jpg, .png, .jpeg"
      :multiple="true"
    >
      <a-button> <a-icon type="upload" /> upload </a-button>
    </a-upload>

    <a-table :dataSource="files" :columns="fileColumns" rowKey="id">
      <span slot="url" slot-scope="record">
        <img
          :src="BASEURL.replace('/api', '/') + record"
          alt=""
          style="width: 200px"
        />
      </span>
    </a-table>
  </div>
</template>

<script>
import { BASEURL } from "@/utils/request";
export default {
  data() {
    return {
      BASEURL,
      fileColumns: [
        {
          title: "檔名",
          dataIndex: "name",
        },

        {
          title: "圖片",
          dataIndex: "url",
          scopedSlots: { customRender: "url" },
        },
      ],
    };
  },
  methods: {
    handleRequest(file) {
      return;
    },
    handleChange(file) {
      console.log("onChange", file.fileList);
      this.$emit("update:fileList", file.fileList);
    },
  },
  props: ["fileList", "files"],
};
</script>
<style scoped>
/* tile uploaded pictures */
.upload-list-inline >>> .ant-upload-list-item {
  float: left;
  width: 200px;
  margin-right: 8px;
}
.upload-list-inline >>> .ant-upload-animate-enter {
  animation-name: uploadAnimateInlineIn;
}
.upload-list-inline >>> .ant-upload-animate-leave {
  animation-name: uploadAnimateInlineOut;
}
</style>
