const getters = {
    isCollapse: (state: any) => state.layout.isCollapse,
    userInfo: (state: any) => state.api.userInfo,
    menuTabs: (state: any) => state.layout.menuTabs,
    currentTab: (state: any) => state.layout.currentTab,
    menus: (state: any) => state.layout.menus,
    cachedViews: (state: any) => state.layout.cachedViews,
    /**当前需要展开的菜单, [value] */
    defaultOpeneds: (state: any) => state.layout.defaultOpeneds
};
export default getters
