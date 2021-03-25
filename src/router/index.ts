// https://next.router.vuejs.org/zh/api/#addroute-2
import { createRouter, createWebHashHistory } from "vue-router";
// 免登陆可进入的页面(白名单)
const whiteList = ['/login', '/403', '/404']
/** 全局加载 */
// const loadingFun = (text = '初始化数据加载中...') => {
// 	return ELEMENT.Loading.service({
// 		lock: true,
// 		text
// 	})
// }
let loading = false
/** 静态菜单列表 */
import routes from "./routes";
/** 导入Vuex实例 */
import store from "../store/index";
/** 数否需要获取授权 */
(window as any).needAuth = true;

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach(async (to, from) => {
  // 不在白名单
    if (!whiteList.includes(to.path)) {
      /** 需要授权登录 */
      if ((window as any).needAuth) {
        console.log('verify the login information at initialization')
        let menus: any = []
        await store.dispatch('api/GetUserInfo').then(res => {
          if (res.code == 200) {
            (window as any).needAuth = false;
            menus = res.data.menus;
            (window as any).userPosition = res.data.position;
            (window as any).permission = res.data.permission;
          }
        }).catch(() => {})
        // 需要登录
        if ((window as any).needAuth) {
          return {
            path: '/login'
          }
        } else {
          /** 在这里可以继续异步做登录后的事情，比如获取全局枚举等 */
        }
        /**  递归路由 */
        let temp = depthRoute(menus, [])
        routes[0].children = [...temp, ...routes[0].children]
        /** 添加（重写）动态路由 */
        await router.addRoute(routes[0]);
        /** 生成菜单，排除不需要显示的菜单 */
        store.dispatch(
          "layout/SetMenus",
          menus.filter((item: any) => !item.hideInmenu)
        );
        (window as any).needAuth = false;
        loading = false
        /** 注意：这里如果直接runturn to，会提示404，迷惑行为，待考察 */
        return { path: to.path }
      } else {
        // return { path: '/login' }
      }
    }
});
/** 例如页面分析 */
router.afterEach((to: any) => {
  store.dispatch("layout/SetCurrentTab", {
    label: to.name,
    path: to.path,
    icon: to.meta.icon
  });
  (document as any).title = to.name?`${to.name} - 花木兰` : to.name
})
/**  递归方法，写入路由信息 */
function depthRoute(menus: array, routers: array) {
  menus.forEach((menu: any) => {
    if (menu.child && menu.child.length) {
      depthRoute(menu.child, routers)
    } else {
      routers.push({
        path: menu.path.substring(1),
        name: menu.name,
        component: () => import(`../views${menu.file}`),
        meta: {
          ...(menu.meta || {}),
          title: menu.name,
          icon: menu.icon
        }
      })
    }
  })
  return routers
}
export default router;
