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
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
  props: ["fileList"],
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
