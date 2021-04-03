<h1><img height="52" src="https://assets.gitlab-static.net/uploads/-/system/project/avatar/25550254/dt-7.png?width=200"> 花木兰 - 后台管理系统模版</h1>

> 是一个基于Vue3+TS+Vite的前端系统管理框架，集成状态管理，动态路由，自主登录，权限控制等功能

在线预览[http://mulan.diumx.com](http://mulan.diumx.com "http://lanling.diumx.com")

git仓库[https://github.com/qiaen/huamulan](https://github.com/qiaen/huamulan "https://github.com/qiaen/huamulan")
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 前置的几个原则
- 代码请务必遵守[JavaScript Standard Style 规范](https://standardjs.com/readme-zhcn.html "JavaScript Standard Style")，不用的包和变量务必删除，有必要的话可以采用eslint，代码自动格式化，养成良好的团队协作习惯
- 所有的js，api接口最好采用用到时加载，不用不加载的原则，比如select下拉选择，尽量在用户focus时加载，如果需要提前显示，可以手动拼装下拉选项
- 所有的加载，下载中务必增加loading状态，避免用户焦虑
- 所有的按钮尽量在loading时增加loading等待状态，且loading时禁用点击
- 共用的js，比如vue，vuex，axios尽量使用公司内部的cdn，大的包采用外链导入，外链导入可以优化打包速度和并行加载速度，其他优点这里不做展开

## 集成了自主登录，无需配置host，支持ip+端口号访问，方便开发阶段各个设备的兼容性测试
![现场保留](https://github.com/qiaen/static/blob/master/34783.png?raw=true "现场保留")

## 弹出层项目预览
![详情抽屉](https://github.com/qiaen/static/blob/master/9483.png?raw=true "详情抽屉")

## axios请求前置处理，请注意api接口配置是根据项目而定
```javascript
// 请求状态判断
axios.defaults.timeout = 1000 * 60
axios.interceptors.request.use(
	function(config) {
		// 特殊接口，外部非data sync接口
		if (config.url.indexOf('/api') === 0 || config.url.indexOf('/sso') === 0) {
			config.baseURL = ''
		} else {
			// 要注意的地方
			config.baseURL = '/api'
		}
		config.withCredentials = true
		return config
	},
	function(error) {
		return Promise.reject(error)
	}
)
```
## 接口错误，已对错误状态比如未授权，请求超时添加全局处理，如果有需要的话依然可以被catch捕捉到
```javascript
// 返回状态判断
axios.interceptors.response.use(
	response => {
		let res = response.data
		if (res.code == 11) {
			if (process.env.NODE_ENV !== 'production') {
				window.location.href = '#/login'
			} else {
				window.location.href = '/'
			}
		}
		return response
	},
	error => {
		console.log('------ Request Error ------')
		console.log(error)
		let msg = error.message
		if (msg.indexOf('timeout') > -1) {
			ELEMENT.Message({ type: 'error', duration: 0, showClose: true, message: `请求超时，请稍后重试～` })
		} else {
			ELEMENT.Message({ type: 'error', message: msg })
		}
		return Promise.reject(error)
	}
)
// 如何捕获
DataSource.getList({
	keyword: this.params.keyword,
	pageNo: this.pageInfo.pageNo,
	pageSize: this.pageInfo.pageSize
}).then(res => {
	this.xoading.main = false
	if (res.code == 0) {
		this.tableData = res.data.records
		this.pageInfo.total = res.data.total
	} else {
		this.$message.error(res.message)
	}
}).catch(err => {
	this.xoading.main = false
})
```
## 使用minxs混入全局data，methods，computed。常用的方法，请求加载中，主表放到data内，无需再在每个组件创建
```javascript
// src/mixins.js
// 基本接口请求
import * as Base from '@api/Base'
// 统一基本配置项
import Configs from '@configs/index'
// 状态管理
import { mapGetters } from 'Vuex'
export default {
	data() {
		return {
			// 表单分页信息
			pageInfo: {
				// 当前查看的页码
				pageNo: 1,
				// 表总数量
				total: 0,
				// 每页数量，默认20
				pageSize: Configs.pageSize,
				// 分页组件支持的功能
				layout: Configs.pageLayout,
				// 可选择的分页数下拉选项
				sizes: Configs.pageSizes
			},
			// 通用加载状态
			xoading: {
				// 页面内主内容加载中，适用于主table
				main: false
			},
			// 主表被复选选中项目
			mainSelected: []
		}
	},
	computed: {
		...mapGetters([
			// 服务器枚举信息
			'serviceEnum',
			// 用户信息
			'userInfo',
		])
	},
	methods: {
		// 初始化请求主表内容
		init() {
			this.pageInfo.pageNo = 1
			this.get()
		},
		// 每页需要的数量变动
		sizeChange(val) {
			this.pageInfo.pageNo = 1
			this.pageInfo.pageSize = val
			this.init()
		},
		// 分页页码变动
		pageChange(val) {
			this.pageInfo.pageNo = val
			this.get()
		},
		// 匹配枚举 返回label  this.matchEnum('PULL_INCRE_TYPE', 'day_all')
		matchEnum(type, key) {
			let enums = this.serviceEnum[type]
			let name = ''
			if (enums) {
				for (let item of enums) {
					if (item.value == key) {
						name = item.name
						break
					}
				}
			}
			return name
		},
		// 主表复选项变动
		mainSelectionChange(rows) {
			this.mainSelected = rows
		}
	}
}
// views/data-source.vue
// 用到则引入
import Mixins from '@/mixins'
export default {
	name: '/datasource',
	mixins: [Mixins]
}
```
## 资源引用
```html
<link rel="stylesheet" href="https://unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css">
<script src="https://unpkg.com/vue@2.6.12/dist/vue.min.js"></script>
<script src="https://unpkg.com/element-ui@2.10.1/lib/index.js"></script>
<script src="https://unpkg.com/vue-router@3.0.2/dist/vue-router.min.js"></script>
<script src="https://unpkg.com/axios@0.21.1/dist/axios.min.js"></script>
<script src="https://unpkg.com/vuex@3.6.2/dist/vuex.min.js"></script>
<link rel="stylesheet" href="https://at.alicdn.com/t/font_1641218_uwp7vntqdta.css">
```
样式文件通过cdn外链引入，也可以引入本地js，如果想要自定义Element UI的样式，请参考[Element自定义主题样式](https://element.eleme.cn/#/zh-CN/theme/preview "Element自定义主题样式")，然后下载资源引入即可
## Vue CLI 如何引入资源?
> [处理静态资源](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#%E5%A4%84%E7%90%86%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90 "处理静态资源")

> 注意我们推荐将资源作为你的模块依赖图的一部分导入，这样它们会通过 webpack 的处理并获得如下好处：
- 脚本和样式表会被压缩且打包在一起，从而避免额外的网络请求。
- 文件丢失会直接在编译时报错，而不是到了用户端才产生 404 错误。
- 最终生成的文件名包含了内容哈希，因此你不必担心浏览器会缓存它们的老版本。

**其他功能请在启动后查看，这里不做具体解释。**
&copy;TEEMO. 2020

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).