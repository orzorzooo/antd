<template>
  <div>
    <h1>物件資料</h1>
    <a-form-model
      :model="form"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-model-item
        label="地區"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
      >
        <selectArea @onSelect="onSelect"></selectArea>
      </a-form-model-item>

      <a-form-model-item label="地址">
        <a-input v-model="form.address" />
      </a-form-model-item>
      <a-form-model-item label="類型">
        <a-select>
          <!-- <div v-for="(item, index) in space_types" :key="index">
            <a-select-option :value="item">{{ item }}</a-select-option>
          </div> -->
        </a-select>
      </a-form-model-item>

      <!-- <a-form-model-item label="上傳圖片">
        <fileUpload :fileList.sync="fileList" :files="form.files"></fileUpload>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 12, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          {{ editMode ? "更新" : "建立" }}資產
        </a-button>
        <a-button style="margin-left: 10px"> 取消 </a-button>
      </a-form-model-item>

      <a-form-model-item label="危險動作">
        <a-collapse>
          <a-collapse-panel header="刪除資產">
            <a-popconfirm
              title="確定刪除?"
              ok-text="確定"
              cancel-text="取消"
              @confirm="onDeleteCheck"
              class="red"
            >
              <a>刪除資產</a>
            </a-popconfirm>
          </a-collapse-panel>
        </a-collapse>
      </a-form-model-item> -->
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
      editMode: false,
      fileList: [],
      loaded: false,
    };
  },
  computed: {
    ...mapGetters("property", [
      "getFiles",
      "getProperty",
      "property",
      "form",
      "space_types",
    ]),
  },
  methods: {
    ...mapMutations("property", ["setProperty"]),
    async onInit() {},
    async onSubmit(e) {
      e.preventDefault();
      // this.form.files = this.getFiles();
      // if (this.editMode) {
      //   console.log("update");
      //   const { data } = await update(this.form.id, this.form);
      //   if (data) this.$message.success("更新成功");
      //   this.$router.push("/property");
      // } else {
      //   const { data } = await create(this.form);
      //   if (data) this.$message.success("建立成功");
      //   this.$router.push("/property");
      // }
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
    console.log("test", this.property);
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
.red {
  color: red;
}
</style>
