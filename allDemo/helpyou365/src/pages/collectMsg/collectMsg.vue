<template>
	<div class="container CnTop CnBtm" :class="[isIphonex ? 'ixPaddCn':'']">

		<div class="head" :class="[isIphonex ? 'ixHead':'']">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div class="headText">
					<div :class="[sType == 1 ? 'sel':'']" @click="changeType"  data-s-type='1'>{{langua.hsMerchant}}</div>
					<div :class="[sType == 2 ? 'sel':'']" @click="changeType"  data-s-type='2'>{{langua.mpPostText}}</div>
				</div>
			</div>
		</div> 
		
		<!--商家列表-->
		<scroll-view scroll-y class="ListView" @scrolltolower='merUpDate' :class="[isIphonex ? 'ixListView':'']" v-if="sType == 1">
			<comList :comList="comList" @skipDetail='skipDetail' :language="langua" :hideKm='hideKm'/>
		</scroll-view>
		
		<!--帖子列表-->
		<scroll-view scroll-y class="ListView" @scrolltolower='postUpDate' :class="[isIphonex ? 'ixListView':'']" v-if="sType == 2"> 
			<div v-if='!loadText && postList.length != 0'>
				<postList :postList="postList" :noComment='noComment' @checkPerson='checkPerson' @eassDetial='eassDetial' :language="langua"  @collectPost='collectPost' @postDianz='postDianz' @checkImg='checkImg'/>
			</div>
			<div class="loadingText" v-else>{{langua.loadText}}...</div>
		</scroll-view>

		<!-- 置顶 -->
		<scrollTop></scrollTop>
 
	</div>
</template>
 
<script>
	import comList from '../../components/comList'
	import postList from '../../components/postList'
	import scrollTop from '../../components/scroll_top'
	 
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				sType:1,//显示类型  1商家  2帖子
				comList:[],//商家列表
				postList:[],//文章列表
				signPoList:[],//临时存放帖子列表
				noComment:true,//没有评论列表
				langua:'',//静态文字的语种
				comPage:1,//商家收藏分页
				postPage:1,//帖子收藏分页
				hideKm:true,//隐藏km单位
				loadText:true,//是否显示帖子加载中
			}
		},

		components: {
			comList,
			postList,
			scrollTop
		},
		computed: {
			isIphonex() {
				return this.$store.store.state.isIphonex
			},
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
			checkPerson(e){
				wx.navigateTo({
					url:'/pages/hisPost/main'
				})
			},
			//查看商家详情
			skipDetail(e){
				wx.navigateTo({
					url: '/pages/cateDetail/main?goodsId='+e.currentTarget.dataset.goodsId
				})
			},
			//查看帖子
			eassDetial(e){
				wx.navigateTo({
					url:'/pages/postDetail/main?postId='+e.currentTarget.dataset.postId
				})
			},
			//查看帖子图片
			checkImg(e){
				var pId = e.currentTarget.dataset.pId;
				var sIndex = e.currentTarget.dataset.sIndex;
				var photoList = this.postList[pId].photos;
				wx.previewImage({
					current:photoList[sIndex],
					urls:photoList
				})
			},
			//收藏帖子
			async collectPost(e){
				var that = this;
				var sign = true;
				var postList = that.postList;
				var pIndex = e.currentTarget.dataset.pIndex;
				var postId = e.currentTarget.dataset.postId;
				console.log(e)
				
				
				//判断是否登陆
				await that.util.judgeLogin();
				
				//等于1是已收藏
				if(that.postList[pIndex].user_iscollect == 1){
					sign = false;
				}
				
				that.Request.collectPost(wx.getStorageSync('openid'),2,postId,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						if(res.code == 200){
							if(sign){
								wx.showToast({
									title:this.langua.collAdd,
								})
								that.postList[pIndex].user_iscollect = 1;
							}else{
								wx.showToast({
									title:this.langua.collCancel,
								})
								that.postList[pIndex].user_iscollect = 0;
							}
						} else if(res.code == 403) {
							that.util.getSessionKey();
						}
					})
			},
			//点赞
			async postDianz(e){
				var that  = this;
				var sign = true;
				var postList = that.postList;
				var pIndex = e.currentTarget.dataset.pIndex;
				var postId = e.currentTarget.dataset.postId;
				
				//判断是否登陆
				await that.util.judgeLogin();
				
				//等于1是已点赞
				if(that.postList[pIndex].user_islike == 1){
					sign = false;
				}
				
				that.Request.likePost(postId,1,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							if(sign){
								that.postList[pIndex].user_islike = 1;
								that.postList[pIndex].post_like = that.postList[pIndex].post_like + 1;
							}else{
								that.postList[pIndex].user_islike = 0;
								that.postList[pIndex].post_like = that.postList[pIndex].post_like - 1;
							}
						}
					})
					.catch(res =>{
						console.log(res)
					})
			},
			againFun(){
				this.collectMerchant().then(res =>{wx.hideLoading()});
				this.userCollectPost().then(res =>{wx.hideLoading()});
			},
			//获取收藏商家列表
			async collectMerchant(){
				//加载动画
				wx.showLoading({title:this.langua.loadText+'...'});
				var that = this;
				await that.Request.collectMerchant(that.comPage,10,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							for(var x in res.data.list){
								res.data.list[x].thumbnail = that.Request.getUrl() + res.data.list[x].thumbnail;
							}
							
							console.log(res.data.list);
							
							var comList = that.util.converJSON(res.data.list);

							if(that.comPage != 1 && that.comPage != 'end') {
								var comList = that.comList.concat(res.data.list);
							}

							that.comList = that.util.converJSON(comList);

							if(res.data.page.page < res.data.page.total) {
								that.comPage = that.comPage + 1;
							} else {
								that.comPage = 'end';
							}
						}else if(res.code == 403){
							that.util.getSessionKey();
							setTimeout(function(){
								that.againFun();
							},1500)
						}
					})
					.catch(res =>{
						console.log(res)
					})
			},
			//获取收藏帖子
			async userCollectPost(){
				//加载动画
				wx.showLoading({title:this.langua.loadText+'...'});
				var that = this;
				await that.Request.userCollectPost(that.postPage,10,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							for(var k in res.data.list) {
								//转换时间显示格式
								res.data.list[k].published_time = that.util.changeTimeFormat(res.data.list[k].published_time);
								//图片
								for(var x in res.data.list[k].photos) {
									res.data.list[k].photos[x] = that.Request.getUrl() + res.data.list[k].photos[x];
								}
							}

							var postList = that.util.converJSON(res.data.list);

							if(that.postPage != 1 && that.postPage != 'end') {
								var postList = that.postList.concat(res.data.list);
							}

							that.signPoList = that.util.converJSON(postList);

							if(res.data.page.page < res.data.page.total) {
								that.postPage = that.postPage + 1;
							} else {
								that.postPage = 'end';
							}
						}else if(res.code == 403){
							that.util.getSessionKey();
							setTimeout(function(){
								that.againFun();
							},1500)
						}
					})
					.catch(res =>{
						console.log(res)
					})
					
					
					//判断图片显示样式 sType: cro 横向  row 竖向 squ 正方形
					var postList2 = that.util.converJSON(that.signPoList);
					
					console.log(postList2)
					for(var i in postList2){
						if(postList2[i].photos.length == 1){
							await that.util.getImgInfo(postList2[i].photos[0])
								.then(rs =>{
									postList2[i].sType = rs
								})
						}else{
							postList2[i].pLength = postList2[i].photos.length;
						}
						
					}
					that.postList = postList2;
					//隐藏加载中文字
					that.loadText = false;
					console.log(that.postList)
			},
			//上拉加载商家
			merUpDate(){
				var that = this;
				if(that.comPage != 'end'){
					this.collectMerchant().then(res =>{wx.hideLoading()});
				}else{
					wx.showToast({
						title:this.langua.isEnd,
						icon:'none'
					})
				}
			},
			//上拉加载帖子
			postUpDate(){
				var that = this;
				if(that.postPage != 'end'){
					this.userCollectPost().then(res =>{wx.hideLoading()});
				}else{
					wx.showToast({
						title:this.langua.isEnd,
						icon:'none'
					})
				}
			},
		},
		onLoad(){
			this.langua = this.$util.util.prototype.changeLanguage();
			this.againFun();
		},
		onUnload(){
			this.comPage = 1;
			this.postPage = 1;
		},
		onPullDownRefresh(){
			console.log('下拉刷新')
			var that = this;
		    //模拟加载
		    setTimeout(function()
		    {
		      	wx.stopPullDownRefresh() //停止下拉刷新
		    },500);
		},
		onShareAppMessage: function(res) {
			console.log(res)
			var that = this;
			var postId = res.target.dataset.postId;
			var postList = that.postList;
			var title = '';
			var sImg = '';			
			for(var x in postList){
				if(postList[x].id == postId){
					title = postList[x].post_content;
					sImg = postList[x].photos[0];
				}
			}
			
			return {
				title: title,
				path: '/pages/postDetail?postId='+postId,
				imageUrl:sImg
			}
		},
	}
</script>

<style scoped>
	.ixListView{
		top: 170rpx !important;
	}
	.ListView{
		position: fixed;
		top: 128rpx;
		width: 100%;
		bottom: 0;
	}
	.container{
		position: absolute;
		width: 100%;
		top: 0;
		bottom: 0;
	} 
	.headText .sel{
		color: #F90000 !important;
		border-bottom: 2rpx solid #F90000;
	}
	.headText>div:nth-child(1){
		margin-right: 20rpx;
	}
	.headText>div{
		display: inline-block;
		min-width: 125rpx;
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
		height: 90rpx;
		line-height: 90rpx;
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