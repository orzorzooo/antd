<template>
  <div>
    <a-row>
      <a-col :span="6">
        <div class="orz-card text-center">
          <h3>使用者人數</h3>
          <h1>{{ datas.length }}</h1>
        </div>
      </a-col>
    </a-row>

    <!-- <h1>Product</h1> -->
    <a-button
      class="editable-add-btn orz-btn"
      style="margin-bottom: 8px"
      @click="$router.push({ name: '編輯使用者' })"
      icon="plus-o"
    >
      新建</a-button
    >
    <a-table :dataSource="datas" :columns="columns" rowKey="id">
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
        <a-tag :color="record.isActive ? '#87d068' : 'red'">
          {{ record.isActive ? "啟用" : "停用" }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a
          class="orz-btn"
          @click="
            $router.push({ name: '編輯使用者', params: { id: record.id } })
          "
          >編輯</a
        >
      </span>
    </a-table>
  </div>
</template>
<script>
import { findAll } from "@/api/user";
export default {
  data() {
    return {
      datas: [],
      columns: [
        {
          title: "名稱",
          dataIndex: "name",
          key: "id",
          scopedSlots: { customRender: "name" },
        },

        {
          title: "email",
          dataIndex: "email",
          key: "email",
          // scopedSlots: { customRender: "priceRange" },
        },
        {
          title: "身份",
          dataIndex: "roles",
          key: "roles",
          scopedSlots: { customRender: "roles" },
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
    this.datas = data;
  },
};
</script>
