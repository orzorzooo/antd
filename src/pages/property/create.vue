<template>
  <div>
    <h1>建立資產</h1>
    <a-form-model
      :model="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-form-model-item label="名稱">
        <a-radio-group
          v-model="form.func"
          @change="onFuncChange"
          button-style="solid"
        >
          <a-radio-button value="rent"> 我要賣 </a-radio-button>
          <a-radio-button value="sell"> 我要租 </a-radio-button>
        </a-radio-group>
        <a-input v-model="form.name" placeholder="EX:舒適安心宅" />
      </a-form-model-item>
      <a-form-model-item label="說明">
        <!-- <a-input v-model="form.description" /> -->
        <a-textarea
          v-model="form.description"
          placeholder="EX:雙連站電梯套房/含管理費"
          :auto-size="{ minRows: 3, maxRows: 6 }"
        />
      </a-form-model-item>
      <a-form-model-item
        label="地區"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <selectArea @onSelect="onSelect"></selectArea>
      </a-form-model-item>
      <a-form-model-item label="地址">
        <a-input v-model="form.address" />
        <div v-if="form.address">
          <iframe
            width="100%"
            height="300"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            :src="`https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${form.address}&z=16&output=embed&t=`"
          ></iframe>
        </div>
      </a-form-model-item>

      <a-form-model-item label="功能">
        <spec @onChange="onSpecChange"></spec>
      </a-form-model-item>

      <a-form-model-item label="價位區間">
        <a-slider
          range
          :min="5000"
          :max="30000"
          v-model="form.price"
          :defaultValue="[8000, 12000]"
          :step="200"
        />
        <h1>$ {{ form.price[0] }} ~ $ {{ form.price[1] }}</h1>
      </a-form-model-item>

      <a-form-model-item label="上傳圖片">
        <fileUpload :fileList.sync="fileList"></fileUpload>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" @click="onSubmit"> Create </a-button>
        <a-button style="margin-left: 10px"> Cancel </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { create } from "@/api/property";
import selectArea from "./components/selectArea.vue";
import spec from "./components/spec.vue";
import fileUpload from "./components/fileUpload.vue";

export default {
  components: { fileUpload, selectArea, spec },
  data() {
    return {
      form: {
        name: "",
        description: "",
        address: "",
        area: "",
        price: [8000, 12000],
        func: "rent",
        spec: null,
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
      this.$router.push("/property");
      console.log(data);
    },
    onSelect(value) {
      this.form.area = `${value.city} ${value.area}`;
      this.form.address = `${value.city}${value.area}`;
      console.log(this.form.area);
    },
    onFuncChange(value) {
      console.log(value);
    },
    onSpecChange(value) {
      this.form.spec = JSON.stringify(value);
      console.log(this.form.spec);
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
