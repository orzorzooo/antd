<template>
  <div>
    <a-upload list-type="picture" class="upload-list-inline" :customRequest="handleChange">
      <a-button> <a-icon type="upload" /> upload </a-button>
    </a-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      files: [],
      file: null,
    };
  },
  methods: {
    handleChange(file) {
      this.file = file;
    },
  },
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
