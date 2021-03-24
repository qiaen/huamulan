// https://next.router.vuejs.org/guide
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
/** 菜单列表 */
// import menus from "./menus";
/** 导入Vuex实例 */
import store from "../store/index";
/** 数否需要获取授权 */
(window as any).needAuth = true;
const routes: RouteRecordRaw = [
  {
    path: "/",
    name: "首页",
    component: import("@views/layout/index.vue"),
    meta: {
      title: "首页",
    },
    children: [
      // {
      //   path: "",
      //   name: "Dashboard",
      //   component: () => import("@views/dashboard.vue"),
      //   meta: {
      //     title: "Dashboard",
      //     icon: "iconfont icon-dashboard",
      //   }
      // },
      {
        path: "login",
        name: "登录",
        component: () => import("@views/login/index.vue"),
        meta: {
          icon: "el-icon-s-platform",
          title: "login",
        },
      },
      {
        path: '/403',
        name: '无权限',
        file: '/error/403.vue',
        component: () => import('@views/error/403.vue'),
        meta: {
          title: '403',
          icon: 'el-icon-key'
        }
      }, 
      {
        path: '/:pathMatch(.*)*',
        name: '404',
        file: '/error/404.vue',
        component: () => import('@views/error/404.vue'),
        meta: {
          title: '404',
          icon: 'el-icon-key'
        }
      }
    ],
  },
]
/**  递归方法 */
function depthRoute(menus, routers) {
  menus.forEach(menu => {
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
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach(async (to, from) => {
  // 不在白名单
    if (!whiteList.includes(to.path)) {
      /** 需要授权登录 */
      console.log((window as any).needAuth)
      if ((window as any).needAuth) {
        console.log('verify the login information at initialization')
        let menus = []
        await store.dispatch('api/GetUserInfo').then(res => {
          if (res.code == 200) {
            window.needAuth = false
            menus = res.data.menus
            window.userPosition = res.data.position
            window.permission = res.data.permission
          }
        }).catch(() => {
        })
        /**  递归路由 */
        let temp = depthRoute(menus, [])
        routes[0].children = [...temp, ...routes[0].children]
        /** 添加（重写）动态路由 */
        await router.addRoute(routes[0]);
        /** 生成菜单，排除不需要显示的菜单 */
        store.dispatch(
          "layout/SetMenus",
          menus.filter((item) => !item.hideInmenu)
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
export default router;
