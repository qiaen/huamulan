const getters = {
    isCollapse: (state: any) => state.layout.isCollapse,
    menuTabs: (state: any) => state.layout.menuTabs,
    currentTab: (state: any) => state.layout.currentTab,
    menus: (state: any) => state.layout.menus,
    cachedViews: (state: any) => state.layout.cachedViews,
    /** 当前需要展开的菜单, [value] */
    defaultOpeneds: (state: any) => state.layout.defaultOpeneds,
    /** 用户信息 */
    userInfo: (state: any) => state.api.userInfo,
    /** 接口枚举信息 */
    serviceEnum: (state: any) => state.api.serviceEnum
};
export default getters
