import Storage from '../../untils/Storage.ts'
import { CurrentTab } from '../interface.ts'
const state = {
    menus: [],
    /**是否折叠，true：收起，false：展开 */
    isCollapse: false,
    userInfo: {
        personName: '兰兰  '
    },
    // 当前选中的tab
	currentTab: <CurrentTab>{ path: '', label: '' },
    /*
	 * 缓存的keep-alive页面name，不在此列则不缓存
	 * 注意：为了方便管理，这里的name采用的是path，所以组件命名也要用path
	 * [value]
	 **/
    cachedViews: ['/'],
    // 已打开的tab菜单, [{key:value}]
	menuTabs: [{ path: '/', label: 'Dashboard', icon: 'iconfont icon-dashboard' }],
}
const actions = {
    // 修改项目菜单
	SetMenus({ commit }, menus: array) {
		commit('SET_MENUS', menus)
	},
	// 新增一个tab
	SetMenusTab({ commit }, tab) {
		commit('SET_MENUS_TAB', tab)
	},
	// 设定选中的tab
	SetCurrentTab({ commit }, tab: CurrentTab) {
		commit('SET_CURRENT_TAB', tab)
	},
	// 删除一个tab
	RemoveTab({ commit }, tab) {
		// tabs只有一个时不能删除/
		if (tab.path === '/' && state.menuTabs.length <= 1) {
			return Promise.reject('tabs只有一个时不能删除/')
		}
		commit('REMOVE_TAB', tab)
	},
	// 菜单是否折叠
	SetMenuCollapse({ commit }) {
		commit('SET_MENU_COLLAPSE')
	},
	// 关闭所有，关闭其他tabs
	CloseTabs({ commit }, type) {
		commit('SET_CLOSE_TABS', type)
	}
}
const mutations = {
    SET_MENUS(state: any, menus: array) {
		state.menus = menus
	},
	SET_MENUS_TAB(state: any, tab: any) {
		let has = state.menuTabs.some((item: any) => {
			return item.path === tab.path
		})
		if (!has) {
			state.menuTabs.push(tab)
		}
	},
	// 路由变动时会执行
	SET_CURRENT_TAB(state: any, tab: CurrentTab) {
		// 在打开的tabs内找当前要选中的tab
		let currt = state.menuTabs.find((item: any) => {
			return item.path === tab.path
		})
		// console.log(state, tab)
		// if(tab.path === '/work-order/list' || tab.path === '/work-order/form') return;
		if (currt) {
			// tabs内存在要打开的tab
			state.currentTab = currt
		} else {
			// 不存在则添加新的
			state.menuTabs.push(tab)
			state.currentTab = tab
			// 在要缓存的页面列表添加当前path，
			// keep-alive识别的是组件名称而非路由名称，页面缓存异常请检查页面name是否重复或未与对应的路由一致
			// 所以如果想要启用缓存只需要讲页面组件的name改成和路由地址不一致即可，相反一致的话会被缓存
			state.cachedViews.push(tab.path)
		}
		// 如果菜单未折叠，匹配menus拿到要展开的菜单
		if (state.isCollapse) {
			let menus = state.menus
			for (let item of menus) {
				if (item.child && item.child.length) {
					if (item.child.some(m => m.path === tab.path)) {
						state.defaultOpeneds = [item.path]
						break
					}
				}
			}
		}
	},
	REMOVE_TAB(state: any, tab: any) {
		// 在已打开的tabs中删除
		for (let [index, item] of state.menuTabs.entries()) {
			if (item.path === tab.path) {
				state.menuTabs.splice(index, 1)
				if (tab.path === state.currentTab.path) {
					break
				}
			}
		}
		// 在缓存的页面中删除
		let index = state.cachedViews.indexOf(tab.path)
		if (index > -1) { state.cachedViews.splice(index, 1) }
	},
	SET_MENU_COLLAPSE(state: any) {
		state.isCollapse = !state.isCollapse
		Storage.set('DSMenuCollapse', state.isCollapse ? 1 : '')
	},
	// 关闭所有，关闭其他tabs
	SET_CLOSE_TABS(state: any, type: string) {
		if (type === 'all') {
			state.menuTabs = [{ path: '/', label: 'Dashboard', icon: 'iconfont icon-dashboard' }]
			state.cachedViews = []
		}
		if (type === 'others') {
			state.menuTabs = state.menuTabs.filter((item: any) => item.path == state.currentTab.path)
			state.cachedViews = [state.currentTab.path]
		}
	}
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }