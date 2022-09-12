<template>
  <div>
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item label="名稱">
        <a-input v-decorator="['name2', { rules: [{ required: true, message: '這是必填項目' }] }]" />
      </a-form-item>
      <a-form-item label="測試">
        <a-input v-decorator="['description']" />
      </a-form-item>

      <a-form-item label="上傳圖片">
        <fileUpload></fileUpload>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit"> Submit </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { create } from "@/api/property";
import fileUpload from "./components/fileUpload.vue";

export default {
  components: { fileUpload },
  data() {
    return {
      form: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      const validate = await this.form.validateFields().catch((err) => {
        return false;
      });
      if (!validate) return;
      try {
        const { data } = await create(validate);
        console.log("succes", data);
        this.$message.success("建立成功");
      } catch (error) {}

      // 另一種方法

      // this.form.validateFields(async (err, values) => {
      //   if (!err) {
      //     const { data } = await create(values);
      //     this.$message.success("成功");
      //     console.log(data);
      //   }
      // });
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
