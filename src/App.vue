<template>
	<div class="full-content hideit" :class="{'full-collapse': isCollapse}">
		<router-view />
	</div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
	name: 'App',
	setup() {
		let store = useStore()
		return {
			isCollapse: computed(() => store.getters.isCollapse)
		}
	}
})
</script>
<style lang="less">
// 默认菜单宽度
.menus {
	width: 215px;
}

// 菜单折叠后的样式和宽度
.full-collapse {
	.menus {
		width: 60px;
	}
}
</style>