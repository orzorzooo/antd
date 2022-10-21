import TabsView from "@/layouts/tabs/TabsView";
import BlankView from "@/layouts/BlankView";
import PageView from "@/layouts/PageView";
import AdminLayout from "@/layouts/AdminLayout";
export default {
  path: "maps",
  name: "圖資系統",
  redirect: "/maps/",
  meta: {
    icon: "environment",
  },
  component: BlankView,
  children: [
    {
      path: "/maps/map",
      name: "圖資總覽",
      meta: {},
      component: () => import("@/pages/maps/index"),
    },
  ],
};
