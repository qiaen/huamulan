import { createRouter, createWebHashHistory } from "vue-router";
import { useStore } from "vuex";
/**菜单列表 */
import menus from './menus'
import store from '../store/index'
// 数否需要获取授权
(window as any).needAuth = true
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "首页",
      component: () => import("../views/layout/index.vue"),
      meta: {
        title: "首页",
      },
      children: [
        {
          path: "",
          name: "Dashboard",
          component: () => import("../views/dashboard.vue"),
          meta: {
            title: "Dashboard",
            icon: "iconfont icon-dashboard",
          },
        },
        {
          path: "/login",
          name: "登录",
          component: () => import("../views/login/index.vue"),
          meta: {
            icon: "el-icon-s-platform",
            title: "login",
          },
        },
      ],
    }
  ],
});

router.beforeEach(async (to, from)=>{
  if((window as any).needAuth) {
    store.dispatch('layout/SetMenus', menus);
		(window as any).needAuth = false
  }
  
  // console.log(to, from)
})
export default router;
