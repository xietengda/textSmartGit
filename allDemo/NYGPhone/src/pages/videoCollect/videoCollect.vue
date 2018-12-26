<template>
	<div class="container">
		
		<div v-show="!netError">
			<div v-show="!nullMsg">
				<!--类型选择-->
				<div class="videoType">
					<div :class="[videoType == 2?'sel':'']" :data-type-id="2" @click="changeType">视频</div>
					<div :class="[videoType == 3?'sel':'']" :data-type-id="3" @click="changeType">专辑</div>
				</div>
				
				<!--视频列表-->
				<div  v-show="videoType == 2">
					<videoList :videoData="videoData"  @skipDetail='lookVideo'/>
					
					<!--收藏为空-->
					<div class="cnNull" v-show="videoData.length == 0">
						<div class="icon collNullIcon"></div>
						<div class="cn greendT">暂无收藏</div>
						<div class="goPage" @click="goHome">去逛逛~</div>
					</div>
				</div>
				
				<!--专辑列表-->
				<div class="albumVideoCn" v-show="videoType == 3">
					<albumVideo :albumList="albumList" @skipDetail="lookAlbum"/>
					
					<!--收藏为空-->
					<div class="cnNull" v-show="albumList.length == 0">
						<div class="icon collNullIcon"></div>
						<div class="cn greendT">暂无收藏</div>
						<div class="goPage"  @click="goHome">去逛逛~</div>
					</div>
				</div>
			</div>
			
			<!--收藏为空-->
			<div class="cnNull" v-show="nullMsg">
				<div class="icon collNullIcon"></div>
				<div class="cn greendT">暂无收藏</div>
				<div class="goPage"  @click="goHome">去逛逛~</div>
			</div>
		</div>
		
		<!--网络出错-->
		<div v-show="netError">
			<netError :netError="netError" @refrePage="refPage"/>
		</div>
		
	</div>
</template>

<script>
	import videoList from '../../components/videoList'
	import albumVideo from '../../components/albumVideo'
	import netError from '../../components/netWorkError'
	
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求方法头
				videoType:2,
				videoData:[],
				viPage:1,//视频分页
				albumList:[],
				albPage:1,//专辑分页
				nullMsg:false,
				netError:false,//网络出错
			}
		},

		components: {
			videoList,
			albumVideo,
			netError,
		},

		methods: {
			changeType:function(e){
				this.videoType = e.currentTarget.dataset.typeId;
			},
			//刷新页面
			refPage:function(){
				console.log('刷新主页面')
//				this.netError = false
			},
			//PV
			getPV(){
				this.Request.getPV();
			},
			//获取收藏视频
			getVideoCollect(){
				wx.showLoading({
					title:'加载中'
				});
				var that = this;
				that.Request.getCollect(wx.getStorageSync('openid'),2,that.viPage)
					.then(res => {
						console.log(res);
						if(res.code == 0){
							
							for(var x in res.data.list){
								res.data.list[x].img = that.Request.getUrl() + res.data.list[x].img;
								res.data.list[x].CollectType = 'video';
							}
							
							var videoData = res.data.list;
							
							if(that.viPage != '1' && that.viPage != 'end'){
								var videoData = that.videoData.concat(res.data.list);
							}
							
							that.videoData = JSON.parse(JSON.stringify(videoData));
							
							if(res.data.page.page < res.data.page.total_page){
								that.viPage = that.viPage + 1;
							}else{
								that.viPage = 'end';
							}
							
							
						}
					})
					.catch(res => {
						console.log(res);
					})
			},
			//获取专辑视频
			getAlbumCollect(){
				wx.showLoading({
					title:'加载中'
				});
				var that = this;
				that.Request.getCollect(wx.getStorageSync('openid'),3,that.albPage)
					.then(res => {
						console.log(res);
						if(res.code == 0){
							
							for(var x in res.data.list){
								res.data.list[x].img = that.Request.getUrl() + res.data.list[x].img;
								res.data.list[x].CollectType = 'video';
							}
							
							var albumList = res.data.list;
							
							if(that.albPage != '1' && that.albPage != 'end'){
								var albumList = that.albumList.concat(res.data.list);
							}
							
							that.albumList = JSON.parse(JSON.stringify(albumList));
							
							
							if(res.data.page.page < res.data.page.total_page){
								that.albPage = that.viPage + 1;
							}else{
								that.albPage = 'end';
							}
							
							
						}
						setTimeout(function(){
							wx.hideLoading();
						},1000)
					})
					.catch(res => {
						console.log(res);
					})
			},
			//视频点击详情
			lookVideo(e){
				console.log(e)
				wx.navigateTo({
					url:'../videoDetail/main?id='+e.id+'&special_id='
				})
			},
			//专辑点击查看
			lookAlbum(e){
				wx.navigateTo({
					url:'../albumVideo/main?special_id='+e.specialId
				})
			},
			//回首页
			goHome(){
				this.$util.util.prototype.goHome();
			}
		},
		onShow(){
			this.viPage = 1;
			this.albPage = 1;
			//判断是否有用户openid
			if(wx.getStorageSync('openid')) {
				this.userInfo = wx.getStorageSync('openid'); 
				this.getPV();
				this.getVideoCollect();
				this.getAlbumCollect();
			} else {
				wx.navigateTo({
					url: '../login/main'
				})
			}
		} ,
		onReachBottom(){
			var that = this;
			var videoType =that.videoType;
			if(videoType == 2){
				if(that.viPage != 'end'){
					that.getVideoCollect();
				}else{
					wx.showToast({
						title:'到底了',
						icon:'none'
					})
				}
			}else if(videoType == 3){
				if(that.viPage != 'end'){
					that.getAlbumCollect();
				}else{
					wx.showToast({
						title:'到底了',
						icon:'none'
					})
				}
			}
		},
		onPullDownRefresh() {
			var that = this;
			that.viPage = 1;
			that.albPage = 1;
		    //模拟加载
		    setTimeout(function()
		    {
				that.getVideoCollect();
				that.getAlbumCollect();
		      	wx.stopPullDownRefresh() //停止下拉刷新
		    },1500);
		}
	}
</script>

<style>
	.videoType{
		text-align: center;
		height: 60rpx;
		line-height: 55rpx;
		margin-top: 40rpx;
		font-size: 0;
	}
	.videoType>div{
		display: inline-block;
		margin: 0 60rpx;
		color: #121213;
		font-size: 24rpx;
	}
	.videoType .sel{
		border-bottom: 7rpx solid #d1e36f;
	}
	.albumVideoCn{
		padding: 0 4%;
	}
	.albumVideoCn .albumList {
		width: 44%;
		padding: 0 3%;
	}
	.cnNull .icon{
		width: 110rpx !important;	
	}
	.collNullIcon{
		background: url('data:image/png;base64,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');
	}
</style>