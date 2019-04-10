<template>
	<div class="container home" v-wechat-title="$route.meta.title">
		<div class="top">
			<div class="L"></div>
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
		created() {
			var that = this;
			this.$route.meta.title = "个人店铺";

			console.log(1)
		},
		destroyed(){
			
			
		}

	}
</script>

<style scoped>
	
</style>