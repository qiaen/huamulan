<template>
    <section class="data-sources">
		<filters size="small">
			<template #show>
				<el-form-item label="用户名">
					<el-input @keyup.enter="init" placeholder="用户名" clearable></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select @change="init" placeholder="请选择用户状态" v-model="params.userStatus" clearable>
						<el-option label="全部" value=""></el-option>
						<el-option v-for="item in serviceEnum.USER_STATUS" :label="item.name" :value="item.value" :key="item.value"></el-option>
					</el-select>
				</el-form-item>
			</template>
			<template #auto>
				<el-form-item label="邮箱地址">
					<el-input v-model="params.name" @keyup.enter="init" placeholder="邮箱地址" clearable></el-input>
				</el-form-item>
				<el-form-item label="用户身份">
					<el-select @change="init" placeholder="请选择作业类型" v-model="params.status" clearable>
						<el-option label="全部" value=""></el-option>
						<el-option v-for="item in serviceEnum.USER_POSITION" :label="item.name" :value="item.value" :key="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="创建时间">
					<el-date-picker @change="init" v-model="params.date" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 380px">
					</el-date-picker>
				</el-form-item>
			</template>
			<template #button>
				<el-button type="primary" @click="init" :loading="xoading" icon="el-icon-search">查询</el-button>
				<el-button type="primary" @click="dialog = true" icon="el-icon-plus">新增</el-button>
				<el-button :disabled="mainSelected.length < 1" type="primary" icon="el-icon-thumb">状态修改</el-button>
			</template>
		</filters>
		<el-table class="zm-table" @selection-change="mainSelectionChange" height="100%" v-loading="xoading" :data="mainTable" border>
			<el-table-column type="selection" width="55" align="center">
			</el-table-column>
			<el-table-column prop="status" label="头像" width="60">
				<template #default="scope">
					<div class="center" style="vertical-align: middle;">
						<img :src="scope.row.avatar" alt="" width="30" height="30">
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="用户名" min-width="120" sortable show-overflow-tooltip></el-table-column>
			<el-table-column prop="status" label="状态" width="90">
				<template #default="scope">
					<span class="tag-status-circle" :class="'tag-status-'+ scope.row.status"></span>{{matchEnum('USER_STATUS', scope.row.status)}}
				</template>
			</el-table-column>
			<el-table-column prop="phoneNumber" label="手机号" width="140" align="" show-overflow-tooltip></el-table-column>
			<el-table-column prop="email" label="邮箱地址" min-width="160" sortable></el-table-column>
			<el-table-column prop="position" label="身份信息" min-width="120" sortable>
				<template #default="scope">
					{{matchEnum('USER_POSITION', scope.row.position)}}
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" min-width="160" sortable></el-table-column>
			<el-table-column fixed="right" label="操作" width="125">
				<template #default="scope">
					<el-button @click="setCurrtRow(scope.row, 'edit')" type="text" size="small">编辑</el-button>
					<el-button @click="setCurrtRow(scope.row, 'del')" type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="pt10 txright" @size-change="sizeChange" @current-change="pageChange" :current-page="pageInfo.pageNo" :page-sizes="pageInfo.sizes" :page-size="pageInfo.pageSize" :layout="pageInfo.layout" :total="pageInfo.total">
		</el-pagination>
		<!-- 作业查看，编辑，新增 -->
		<drawer v-model="dialog" @back="backEditTask" title="测试抽屉组件">
            <template #left>
                <checkin cite="true" @back="backEditTask"></checkin>
            </template>
		</drawer>
	</section>
</template>
<script lang="ts">
import { onMounted, reactive, ref, defineAsyncComponent  } from 'vue'
import { ElNotification, ElMessage } from 'element-plus'
import * as Users from '../../api/Users'
import Mixins from '../../units/Mixins'
/** 动态异步导入抽屉的内容 */
const checkin = defineAsyncComponent(() => import('../task/checkin.vue'))
export default {
	name: '/datasource',
	components: { checkin },
	setup() {
        const Mx: any = Mixins(get)
		let params = reactive({
			status: '',
			userStatus: '',
			date: [],
			name: ''
		})
        function get(){
            Mx.xoading.value = true
            Users.getList({
				...params,
                pageNo: 1,
                keyword: ''
            }).then((res: any) => {
                Mx.xoading.value = false
                if(res.code === 200) {
                    Mx.mainTable.value = res.data
                    Mx.pageInfo.total = res.total
                }
            })
        }
        onMounted(() => {
            Mx.init()
        })
		/** 抽屉相关 开始 */
		let dialog = ref(false)
        function backEditTask(val: boolean) {
            dialog.value = false
            if (val) {
                ElNotification({
                    type: 'success',
                    title: '点击了确定',
                    message: '新增成功，我已经刷新列表了～～',
                })
				Mx.init()
            } else {
                ElMessage('你已返回到列表～～')
            }
        }
		function setCurrtRow(row: any, type: string){
			if (type === 'edit') {
				dialog.value = true
			} else {
				ElMessage.success('模拟删除操作！')
			}
		}
		/** 抽屉相关 结束 */
        return {
            ...Mx,
			params,
			dialog,
            backEditTask,
			setCurrtRow
        }
	}
}
</script>