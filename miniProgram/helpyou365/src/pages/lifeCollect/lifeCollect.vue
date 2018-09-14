<template>
	<div class="container">
		
		<div class="head">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div class="headText">生活合集</div>
			</div>
		</div> 
		
		<!--合集列表-->
		<div class="lifeCn">
			<div class="lifeSub div_float">
				<div class="lifeList" v-for="item in lifeList" :key="lifeList" @click="skipDetail">
					<img src="../../../static/img/banner.png" />
					<div class="lMsg">
						<div class="lTil">兄弟船水产</div>
						<div class="lAddr">越秀区丨北京路 <span class="sAddIcon"></span></div>
						<div class="ldisc"><span class="ze">折</span>凭APP优惠打9折</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script> 
	export default {
		data() {
			return {
				lifeList:[1,1,1,1]
			}
		},

		components: {
			
		},

		methods: {
			//返回
			goBack(){
				wx.navigateBack();
			},
			//查看商家详情
			skipDetail(){
				wx.navigateTo({
					url:'/pages/cateDetail/main'
				})
			}
			
		},
		onShow(){
			
		}
	}
</script>

<style scoped>
	.lMsg .ldisc{
		color: #ff4a4a;
		font-size: 24rpx;
	}
	.lMsg .lAddr span{
		display: inline-block;
		vertical-align: middle;
		width: 23rpx;
		height: 27rpx;
		position: absolute;
		margin: auto;
		top: 0;
		bottom: 0;
		right: 0;
	}
	.lMsg .lAddr{
		color: #333333;
		font-size: 24rpx;
		position: relative;
	}
	.lMsg .lTil{
		color: #333333;
		font-size: 32rpx;
	}
	.lifeList .lMsg{
		width: 324rpx;
		padding:0 1%;
		margin: 0 auto;
		margin-top: 10rpx;
	}
	.lifeList .lMsg div{
		line-height: 50rpx;
	}
	.lifeList img{
		width: 326rpx;
		height: 180rpx;
		display: block;
		margin: 0 auto;
		margin-top: 20rpx;
	}
	.lifeList{
		float: left;
		width: 44%;
		background-color: white;
		padding: 0 3%;
		padding-bottom: 15rpx;
		margin-bottom: 10rpx;
	}
	.lifeSub{
		margin-top: 30rpx;
		background-color: #F5F5F5;
	}
	.lifeCn{
		margin-top: 30rpx;
		background-color: white;
		padding-top: 100rpx;
	}
	.ze{
		width: 35rpx;
		height: 35rpx;
		border-radius: 5rpx;
		background-color: #ff4444;
		color: white;
		font-size: 24rpx;
		display: inline-block;
		text-align: center;
		line-height: 35rpx;
		vertical-align: middle;
		margin-top: -5rpx;
		margin-right: 10rpx;
	}
	.headText{
		font-size: 38rpx;
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