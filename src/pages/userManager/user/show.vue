<template>
  <div>
    <a-descriptions title="使用者資訊">
      <a-descriptions-item label="名稱">
        {{ data.name }}
      </a-descriptions-item>
      <a-descriptions-item label="email">
        {{ data.email }}
      </a-descriptions-item>
      <a-descriptions-item label="狀態">
        {{ data.isActive ? "啟用" : "停用" }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>
<script>
import { findOne } from "@/api/user.js";
export default {
  data() {
    return {
      data: [],
    };
  },
  methods: {},
  computed: {},

  async created() {
    const { data } = await findOne(this.$route.params.id);
    this.data = data;
    // this.setProduct(data);
  },
};
</script>
