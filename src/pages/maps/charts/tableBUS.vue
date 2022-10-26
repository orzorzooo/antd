<template>
  <div>
    <a-table :dataSource="bus" :columns="columns"> </a-table>
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
