import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import commonjs from "rollup-plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";
const base: any = {
	isProd: process.env.NODE_ENV === 'production',
	/** 打包自动添加文件前缀路径 */
	href: '',
	/** 项目页面title */
	name: '花木兰 - 后台管理系统',
	/** 目标接口域名 */
	target: 'http://mulan.diumx.com'
	// target: 'http://127.0.0.1:8030'
}
// https://cn.vitejs.dev/config/#server-proxy
export default defineConfig({
  server: {
		host: process.env.HOST,
		port: process.env.PORT && Number(process.env.PORT),
		open: false,
		proxy: {
			// 项目接口
			'/api': {
				target: base.target,
				changeOrigin: true, //是否跨域
				rewrite: path => path.replace(/^\/api/, '/api'),
				cookieDomainRewrite: ''
			}
		}
	},
	resolve: {
		alias: {
			"/@/": resolve("./src"),
			"@assets": resolve("./src/assets/"),
			"@img": resolve("./src/assets/img/"),
			"@views": resolve("./src/views"),
			"@components": resolve("./src/components/"),
			"@api": resolve("./src/api/"),
			"@configs": resolve("./src/configs/"),
			"@utils": resolve("./src/utils/"),
		}
	},
	plugins: [
		vue()
	],
	// base: '/',
	build: {
		rollupOptions: {
			external: ["vue", "vuex", "element-plus", "vue-router"],
			plugins: [
				commonjs(),
				externalGlobals({
					vue: "Vue",
					vuex: "Vuex",
					"element-plus": "ElementPlus",
					"vue-router": "VueRouter "
				})
			]
		}
	},
})
