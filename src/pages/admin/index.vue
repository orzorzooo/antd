<template>
  <div>
    <a-form-model
      :model="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-form-model-item label="Activity name">
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item label="上傳圖片">
        <fileUpload :fileList.sync="fileList"></fileUpload>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit"> Create </a-button>
        <a-button style="margin-left: 10px"> Cancel </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { create } from "@/api/property";
import fileUpload from "./components/fileUpload.vue";

export default {
  components: { fileUpload },
  data() {
    return {
      form: {
        name: "",
      },
      fileList: [],
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      const formData = new FormData();
      for (let file of this.fileList) {
        formData.append("file", file.originFileObj);
      }
      for (let prop in this.form) {
        formData.append(prop, this.form[prop]);
      }
      const { data } = await create(formData);
      if (data) this.$message.success("建立成功");
      console.log(data);
    },
  },
};
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
