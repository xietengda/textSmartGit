<template>
	<div class="container CnTop CnBtm">

		<div class="head">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div class="headText">切换语言</div>
			</div>
		</div> 
		
		<div class="msgCn">
			<div class="msgList">
				<div class="L"><span class="japan"></span>日本語</div>
			</div>
			<div class="msgList">
				<div class="L"><span class="korea"></span>한국어.</div>
			</div>
			<div class="msgList">
				<div class="L"><span class="china"></span>简体中文</div>
			</div>
		</div>
		
	</div>
</template>
 
<script>
	 
	export default {
		data() {
			return {
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
	.msgList .L span{
		display: inline-block;
		vertical-align: middle;
		width: 55rpx;
		height: 55rpx;
		margin-right: 16rpx;
		background-size: 100% 100% !important;
		margin-top: -5rpx;
	}
	.msgList .L{
		float: left;
		color: #2b2f37;
		font-size: 28rpx;
	}
	.msgCn .msgList{
		height: 114rpx;
		line-height: 114rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.msgCn{
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