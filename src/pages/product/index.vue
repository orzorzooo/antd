<template>
  <div>
    <!-- <h1>Product</h1> -->
    <a-button
      class="editable-add-btn"
      style="margin-bottom: 8px"
      @click="$router.push('/product/update/')"
      icon="plus-o"
    >
      新建</a-button
    >
    <a-table :dataSource="dataSource" :columns="columns" rowKey="id">
      <a
        slot="name"
        slot-scope="text, record"
        @click="$router.push(`/product/show/${record.id}`)"
        >{{ record.name }}</a
      >
      <span slot="priceRange" slot-scope="text, record">
        {{ record.priceRange[0] }} ~ {{ record.priceRange[1] }}
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="$router.push(`/product/update/${record.id}`)">編輯</a>
      </span>
    </a-table>
  </div>
</template>
<script>
import { findAll } from "@/api/product";
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
          title: "廠商",
          dataIndex: "company_name",
          key: "company_name",
          // scopedSlots: { customRender: "priceRange" },
        },

        {
          title: "進貨價",
          dataIndex: "purchase_price",
          key: "purchase_price",
          // scopedSlots: { customRender: "priceRange" },
        },

        {
          title: "售價",
          dataIndex: "sell_price",
          key: "sell_price",
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
  computed: {
    // async dataSource() {
    //   const { data } = await findAll();
    //   return data;
    // },
  },
  async created() {
    const { data } = await findAll();
    this.dataSource = data;
  },
};
</script>
