<template>
	<div class="container CnTop CnBtm">

		<div class="head">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div class="headText">赞我的</div>
			</div>
		</div> 
		
		<div class="ReplyCn">
			<div class="reList div_float">
				<img src="../../../static/img/cIcon.png" />
				<div class="reCn"><span>大不列颠·够二</span>赞了我</div>
				<div class="R rArraw"></div>
			</div>
		</div>
		
		
		<div class="nullMsg">
			<span class="jusang"></span>暂无好友点赞
		</div>
		
	</div>
</template>
 
<script>
	 
	export default {
		data() {
			return {
				atteList:[1,1,1],
			}
		},

		components: {
			
		},

		methods: {
			//返回
			goBack(){
				wx.navigateBack();
			}
		},
		
	}
</script>

<style scoped>
	
	.reList .R{
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		width: 30rpx;
		height: 30rpx;
	}
	.reCn span{
		margin-right: 15rpx;
	}
	.reList .reCn{
		width: 500rpx;
		line-height: 40rpx;
		display: inline-block;
		vertical-align: middle;
		margin-left: 25rpx;
		color: #2b2f37;
		font-size: 28rpx;
	}
	.reList img{
		display: inline-block;
		vertical-align: middle;
		height: 80rpx;
		width: 80rpx;
		border-radius: 100%;
	}
	.ReplyCn .reList{
		padding: 20rpx 0rpx;
		border-bottom: 2rpx solid #E5E5E5;
		position: relative;
	}
	.ReplyCn{
		padding: 0 5%;
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