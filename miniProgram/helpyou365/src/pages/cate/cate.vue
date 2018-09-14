<template>
	<div class="container CnTop CnBtm">

		<div class="head">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div class="headText">格调美食</div>
			</div>
		</div> 
		
		<div class="cateCn">
			<div class="cateList" v-for="(item,index) in cateList" :key="cateList"  @click="skipDetail">
				<img src="../../../static/img/banner.png" />
				<div class="caMsg">
					<div class="til eli_one">一宗深夜食堂</div>
					<div class="subTil div_float">
						<div class="L eli_one">坐享独立空间日式榻榻米 舒适惬意</div>
						<div class="R">北京路丨500m</div>
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
				cateList:[1,1,1],
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
		
	}
</script>

<style scoped>
	.cateList .caMsg .subTil .R{
		float: right;
		color: #333333;
	}
	.cateList .caMsg .subTil .L{
		float: left;
		color: #2b2f37;
		width: 450rpx;
	}
	.cateList .caMsg .subTil{
		margin-top: 25rpx;
		font-size: 24rpx;
	}
	.cateList .caMsg .til{
		color: #333333;
		font-size: 32rpx;
	}
	.cateList .caMsg{
		margin-top: 25rpx;
		padding: 0 5%;
	}
	.cateList>img{
		width: 100%;
		height: 420rpx;
		display: block;
	}
	.cateCn>div:last-child{
		margin-bottom: 0;
	}
	.cateCn .cateList{
		background-color: white;
		padding-bottom: 30rpx;
		margin-bottom: 16rpx;
	}
	.cateCn{
		background-color: #F5F5F5;
		margin-top: 30rpx;
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