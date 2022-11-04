<template>
  <div>
    <a-divider>物件資料</a-divider>
    <a-form-model
      :model="form"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-model-item label="發佈狀態">
        <a-radio-group v-model="form.status" button-style="solid">
          <a-radio-button :value="0">草稿</a-radio-button>
          <a-radio-button :value="1">發佈 </a-radio-button>
        </a-radio-group>
      </a-form-model-item>

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
        <a-radio-group v-model="form.space_type" button-style="solid">
          <a-radio-button
            v-for="(item, index) in options.space_types"
            :key="index"
            :value="item"
            >{{ item }}
          </a-radio-button>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item label="建物類型">
        <a-radio-group v-model="form.building_type" button-style="solid">
          <a-radio-button
            v-for="(item, index) in options.building_types"
            :key="index"
            :value="item"
            >{{ item }}
          </a-radio-button>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item label="建物樓層">
        <a-input-group compact>
          <a-input-number
            v-model="form.floors"
            style="width: 150px"
            :max="99"
            :min="-5"
            :formatter="
              (value) =>
                value > 0
                  ? `所在樓層: ${value} 樓`
                  : value == 0
                  ? `所在樓層: B ${Math.abs(value + 1)} 樓`
                  : `所在樓層: B ${Math.abs(value)} 樓`
            "
          />
          <a-input-number
            v-model="form.building_floors"
            style="width: 150px"
            :formatter="(value) => `建物共 ${value} 樓`"
            :min="1"
            :max="99"
          />
        </a-input-group>

        <!-- <a-input v-model="form.building_floors" /> -->
      </a-form-model-item>

      <!-- <a-form-model-item label="位於樓層">
        <a-input v-model="form.floors" />
      </a-form-model-item> -->

      <a-form-model-item label="坪數">
        <!-- <a-input v-model="form.square_meter" /> -->
        <a-input-number
          v-model="form.square_meter"
          style="width: 150px"
          :formatter="(value) => ` ${value} 坪`"
          :min="1"
        />
      </a-form-model-item>

      <a-form-model-item label="格局">
        <a-input-group compact>
          <a-input-number
            v-model="form.rooms"
            :formatter="(value) => `${value}房`"
            :min="1"
            :max="99"
          />
          <a-input-number
            v-model="form.halls"
            :formatter="(value) => `${value}廳`"
            :min="0"
            :max="99"
          />
          <a-input-number
            v-model="form.bathrooms"
            :formatter="(value) => `${value}衛浴`"
            :min="0"
            :max="99"
          />
          <a-input-number
            v-model="form.balconies"
            :formatter="(value) => `${value}陽台`"
            :min="0"
            :max="99"
          />
          <a-input-number
            v-model="form.kitchens"
            :formatter="(value) => `${value}廚房`"
            :min="0"
            :max="99"
          />
        </a-input-group>
      </a-form-model-item>
      <a-form-model-item label="停車位">
        <a-radio-group
          :defaultValue="null"
          v-model="form.parking_space"
          button-style="solid"
        >
          <a-radio-button :value="null"> 無</a-radio-button>
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
        <a-radio-group v-model="form.property_right" button-style="solid">
          <a-radio-button value="0"> 無</a-radio-button>
          <a-radio-button value="1"> 有</a-radio-button>
        </a-radio-group>
      </a-form-model-item>

      <!-- <a-form-model-item label="面積">
        <a-input-number
          v-model="form.building_square_meter"
          :formatter="(value) => `${value}坪`"
        />
      </a-form-model-item> -->

      <a-form-model-item label="用途">
        <a-select defaultValue="" v-model="form.use_for">
          <a-select-option
            v-for="(item, index) in options.use_fors"
            :key="index"
            :value="item"
            >{{ item }}</a-select-option
          >
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="最短租期">
        <a-select defaultValue="一個月" v-model="form.lease_term">
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
          :min="0"
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
          :min="0"
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
          :min="0"
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

      <a-divider>介紹</a-divider>

      <a-form-model-item label="顯示標題">
        <a-input v-model="form.title" />
      </a-form-model-item>

      <a-form-model-item label="介紹">
        <formEditor></formEditor>
      </a-form-model-item>

      <a-form-model-item label="選擇圖片">
        <selectImage></selectImage>
        <!-- <fileUpload></fileUpload> -->
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 12, offset: 4 }">
        <a-button
          @click="onSubmit"
          type="primary"
          :disabled="save ? true : false"
        >
          儲存
          <!-- {{ editMode ? "更新" : "建立" }}資產 -->
        </a-button>
        <a-button
          style="margin-left: 10px"
          @click="$router.push('/properties')"
        >
          離開
        </a-button>
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
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { create, findOne, update, remove } from "@/api/property";
import { update as fileUpdate, remove as fileRemove } from "@/api/file";
import selectArea from "./components/selectArea.vue";
import spec from "./components/spec.vue";
import fileUpload from "./components/fileUpload.vue";
import selectImage from "./components/selectImage.vue";
import formEditor from "./components/formEditor.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: { selectArea, spec, formEditor, selectImage },
  data() {
    return {
      editMode: false,
      loaded: false,
      save: false,
    };
  },
  computed: {
    ...mapGetters("property", [
      "getFiles",
      "getProperty",
      "property",
      "form",
      "options",
      "removedFiles",
    ]),
  },
  methods: {
    ...mapMutations("property", ["setProperty", "clearProperty"]),
    async onInit() {
      this.clearProperty();
      if (!this.$route.params.id) {
        return;
      }
      console.log("update");
      const { data } = await findOne(this.$route.params.id);
      this.setProperty(data);
    },
    async onSubmit(e) {
      e.preventDefault();
      console.log("data", this.form);

      const { data } = this.$route.params.id
        ? await update(this.form.id, this.form)
        : await create(this.form);
      if (data) this.$message.success("儲存成功");
      await this.updateFileRelation(data);
      this.save = true;
      // this.$router.push("/properties/property");
    },
    async updateFileRelation(data) {
      console.log("inputDATA", data);
      this.form.files.forEach((element) => {
        element.response.fileable_id = data.id;
        console.log(element.response.fileable_id);
        const file = fileUpdate(element.response.id, element.response);
      });
      this.removedFiles.forEach((ele) => {
        const remove = fileRemove(ele.response.id);
        console.log(remove);
      });
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
      this.save = true;
      this.$router.push("/properties");
    },
  },
  created() {
    console.log("test", this.property);
    this.onInit();
  },
  watch: {
    form: {
      deep: true,
      handler() {
        if (this.save) {
          console.log("change");
          this.save = false;
        }
      },
    },
  },

  beforeRouteLeave(to, from, next) {
    if (!this.save) {
      let leave = confirm("確定離開?");
      if (leave) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
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
