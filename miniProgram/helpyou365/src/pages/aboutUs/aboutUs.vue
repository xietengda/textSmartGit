<template>
	<div class="container CnTop CnBtm">

		<div class="head">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div class="headText">关于我们</div>
			</div>
		</div> 
		
		<div class="aboutText">
			<div>"365 ，是2010年3月4日成立的团购网站。有着“吃喝玩乐全都有”和“美团一次美一次”的服务宣传宗旨。总部位于北京市朝阳区望京东路6号。</div>
			<div>014年美团全年交易额突破460亿元，较去年增长180%以上，市场份额占比超过60%，比2013年的53%增长了7个百分点。 [2]  </div>
			<img src="../../../static/img/list2.png" />
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
	.aboutText img{
		margin:20rpx 0;
		width: 100%;
		height: 300rpx;
	}
	.aboutText div{
		color: #2b2f37;
		font-size: 30rpx;
		line-height: 60rpx;
	}
	.aboutText{
		padding: 0 3%;
		margin-top: 30rpx;
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