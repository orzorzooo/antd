<template>
  <div class="orz-card">
    <h1 class="text-center">商家 共:{{ bus.length }} 家</h1>
    <a-table size="small" :dataSource="bus" :columns="columns" bordered>
    </a-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("map", ["bus"]),
  },
  data() {
    return {
      datas: [],
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
