import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
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
		"@api": resolve(__dirname, "./src/api/"),
		"@configs": resolve("./src/configs/"),
		"@units": resolve("./src/units/"),
	},
	plugins: [vue()],
})
