<template>
  <div>
    <h1>資產管理</h1>
    <a-button
      class="editable-add-btn"
      style="margin-bottom: 8px"
      @click="$router.push('/properties/create')"
      icon="plus-o"
    >
      新建</a-button
    >
    <a-table :dataSource="dataSource" :columns="columns" rowKey="id">
      <a slot="name" slot-scope="text, record" @click="$router.push(`/properties/${record.id}`)">{{ record.title }}</a>
      <span slot="action" slot-scope="text, record">
        <a @click="$router.push(`/properties/update/${record.id}`)">編輯</a>
      </span>
      <span slot="status" slot-scope="text, record">
        {{ record.status | statusFilter }}
        <!-- <a-switch v-model="record.status" @change="handleStatus($event, record.id)" /> -->
      </span>
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
          dataIndex: "title",
          key: "id",
          scopedSlots: { customRender: "title" },
        },
        {
          title: "地區",
          dataIndex: "area",
          key: "area",
        },

        {
          title: "地址",
          dataIndex: "address",
          key: "address",
        },
        {
          title: "狀態",
          dataIndex: "status",
          key: "status",
          scopedSlots: { customRender: "status" },
        },
        // {
        //   title: "價格",
        //   dataIndex: "priceRange",
        //   key: "priceRange",
        //   scopedSlots: { customRender: "priceRange" },
        // },

        {
          title: "動作",
          key: "action",
          scopedSlots: { customRender: "action" },
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
    handleStatus(checked, id) {
      console.log(checked, id);
    },
  },
  created() {
    this.init();
  },
  filters: {
    statusFilter(value) {
      return value == "0" ? "草稿" : "發佈";
    },
  },
};
</script>
