const getters = {
    isCollapse: (state: any) => state.layout.isCollapse,
    userInfo: (state: any) => state.layout.userInfo,
    menuTabs: (state: any) => state.layout.menuTabs,
    currentTab: (state: any) => state.layout.currentTab,
    menus: (state: any) => state.layout.menus
};
export default getters
