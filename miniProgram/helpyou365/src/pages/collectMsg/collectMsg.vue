<template>
	<div class="container CnTop CnBtm">

		<div class="head">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div class="headText">
					<div :class="[sType == 1 ? 'sel':'']" @click="changeType"  data-s-type='1'>商家</div>
					<div :class="[sType == 2 ? 'sel':'']" @click="changeType"  data-s-type='2'>帖子</div>
				</div>
			</div>
		</div> 
		
		<!--商家列表-->
		<div v-if="sType == 1">
			<comList :comList="comList" @skipDetail='skipDetail'/>
		</div>
		
		<!--帖子列表-->
		<div v-if="sType == 2"> 
			<postList :postList="postList" :poLabel="poLabel" :noComment='noComment' @checkPerson='checkPerson' @eassDetial='eassDetial' />
		</div>
 
	</div>
</template>
 
<script>
	import comList from '../../components/comList'
	import postList from '../../components/postList'
	 
	export default {
		data() {
			return {
				sType:1,//显示类型  1商家  2帖子
				comList:[1,1,1],//商家列表
				poLabel:[1],//标签列表
				postList:[1,2],//文章列表
				noComment:true,//没有评论列表
			}
		},

		components: {
			comList,
			postList
		},

		methods: {
			//返回
			goBack(){
				wx.navigateBack();
			},
			//切换类型
			changeType:function(e){
				this.sType = e.currentTarget.dataset.sType;
			},
			//查看商家详情
			skipDetail(){
				wx.navigateTo({
					url:'/pages/cateDetail/main'
				})
			},
			//查看作者信息
			checkPerson(){
				wx.navigateTo({
					url:'/pages/hisPost/main'
				})
			},
			//查看帖子
			eassDetial(){
				wx.navigateTo({
					url:'/pages/postDetail/main'
				})
			}
		},
		
	}
</script>

<style scoped>
	.headText .sel{
		color: #F90000 !important;
		border-bottom: 2rpx solid #F90000;
	}
	.headText>div{
		display: inline-block;
		width: 125rpx;
		line-height: 78rpx;
		text-align: center;line-height: ;
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
	.container{
		background-color: #F5F5F5;
	}
</style>