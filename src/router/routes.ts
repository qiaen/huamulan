// 注意，name要和组件内的name一致，用于路由缓存识别！！！
// disCache：true配置后，禁用页面缓存
const loginComponentPath = "/login/index"
async function setView(pathname: string) {
  const file = await import(`../views${pathname}.vue`)
  return file
}
export default [
  {
    path: "/",
    name: "首页",
    component: import("@views/layout/index.vue"),
    meta: {
      title: "首页",
    },
    children: [
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
  {
    path: "/login",
    name: "登录",
    // 常规导入，完美，但是通过传入的path name就不行，
    // 因为项目中存在根据服务器给的path name来渲染页面的情况，特别是在做权限动态路由的时候
    component: () => import(`@views/login/index.vue`),
    // TypeError: Failed to resolve module specifier '@views/login/index.vue?import' at component (routes.ts:38)
    // component: () => setView(loginComponentPath),
    meta: {
      icon: "el-icon-s-platform",
      title: "login",
    },
  }
]
