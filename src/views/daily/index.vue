<template>
	<section class="json bgfff">
		<div class=" scroll-y">
			<h3>关于作者 Author</h3>
			<ul>
				<li><strong>洪亮：</strong>热爱前端，不爱折腾</li>
				<li><strong>QQ：</strong>762366705</li>
				<li><strong>Email：</strong>762366705@qq.com</li>
				<li><strong>个人网站：</strong><a target="blank" class="fcblue" href="http://diumx.com">diumx.com</a></li>
                <li><strong>Gitlab：</strong><a target="blank" class="fcblue" href="https://gitlab.com/qiaen">gitlab.com/qiaen</a></li>
			</ul>
			<h3>花木兰模版</h3>
			<ul>
				<li><strong>动态菜单：</strong>在服务端配置菜单路由，以及菜单指定的页面文件</li>
				<li><strong>菜单权限：</strong>可以给不同用户指定不同的菜单，菜单权限，使用路由守卫在跳转时校验权限提示404或者403</li>
				<li><strong>按钮权限：</strong>服务器对于不同的功能，给出不同的权限码，前端通过v-permission指令搞定是否有权限</li>
				<li><strong>用到：</strong>vite，vue， element ui， vuex， vue-router， iconfont</li>
			</ul>
			<h3>Axios</h3>
			<ul>
				<li><strong>request：</strong>axios配置中，统一对request添加前置参数等</li>
				<li><strong>response：</strong>对错误信息统一过滤，若未登录，直接跳转登录页</li>
			</ul>
			<h3>Vuex，keep-alive，useMixins</h3>
			<ul>
				<li><strong>状态管理：</strong>使用Vuex，关键字mapGetters，this.$store.dispatch等</li>
				<li><strong>keep-alive：</strong>可对历史记录做现场保留，避免回退重新加载，减少接口调用，关键字keep-alive :include</li>
				<li><strong>useMixins：</strong>重复，使用量大的data，methods等采用minins混入，直接使用，避免重复定义</li>
			</ul>
			<h3>其他功能</h3>
			<ul>
				<li><strong>request：</strong>echarts图表，vue-split分割等可以自助引用，做到只专注模版框架功能</li>
			</ul>
		</div>
	</section>
</template>
<script>
export default {
	name: '/daily'
}
</script>
<style lang="less">
.json {
	.cards {
		margin: 30px 0 70px
	}
	.card {
		background: #fbfcfd;
		height: 204px;
		text-align: center
	}
	.card img {
		margin: 40px auto 25px;
		width: 80px;
		height: 80px
	}
	.card h4 {
		font-size: 18px;
		color: #1f2d3d;
		font-weight: 400;
		margin: 0
	}
	.card span {
		font-size: 14px;
		color: #99a9bf
	}
	h3 {
		font-size: 22px;
		font-weight: 400;
		margin: 0 0 30px;
		color: #1f2d3d;
	}
	ul {
		margin-bottom: 50px;
		padding-left: 0;
		li {
			font-size: 14px;
			margin-bottom: 10px;
			color: #99a9bf;
			list-style: none;
			strong {
				color: #5e6d82;
				font-weight: 400;
			}
		}
	}
}
</style>