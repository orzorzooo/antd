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
        <a-button style="margin-left: 10px"> 取消 </a-button>
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
    ...mapMutations("product", ["setProduct"]),
    async submit() {
      const { data } = this.edit
        ? await update(this.form.id, this.form)
        : await create(this.form);
      console.log("更新", data);
      if (data) this.$message.success("更新成功");

      this.$router.push("/product");
    },
  },
};
</script>
<style scoped>
.ant-input-number {
  width: 100%;
}
</style>
