import { App } from 'vue'
const Permission = (el: any, bind: any) => {
	/** 权限列表，在router/index调用，在store/layout获取，储存在window中，其实应该放到store会更安全 */
	let permission = (window as any).permission
	if (permission) {
		let hide = false
		/** 查找权限逻辑 */
		if (!permission.includes(bind.value)) {
			hide = true
		}
		if (hide) { el.style.display = 'none' }
	} else {
		el.style.display = 'none'
	}
}
/** 自定义指令，已安装: v-permission="12" */
export default {
    install(app: App) {
        app.directive('permission', Permission)
    }
}