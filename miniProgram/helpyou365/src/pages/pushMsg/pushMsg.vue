<template>
	<div class="container CnTop CnBtm">

		<div class="head">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div class="headText">系统消息</div>
			</div>
		</div> 
		
		<div class="ReplyCn">
			<div class="reList div_float" v-for="(item,key) in pushList" :key="pushList">
				<div class="L tuiS"></div>
				<div class="reCn">您有一条系统通知</div>
				<div class="R rArraw"></div>
			</div>
		</div>
		
		<div class="nullMsg">
			<span class="jusang"></span>暂无系统消息
		</div>
		
	</div>
</template>
 
<script>
	 
	export default {
		data() {
			return {
				pushList:[1,1,1],
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
	.reList .reCn{
		width: 500rpx;
		line-height: 40rpx;
		display: inline-block;
		vertical-align: middle;
		margin-left: 25rpx;
		color: #2b2f37;
		font-size: 28rpx;
	}
	.reList .L{
		display: inline-block;
		vertical-align: middle;
		height: 55rpx;
		width: 55rpx;
		background-size:  100% 100% !important;
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