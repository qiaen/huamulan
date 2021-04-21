import { ElMessage } from "element-plus"
import Storage from '@units/Storage'
// 超时60秒
axios.defaults.timeout = 1000 * 60
axios.defaults.withCredentials = true
// 增加baseURL是为了省略在每个接口地址上添加/api
axios.defaults.baseURL = '/api'
axios.interceptors.request.use(
	config => {
		// 统一为请求接口增加token信息
		// 注意实际业务用到的method可能更复杂，这里需要增加逻辑判断
		if (config.method === 'get') {
			config.params = { ...(config.params || {}), token: Storage.get('token') }
		} else {
			config.data = { ...(config.data || {}), token: Storage.get('token') }
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
// 返回状态判断
axios.interceptors.response.use(
	response => {
		let res = response.data
		if (res.code === 401) {
			window.location.href = '#/login'
		}
		return response
	},
	error => {
		console.log('------ Request Error ------')
		console.log(error)
		let msg = error.message
		if (msg.indexOf('timeout') > -1) {
			ElMessage({ type: 'error', duration: 0, showClose: true, message: `请求超时，请稍后重试～` })
		} else {
			ElMessage({ type: 'error', message: msg })
		}
		return Promise.reject(error)
	}
)