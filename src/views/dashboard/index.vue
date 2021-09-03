<template>
    <section class="dashboard bgfff center">
        <!-- {{ name }} -->
        <img class="nothing" src="/img/nothing.png" alt />
    </section>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
// let name = ref('hello')
/** 可以获取dom, data也已经渲染到html */
onMounted(() => {
    console.log('hello, dashboard 2~~~')
    // console.log(document.querySelector('.dashboard')?.textContent)
})
// console.log(document.querySelector('.dashboard'))
</script>
<style lang="less">
.dashboard {
    img {
        width: 400px;
    }
}
</style>