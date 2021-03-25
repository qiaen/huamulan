<template>
    <section class="data-sources">
		<el-table class="zm-table" height="100%" v-loading="xoading" :data="mainTable" border>
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
			<!-- <el-table-column prop="status" label="状态" width="90">
				<template #default="scope">
					<span class="tag-status-circle" :class="'tag-status-'+ scope.row.status"></span>{{matchEnum('USER_STATUS', scope.row.status)}}
				</template>
			</el-table-column> -->
			<el-table-column prop="phoneNumber" label="手机号" width="140" align="" show-overflow-tooltip></el-table-column>
			<el-table-column prop="email" label="邮箱地址" min-width="160" sortable></el-table-column>
			<!-- <el-table-column prop="position" label="身份信息" min-width="120" sortable>
				<template #default="scope">
					{{matchEnum('USER_POSITION', scope.row.position)}}
				</template>
			</el-table-column> -->
			<el-table-column prop="createTime" label="创建时间" min-width="160" sortable></el-table-column>
			<el-table-column fixed="right" label="操作" width="125">
				<template #default="scope">
					<el-button @click="setCurrtRow(scope.row, 'edit')" type="text" size="small">编辑</el-button>
					<el-button @click="setCurrtRow(scope.row, 'del')" type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="pt15 txright" @size-change="sizeChange" @current-change="pageChange" :current-page="pageInfo.pageNo" :page-sizes="pageInfo.sizes" :page-size="pageInfo.pageSize" :layout="pageInfo.layout" :total="pageInfo.total">
		</el-pagination>
	</section>
</template>
<script lang="ts">
import { onMounted, reactive, ref } from 'vue'
import * as Users from '@api/Users'
export default {
	name: '/datasource',
	setup() {
        let mainTable = ref([])
        // 表单分页信息
        let pageInfo = reactive( {
            // 当前查看的页码
            pageNo: 1,
            // 表总数量
            total: 0,
            // 每页数量，默认20
            pageSize: 20,
            // 分页组件支持的功能
            layout: 'total, sizes, prev, pager, next, jumper',
            // 可选择的分页数下拉选项
            sizes: [20, 50, 100, 200]
        })
        function sizeChange() {

        }
        function pageChange() {
            
        }
        function setCurrtRow() {

        }
        let xoading = ref(false)
        function get(){
            xoading.value = true
            Users.getList({
                pageNo: 1,
                keyword: ''
            }).then((res: any) => {
                xoading.value = false
                if(res.code === 200) {
                    mainTable.value = res.data
                    pageInfo.total = 2
                }
            })
        }
        function init() {
            pageInfo.pageNo = 1
            get()
        }
        onMounted(() => {
            init()
        })
        return {
            mainTable,
            pageInfo,
            sizeChange,
            pageChange,
            setCurrtRow,
            xoading
        }
	}
}
</script>