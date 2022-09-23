<template>
  <div>
    <h1>{{ editMode ? "更新" : "建立" }}資產</h1>
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

      <a-form-model-item label="特色">
        <spec></spec>
      </a-form-model-item>

      <a-form-model-item label="價位區間">
        <a-slider
          range
          :min="5000"
          :max="30000"
          v-model="form.priceRange"
          :defaultValue="[8000, 12000]"
          :step="200"
        />
        <h1>$ {{ form.priceRange[0] }} ~ $ {{ form.priceRange[1] }}</h1>
      </a-form-model-item>

      <a-form-model-item label="上傳圖片">
        <fileUpload :fileList.sync="fileList" :files="form.files"></fileUpload>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" @click="onSubmit">
          {{ editMode ? "更新" : "建立" }}資產
        </a-button>
        <a-button style="margin-left: 10px"> 取消 </a-button>
      </a-form-model-item>

      <a-form-model-item>
        <a-popconfirm
          title="Are you sure delete this task?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="onDeleteCheck"
        >
          <a>Delete</a>
        </a-popconfirm>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { create, findOne, update, remove } from "@/api/property";
import selectArea from "./components/selectArea.vue";
import spec from "./components/spec.vue";
import fileUpload from "./components/fileUpload.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: { fileUpload, selectArea, spec },
  data() {
    return {
      form: {
        name: "",
        description: "",
        address: "",
        area: "",
        priceRange: [8000, 12000],
        func: "rent",
        spec: null,
        files: [],
      },
      editMode: this.$route.params.id ? true : false,
      fileList: [],
      loaded: false,
    };
  },
  methods: {
    ...mapGetters("property", ["getFiles", "getProperty"]),
    ...mapMutations("property", ["setProperty"]),
    async onInit() {
      if (!this.editMode) return;
      const { data } = await findOne(this.$route.params.id);
      this.setProperty(data);
      this.form = data;
      console.log("price", this.form.price);
      this.fileList = this.form.files;
      this.loaded = true;
      console.log("form", this.form);
    },
    async onSubmit(e) {
      e.preventDefault();
      this.form.files = this.getFiles();
      if (this.editMode) {
        console.log("update");
        const { data } = await update(this.form.id, this.form);
        if (data) this.$message.success("建立成功");
        this.$router.push("/property");
      } else {
        const { data } = await create(this.form);
        if (data) this.$message.success("建立成功");
        this.$router.push("/property");
      }
    },
    onSelect(value) {
      this.form.area = `${value.city} ${value.area}`;
      this.form.address = `${value.city}${value.area}`;
      console.log(this.form.area);
    },
    onFuncChange(value) {
      console.log(value);
    },

    async onDeleteCheck() {
      const { data } = await remove(this.form.id);
      if (data) this.$message.success("刪除成功");
      this.$router.push("/property");
    },
  },
  created() {
    this.onInit();
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
