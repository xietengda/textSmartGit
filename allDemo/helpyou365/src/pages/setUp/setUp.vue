<template>
	<div class="container CnTop CnBtm"  :class="[isIphonex ? 'ixPaddCn':'']">

		<!--导航栏-->
		<allHead :headTil='langua.setTil' />
		
		<div class="setCn">
			<!-- /pages/aboutUs/main -->
			<navigator url='/pages/aboutUs/main' hover-class='none'>
				<div class="setList">
					<p>{{langua.setAboutUs}}</p>
				</div>
			</navigator>
		</div>
		
		<div class="exitBtn">
			<div @click="logOut">{{langua.setLoginOut}}</div>
		</div>
 
	</div>
</template>
 
<script>
	import allHead from '../../components/head'  
	
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				langua:'',//静态文字的语种
			}
		},

		components: {
			allHead
		},
		computed: {
			isIphonex() {
				return this.$store.store.state.isIphonex
			},
		},
		methods: {
			//返回
			goBack(){
				wx.navigateBack();
			},
			//退出登录
			logOut(){
				var that = this;
				that.Request.logOut(wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							wx.removeStorageSync('userInfo');
							wx.removeStorageSync('userId');
							that.util.goHome();
							
							that.util.getSessionKey();
						}
					})
					.catch(res =>{
						console.log(res)
					})
			}
		},
		onShow(){
			this.langua = this.$util.util.prototype.changeLanguage();
		}
	}
</script>

<style scoped>
	.exitBtn>div{
		display: inline-block;
		width: 540rpx;
		height: 62rpx;
		line-height: 62rpx;
		text-align: center;
		color: #ffffff;
		font-size: 28rpx;
		background-color: #F90000;
		border-radius: 35rpx;
	}
	.exitBtn{
		text-align: center;
		margin-top: 60rpx;
	}
	.setCn .setList{
		height: 114rpx;
		line-height: 114rpx;
		color: #2b2f37;
		font-size: 28rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.setCn{
		padding: 0 5%;
	}
	
	.head .back{
		width: 18rpx;
		height: 37rpx; 
		border: 1px soild red;
		padding-right: 20rpx;
		background-size: 18rpx 37rpx;
		background-repeat: no-repeat;
		position: absolute;
		margin: auto;
		top: 0;
		bottom: 0;
		left: 0;
	}
	.headSub {
		position: relative;
	}
	.head {
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 5%;
		color: #333333;
		font-size: 38rpx;
		position: fixed;
		padding-top: 47rpx;
		top: 0;
		z-index: 3;
		width: 90%;
		background-color: white;
		border-bottom: 2rpx solid #E5E5E5;
		text-align: center;
	}
</style>