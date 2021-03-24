<template>
	<div class="flex">
		<!-- 面包屑，折叠菜单 -->
		<div class="flex1 hideit fxmiddle bread">
			<i @click="collapse" :style="{'transform': `rotate(${isCollapse ? 0 : 180}deg)`}" class="iconfont icon-zhankai middle fsize20 pointer"></i>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item to="/">首页</el-breadcrumb-item>
				<el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">
					<router-link :to="item.path">{{item.name}}</router-link>
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!-- 头像，退出登录 -->
		<div class="flex avatar">
			<div class="middle">
				{{userInfo.personName||''}}
			</div>
			<el-dropdown class="fxmiddle">
				<span class="el-dropdown-link">
					<a class="middle acc-avatar pointer height100">
						<img src="/img/dt-s12.png" alt="">
					</a>
				</span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item icon="el-icon-switch-button">
                            <span @click="logout">退出登录</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
				
			</el-dropdown>
		</div>
	</div>
</template>
<script>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
export default {
	name: 'roof',
	setup() {
		let store = useStore()
        function logout() {

        }
        function collapse() {
			store.dispatch('layout/SetMenuCollapse')
        }
        let breadcrumb = reactive([])
		return {
			isCollapse: computed(() => store.getters.isCollapse),
			breadcrumb,
            logout,
            collapse,
            userInfo: computed(() => store.getters.userInfo)
		}
	}
}
</script>
<style lang="less">
.layout-roof {
	.icon-zhankai {
		width: 46px;
		height: 100%;
	}
	.avatar {
		justify-content: flex-end;
		&>div {
			padding: 0 10px;
		}
		min-width: 40%;
		max-width: 40%;
		padding-right: 15px;
		.acc-avatar img {
			width: 32px;
		}
	}
}
</style>