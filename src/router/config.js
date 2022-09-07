import TabsView from "@/layouts/tabs/TabsView";
import BlankView from "@/layouts/BlankView";
import PageView from "@/layouts/PageView";
import AdminLayout from "@/layouts/AdminLayout";

// 路由配置
const options = {
  routes: [
    {
      path: "/login",
      name: "登入頁",
      component: () => import("@/pages/login"),
    },
    {
      path: "*",
      name: "404",
      component: () => import("@/pages/exception/404"),
    },
    {
      path: "/403",
      name: "403",
      component: () => import("@/pages/exception/403"),
    },
    {
      path: "/",
      name: "首页",
      component: TabsView,
      redirect: "/home",
      children: [
        {
          path: "demo",
          name: "演示页",
          meta: {
            icon: "file-ppt",
          },
          component: () => import("@/pages/demo"),
        },
        {
          path: "home",
          name: "家目錄",
          meta: {
            icon: "file-ppt",
          },
          component: () => import("@/pages/admin"),
        },
        {
          path: "parent1",
          name: "父级路由1",
          meta: {
            icon: "dashboard",
          },
          component: BlankView,
          children: [
            {
              path: "demo1",
              name: "演示页面1",
              component: () => import("@/pages/demo"),
            },
          ],
        },
        {
          path: "parent2",
          name: "父级路由2",
          meta: {
            icon: "form",
          },
          component: PageView,
          children: [
            {
              path: "demo2",
              name: "演示页面2",
              component: () => import("@/pages/demo"),
            },
          ],
        },
        {
          path: "exception",
          name: "异常页",
          meta: {
            icon: "warning",
          },
          component: BlankView,
          children: [
            {
              path: "404",
              name: "Exp404",
              component: () => import("@/pages/exception/404"),
            },
            {
              path: "403",
              name: "Exp403",
              component: () => import("@/pages/exception/403"),
            },
            {
              path: "500",
              name: "Exp500",
              component: () => import("@/pages/exception/500"),
            },
          ],
        },
        {
          name: "验权页面",
          path: "auth/demo",
          meta: {
            icon: "file-ppt",
            authority: {
              permission: "form",
              role: "manager",
            },
            component: () => import("@/pages/demo"),
          },
        },
      ],
    },
  ],
};

export default options;
