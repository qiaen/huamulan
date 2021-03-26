<template>
    <section >
        <sline title="作业列表" size="big"></sline>
        <div class="pt20">
            <el-button @click="dialog = true" size="small" type="primary">打开盒子</el-button>
        </div>
        <!-- 作业查看，编辑，新增 -->
		<drawer v-model="dialog" @back="backEditTask" title="测试抽屉组件">
            <template v-slot:left="">
                <checkin cite="true" @back="backEditTask"></checkin>
            </template>
			
		</drawer>
    </section>
</template>
<script lang="ts">
import { reactive, ref, defineAsyncComponent } from 'vue'
import { ElNotification, ElMessage } from 'element-plus'
// import checkin from './checkin.vue'
const checkin = defineAsyncComponent(() => import('./checkin.vue'))
export default {
    components: { checkin },
	name: '/task',
	setup() {
        let dialog = ref(false)
        function backEditTask(val: boolean) {
            dialog.value = false
            if (val) {
                ElNotification({
                    type: 'success',
                    title: '点击了确定',
                    message: '提交成功，请等待审核～～',
                })
            } else {
                ElMessage('你已返回到列表～～')
            }
        }
        return {
            dialog,
            backEditTask
        }
	}
}
</script>