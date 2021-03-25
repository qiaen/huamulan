import { App } from 'vue'
const Permission = (el: any, bind: any) => {
	// 权限列表
	let permission = (window as any).permission
	if (permission) {
		let hide = false
		// 查找权限逻辑
		if (!permission.includes(bind.value)) {
			hide = true
		}
		if (hide) { el.style.display = 'none' }
	} else {
		el.style.display = 'none'
	}
}
export default {
    install(app: App) {
        app.directive('permission', Permission)
    }
}