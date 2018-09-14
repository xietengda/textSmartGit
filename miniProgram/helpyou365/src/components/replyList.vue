<template>
	<div class="replyCn">
		<div class="replyList" v-for="item in reList" :key='reList'>
			<div class="poTop">
				<img class="headImg" src="../../static/img/me_sel.png" />
				<div class="poMsg">
					<div class="poSub">
						<div class="m1">我是一只鱼<span class="zhid">置顶</span><span class="jing">精</span></div>
						<div class="m2">19小时前</div>
					</div>
				</div>
				
				<!--帖子的删除和关注作者操作-->
				<div class="poCaoz">
					<div class="poDel" v-if="showDel" @click="delPost">删除</div>
				</div>
			</div>
			<div class="poCn eli_two">能对产品有一份热爱，是一件很幸运的事儿了。如果确实与自己想要的事业方向或者想法是一致，那肯定会投入很多的热情。但是一个现在还没有那么多的主动权去....</div>
			<div class="allText">全文</div>
			<div class="sourceCn" @click="goDetail">
				<img src="../../static/img/list2.png" />
				<div class="souMsg">
					<div class="eli_one">小叮当寿司</div>
					<div class="eli_one">吃屎的设计</div>
				</div>
			</div>
			<!--操作-->
			<div class="poOper div_float" v-if="!noPeration">
				<div class="poR">
					<div class="poCom"><span class="msgIcon"></span></div>
					<div class="poCom"><span class="dzIcon"></span>14</div>
				</div>
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
		props:[
			'reList',
			'showDel',//是否显示删除 按钮
		],
		components: {
		},
		
		methods: {
			//查看店铺详情
			goDetail(){
				this.$emit('skipDetial');
			},
			//删除帖子
			delPost(){
				this.$emit('deletePost')
			}
		}, 

		created() {}
	}
</script>

<style scoped>
	.poCaoz .poAtten span{
		font-size: 34rpx;
	}
	.poCaoz .poAtten{
		width: 125rpx;
		height: 50rpx;
		border-radius: 30rpx;
		border: 2rpx solid #eeeeee;
		color: #f90000;
		font-size: 24rpx;
		text-align: center;
		line-height: 50rpx;
	}
	.poCaoz .poDel{
		width: 125rpx;
		height: 50rpx;
		border-radius: 30rpx;
		border: 2rpx solid #eeeeee;
		color: #7a7a7a;
		font-size: 24rpx;
		text-align: center;
		line-height: 50rpx;
	}
	.poCaoz>div{
		display: inline-block;
	}
	.poCaoz{
		position: absolute;
		margin: auto;
		top: 0;
		bottom: 0;
		right: 0;
	}
	.dianzCZ {
		width: 28rpx;
		height: 28rpx;
		margin-top: 4rpx !important;
	}
	
	.poR .poCom>span {
		display: inline-block;
		vertical-align: middle;
		margin-top: -5rpx;
		width: 30rpx;
		height: 30rpx;
		margin-right: 12rpx;
	}
	
	.poR .poCom {
		line-height: 40rpx;
		color: #7a7a7a;
		font-size: 28rpx;
		margin-top: 1rpx !important;
	}
	
	.poR .poShare button {
		position: absolute;
		width: 28rpx;
		height: 28rpx;
		top: 0;
		left: 0;
		padding: 0;
		opacity: 0;
	}
	
	.poR .poShare {
		position: relative;
		width: 28rpx;
		height: 28rpx;
		margin-top: 6rpx !important;
	}
	
	.poR>div {
		float: left;
		margin: 0 15rpx;
	}
	
	.poR {
		float: right;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 0;
	}
	.poOper {
		margin: 30rpx 0;
	}
	.sourceCn .souMsg>div:nth-child(1){
		font-size: 28rpx;
		color: #000;
		font-weight: bold;
	}
	.sourceCn .souMsg{
		display: inline-block;
		vertical-align: middle;
		width: 500rpx;
		line-height: 48rpx;
		font-size: 26rpx;
		color: #666;
		margin-left: 20rpx;
	}
	.sourceCn img{
		display: inline-block;
		vertical-align: middle;
		width:82rpx;
		height: 82rpx;
		border-radius: 15rpx;
	}
	.sourceCn{
		padding: 20rpx;
		background-color: #F3F3F3;
		margin-top: 20rpx;
		border-radius: 10rpx;
	}
	.allText {
		color: #F90000;
		font-size: 28rpx;
		margin: 30rpx 0;
	}
	
	.poCn {
		color: #666666;
		font-size: 28rpx;
		margin: 10rpx 0;
		clear: both;
	}
	
	.poSub .m2 {
		color: #999999;
		font-size: 24rpx;
	}
	
	.poSub .m1 {
		color: #333333;
		font-size: 32rpx;
	}
	
	.poSub {
		display: inline-block;
		vertical-align: middle;
		line-height: 45rpx;
	}
	
	.poMsg {
		float: left;
		margin-left: 23rpx;
		height: 126rpx;
		line-height: 126rpx;
		max-width: 500rpx;
	}
	
	.headImg {
		float: left;
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		margin-top: 13rpx;
	}
	
	.poTop {
		height: 126rpx;
		line-height: 126rpx;
		position: relative;
	}
	.replyList{
		padding: 0 5%;
		background-color: white;
		padding-bottom: 30rpx;
		margin-bottom: 20rpx;
	}
	.replyCn{
		background-color: #F5F5F5;
	}
</style>