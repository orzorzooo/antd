<template>
  <div>
    <a-upload-dragger
      name="file"
      :multiple="true"
      :customRequest="customRequest"
      @change="handleChange"
    >
      <p class="ant-upload-drag-icon">
        <a-icon type="inbox" />
      </p>
      <p class="ant-upload-text">點擊或拖動檔案到此上傳</p>
      <p class="ant-upload-hint">支援單一檔案或多檔同時上傳</p>
    </a-upload-dragger>
  </div>
</template>
<script>
import { URL, ASSETS_URL, create } from "@/api/files";
export default {
  data() {
    return {
      ASSETS_URL,
      URL,
    };
  },
  methods: {
    handleChange(info) {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        this.$message.success(`${info.file.name} 上傳完成`);
      } else if (status === "error") {
        this.$message.error(`${info.file.name} 上傳失敗`);
      }
    },
    async customRequest(filedata) {
      const formData = new FormData();
      formData.append("file", filedata.file);
      formData.append("type", "file");
      try {
        const { data } = await create(formData);
        console.log(data);
        filedata.onSuccess(data, filedata);
        this.$emit("onSuccess", data);
      } catch (error) {}
    },
  },
};
</script>
