<script>
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求方法头
			}
		},
		onLaunch: function() {
			this.checkLogin();
			
			var that = this;
			wx.getSystemInfo({
				success: function(res) {
					if(res.model.toString().indexOf('iPhone X') != -1) {
						//直接修改VueX的值
						//that.$store.store.state.isIphonex = true;

						//也可以换一种方法，这样可以跟踪每一个状态的变化
						that.$store.store.commit('changePhone', true); 

					}
				}
			})


			//判断本地缓存当日最大时间
			if(!wx.getStorageSync('maxTime')){
				
				that.Request.getUV()
					.then( res => {
						if(res.success){
							//设置最大时间存进本地
							wx.setStorageSync('maxTime',that.$util.util.prototype.pastTime());
						}
					})
				
			}else{
				//当前时间戳
				var nowTime = new Date().getTime();
				if(nowTime > wx.getStorageSync('maxTime')){
					that.Request.getUV()
						.then( res => {
							if(res.success){
								//设置最大时间存进本地
								wx.setStorageSync('maxTime',that.$util.util.prototype.pastTime());
							}
						})
				}
			}
			
		}, 
		methods: {
			checkLogin:function(){
				var that = this;
				wx.checkSession({
				  success: function(){
				    //检查sessionKey和openId
				    that.Request.checkSessionKey(wx.getStorageSync('sessionkey'),wx.getStorageSync('openid'))
				    	.then(res =>{
				    		if(!res.success){
				    			that.login();
				    		}
				    	})
				  },
				  fail: function(){
				   	that.login();
				  }
				})
				
				
			},
			login: function() {
				wx.login({
					success: res => {
						// 发送 res.code 到后台换取 openId, sessionKey
						if(res.code) {
//							console.log(res.code)
							this.Request.login(res.code)
								.then(res => {
//									console.log(res.data)
									wx.setStorageSync('sessionkey', res.data.sessionkey);
									wx.setStorageSync('openid', res.data.openid);
								})
						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})
			},
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		border-radius: none;
	}
	
	input {
		border-radius: 0rem;
	}
	
	.divHide {
		display: none !important;
	}
	
	.div_float:after {
		clear: both;
		content: '';
		width: 0;
		height: 0;
		visibility: hidden;
		display: block;
	}
	/*文字限制超出一行后变省略号*/
	
	.eli_one {
		overflow: hidden;
		text-overflow: ellipsis;
		display: box;
		display: -webkit-box !important;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		white-space: pre-line;
	}
	/*文字限制超出两行行后变省略号*/
	
	.eli_two {
		overflow: hidden;
		text-overflow: ellipsis;
		display: box;
		display: -webkit-box !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		white-space: pre-line;
	}
	
	.greendT {
		color: #8fcd31 !important;
	}
	
	.cnNull .icon {
		width: 103rpx;
		height: 120rpx;
		margin: 0 auto;
		margin-top: 200rpx;
		background-size: 100% 100% !important;
	}
	
	.cnNull .cn {
		text-align: center;
		font-size: 26rpx;
		margin-top: 35rpx;
	}
	
	.goPage {
		width: 197rpx;
		height: 65rpx;
		margin: 0 auto;
		border-radius: 42rpx;
		border: solid 2rpx #6fa0cd;
		text-align: center;
		line-height: 65rpx;
		color: #6fa0cd;
		font-size: 28rpx;
		margin-top: 52rpx;
	}
	/*搜索框遮盖层*/
	
	.searchAll {
		position: relative;
	}
	
	.searchAll .layer {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 2;
		border: 1px soild red;
		top: 0;
		left: 0;
	}
	/*阴影*/
	
	
	/*主内容适配ix*/
	.ixCnBottom {
		padding-bottom: 200rpx !important;
	}
	/*ix适配底部*/
	.ixBottom {
		padding-bottom: 68rpx !important;
	}
	
	.shaDowIcon {
		background: url('data:image/png;base64,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');
		background-size: 100% 100%;
	}
</style>