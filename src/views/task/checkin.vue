<template>
    <section class="checkin flex1 bgfff pad12 hideit">
        <sline title="作业登记">
            <template v-slot:descript>也可以在列表中点击按钮打开我，点击上方返回，或者点击确定</template>
        </sline>
        <div class="pt20">
            <el-button v-permission="17" type="success" @click="back" size="small">提 交</el-button>
            <p class="fc999 fsize14 pt20">如果登录的是管理员，才可以看到上方的按钮，可以做大型的表单或者展示用</p>
        </div>
    </section>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps(['cite'])
const emit = defineEmits(['back'])

function back() {
    if (!props.cite) {
        return ElMessage.warning('请切换到作业列表，然后“打开盒子”')
    }
    emit('back', true)
}
onMounted(() => {

})
</script>