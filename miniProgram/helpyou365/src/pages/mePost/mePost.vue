<template>
	<div class="container CnTop CnBtm">

		<div class="head">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div class="headText">
					<div :class="[sType == 1 ? 'sel':'']" @click="changeType"  data-s-type='1'>帖子</div>
					<div :class="[sType == 2 ? 'sel':'']" @click="changeType"  data-s-type='2'>评论</div>
				</div>
			</div>
		</div> 
		
		<!--帖子-->
		<div v-if="sType == 1">
			<postList :postList="postList" :showDel='showDel' :poLabel="poLabel" :noComment='noComment' @checkPerson="checkPerson" @eassDetial='eassDetial'/>
		</div>
		
		<!--评论-->
		<div v-if="sType == 2">
			<replyList :reList='reList' :showDel='showDel' @skipDetial='skipDetial' @deletePost='deletePost'/>
		</div>
 
	</div>
</template>
 
<script>
	import postList from '../../components/postList'
	import replyList from '../../components/replyList'
	 
	export default {
		data() {
			return {
				sType:2,//显示类型  1帖子  2评论
				poLabel:[1],//标签列表
				postList:[1,2],//文章列表
				noComment:true,//没有评论列表
				showDel:true,//显示删除帖子
				reList:[1,1,1],//评论列表
			}
		},

		components: {
			postList,
			replyList
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
			//查看作者信息
			checkPerson(){
				wx.navigateTo({
					url:'/pages/hisPost/main'
				})
			},
			//查看文章详情
			eassDetial(){
				wx.navigateTo({
					url:'/pages/postDetail/main'
				})
			},
			//查看评论的详情
			skipDetial(){
				wx.navigateTo({
					url:'/pages/postDetail/main'
				})
			},
			//删除帖子
			deletePost(){
				console.log('删除帖子')
			}
		},
		onShareAppMessage: function(res) {
			return {
				title: '自定义转发标题',
				path: '/page/user?id=123'
			}
		}
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