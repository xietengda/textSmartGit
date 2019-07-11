<template>
	<div class="container home" v-wechat-title="$route.meta.title">
      <h1>测试11111</h1>
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
		components:{
		},
		created() {
			var that = this;
			this.$route.meta.title = "啦啦啦";

			console.log(1)
		},
		destroyed(){
			
			
		}

	}
</script>

<style scoped  lang="less">
</style>