// 注意，name要和组件内的name一致，用于路由缓存识别！！！
// disCache：true配置后，禁用页面缓存
export default [
  {
    name: "Dashboard",
    icon: "iconfont icon-dashboard",
    path: "",
    file: "/dashboard.vue"
  },
  {
    name: "作业管理",
    icon: "iconfont icon-zuoyeguanli",
    path: "/task",
    children: [
      {
        name: "作业登记",
        icon: "iconfont icon-xiezi",
        path: "task/checkin",
        file: "/task/checkin.vue",
      },
      {
        name: "作业列表",
        icon: "iconfont icon-zuoye",
        path: "task",
        file: "/task/index.vue",
      },
      {
        name: "作业运维",
        icon: "iconfont icon-zhinengyunwei",
        path: "task/operate",
        file: "/task/operate.vue",
      },
    ],
  },
  {
    name: "数据源管理",
    icon: "iconfont icon-shujuyuanpeizhi",
    path: "datasource",
    children: [
      {
        name: "数据源列表",
        icon: "iconfont icon-zuoye",
        path: "datasource",
        file: "/datasource/index.vue",
      },
      {
        name: "同步作业",
        icon: "iconfont icon-tongbu",
        path: "datasource/sync",
        file: "/datasource/sync.vue",
      },
    ],
  },
  {
    name: "日志管理",
    icon: "iconfont icon-ico-",
    path: "daily",
    file: "/daily/index.vue",
  },
  {
    name: "JSON格式化",
    icon: "iconfont icon-json",
    path: "json",
    file: "/json/index.vue",
  },
  // {
  //   name: "登录",
  //   icon: "iconfont icon-json",
  //   path: "login",
  //   file: "/login/index.vue",
  //   hideInmenu: true
  // },
]
