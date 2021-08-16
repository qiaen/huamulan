<template>
	<menu class="menus shrink0 fcfff hideit scroll-y">
		<div class="width100 menu-logo">
			<a :style="{ width: isCollapse ? '42px' : '' }" class="fxmiddle flex hideit height100">
				<img src="/img/dt-7.png" alt />
				<div class="fcfff pl5">
					<p class="fbold fsize14">花木兰</p>
					<p class="fsize11">后台管理系统模版Vue3+TS</p>
				</div>
			</a>
		</div>
		<!-- 菜单列表，默认不折叠，当前选中 在store common内配置 -->
		<el-menu :default-openeds="defaultOpeneds" :default-active="currentTab" background-color="#21325e" text-color="#fff" active-text-color="#fff" :collapse="isCollapse" :collapse-transition="false" :router="true">
			<template v-for="item in menus">
				<el-submenu :key="item.name" v-if="item.child && item.child.length" :index="item.path">
					<template #title>
						<i :class="item.icon"></i>
						<span>{{ item.name }}</span>
					</template>
					<el-menu-item-group>
						<template #title>{{ item.name }}</template>
						<el-menu-item v-for="c in item.child" :index="c.path" :key="c.name">
							<i :class="c.icon"></i>
							<span>{{ c.name }}</span>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-menu-item :key="item.path" :index="item.path" v-else>
					<i :class="item.icon"></i>
					<template #title>
						<span>{{ item.name }}</span>
					</template>
				</el-menu-item>
			</template>
		</el-menu>
	</menu>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
let store = useStore()
const isCollapse = computed(() => store.getters.isCollapse)
const currentTab = computed(() => store.getters.currentTab.path)
const defaultOpeneds = computed(() => store.getters.defaultOpeneds)
const menus = computed(() => store.getters.menus)
</script>
<style lang="less">
.menus {
	background: #21325e;
	.menu-logo {
		height: 50px;
		/*background: #1bc9b3;*/
		background: #293d71;
		img {
			height: 38px;
		}
		a {
			transform: translate3d(11px, 0, 0);
			&.menu-collapse {
				.fcfff {
					display: none;
				}
			}
		}
	}
	.el-menu-item-group__title {
		display: none !important;
	}
	.iconfont {
		color: #fff;
	}
}
// 作用于全局的菜单，如果有别的地方用到，可以使用弹出菜单的自定义类名属性：popper-class
.el-menu {
	border-right: none;
	.is-active {
		background-color: #409eff !important;
	}
	.iconfont {
		margin-right: 4px;
	}
}
</style>