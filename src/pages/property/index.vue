<template>
  <div>
    <h1>資產管理</h1>
    <!-- <StarOutlined /> -->
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd" icon="plus-o"> 新建</a-button>
    <a-table :dataSource="dataSource" :columns="columns" />
  </div>
</template>
<script>
import { findAll } from "@/api/property";
export default {
  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: "名稱",
          dataIndex: "name",
          key: "name",
        },

        {
          title: "地址",
          dataIndex: "address",
          // key: "address",
        },

        {
          title: "地區",
          dataIndex: "area",
          // key: "address",
        },
        {
          title: "動作",
          key: "action",
        },
      ],
    };
  },
  methods: {
    async init() {
      const { data } = await findAll();
      console.log(data);
      this.dataSource = data;
    },
    handleAdd() {},
  },
  created() {
    this.init();
  },
};
</script>
