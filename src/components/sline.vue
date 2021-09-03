<!-- title显示组件 -->
<template>
    <div class="form-line fxmiddle flex" :class="{ 'form-line-big': size == 'big' }">
        <span></span>
        <label>{{ title }}</label>
        <div class="flex1 descript">
            <slot name="descript"></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: 'big'
    }
})
</script>
<style lang="less">
.form-line {
    span {
        display: block;
        width: 3px;
        height: 16px;
        background: #29b87a;
    }
    label {
        padding: 0 6px;
        color: #343a43;
        font-size: 14px;
        font-weight: bold;
    }
    .descript {
        text-align: right;
        font-size: 12px;
        color: #666;
    }
    // 大尺寸
    &-big {
        span {
            height: 20px;
            width: 4px;
        }
        label {
            padding: 0 8px;
            font-size: 18px;
        }
        .descript {
            font-size: 16px;
        }
    }
}
</style>