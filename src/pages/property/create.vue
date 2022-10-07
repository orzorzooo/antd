<template>
  <div>
    <a-divider>物件資料</a-divider>
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
      <a-form-model-item label="空間類型">
        <a-select defaultValue="整層">
          <a-select-option
            v-for="(item, index) in options.space_types"
            :key="index"
            :value="item"
            >{{ item }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="建物類型">
        <a-select defaultValue="透天">
          <a-select-option
            v-for="(item, index) in options.building_types"
            :key="index"
            :value="item"
            >{{ item }}</a-select-option
          >
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="建物樓層">
        <a-input v-model="form.building_floors" />
      </a-form-model-item>

      <a-form-model-item label="位於樓層">
        <a-input v-model="form.floors" />
      </a-form-model-item>

      <a-form-model-item label="坪數">
        <a-input v-model="form.square_meter" />
      </a-form-model-item>

      <a-form-model-item label="格局">
        <a-input-group compact>
          <a-input-number
            v-model="form.rooms"
            :formatter="(value) => `${value}房`"
          />
          <a-input-number
            v-model="form.halls"
            :formatter="(value) => `${value}廳`"
          />
          <a-input-number
            v-model="form.bathrooms"
            :formatter="(value) => `${value}衛浴`"
          />
          <a-input-number
            v-model="form.balconies"
            :formatter="(value) => `${value}陽台`"
          />
          <a-input-number
            v-model="form.kitchens"
            :formatter="(value) => `${value}廚房`"
          />
        </a-input-group>
      </a-form-model-item>
      <a-form-model-item label="停車位">
        <a-radio-group
          defaultValue=""
          v-model="form.parking_sapce"
          button-style="solid"
        >
          <a-radio-button value=""> 無</a-radio-button>
          <a-radio-button value="car"> 汽車車格</a-radio-button>
          <a-radio-button value="bike"> 機車車格</a-radio-button>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item label="客戶條件">
        <a-radio-group
          :defaultValue="null"
          v-model="form.gender_condition"
          button-style="solid"
        >
          <a-radio-button :value="null"> 無</a-radio-button>
          <a-radio-button value="male">限男 </a-radio-button>
          <a-radio-button value="female"> 限女</a-radio-button>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item label="產權登記">
        <a-radio-group
          :defaultValue="false"
          v-model="form.property_right"
          button-style="solid"
        >
          <a-radio-button :value="false"> 無</a-radio-button>
          <a-radio-button :value="true"> 有</a-radio-button>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item label="面積">
        <a-input-number
          v-model="form.building_square_meter"
          :formatter="(value) => `${value}坪`"
        />
      </a-form-model-item>

      <a-form-model-item label="用途">
        <a-select defaultValue="">
          <a-select-option
            v-for="(item, index) in options.use_fors"
            :key="index"
            :value="item"
            >{{ item }}</a-select-option
          >
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="最短租期">
        <a-select defaultValue="一個月">
          <a-select-option
            v-for="(item, index) in options.lease_terms"
            :key="index"
            :value="item"
            >{{ item }}</a-select-option
          >
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="租金">
        <a-input-number
          v-model="form.rent_price"
          :formatter="
            (value) => `$ ${value} 元/月`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          "
          :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
          size="large"
          style="width: 100%"
          :step="500"
        >
        </a-input-number>
      </a-form-model-item>

      <a-form-model-item label="管理費">
        <a-input-number
          v-model="form.management_fee"
          :formatter="
            (value) => `$ ${value} 元/月`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          "
          :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
          size="large"
          style="width: 100%"
          :step="500"
        >
        </a-input-number>
      </a-form-model-item>

      <a-form-model-item label="押金">
        <a-input-number
          v-model="form.deposit"
          :formatter="
            (value) => `$ ${value} 元`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          "
          :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
          size="large"
          style="width: 100%"
          :step="500"
        >
        </a-input-number>
      </a-form-model-item>

      <a-form-model-item label="硬體設備">
        <a-checkbox-group
          v-model="form.hardwares"
          name="checkboxgroup"
          :options="options.hardwares"
        />
      </a-form-model-item>

      <a-divider>身份資料</a-divider>

      <a-form-model-item label="身份">
        <a-radio-group
          defaultValue="房東"
          v-model="form.owner_role"
          button-style="solid"
        >
          <a-radio-button
            v-for="(item, index) in options.owner_roles"
            :key="index"
            :value="item"
          >
            {{ item }}</a-radio-button
          >
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item label="Line ID">
        <a-input v-model="form.line_id" />
      </a-form-model-item>

      <a-form-model-item label="手機號碼">
        <a-input v-model="form.cell_phone" />
      </a-form-model-item>

      <a-form-model-item label="建物樓層">
        <a-input v-model="form.building_floors" />
      </a-form-model-item>

      <a-divider>介紹</a-divider>

      <a-form-model-item label="顯示標題">
        <a-input v-model="form.title" />
      </a-form-model-item>

      <a-form-model-item label="介紹">
        <formEditor></formEditor>
      </a-form-model-item>

      <a-form-model-item label="上傳圖片">
        <fileUpload></fileUpload>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 12, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          {{ editMode ? "更新" : "建立" }}資產
        </a-button>
        <a-button style="margin-left: 10px"> 取消 </a-button>
      </a-form-model-item>

      <!-- <a-form-model-item label="危險動作">
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
import formEditor from "./components/formEditor.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: { fileUpload, selectArea, spec, formEditor },
  data() {
    return {
      editMode: false,
      loaded: false,
    };
  },
  computed: {
    ...mapGetters("property", [
      "getFiles",
      "getProperty",
      "property",
      "form",
      "options",
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
