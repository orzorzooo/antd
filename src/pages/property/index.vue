<template>
  <div>
    <h1>資產管理</h1>
    <!-- <StarOutlined /> -->
    <a-button
      class="editable-add-btn"
      style="margin-bottom: 8px"
      @click="$router.push('/property/create')"
      icon="plus-o"
    >
      新建</a-button
    >
    <a-table :dataSource="dataSource" :columns="columns">
      <a slot="name" slot-scope="text, record" @click="$router.push(`/property/${record.id}`)">{{ record.name }}</a>
    </a-table>
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
          key: "id",
          scopedSlots: { customRender: "name" },
        },

        {
          title: "地址",
          dataIndex: "address",
          key: "address",
        },

        {
          title: "地區",
          dataIndex: "area",
          key: "area",
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
