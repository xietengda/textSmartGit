<template>
	<div class="container CnTop CnBtm">

		<div class="head">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div class="headText">关注我的</div>
			</div>
		</div> 
		
		<div class="attenCn">
			<div class="attenList" v-for="item in atteList" :key='atteList'>
				<img src="../../../static/img/cIcon.png" />
				<div><span>努力的丑小鸭</span>关注了你</div>
			</div>
		</div>
		
		<div class="nullMsg">
			<span class="jusang"></span>暂无关注
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
	.attenList div span{
		margin-right: 20rpx;
	}
	.attenList div{
		display: inline-block;
		vertical-align: middle;
		font-size: 28rpx;
		color: #2b2f37;
		width: 500rpx;
		margin-left: 30rpx;
	}
	.attenList img{
		display: inline-block;
		vertical-align: middle;
		width: 80rpx;
		height: 80rpx;
		border-radius: 100%;
	}
	.attenCn .attenList{
		height: 114rpx;
		line-height: 114rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.attenCn{
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