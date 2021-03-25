<template>
	<div class="layout full-content hideit flex">
		<!-- 左侧菜单 -->
		<menus class="menu shrink0"></menus>
		<!-- 右侧主内容区域 -->
		<main class="main flex-view hideit">
			<!-- {{cachedViews}} -->
			<!-- 头部 -->
			<!-- 顶部功能区 -->
			<roof class="shrink0 layout-roof"></roof>
			<!-- 主内容 -->
			<div class="bgmain relative hideit flex-view">
				<tabs></tabs>
				<!-- 页面缓存，注意事项看下方 cachedViews-->
				<router-view class="bgfff main-content absolute flex-view" v-slot="{ Component }">
						<keep-alive :include="cachedViews">
							<transition name="fade-transform" appear>
								<component :is="Component" />
							</transition>
						</keep-alive>
				</router-view>
			</div>
		</main>
	</div>
</template>
<script>
import { computed } from 'vue'
import menus from './menu.vue'
import roof from './roof.vue'
import tabs from './tabs.vue'
import { useStore } from 'vuex'
export default {
    components: {
        menus,
        roof,
		tabs
    },
	name: 'layout',
	setup() {
        let store = useStore()
        return { cachedViews: computed(()=> store.getters.cachedViews) }
    }
}
</script>
<style lang="less">
// 页面切换中，隐藏抽屉
.transiting {
	.drawer-bg {
		display: none;
	}
}
.layout {
	.topbar {
		height: 50px;
		padding: 0 15px;
		border-bottom: 1px solid #ddd;
	}
	.main-content {
		top: 50px;
		right: 15px;
		bottom: 15px;
		left: 15px;
		padding: 15px 15px 10px 15px;
		z-index: 10;
	}
	.layout-roof {
		height: 50px;
		border-bottom: 1px solid #dedede;
	}
}
</style>