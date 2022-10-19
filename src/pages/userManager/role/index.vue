<template>
  <div>
    <!-- <h1>Product</h1> -->
    <a-button
      class="editable-add-btn orz-btn"
      style="margin-bottom: 8px"
      @click="$router.push('role/update')"
      icon="plus-o"
    >
      新建</a-button
    >
    <a-table :dataSource="dataSource" :columns="columns" rowKey="id">
      <a
        slot="name"
        slot-scope="text, record"
        @click="$router.push({ name: '使用者內容', params: { id: record.id } })"
        >{{ record.name }}</a
      >
      <span slot="roles" slot-scope="text, record">
        <a-tag :color="record.roles.name ? 'green' : 'red'">
          {{ record.roles.name }}
        </a-tag>
      </span>
      <span slot="active" slot-scope="text, record">
        <a-tag :color="record.isActive ? 'green' : 'red'">
          {{ record.isActive ? "啟用" : "停用" }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="$router.push(`role/update/${record.id}`)" class="orz-btn"
          >編輯</a
        >
      </span>
    </a-table>
  </div>
</template>
<script>
import { findAll } from "@/api/role";
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
          title: "狀態",
          dataIndex: "isActive",
          key: "isActive",
          scopedSlots: { customRender: "active" },
        },

        {
          title: "備註",
          dataIndex: "description",
          key: "description",
          // scopedSlots: { customRender: "priceRange" },
        },

        {
          title: "動作",
          key: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  computed: {},
  async created() {
    const { data } = await findAll();
    console.log(data);
    this.dataSource = data;
  },
};
</script>
