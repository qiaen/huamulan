<!-- 带折叠展开筛选项组件 -->
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
            <el-button class="filter-wrap" v-show="btnConf.show" @click="showall = !showall" type="text">
                {{ btnConf.label }}
                <i :class="'el-icon-arrow-' + btnConf.icon"></i>
            </el-button>
            <!-- 按钮区域 -->
            <slot name="button"></slot>
        </el-form-item>
    </el-form>
</template>
<script lang="ts" setup>
import { ref, computed, useSlots } from 'vue'
defineProps({
    size: { default: '' }
})
const slots = useSlots()
/** 是否展示所有的搜索项 */
let showall = ref(false)

let btnConf = computed(() => {
    /** 如果没有需要自动展开的，则不显示展开收起按钮 */
    let show = slots.auto
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
</script>
<style lang="less">
.zm-filter {
    &-small {
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
    .el-form-item {
        margin-bottom: 15px;
    }
}
</style>