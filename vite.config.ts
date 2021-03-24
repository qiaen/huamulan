import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const base = {
	isProd: process.env.NODE_ENV === 'production',
	// ！！重要！！发布后的项目地址
	href: '',
	// 项目页面title
	name: '花木兰 - 后台管理系统',
	// 目标接口域名
	target: 'http://lanling.diumx.com',
	// target: 'http://localhost:8021',
}
// https://vitejs.dev/config/
export default defineConfig({
  server: {
		host: process.env.HOST,
		port: process.env.PORT && Number(process.env.PORT),
		open: false,
		overlay: {
			warnings: false,
			errors: true
		},
		proxy: {
			// 项目接口
			'/api': {
				target: base.target,
				changeOrigin: true, //是否跨域
				pathRewrite: {
					'^/api': '/api' //重写接口
				},
				cookieDomainRewrite: ''
			}
		}
	},
  alias: {
    "/@/": resolve("./src"),
    "@assets": resolve("./src/assets/"),
    "@img": resolve("./src/assets/img/"),
    "@views": resolve("./src/views"),
    "@components": resolve("./src/components/"),
    "@api": resolve("./src/api/"),
    "@configs": resolve("./src/configs/"),
    "@units": resolve("./src/units/"),
  },
  plugins: [vue()],
})
