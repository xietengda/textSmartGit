<template>
	<div class="container CnTop CnBtm">

	<!--头部返回-->
	<div class="mTop">
		<div class="headSub">
			<div class="back backIcon_w" @click="goBack"></div>
		</div>
	</div>	
	
	<!--用户信息-->
	<div class="userMsg">
		<div class="uSub div_float">
			<img src="../../../static/img/me_sel.png" />
			<div class="uMsg">
				<div>広州Wホテル </div>
				<div><span>关注 12</span><span>粉丝 30</span></div>
				<div class="uAtten">
					<!--<div>+关注</div>-->
					<div>取消关注</div>
				</div>
			</div>
		</div>
	</div>
	
	<!--切换模式-->
	<div class="selType">
		<div :class="[sType== 1 ? 'sel':'']" @click="changeType"  data-s-type='1'>他的帖子</div>
		<div :class="[sType== 2 ? 'sel':'']" @click="changeType"  data-s-type='2'>他的回复</div>
	</div>
	
	<!--他的帖子-->
	<div class="hisPost" v-if="sType == 1">
		<postList :postList="postList" :poLabel="poLabel"  :noComment="noComment"/>
	</div>
	
	<!--他的回复-->
	<div class="hisReply" v-if="sType == 2">
		<replyList  :reList='reList'/>
	</div>

	</div>
</template>

<script>
	import postList from '../../components/postList'
	import replyList from '../../components/replyList' 
	
	export default {
		data() {
			return {
				sType:1,//切换类型：1帖子  2回复
				poLabel:[1],//标签列表
				postList:[1,1],//文章列表
				noComment:true,//没有评论列表
				reList:[1,1],//回复列表
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
			}
		},

		created() {}
	}
</script>

<style scoped>
	.selType .sel{
		color: #F90000 !important;
		border-bottom: 2rpx solid #F90000;
	}
	.selType>div{
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #333333;
		font-size: 32rpx;
	}
	.selType{
		height: 86rpx;
		line-height: 84rpx;
		padding: 0 3%;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.uAtten>div{
		width: 150rpx;
		height: 50rpx;
		border-radius: 35rpx;
		border: 2rpx solid white;
		color: white;
		font-size: 24rpx;
		display: inline-block;
		text-align: center;
		line-height: 50rpx;
		text-align: center;
	}
	.uAtten{
		position: absolute;
		right: 0;
		bottom: 10rpx;
	}
	.userMsg .uMsg>div:nth-child(2){
		font-size: 30rpx;
	}
	.userMsg .uMsg>div:nth-child(1){
		font-size: 36rpx;
	}
	.uMsg span{
		margin-right: 40rpx;
	}
	.userMsg .uMsg{
		display: inline-block;
		vertical-align: middle;
		line-height: 80rpx;
		color: white;
		margin-left: 30rpx;
		width: 500rpx;
		position: relative;
	}
	.userMsg .uSub img{
		display: inline-block;
		vertical-align: middle;
		width: 152rpx;
		height: 152rpx;
		border-radius: 100%;
	}
	.userMsg .uSub{
		display: inline-block;
		vertical-align: middle;
	}
	.userMsg{
		height: 258rpx;
		line-height: 258rpx;
		background-color: #1C1A1B;
	}
	.headSub .back{
		width: 18rpx;
		height: 37rpx; 
		padding-right: 20rpx;
		background-repeat: no-repeat;
		position: absolute;
		margin: auto;
		top: 0;
		bottom: 0;
		left: 5%;
	}
	.headSub {
		position: relative;
		width: 100%;
		height: 80rpx;
		margin-top: 45rpx;
	}
	.mTop{
		height: 130rpx;
		background-color: #1c1a1b;
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 3;
	}
</style>