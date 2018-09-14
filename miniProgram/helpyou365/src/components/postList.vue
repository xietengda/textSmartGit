<template>
	<div class="postCn" v-if="postList.length != 0">
		<div class="poList" v-for='(item,key1) in postList' :key="postList">
			<div class="poTop">
				<img class="headImg" src="../../static/img/me_sel.png" @tap="goPerson" />
				<div class="poMsg">
					<div class="poSub">
						<div class="m1">我是一只鱼<span class="zhid">置顶</span><span class="jing">精</span></div>
						<div class="m2">19小时前</div>
					</div>
				</div>
				<!--帖子的删除和关注作者操作-->
				<div class="poCaoz">
					<div class="poDel" v-if="showDel">删除</div>
					<div class="poAtten"  v-if="showAtten"><span>+</span>关注</div>
				</div>
			</div>
			<div class="poCn eli_four">能对产品有一份热爱，是一件很幸运的事儿了。如果确实与自己想要的事业方向或者想法是一致，那肯定会投入很多的热情。但是一个现在还没有那么多的主动权去....</div>
			<div class="allText" @tap="goEassDetial">全文</div>
			<div class="imgView">
				<!--横向图片  1张-->
				<div class="imgCro">
					<image src="../../static/img/list1.png" mode="widthFix" />
				</div>
				<!--竖向图片 1张-->
				<!--<div class="imgRow">
						<image src="../../../static/img/home.png" />
					</div>-->
				<!--正方形 1张-->
				<!--<div class="imgSquare">
						<image class="imgCro" src="../../../static/img/list1.png" />
					</div>-->
				<!--正方形 2.4张-->
				<!--<div class="imgSquare2 div_float">
						<image  src="../../../static/img/list1.png" />
						<image  src="../../../static/img/list1.png" />
						<image  src="../../../static/img/list1.png" />
						<image  src="../../../static/img/list1.png" />
					</div>-->
				<!--正方形 3.5.6.7.8.9张-->
				<!--<div class="imgSquare3 div_float">
						<image src="../../../static/img/list1.png" />
						<image src="../../../static/img/list1.png" />
						<image src="../../../static/img/list1.png" />
						<image src="../../../static/img/list1.png" />
					</div>-->
			</div>

			<!--标签-->
			<div class="poLabel div_float">
				<div v-for="(item,key) in poLabel" :key="poLabel"><span class="labelIcon"></span>我的私人美食地图</div>
			</div>
			
			<!--操作-->
			<div class="poOper div_float" v-if="!noPeration">
				<div class="poL div_float">
					<span class="dianzan dzIcon"></span>
					<div class="dzImg div_float">
						<image src="../../dist/static/img/me.png" />
						<image src="../../dist/static/img/me.png" />
						<image src="../../dist/static/img/me.png" />
					</div>
					<div class="dzRs">198赞</div>
				</div>
				<div class="poR">
					<div class="poShare shareIcon">
						<button open-type='share'></button>
					</div>
					<div class="poCom"><span class="msgIcon"></span>14</div>
					<div class="dianzCZ notCollect"></div>
				</div>
			</div>
			
			<!--浏览和点赞-->
			<div class="browseView div_float" v-if="noPeration">
				<div class="browse">浏览 2999</div>
				<div class="like"><span class="dzIcon"></span>888</div>
			</div>
			
			
			<!--评论-->
			<div class="poComCn" v-if="!noComment">
				<div class="poComLi"><span class="blueT">小仙女</span>回复<span class="blueT">大猪头</span>：傻嗨啊你</div>
				<div class="poComLi"><span class="blueT">小仙女</span>：哈哈哈哈哈哈</div>
				<div class="checkMore" @click="lookMore">查看更多评论</div>
			</div>

		</div>
	</div>
	
	
	<div class="atlasNull" v-else>
		<div class="icon nullPhoto"></div>
		<div class="til">暂无帖子</div>
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:[
			'postList',
			'poLabel',
			'noPeration',//没有操作（列表将不显示转发/评论/点赞按钮）
			'noComment',//不显示列表
			'showAtten',//显示右上角的关注按钮
			'showDel',//显示右上角删除
		],
		components: {
		},
		
		methods: {
			//查看个人信息
			goPerson(e){
				this.$emit('checkPerson');
			},
			//点击查看帖子
			goEassDetial(){
				this.$emit('eassDetial');
			},
			//查看更多评论
			lookMore(){
				this.$emit('checkMore');
			}
		}, 

		created() {}
	}
</script>

<style scoped>
	.poDetailCn .poList{
		padding-bottom: 0;
		margin-bottom: 0;
	}
	.browseView .like>span{
		width: 36rpx;
		height: 35rpx;
		display: inline-block;
		vertical-align: middle;
		margin-right: 10rpx;
		margin-top: -12rpx;
	}
	.browseView .like{
		float: right;
		color: #7a7a7a;
		font-size: 28rpx;
	}
	.browseView .browse{
		float: left;
		color: #7a7a7a;
		font-size: 28rpx;
	}
	.browseView{
		height: 70rpx;
		line-height: 70rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
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
	.poComCn .checkMore {
		font-size: 26rpx;
		color: #666;
	}
	
	.blueT {
		color: #557694;
	}
	
	.poComCn span {
		margin: 0 5rpx;
	}
	
	.poComCn .poComLi {
		height: 50rpx;
		line-height: 50rpx;
		font-size: 26rpx;
		color: #000;
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
		width: 26rpx;
		height: 28rpx;
		margin-right: 12rpx;
	}
	
	.poR .poCom {
		line-height: 40rpx;
		color: #333333;
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
	
	.poL .dzRs {
		float: left;
		color: #797979;
		font-size: 28rpx;
		margin-left: 15rpx;
	}
	
	.poL .dzImg image:nth-child(3) {
		left: 65rpx
	}
	
	.poL .dzImg image:nth-child(2) {
		left: 32rpx
	}
	
	.poL .dzImg image {
		position: absolute;
		width: 37rpx;
		height: 37rpx;
		border-radius: 100%;
	}
	
	.poL .dzImg {
		float: left;
		position: relative;
		width: 110rpx;
		height: 40rpx;
	}
	
	.poL .dianzan {
		float: left;
		width: 36rpx;
		height: 36rpx;
		margin-right: 14rpx;
	}
	
	.poOper .poL {
		float: left;
		height: 40rpx;
		line-height: 40rpx;
	}
	
	.poOper {
		margin: 30rpx 0;
	}
	
	.poLabel>div>span {
		display: inline-block;
		vertical-align: middle;
		width: 26rpx;
		height: 30rpx;
		margin-top: -5rpx;
		margin-right: 10rpx;
		margin-left: 10rpx;
	}
	
	.poLabel>div {
		padding: 0 20rpx;
		height: 48rpx;
		line-height: 48rpx;
		font-size: 24rpx;
		color: #323332;
		float: left;
		margin-right: 20rpx;
		margin-bottom: 15rpx;
		border-radius: 25rpx;
		margin-top: 15rpx;
		background-color: #f3f3f3;
	}
	
	.poLabel {
		margin-top: 20rpx;
	}
	
	.imgSquare3 image {
		float: left;
		width: 213rpx;
		height: 213rpx;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
	}
	
	.imgSquare3 image:nth-child(3),
	.imgSquare3 image:nth-child(6) {
		margin-right: 0 !important;
	}
	
	.imgSquare2 image {
		float: left;
		width: 213rpx;
		height: 213rpx;
		margin-right: 16rpx;
	}
	
	.imgSquare2 {
		width: 460rpx;
	}
	
	.imgSquare image {
		width: 335rpx !important;
		height: 335rpx;
	}
	
	.imgRow image {
		width: 335rpx;
		max-height: 440rpx;
	}
	
	.imgCro image {
		width: 442rpx;
		height: auto;
		display: block;
	}
	
	.imgView {
		clear: both;
		margin-top: 20rpx;
	}
	
	.allText {
		color: #F90000;
		font-size: 28rpx;
		margin: 10rpx 0;
	}
	
	.poCn {
		color: #666666;
		font-size: 28rpx;
		margin: 10rpx 0;
		clear: both;
	}
	
	.jing {
		width: 35rpx;
		height: 35rpx;
		border-radius: 5rpx;
		color: white;
		background-color: #ff4444;
		text-align: center;
		line-height: 35rpx;
		font-size: 24rpx;
		display: inline-block;
		margin-left: 10rpx;
	}
	
	.zhid {
		width: 65rpx;
		height: 35rpx;
		border-radius: 5rpx;
		color: white;
		background-color: #4180F2;
		text-align: center;
		line-height: 35rpx;
		font-size: 24rpx;
		display: inline-block;
		margin-left: 16rpx;
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
	
	.poList {
		padding: 0 5%;
		margin-bottom: 20rpx;
		padding-bottom: 40rpx;
		background-color: #FFFFFF;
	}
	
	.postCn {
		/*margin-top: 30rpx;*/
		background-color: #F5F5F5;
	}
</style>