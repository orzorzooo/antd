<template>
  <div>
    <h1>update</h1>
    <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
      <a-form-model-item label="品名">
        <a-input v-model="form.name"></a-input>
      </a-form-model-item>
      <a-form-model-item label="品牌">
        <a-input v-model="form.brand"></a-input>
      </a-form-model-item>
      <a-form-model-item label="進價">
        <a-input-number
          v-model="form.purchase_price"
          :formatter="
            (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          "
          :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
          size="large"
        >
        </a-input-number>
      </a-form-model-item>
      <a-form-model-item label="售價">
        <a-input-number
          v-model="form.sell_price"
          :formatter="
            (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          "
          :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
          size="large"
        >
        </a-input-number>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submit">
          {{ edit ? "更新" : "新增" }}產品
        </a-button>
        <a-button style="margin-left: 10px" @click="$router.push('/product')">
          取消
        </a-button>
      </a-form-model-item>

      <a-form-model-item label="危險動作">
        <a-collapse>
          <a-collapse-panel header="刪除資產">
            <a-popconfirm
              title="確定刪除?"
              ok-text="確定"
              cancel-text="取消"
              @confirm="onDelete"
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
import { create, findOne, update, remove } from "@/api/product";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      edit: false,
    };
  },
  computed: {
    ...mapGetters("product", ["product", "form"]),
  },
  methods: {
    ...mapMutations("product", ["setProduct", "clearProduct"]),
    async submit() {
      console.log(this.form, this.edit);
      const { data } = this.edit
        ? await update(this.form.id, this.form)
        : await create(this.form);
      console.log("更新", data);
      if (data) this.$message.success("更新成功");

      this.$router.push("/product");
    },
    async onDelete() {
      const { data } = await remove(this.form.id);
      if (data) this.$message.success("刪除成功");
      this.$router.push("/property");
    },
  },
  async created() {
    this.clearProduct();
    if (this.$route.params.id) {
      this.edit = true;
      const { data } = await findOne(this.$route.params.id);
      this.setProduct(data);
      console.log(data);
    }
  },
};
</script>
<style scoped>
.ant-input-number {
  width: 100%;
}
</style>
