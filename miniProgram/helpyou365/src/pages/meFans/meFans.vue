<template>
	<div class="container CnTop CnBtm">

		<div class="head">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div class="headText">
					<div :class="[sType == 1 ? 'sel':'']" @click="changeType"  data-s-type='1'>我的关注</div>
					<div :class="[sType == 2 ? 'sel':'']" @click="changeType"  data-s-type='2'>我的粉丝</div>
				</div>
			</div>
		</div> 
		
		<!--我的关注-->
		<div v-if="sType == 1">
			<div class="attenCn">
				<div class="attenList" v-for="(item,key) in attenList" :key="attenList">
					<img src="../../../static/img/cIcon.png" />
					<div class="msg">
						<div>hush</div>
						<div>我是一只鱼，资深专业吃货</div>
					</div>
					<div class="attOprea">
						<div><span class="tick_g"></span>已关注</div>
						<div>取消关注</div>
					</div>
				</div>
			</div>
		</div>
		
		<!--我的粉丝-->
		<div v-if="sType == 2">
			<div class="attenCn">
				<div class="attenList" v-for="(item,key) in attenList" :key="attenList">
					<img src="../../../static/img/cIcon.png" />
					<div class="msg">
						<div>hush</div>
						<div>我是一只鱼，资深专业吃货</div>
					</div>
					<div class="attOprea">
						<div><label class="gou_r"></label>关注</div>
						<div>互相关注</div>
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
				sType:1,//显示类型  1我的关注  2我的粉丝
				attenList:[1,1,1,1],//关注列表
			}
		},

		components: {
			
		},

		methods: {
			//返回
			goBack(){
				wx.navigateTo();
			},
			//切换类型
			changeType:function(e){
				this.sType = e.currentTarget.dataset.sType;
			}
		},
		
	}
</script>

<style scoped>
	.attOprea label{
		display: inline-block;
		vertical-align: middle;
		width: 20rpx;
		height: 20rpx;
		margin-top: -5rpx;
		margin-right: 5rpx;
	}
	.attenList .attOprea span{
		display: inline-block;
		vertical-align: middle;
		width: 30rpx;
		height: 28rpx;
		margin-top: -5rpx;
	}
	.attenList .attOprea>div{
		display: inline-block;
		vertical-align: middle;
		border: 2rpx solid #e5e5e5;
		width: 140rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		border-radius: 35rpx;
		color: #636363;
		font-size: 24rpx;
	}
	.attenList .attOprea{
		position: absolute;
		right: 0;
		margin: auto;
		top: 0;
		bottom: 0;
	}
	.attenList .msg>div:nth-child(2){
		color: #999999;
		font-size: 24rpx;
	}
	.attenList .msg>div:nth-child(1){
		color: #333333;
		font-size: 32rpx;
	}
	.attenCn .attenList .msg{
		display: inline-block;
		line-height: 48rpx;
		vertical-align: middle;
		width: 500rpx;
		margin-left: 30rpx;
	}
	.attenCn .attenList img{
		display: inline-block;
		vertical-align: middle;
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
	}
	.attenCn .attenList{
		height: 180rpx;
		line-height: 180rpx;
		border-bottom: 2rpx solid #E5E5E5;
		position: relative;
	}
	.attenCn{
		padding: 0 3%;
		padding-bottom: 60rpx;
	}
	.headText .sel{
		color: #F90000 !important;
		border-bottom: 2rpx solid #F90000;
	}
	.headText>div{
		display: inline-block;
		line-height: 78rpx;
		text-align: center;line-height: ;
	}
	.headText>div:nth-child(1){
		margin-right: 50rpx;
	}
	.headText{
		display: inline-block;
		color: #333333;
		font-size: 32rpx;
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