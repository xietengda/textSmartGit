<template>
	<div class="container" v-wechat-title="$route.meta.title">
		<div class="banBox"	>
			<div class="banBg"></div>
			<div class="txBox">
				<div class="tx">您违反微信的官方绿色网络条例</div>
				<div class="tx">您的微信号被禁止访问本页面，感谢您的配合</div>
			</div>
		</div>

	</div>
</template>

<script>

	export default {
		data() {
			return {
				Request: this.$api, //请求头
				util: this.$util.util.prototype, //工具类
			}
		},
		mounted() {
			

		},
		components: {
			
		},
		computed: {

		},
		methods: {
			
		},
		created() {
			
		},

	}
</script>

<style scoped lang="scss">
@import '../../common/css/scssFile';

.banBg{
	width: 4.2rem;
	height: 4.2rem;
	margin: 0 auto;
	margin-top: 1.32rem;
	@include bg-image('../../assets/img/pageHome/banLogin');
}
.txBox{
	color: #1a1a1a;
	font-size: .24rem;
	line-height: .36rem;
	text-align: center;
}
.container{
	padding-top: .001rem;
}

	
</style>