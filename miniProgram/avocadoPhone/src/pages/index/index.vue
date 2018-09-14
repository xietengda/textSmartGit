<template>
	<div class="container">
		<!--搜索框-->
		<div class="searchAll" @click="skipSearch">
			<seaInput/>
			<div class="layer"></div>
		</div>

		<!--轮播图-->
		<div class="banner">
			<swiper @change="bannerChange" autoplay  interval="5000" circular>
					<swiper-item v-for="(item,key) in imgUrl" :key="item.id">
						<img :src="item.src" class="slide-image"  />
					</swiper-item>
			</swiper>
			<div class="banner_page">
				<span v-for="(item,key) in imgUrl" :key="item.id" :class="[bannerIndex == key?'sel':'']"></span>
			</div>
		</div>
		
		<!--专辑-->
		<div class="album">
				<div class="ListTil div_float">
					<p class="LTil">精选专辑</p>
					<p class="RTil" data-type="zj" @click="skipMore">更多></p>
				</div>
				<scroll-view class="albumCn" scroll-x>
					<div class="albList" v-for="(item,key) in albumList" :key="key" :data-album-id="item.id" data-type="zj" @click="lookVideo">
						<div class="img">
							<img src="../../../static/img/list1.png"/>
							<p>共2话</p>
						</div>
						<p class="albTil eli_two">留学申请必备资料教程</p>
					</div>
				</scroll-view>
		</div>
		
		<!--视频-->
		<div class="video">
				<div class="ListTil div_float">
					<p class="LTil">精选视频</p>
					<p class="RTil" data-type="sp" @click="skipMore">更多></p>
				</div>		
				<div class="videoCn">
					<div class="viList" v-for="item in videoList" :key="key"  data-type="sp" @click="lookVideo">
						<img src="../../../static/img/list2.png" />
						<div class="viTil eli_two">加拿大择校必看“菲沙排行榜”背后真正的参考价值|卑诗省篇</div>
					</div>
				</div>
		</div>
		
		<!--没有更多-->
		<noMore :noMore='noMore'/>
		
		
		<!--公共底部-->
		<allFooter :selType="selType" :isIndex="isIndex"/>
		
 		<!--回到顶部-->
		<goTop :goTop="goTop"/>
 		
 		
	</div>
</template> 

<script>
	import seaInput from '../../components/seaInput'
	import allFooter from '../../components/footer'
	import goTop from '../../components/goTop'
	import noMore from '../../components/noMore'

	export default {
		data() {
			return {
				Request:this.$api.api.prototype,//请求方法头
				imgUrl:[
				{src:'../../../static/img/banner.png'},
				{src:'../../../static/img/banner.png'},
				{src:'../../../static/img/banner.png'}
				],
				bannerIndex:0,
				albumList:[1,1,1,1], 
				videoList:[1,1,1,1],
				goTop:false,//回到顶部
				noMore:true,//没有更多
				selType:1,//底部选中类型
				isIndex:true,//首页点击不再跳转标志
			}
		},
		components: {
			seaInput,
			allFooter,
			goTop,
			noMore
		},

		methods: {
			bannerChange:function(e){
				this.bannerIndex = e.target.current;
			},
			skipSearch:function(){
				wx.navigateTo({
					url:'../search/main'
				})
			},
			//点击更多跳转
			skipMore:function(e){
				var type=  e.currentTarget.dataset.type;
				if(type == 'zj'){
					wx.navigateTo({
						url:'../recomAlbum/main'
					})
				}else{
					wx.navigateTo({
						url:'../video/main'
					})
				}
			},
			//点击专辑跳转
			lookVideo:function(e){
				console.log(e)
				var type = e.currentTarget.dataset.type;
				//判断类型跳转
				//专辑跳转到专辑列表页面
				if(type == 'zj'){
					wx.navigateTo({
						'url':'../albumVideo/main'
					})
				}else{
					wx.navigateTo({
						'url':'../videoDetail/main'
					})
				}

			},
			//获取轮播图
			getBanner:function(){
				this.Request.getBanner()
					.then(res => {
						console.log(res)
					})
			}
		},
		onShow(){
			this.getBanner();
		},
		onPageScroll(e){
			if(e.scrollTop > 100){
				this.goTop = true
			}else{
				this.goTop = false
			}
		}
	}
</script>

<style scoped>
	.container{
		padding-bottom: 120rpx;
	}
	.banner{
		width: 100%;
		height: 340rpx;
		margin-top: 30rpx;
		position: relative;
	}
	.banner swiper ,.banner swiper img{
		width: 100% ;
		height: 100%;
	}
	.banner_page{
		position: absolute;
		width: 100% ;
		bottom: 0;
		text-align: center;
	}
	.banner_page span{
		width: 10rpx;
		height: 10rpx;
		display: inline-block;
		vertical-align: middle;
		margin: 0 5rpx;
		border-radius: 100%;
		background-color: #a9bed0;
	}
	.banner_page .sel{
		width: 18rpx;
		background-color: #8fcd31;
	}
	.ListTil{
		height: 60rpx;
		line-height: 60rpx;
	}
	.ListTil .LTil{
		float: left;
		color: #121213;
		font-size: 36rpx;
	}
	.ListTil .RTil{
		float: right;
		color: #a9bed0;
		font-size: 0.3rem;
	}
	.album{
		margin-top: 40rpx;
		padding: 0 3%;
	}
	.album .albumCn{
		margin-top: 40rpx;
		white-space: nowrap;
		overflow-wrap: break-word;
		height: 380rpx;
	}
	.albumCn .albList{
		width: 204rpx;
		display: inline-block;
		margin-right: 32rpx;
	}
	.albumCn .albList .img{
		position: relative;
		width: 100%;
		height: 248rpx;
	}
	.albumCn .albList .img img{
		width: 100%;
		height: 100%;
	}
	.albumCn .albList .img  p{
		position: absolute;
		color: #ffffff;
		font-size: 26rpx;
		right: 5rpx;
		bottom: 5rpx;
	}
	.albumCn .albList  .albTil{
		width: 100%;
		margin-top: 26rpx;
		color: #3d3d3d;
		font-size: 28rpx;
    width: 100%;
	}
	.video{
		margin-top: 30rpx;
		padding: 0 3%;
	}
	.videoCn{
		margin-top: 30rpx;
		padding: 0 !important;
	}
	.videoCn .viList{
		height: 530rpx;
		margin-bottom: 40rpx;
	}
	.videoCn .viList img{
		width: 100%;
		height: 392rpx;
		margin: 0 auto;
		display: block;
		border-radius: 8rpx;
	}
	.videoCn .viList .viTil{
		margin-top: 35rpx;
		color: #3d3d3d;
		font-size: 32rpx;
		padding: 0 1%;
	}
	
	
</style>