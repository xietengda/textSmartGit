<template>
	<div class="container CnTop CnBtm">

		<div class="head">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div class="headText">帖子详情</div>
			</div>
		</div> 
		
		<!--帖子内容-->
		<postList :postList="postList" :poLabel="poLabel" :showAtten='showAtten' :noPeration="noPeration" :noComment='noComment'/>
		
		<!--评论列表-->
		<div class="comView">
			<div class="comTil">评论<span>(3)</span></div>
			<div class="comTop div_float">
				<img src="../../../static/img/me_sel.png" />
				<div>快来写下你的评论吧～</div>
			</div>
			<div class="comCn">
				<div class="comList div_float">
					<img class="L" src="../../../static/img/list2.png" />
					<div class="R">
						<div class="til eli_one">dpuser_69465345201</div>
						<div class="time">8月21日  11:59</div>
						<div class="cn">哈哈哈哈哈</div>
						<div class="opera">
							<div class="pl msgIcon"></div>
							<div class="dz"><span class="dzIcon"></span>888</div>
						</div>
					</div>
				</div>
				<div class="comList div_float">
					<img class="L" src="../../../static/img/list2.png" />
					<div class="R">
						<div class="til eli_one">切瓦拉格·狗蛋</div>
						<div class="time">8月21日  11:59</div>
						<div class="cn">哈哈哈哈哈</div>
						<div class="opera">
							<div class="pl msgIcon"></div>
							<div class="dz"><span class="dzIcon"></span>888</div>
						</div>
						
						<!--回复列表-->
						<div class="reply">
							<div class="reList">
								<div class="reName">史蒂芬·狗剩</div>
								<div class="reCn"><label>@切瓦拉格·狗蛋</label>：屎好吃吗？答案是：yes!屎好吃吗？答案是：yes!</div>
							</div>
							<div class="reList">
								<div class="reName">小仙女</div>
								<div class="reCn"><label>@史蒂芬·狗剩</label>：屎好吃吗？答案是：yes!屎好吃吗？答案是：yes!</div>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
		
		
		<!--回复框和评论框-->
		<div class="btmInput divHide" >
			<div class="inputView div_float">
				<img src="../../../static/img/me.png" />
				<input type="text"  placeholder="请输入评论" />
			</div>
			<!--<div class="inputView div_float">
				<img src="../../../static/img/me.png" />
				<input type="text"  placeholder="@切瓦辛格·狗剩" />
			</div>-->
		</div>
		
		
		<!--底部分享-->
		<div class="postBtm">
			<div class="poBtmList">
				<button open-type='share' />
				<span class="shareIcon_w"></span>分享
			</div>
			<div class="poBtmList">
				<span class="collectIcon_w"></span>收藏：688
			</div>
			<div class="poBtmList">
				<span class="msgIcon_w"></span>评论：79
			</div>
		</div>
 
	</div>
</template>
 
<script>
	import postList from '../../components/postList'
	 
	export default {
		data() {
			return {
				poLabel:[1],//标签列表
				postList:[1],//文章列表
				noPeration:true,//没有操作（列表将不显示转发/评论/点赞按钮）
				noComment:true,//没有评论列表
				showAtten:true,//显示关注按钮 
			}
		},

		components: {
			postList
		},

		methods: {
			//返回
			goBack(){
				wx.navigateBack();
			}
		},
		onShareAppMessage(){
			return {
		      title: '自定义转发标题',
		      path: '/page/user?id=123'
		    }
		}
	}
</script>

<style scoped>
	.btmInput .inputView input{
		display: inline-block;
		vertical-align: middle;
		width: 500rpx;
		padding: 0 35rpx;
		height: 70rpx;
		border-radius: 35rpx;
		background-color: #f4f4f4;
		color: #777777;
		font-size: 30rpx;
		margin-left: 20rpx;
	}
	.btmInput .inputView img{
		display: inline-block;
		vertical-align: middle;
		width: 80rpx;
		height: 80rpx;
		border-radius: 100%;
	}
	.btmInput .inputView{
		position: inherit;
		bottom: 0;
		padding: 0 3%;
		height: 110rpx;
		line-height: 110rpx;
		width: 100%;
		background-color: white;
	}
	.btmInput{
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: rgba(0,0,0,.6);
		z-index: 3;
	}
	.postBtm .poBtmList button{
		position: absolute;
		padding: 0;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.postBtm .poBtmList>span{
		display: inline-block;
		vertical-align: middle;
		width: 38rpx;
		height: 38rpx;
		margin-right: 18rpx;
		margin-top: -7rpx;
	}
	.postBtm .poBtmList{
		display: inline-block;
		width: 33%;
		text-align: center;
		color: #ffffff;
		font-size: 26rpx;
		position: relative;
	}
	.postBtm{
		width: 90%;
		padding: 0 5%;
		height: 95rpx;
		line-height: 95rpx;
		background-color: #333333;
		position: fixed;
		bottom: 0;
		z-index: 2;
	}
	.reply .reList .reCn label{
		color: #4d6786;
	}
	.reply .reList .reCn{
		color: #787878;
	}
	.reply .reList .reName{
		color: #4d6786;
	}
	.reply .reList{
		margin-bottom: 40rpx;
		font-size: 30rpx;
		line-height: 50rpx;
		border-left: 5rpx solid #E5E5E5;
		padding-left: 17rpx;
	}
	.reply{
		margin-top: 30rpx;
	}
	.comList .R .opera .dz span{
		display: inline-block;
		vertical-align: middle;
		width: 30rpx;
		height: 30rpx;
		margin-top: -5rpx;
		margin-right: 5rpx;
	}
	.comList .R .opera .dz{
		color: #7a7a7a;
		font-size: 20rpx;
	}
	.comList .R .opera .pl{
		width: 26rpx;
		height: 28rpx;
	}
	.comList .R .opera>div{
		display: inline-block;
		vertical-align: middle;
		margin: 0 20rpx;
	}
	.comList .R .opera{
		height: 40rpx;
		line-height: 40rpx;
		text-align: right;
		margin-top: 10rpx;
	}
	.comList .R .cn{
		color: #000000;
		font-size: 30rpx;
		margin-top: 10rpx;
	}
	.comList .R .time{
		color: #a2a2a2;
		font-size: 24rpx;
		margin-top: 10rpx;
	}
	.comList .R .til{
		color: #4d6786;
		font-size: 30rpx;
		margin-top: 5rpx;
	}
	.comList .R{
		float: right;
		width: 570rpx;
		padding-bottom: 15rpx;
		border-bottom: 2rpx  solid #E5E5E5;
	}
	.comList .L{
		float: left;
		width: 80rpx;
		height: 80rpx;
		border-radius: 100%;
	}
	.comList{
		margin-bottom: 20rpx;
	}
	.comCn{
		margin-top: 50rpx;
	}
	.comView .comTop>div{
		float: left;
		width: 505rpx;
		height: 70rpx;
		line-height: 70rpx;
		padding: 0 30rpx;
		font-size: 30rpx;
		color: #777777;
		border-radius: 35rpx;
		background-color: #f4f4f4;
		margin-left: 19rpx;
		margin-top: 5rpx;
	}
	.comView .comTop img{
		float: left;
		width: 80rpx;
		height: 80rpx;
		border-radius: 100%;
	}
	.comView .comTop{
		height: 80rpx;
		line-height: 80rpx;
		margin-top: 20rpx;
	}
	.comView .comTil span{
		color: #333333;
		font-size: 30rpx;
	}
	.comView .comTil{
		color: #141414;
		font-size: 46rpx;
		
	}
	.comView{
		padding: 0 5%;
		margin-top: 20rpx;
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