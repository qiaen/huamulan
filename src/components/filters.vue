<template>
	<el-form :inline="true" size="small" class="zm-filter" :class="'zm-filter-' + size">
		<!-- 直接显示出来的部分 -->
		<slot name="show"></slot>
		<!-- 注意auto要用span等行内标签包裹，或者display: inline的块状标签，推介使用使用template标签 -->
		<span v-show="showall">
			<!-- 折叠起来的部分 -->
			<slot name="auto"></slot>
		</span>
		<el-form-item>
			<el-button class="filter-wrap" v-show="btn.show" @click="showall = !showall" type="text">{{btn.label}} <i :class="'el-icon-arrow-' + btn.icon"></i></el-button>
			<!-- 按钮区域 -->
			<slot name="button"></slot>
		</el-form-item>
	</el-form>
</template>
<script lang="ts">
import { ref, computed } from 'vue'
export default {
    name: 'filters',
	// small 用户显示为小按钮，其他需求待开发，一行显示不下的时候可以用下试试
	props: {
		size: {
			default: ''
		}
	},
	setup(props, ctx: any) {
        /** 是否展示所有的搜索项 */
        let showall = ref(false)
        /** 如果没有需要自动展开的，则不显示展开收起按钮 */
        console.log(ctx.slots.auto)
        let btn = computed(() => {
            let show = ctx.slots.auto
			if (showall.value) {
				return {
					icon: 'up',
					label: '收起',
					show
				}
			} else {
				return {
					icon: 'down',
					label: '展开',
					show
				}
			}
        })
		return {
			showall,
            computed,
            btn
		}
	}
}

</script>
<style lang="less">
.zm-filter {
	&.zm-filter-small {
		.el-button {
			padding-left: 12px;
			padding-right: 12px;
		}
		.el-form-item:last-child {
			margin-right: 0px;
		}
		.filter-wrap {
			padding-left: 6px;
			padding-right: 6px;
		}
	}

}

</style>
