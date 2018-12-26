<template>
	<div class="container">
			<!--搜索框-->
			<div class="searchAll" @click="skipSearch">
				<seaInput/>
				<div class="layer"></div>
			</div>
			
			<!--分类名称-->
			<TypeList :TypeList='TypeList' :TypeListId="TypeListId" @changeType="changeTypeId"/>
			
			<!--视频列表-->
			<div class="videoList">
				<div class="viList" v-for="item in videoList" :key="item.id" :data-id='item.id' @click="skipDetail">
					<img :src="item.img" />
					<div class="eli_two">{{item.title}}</div>
				</div>
				<!--没有更多-->
				<noMore :noMore='noMore' />
			</div>
			
			
			<!--公共底部-->
			<allFooter :selType="selType"/>
			
	</div>
</template>

<script>
	import seaInput from '../../components/seaInput'
	import allFooter from '../../components/footer'
	import TypeList from '../../components/TypeList'
	import noMore from '../../components/noMore'

	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求方法头
				TypeList:[],
				TypeListId:'',
				videoList:[],
				page:1,
				noMore:false,
				selType:1
			}
		},

		components: {
			seaInput,
			allFooter,
			TypeList,
			noMore
		},

		methods: {
			//PV
			getPV(){
				this.Request.getPV();
			},
			skipSearch:function(){
				wx.navigateTo({
					url:'../search/main'
				})
			},
			changeTypeId:function(e){
				this.TypeListId = e;
				this.page = 1;
				this.getSelVideo();
			},
			//获取视频分类
			getVideoType:function(){
				var that = this;
				that.Request.getVideoType()
					.then(res =>{
						if(res.code == 0){
							let signText = {};
							signText.id = '';
							signText.name = '全部';
							res.data.unshift(signText);
							that.TypeList = JSON.parse(JSON.stringify(res.data));					
						}
					})
			},
			//获取视频列表
			getSelVideo:function(){
				wx.showLoading({
					title:'加载中'
				});
				var that = this;
				this.Request.getSelVideo(that.TypeListId,'',that.page)
					.then(res => {
						console.log(res)
						if(res.code == 0){
							for(var x in res.data.list){
								res.data.list[x].img = that.Request.getUrl() + res.data.list[x].img;
								res.data.list[x].video = that.Request.getUrl() + res.data.list[x].video;
							}
							
							var videoList = res.data.list;
							
							if(that.page != '1' && that.page != 'end'){
								var videoList = that.videoList.concat(res.data.list);
							}
							
							if(res.data.page.page < res.data.page.total_page){
								that.page = that.page + 1;
							}else{
								that.page = 'end';
							}
							
							that.videoList = JSON.parse(JSON.stringify(videoList));
						}
					}) 
			},
			//跳转详情
			skipDetail:function(e){
				console.log(e.currentTarget.dataset.id)
				wx.navigateTo({
					url:'../videoDetail/main?id='+e.currentTarget.dataset.id+'&special_id='
				})
			}
		},
		onShow(){
			this.getVideoType();
			this.getSelVideo();
		},
		onReachBottom(){
			if(this.page  != 'end'){
				this.getSelVideo();
			}else{
				this.noMore = true;
			}
		},
		onPullDownRefresh() {
			var that = this;
		    //模拟加载
		    setTimeout(function()
		    {
		    	that.getVideoType();
				that.getSelVideo();
				that.getPV();
		      	wx.stopPullDownRefresh() //停止下拉刷新
		    },1500);
		}
	}
</script>

<style scoped>
	
	.videoList{
		margin-top: 30rpx;
		padding: 0 4%;
		padding-bottom: 1.6rem;
	}
	.videoList .viList{
		height: 586rpx;
		margin-top: 58rpx;
	}
	.videoList .viList img{
		width: 100%;
		height: 458rpx;
		border-radius: 8rpx;
	}
	.videoList .viList div{
		color: #3d3d3d;
		font-size: 32rpx;
		margin-top: 25rpx;
		line-height: 48rpx;
	}
</style>