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
      name: "首頁",
      component: TabsView,
      redirect: "/dashboard",
      children: [
        {
          path: "dashboard",
          name: "儀錶板",
          meta: {
            icon: "dashboard",
          },
          component: () => import("@/pages/admin"),
        },
        {
          path: "property",
          name: "資產管理",
          meta: {
            icon: "home",
          },
          component: BlankView,
          children: [
            {
              path: "/property/",
              name: "資產管理",
              meta: {},
              component: () => import("@/pages/property"),
            },
            {
              path: "/property/create",
              name: "新建資產",
              meta: {
                invisible: true,
              },
              component: () => import("@/pages/property/create"),
            },
            {
              path: "/property/update/:id?",
              name: "更新資產",
              meta: {
                invisible: true,
              },
              component: () => import("@/pages/property/update"),
            },
            {
              path: "/property/:id",
              name: "資產內容",
              meta: {
                invisible: true,
              },
              component: () => import("@/pages/property/show"),
            },
          ],
        },
        {
          path: "product",
          name: "產品管理",
          meta: {
            icon: "home",
          },
          component: BlankView,
          children: [
            {
              path: "/product/",
              name: "產品一覽",
              meta: {},
              component: () => import("@/pages/product"),
            },
            {
              path: "/product/update/:id?",
              name: "新增產品",
              meta: {
                invisible: true,
              },
              component: () => import("@/pages/product/update"),
            },
          ],
        },

        // {
        //   path: "security",
        //   name: "門禁安全",
        //   meta: {
        //     icon: "lock",
        //   },
        //   component: () => import("@/pages/property"),
        // },
        // {
        //   path: "user",
        //   name: "房客管理",
        //   meta: {
        //     icon: "user",
        //   },
        //   component: () => import("@/pages/property"),
        // },
        // {
        //   path: "comsume",
        //   name: "耗材管理",
        //   meta: {
        //     icon: "file-ppt",
        //   },
        //   component: () => import("@/pages/property"),
        // },
        // {
        //   path: "transaction",
        //   name: "交易",
        //   meta: {
        //     icon: "bar-chart",
        //   },
        //   component: () => import("@/pages/property"),
        // },

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
