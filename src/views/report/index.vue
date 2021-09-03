<template>
    <section class="report">
        <el-form :inline="true" size="small" :model="params" class="zm-filter">
            <el-form-item label="作业名称">
                <el-input v-model="params.keyword" @keyup.enter="init" placeholder="作业名称、创建人" clearable></el-input>
            </el-form-item>
            <el-form-item label="作业类型">
                <el-select @change="init" placeholder="请选择作业类型" v-model="params.jobType" clearable>
                    <el-option label="全部" value></el-option>
                    <el-option v-for="item in serviceEnum.JOB_TYPE" :label="item.name" :value="item.value" :key="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="init" :loading="xoading" icon="el-icon-search">查询</el-button>
                <el-button :disabled="!mainSelected.length" @click="showSelected" v-permission="17" type="success">
                    <i class="iconfont icon-xiezi fsize12 pr5"></i>管理员可见
                </el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="xoading" class="zm-table" @selection-change="mainSelectionChange" height="100%" :data="mainTable" border>
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="id" label="作业ID" width="75" align="center"></el-table-column>
            <el-table-column prop="jobName" label="作业名称" min-width="150" sortable show-overflow-tooltip>
                <template #default="scope">
                    <span class="fcblue">{{ scope.row.jobName }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="increType" label="作业模式" width="110" sortable></el-table-column>
            <el-table-column prop="jobType" label="作业类型" width="105" sortable></el-table-column>
            <el-table-column prop="cron" label="单位" min-width="130" show-overflow-tooltip>
                <template #default="scope">{{ scope.row.cron }}</template>
            </el-table-column>
            <el-table-column prop="targetTable" label="备注信息" min-width="190" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="owner" label="创建人" width="88" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="runStatus" label="运行状态" width="90">
                <template #default="scope">
                    <span class="tag-status-circle" :class="'tag-status-' + scope.row.runStatus"></span>
                    {{ matchEnum('SCHEDULE_STATUS', scope.row.runStatus) }}
                </template>
            </el-table-column>
            <el-table-column label="生命周期" align="center" width="100">
                <template #default="scope">
                    <span class="tag-status" :class="'tag-cycle-' + scope.row.lifeCycle">{{ scope.row.lifeCycle == 0 ? '测试' : '上线' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否启用" align="center">
                <template #default="scope">
                    <el-switch v-model="scope.row.isDisable" :active-value="0" :inactive-value="1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="jobBu" label="业务方" width="100" sortable></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="160" sortable></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="160" sortable></el-table-column>
            <el-table-column fixed="right" label="操作" width="130">
                <template #default="scope">
                    <el-button @click="setCurrtRow(scope.row, 'details')" type="text" size="small">查看</el-button>
                    <el-button @click="setCurrtRow(scope.row, 'status')" type="text" size="small">更改状态</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pt10 txright" @size-change="sizeChange" @current-change="pageChange" :current-page="pageInfo.pageNo" :page-sizes="pageInfo.sizes" :page-size="pageInfo.pageSize" :layout="pageInfo.layout" :total="pageInfo.total"></el-pagination>
        <!-- 修改运维状态 -->
        <change-status @back="doByType" :dialog="dialog"></change-status>
    </section>
</template>
<script lang="ts" setup>
import { reactive, ref, defineAsyncComponent } from 'vue'
import { ElMessage } from 'element-plus'
import * as Jobs from '@api/Jobs'
import Mixins from '@utils/Mixins'
/** 异步导入，辣眼睛 */
const changeStatus = defineAsyncComponent(() => import('./compons/change-status.vue'))
/** 引入常用功能 */
const { xoading, mainTable, pageInfo, init, matchEnum, sizeChange, pageChange, mainSelected, mainSelectionChange, serviceEnum } = Mixins(get)
let params = reactive({
    keyword: '',
    jobType: ''
})
let dialog = reactive({
    changeStatus: false
})

/** 请求数据 */
function get() {
    xoading.value = true
    Jobs.jobList({
        ...params,
        pageNo: pageInfo.pageNo,
        pageSize: pageInfo.pageSize
    }).then((res: any) => {
        xoading.value = false
        if (res.code === 200) {
            mainTable.value = res.data
            pageInfo.total = res.total
        }
    })
}
init()
/** 当前选中行 */
let currtRow = ref({})
/** 设定当前选中 */
function setCurrtRow(row: object, type: string) {
    if (type === 'status') {
        dialog.changeStatus = true
    }
}
/** 接收状态类型 */
function doByType(val: number) {
    if (val == 1) {
        ElMessage.success(`你点击了启用，模拟操作，不会真的改变数据`)
    } else {
        ElMessage.info(`你点击了禁用，模拟操作，不会真的改变数据`)
    }
    dialog.changeStatus = false
}
/** 显示已选择 */
function showSelected() {
    let s = mainSelected.value.map((item: any) => item.id)
    ElMessage(`已选择 ${s.length} 个～`)
}
</script>