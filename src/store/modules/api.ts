// 用来全局调用和缓存接口信息
import * as Base from '@api/Base'
import * as Code from '@configs/code'
import Storage from '@utils/Storage'
const state = {
	userInfo: {},
	userMenu: [],
	serviceEnum: {}
}
const actions = {
	GetUserInfo({ commit, state }: any) {
		if (!state.id) {
			return Base.getUserInfo({ appCode: Code.APPCODE }).then((res) => {
				if ((res as any).code == 200) {
					commit('SET_USER_INFO', res.data)
					commit('SET_USER_MENU', res.data.menu)
					Storage.set('userInfo', res.data)
				}
				return Promise.resolve(res)
			}).catch(err => {
				return Promise.reject(err)
			})
		}
	},
	GetAllEnum({ commit, state }: any) {
		// 如果在本地找到枚举信息，直接先返回成功，但仍然会请求最新的枚举
		let se = Storage.get('serviceEnum')
		if (se) {
			Base.getAllEnum().then((res) => {
				if ((res as any).code == 200) {
					commit('SET_ALL_ENUM', res.data)
					Storage.set('serviceEnum', res.data)
				}
			})
			return Promise.resolve({ code: 200, data: se })
		}
		return Base.getAllEnum().then((res) => {
			if ((res as any).code == 200) {
				commit('SET_ALL_ENUM', res.data)
				Storage.set('serviceEnum', res.data)
			}
			return Promise.resolve(res)
		}).catch((err: any) => {
			return Promise.reject(err)
		})
	}
}
const mutations = {
	SET_USER_INFO(state: any, userInfo: any) {
		state.userInfo = userInfo
	},
	SET_USER_MENU(state: any, userMenu: any) {
		state.userMenu = userMenu
	},
	SET_ALL_ENUM(state: any, enums: any) {
		state.serviceEnum = enums
	}
}
export default {
    namespaced: true,
	state,
	actions,
	mutations
}