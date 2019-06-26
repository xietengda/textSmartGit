<template>
	<div class="container" v-wechat-title="$route.meta.title">
		<!--<h1>授权中。。。</h1>-->

	</div>
</template>

<script>

	export default {
		data() {
			return {
				Request: this.$api, //请求头
				util: this.$util.util.prototype, //工具类
				canLogin:true,//允许登陆
			}
		},
		mounted() {
			

		},
		components: {
			
		},
		computed: {

		},
		methods: {
			//用户登录授权
			login:function(){
				var that = this;
				var skipUrl = window.location.protocol +'//'+window.location.host+'/#/login';
				// var skipUrl = "http://fundar.cn/#/login";
				console.log(skipUrl);
				that.Request.weChatLogin(encodeURIComponent(skipUrl))
					.then(res =>{
							if(res.success){
								//删除openid,access_token
								that.$cookies.remove('openId');
								that.$cookies.remove('access_token');
								window.location.href=res.data;
							}
					})
			},
			//获取用户openid
			async getAccessTokenFun(codeString){
				var that = this;
				await that.Request.getAccessToken(codeString)
					.then(res =>{
						console.log(res)
						if(res.success){
							that.$cookies.set('openId',res.data.openid,60*60*2);
							that.$cookies.set('access_token',res.data.access_token,60*60*2);
						}else{
							that.canLogin = false;
						}
					})
			}
		},
		created() {
			var that = this;

			//获取登录回来的code
			var code = this.$router.history.current.query.code || this.util.getQueryString('code');
			
			//判断当前url中有没有  code
			//未登录，而且没有code的情况下
			if(this.$cookies.get('isLogin') == null && code == null){
				//跳转微信登录
				this.login();
			}
			//未登录,有code
			else{
				//由于怕用户一直返回到授权页面，
				//所以在授权页面判断是否已经获取用户信息
				//如果已经获取用户信息则跳转到首页
				if(this.$cookies.get('openId') == undefined){
					//获取用户信息
					that.getAccessTokenFun(code)
						.then(res =>{
							var http = window.location.protocol;
							var doMain = window.location.host;
							//允许登陆
					       if(that.canLogin){
							    //获取beforeLoginUrl，我们的前端页面
								let url = that.$cookies.get('beforeLoginUrl');
								console.log(url)
								//跳转  用window.location.href 地址栏不会带code
								//this.$router.push({path:url});
								window.location.href = http+'//'+doMain+'/#'+url.toString();
								//删除 cookie中beforeLoginUrl
								that.$cookies.remove('beforeLoginUrl');
						   }else{
							    //跳转禁止登陆页面
								window.location.href = http+'//'+doMain+'/#/banLogin';
						   }
						})
				}else{
			        var http = window.location.protocol;
		            var doMain = window.location.host;
					//调回首页
					window.location.href = http+'//'+doMain+'/#';
				}
			}
			
			
		},

	}
</script>

<style scoped lang="scss">
	
</style>