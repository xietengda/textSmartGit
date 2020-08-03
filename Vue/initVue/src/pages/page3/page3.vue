<template>
	<div class="container home" v-wechat-title="$route.meta.title">
		<div class="top">
			<div class="L">跳转的页面333</div>
			<input />
		</div>
	</div>
</template>

<script>
	

	export default {
		name:'page3',
		data() {
			return {
				Request: this.$api, //请求头
				util: this.$util.util.prototype, //工具类
				isFirstEnter:false // 是否第一次进入，默认false
			}
		},
		mounted() {
			
		},
		methods:{
			async testGetList(){
				let that = this;
				let subMsg = {
					cityId: 0,
					provinceId: 0
				}
				//请求接口
				await that.Request.getList(subMsg).then(res =>{
					// console.log(res)
				});
			}
		},

		created() {
			var that = this;
			this.$route.meta.title = "个人店铺";

			this.testGetList();
		},
		destroyed(){
			
			
		}

	}
</script>

<style scoped>
	
</style>