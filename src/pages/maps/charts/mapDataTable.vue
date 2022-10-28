<template>
  <div class="p-5">
    <div class="orz-card">
      <h1 class="text-center">{{ title }} 共:{{ datas.length }} 家</h1>
      <a-table size="small" :dataSource="datas" :columns="columns" bordered>
      </a-table>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["datas", "title"],
  data() {
    return {
      columns: [
        {
          title: "名稱",
          dataIndex: "name",
          key: "name",
          // scopedSlots: { customRender: "name" },
        },
        {
          title: "距離(M)",
          dataIndex: "distance",
          key: "distance",
          // scopedSlots: { customRender: "name" },
        },
      ],
    };
  },
};
</script>
