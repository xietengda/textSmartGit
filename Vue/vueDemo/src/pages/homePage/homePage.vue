<template>
	<div class="container home" v-wechat-title="$route.meta.title">

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
			this.$route.meta.title = "改变标题";
		},
		destroyed(){
			
			
		}

	}
</script>

<style scoped>
	
</style>