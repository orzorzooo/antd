<template>
  <div>
    <a-descriptions title="商品">
      <a-descriptions-item label="名稱">
        {{ product.name }}
      </a-descriptions-item>
      <a-descriptions-item label="進貨價">
        {{ product.purchase_price }}
      </a-descriptions-item>
      <a-descriptions-item label="售價">
        {{ product.sell_price }}
      </a-descriptions-item>
    </a-descriptions>
    {{ product }}
  </div>
</template>
<script>
import { findOne } from "@/api/product.js";
import { request, api, STATICURL } from "@/utils/request";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations("product", ["setProduct"]),
  },
  computed: {
    ...mapGetters("product", ["product"]),
  },

  async created() {
    const { data } = await findOne(this.$route.params.id);
    this.setProduct(data);
  },
};
</script>
