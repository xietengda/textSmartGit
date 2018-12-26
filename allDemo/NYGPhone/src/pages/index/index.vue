<template>
	<div class="container" :class="[isIphonex ? 'ixCnBottom':'']">
		<!--搜索框-->
		<div class="searchAll" @click="skipSearch">
			<span class="searchIcon"></span>
			<div class="input">搜一搜</div>
			<div class="layer"></div>
		</div>
		<!--轮播图-->
		<div class="banner">
			<swiper @change="bannerChange" autoplay interval="5000" circular>
				<swiper-item v-for="(item,key) in imgUrl" :key="item.id" :data-b-type="item.banner_type" @click='bannerSkip' :data-sou-id="item.url_id">
					<img :src="item.program_img" class="slide-image" />
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
				<div class="albList" v-for="(item,key) in albumArr" :key="key" :data-album-id="item.id" data-type="zj" @click="lookVideo">
					<div class="img" :data-album-id="item.id" @click="lookEssay">
						<img :src="item.img" />
						<p>共{{item.num}}话</p>
					</div>
					<p class="albTil eli_two">{{item.title}}</p>
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
				<div class="viList" v-for="item in videoList" :key="key" data-type="sp" :data-id="item.id"  @click="lookVideo" :data-special-id="item.special_id" :data-category-id="item.video_category_id" :data-c-id="item.id">
					<img :src="item.img" />
					<div class="viTil eli_two">{{item.title}}</div>
				</div>
			</div>
		</div>

		<!--没有更多-->
		<noMore :noMore='noMore' />

		<!--公共底部-->
		<allFooter :selType="selType" :isIndex="isIndex" />

		<!--回到顶部-->
		<goTop :goTop="goTop" />

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
				Request: this.$api.api.prototype, //请求方法头
				imgUrl: [],
				bannerIndex: 0,
				albumArr: [],
				albPage:1,//专辑列表页码
				videoList: [],
				viPage:1,//视频列表页码
				goTop: false, //回到顶部
				noMore: true, //没有更多
				selType: 1, //底部选中类型
				isIndex: true, //首页点击不再跳转标志
			}
		},
		components: {
			seaInput,
			allFooter,
			goTop,
			noMore
		},
		computed:{
            isIphonex(){
                return this.$store.store.state.isIphonex
            },
       	},

		methods: {
			//PV
			getPV(){
				this.Request.getPV()
					.then(res => {
					})
			},
			bannerChange: function(e) {
				this.bannerIndex = e.target.current;
			},
			skipSearch: function() {
				wx.navigateTo({
					url: '../search/main'
				})
			},
			//点击轮播图跳转
			bannerSkip:function(e){
				console.log(e.currentTarget.dataset.bType)
				var bType = e.currentTarget.dataset.bType;
				var souId = e.currentTarget.dataset.souId;
				//1文章 2视频 3专辑 0没有选择任何的视频或者文章
				//文章
				if(bType == '1'){
					wx.navigateTo({
						url:'../overseasDetail/main?article_id='+souId
					});
				}
				//视频
				else if(bType == '2'){
					wx.navigateTo({
						url:'../videoDetail/main?id='+souId+'&special_id='
					})
				}
				//专辑
				else if(bType == '3'){
					wx.navigateTo({
						url:'../albumVideo/main?special_id='+souId
					})
				}
			},
			//点击更多跳转
			skipMore: function(e) {
				var type = e.currentTarget.dataset.type;
				if(type == 'zj') {
					wx.navigateTo({
						url: '../recomAlbum/main'
					})
				} else {
					wx.navigateTo({
						url: '../video/main'
					})
				}
			},
			//点击专辑跳转
			lookVideo: function(e) {
				console.log(e)
				var type = e.currentTarget.dataset.type;
				
				//判断类型跳转
				//专辑跳转到专辑列表页面
				if(type == 'zj') {
					var albumId = e.currentTarget.dataset.albumId;
					wx.navigateTo({
						'url': '../albumVideo/main?special_id='+albumId
					})
				} else {
					var id = e.currentTarget.dataset.id;
					var specialId = e.currentTarget.dataset.specialId; 
					wx.navigateTo({
						'url': '../videoDetail/main?id='+id+'&special_id='+specialId
					})
				}

			},
			//获取轮播图
			getBanner: function() {
				var that = this;
				this.Request.getBanner()
					.then(res => {
						if(res.code == 0) {
							var signArr = [];
							for(var x in res.data) {
								if(res.data[x].program_img != 1){
									res.data[x].program_img = that.Request.getUrl() + res.data[x].program_img;
									signArr.push(res.data[x])
								}
							}
							this.imgUrl = signArr;
						}
					})
			},
			//获取专辑视频
			getAlbumVideo: function() {
				var that = this;
				this.Request.getAlbumVideo('', '', that.albPage)
					.then(res => {
//						console.log(res)
						if(res.code == 0) {
							for(var x in res.data.list){
								res.data.list[x].img = that.Request.getUrl() + res.data.list[x].img;
							}
						}
						
						var albumArr = res.data.list;
							
							if(that.albPage != '1' && that.albPage != 'end'){
								var albumArr = that.albumArr.concat(res.data.list);
							}
							
							if(res.data.page.page < res.data.page.total_page){
								that.albPage = that.albPage + 1;
							}else{
								that.albPage = 'end';
							}
							
						
							that.albumArr = JSON.parse(JSON.stringify(albumArr));

					})
			},
			//获取精选视频
			getSelVideo:function(){
				var that = this;
				this.Request.getSelVideo('',1,that.viPage)
					.then(res => {
						if(res.code == 0){
							for(var x in res.data.list){
								res.data.list[x].img = that.Request.getUrl() + res.data.list[x].img;
								res.data.list[x].video = that.Request.getUrl() + res.data.list[x].video;
							}
							
							var videoList = res.data.list;
							
							if(that.viPage != '1' && that.viPage != 'end'){
								var videoList = that.videoList.concat(res.data.list);
							}
							
							if(res.data.page.page < res.data.page.total_page){
								that.viPage = that.viPage + 1;
							}else{
								that.viPage = 'end';
							}
							
							that.videoList = JSON.parse(JSON.stringify(videoList));
						}
					}) 
			},
			//查看专辑
			lookEssay(e){
//				wx.navigateTo({
//					url:'../albumVideo/main?special_id='+e.currentTarget.dataset.albumId
//				})
			}
			

		},
		onLoad() {
			this.getBanner();
			this.getAlbumVideo();
			this.getSelVideo();
			this.getPV();
		},
		onPageScroll(e) {
			if(e.scrollTop > 100) {
				this.goTop = true
			} else {
				this.goTop = false
			}
		},
		onPullDownRefresh() {
			var that = this;
		    //模拟加载
		    setTimeout(function()
		    {
		    	that.getBanner();
				that.getAlbumVideo();
				that.getSelVideo();
				that.getPV();
		      	wx.stopPullDownRefresh() //停止下拉刷新
		    },1500);
		},
		onShareAppMessage: function (res) {
		    if (res.from === 'button') {
		      // 来自页面内转发按钮
//		      console.log(res.target)
		    }
		    return {
		      title: '牛油果视频',
		      path: '/pages/index/main'
		    }
		}
	}
</script>

<style scoped>
	.searchAll .searchIcon {
		display: inline-block;
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		left: 25rpx;
		margin: auto;
		top: 0;
		bottom: 0;
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACw0lEQVRIib3XTahVVRjG8d853A4VhWhB2odQWVnewKAPGhWNErwOuhFhBeGFgijRImgQEVJZk+gObHZTGqsQ92bgSILKEBOEoEndcuBHRYYmgdDJwftuznbfvc89J489sNnP2h/rv9a71l7r3a0333rPIlqOSTyC8SyP4RzmcRBzOIDuYpUVGutz73a8jacbnrs2G/EwtuInvItdgzSgrsIWtmQlV5Wun8ARnMKZhN6BtWjjNszgRWzEj8OAr8iXnytdm8V2EdJ/a+pYLqLyBm7AgziECXzVBG6XfAs7S9B5Ma4b8E0DFE7iI6zCdD63FJ/jgUHAm/FM+sN4CF82vVijv8QQTeEfLMFuLOsHvhXvp/8Z6/DbENCyduK19CvxQT/wNlwpwvTsJUALTeOL9Jtwdx14mZgcRGgaJ8SQelV8Vm28XAee0Jvd0yOCwg/Yn/4pF88nbTGe8Cu+HiEY9ub5eqypgu9Nf1jzJ/NfdaTkx6vgm9KfGDEUjpf8iiq40NnLAD5X8p0q+O/0Sy8D+JqS/7MKLhbzBd/aCFQe1/kq+GD6+3DdiMGP5bkrNo6LwPvSj4ntbFTqlOr7Fn9UwQf0wv06rh4ReAo3p/+kerMtwrA9y7dg0VxoAK3CO+l/wad1YGJHKcZ6M56/BOgSfKa3Hb6C803grhiP0yIhmBF5VGtI6EoxdPdkeY/IYBaovIDMi3X7bF7/UEy81QMAO3hJLJFrS9cnsH4xMDH7HsWxLD+O77MBL+B+3CgWm9V5f4fIMHfohXevCG9H9HoBvC7L/C5bvS1hHRGJdTXPVnVM7L2zore7S/BJkX/X9rjQaTEp7sLH+L0PrCuShyncqTems3hSQ89bA/xJFA0cz2OFiNQZEeJDKotDResT2slGTGKu359EWV0czWNYzSWsgO/BE02hHrUKeBH2mf8LXIafwr4LrwWRj0odppYAAAAASUVORK5CYII=') no-repeat;
		background-size: 100% 100%;
	}
	.searchAll .input {
		width: 523rpx;
		height: 100%;
		line-height: 60rpx;
		background-color: #f5f5f7;
		border-radius: 30rpx;
		padding-left: 70rpx;
		color: #757575;
		font-size: 26rpx;
	}
	.searchAll {
		width: 593rpx;
		height: 60rpx;
		margin: 0 auto;
		margin-top: 10rpx;
		position: relative;
	}
	.container {
		padding-bottom: 150rpx;
	}
	
	.banner {
		width: 100%;
		height: 340rpx;
		margin-top: 30rpx;
		position: relative;
	}
	
	.banner swiper,
	.banner swiper img {
		width: 100%;
		height: 100%;
	}
	
	.banner_page {
		position: absolute;
		width: 100%;
		bottom: 0;
		text-align: center;
	}
	
	.banner_page span {
		width: 10rpx;
		height: 10rpx;
		display: inline-block;
		vertical-align: middle;
		margin: 0 5rpx;
		border-radius: 100%;
		background-color: #a9bed0;
	}
	
	.banner_page .sel {
		width: 18rpx;
		background-color: #8fcd31;
		border-radius: 40rpx !important;
	}
	
	.ListTil {
		height: 60rpx;
		line-height: 60rpx;
	}
	
	.ListTil .LTil {
		float: left;
		color: #121213;
		font-size: 36rpx;
	}
	
	.ListTil .RTil {
		float: right;
		color: #a9bed0;
		font-size: 0.3rem;
	}
	
	.album {
		margin-top: 40rpx;
		padding: 0 3%;
	}
	
	.album .albumCn {
		margin-top: 40rpx;
		white-space: nowrap;
		overflow-wrap: break-word;
		height: 450rpx;
	}
	
	.albumCn .albList {
		width: 210rpx;
		display: inline-block;
		margin-right: 22rpx;
		vertical-align: top;
	}
	
	.albumCn .albList .img {
		position: relative;
		width: 100%;
		height: 288rpx;
	}
	
	.albumCn .albList .img img {
		width: 100%;
		height: 100%;
	}
	
	.albumCn .albList .img p {
		position: absolute;
		color: #ffffff;
		font-size: 26rpx;
		width: 95%;
		height: 40rpx;
		line-height: 40rpx;
		padding-right: 5%;
		bottom: 0;
		text-align: right;
		 background: -webkit-linear-gradient(to bottom, rgba(0,0,0,0) , rgba(0,0,0,.6));
		 background: linear-gradient(to bottom,rgba(0,0,0,0) , rgba(0,0,0,.6));
	}
	
	.albumCn .albList .albTil {
		width: 100%;
		margin-top: 26rpx;
		color: #3d3d3d;
		font-size: 26rpx;
		height: 70rpx;
	}
	
	.video {
		margin-top: 30rpx;
		padding: 0 3%;
	}
	
	.videoCn {
		margin-top: 30rpx;
		padding: 0 !important;
	}
	
	.videoCn .viList {
		height: 530rpx;
		margin-bottom: 40rpx;
	}
	
	.videoCn .viList img {
		width: 100%;
		height: 392rpx;
		margin: 0 auto;
		display: block;
		border-radius: 8rpx;
	}
	
	.videoCn .viList .viTil {
		margin-top: 35rpx;
		color: #3d3d3d;
		font-size: 32rpx;
		padding: 0 1%;
	}
	
</style>