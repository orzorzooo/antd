<template>
  <div>
    <h1>資產管理</h1>
    <a-button
      class="editable-add-btn"
      style="margin-bottom: 8px"
      @click="$router.push('/property/update/')"
      icon="plus-o"
    >
      新建</a-button
    >
    <a-table :dataSource="dataSource" :columns="columns" rowKey="id">
      <a
        slot="name"
        slot-scope="text, record"
        @click="$router.push(`/property/${record.id}`)"
        >{{ record.name }}</a
      >
      <span slot="priceRange" slot-scope="text, record">
        {{ record.priceRange[0] }} ~ {{ record.priceRange[1] }}
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="$router.push(`/property/update/${record.id}`)">編輯</a>
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
          dataIndex: "name",
          key: "id",
          scopedSlots: { customRender: "name" },
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
          title: "價格",
          dataIndex: "priceRange",
          key: "priceRange",
          scopedSlots: { customRender: "priceRange" },
        },

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
  },
  created() {
    this.init();
  },
};
</script>
