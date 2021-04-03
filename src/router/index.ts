// https://next.router.vuejs.org/zh/api/#addroute-2
import { createRouter, createWebHashHistory } from "vue-router";
// 免登陆可进入的页面(白名单)
const whiteList = ["/login", "/403", "/404"];
import { ElLoading, ElMessage } from "element-plus";
/** 全局加载 */
const loadingFun = (text = "初始化数据加载中...") => {
  return (ElLoading as any).service({
    lock: true,
    fullscreen: true,
    text,
  });
};
let loading = null;
/** 静态菜单列表 */
import routes from "./routes"
/** 导入Vuex实例 */
import store from "../store/index"
/** https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars */
/** 这里限制性很高，只有路径为/views/文件夹name/*.vue，的文件才能被识别，如果不在这个结构，自己增加吧，然后再合并 */
const modules = import.meta.glob('../views/*/*.vue');
/** 数否需要获取授权 */
(window as any).needAuth = true;
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
/** 每次路由变动开始，可以拦截，等待请求用户信息，获取权限，用户专属菜单等 */
router.beforeEach(async (to, from) => {
  // 不在白名单
  if (!whiteList.includes(to.path)) {
    /** 需要授权登录 */
    if ((window as any).needAuth) {
      loading = loadingFun();
      console.log("verify the login information at initialization");
      let menus: any = [];
      await store
        .dispatch("api/GetUserInfo")
        .then((res) => {
          if (res.code == 200) {
            (window as any).needAuth = false;
            menus = res.data.menus;
            /** 放在window下其实不安全，最好放到vuex里 */
            (window as any).userPosition = res.data.position;
            (window as any).permission = res.data.permission;
          }
        })
        .catch(() => { });
      // 需要登录，即获取用户信息时失败
      if ((window as any).needAuth) {
        (loading as any).close();
        return {
          path: "/login",
        };
      } else {
        /** 用户已经登录，在这里可以继续异步做登录后的事情，比如获取全局枚举等 */
        await store
          .dispatch("api/GetAllEnum")
          .then((res) => {
            if (res.code !== 200) {
              ElMessage({
                type: "error",
                duration: 0,
                showClose: true,
                message: `获取全局枚举信息失败！`,
              });
            }
          })
          .catch((err) => {
            ElMessage({
              type: "error",
              duration: 0,
              showClose: true,
              message: `获取全局枚举信息失败！`,
            });
          });
      }
      
      /**  递归路由 */
      let temp = depthRoute(menus, []);
      routes[0].children = [...temp, ...routes[0].children];
      /** 添加（重写）动态路由 */
      await router.addRoute(routes[0]);
      /** 生成菜单，排除不需要显示的菜单 */
      store.dispatch(
        "layout/SetMenus",
        menus.filter((item: any) => !item.hideInmenu)
      );
      (window as any).needAuth = false;

      /** 注意：这里如果直接runturn to，会提示404，迷惑行为，待考察 */
      (loading as any).close();
      // 清除全局等待函数
      loading = null;
      return { path: to.path };
    } else {
      // 不需要登录，直接进入下一步，在vue-router3中，可以return true也可以不做任何操作默认进入下一个路由
    }
  }
});
/** 每次路由变动后：可以做页面分析等 */
router.afterEach((to: any) => {
  // 切换选中的tab，请查看layout/tabs.vue
  store.dispatch("layout/SetCurrentTab", {
    label: to.name,
    path: to.path,
    icon: (to.meta||{}).icon,
  });
  (document as any).title = to.name ? `${to.name} - 花木兰` : '花木兰 - 后台管理系统模版Vue3+TS'
});
/**  递归方法，写入路由信息 */
function depthRoute(menus: array, routers: array) {
  menus.forEach((menu: any) => {
    if (menu.child && menu.child.length) {
      depthRoute(menu.child, routers);
    } else {
      routers.push({
        path: menu.path.substring(1),
        name: menu.name,
        // component: () => import(`../views${menu.file}`),
        component: modules[`../views${menu.file}`],
        meta: {
          ...(menu.meta || {}),
          title: menu.name,
          icon: menu.icon,
        },
      });
    }
  });
  return routers;
}
export default router;
