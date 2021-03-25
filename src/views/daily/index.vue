<template>
	<section class="daily bgfff center">
		<img class="nothing" src="/img/nothing.png" alt="">
	</section>
</template>
<script lang="ts">
import { onMounted } from '@vue/runtime-core'
export default {
	name: '/daily',
	setup() {
		onMounted(() => {
			console.log('onmounted---------')
		})
	}
}
</script>

<style lang="less">
.daily {
	.nothing {
		width: 400px;
	}
}
</style>