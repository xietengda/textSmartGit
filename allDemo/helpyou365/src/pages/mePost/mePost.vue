<template>
	<div class="container CnTop CnBtm" :class="[isIphonex ? 'ixPaddCn':'']">

		<div class="head" :class="[isIphonex ? 'ixHead':'']">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div class="headText">
					<div :class="[sType == 1 ? 'sel':'']" @click="changeType"  data-s-type='1'>{{langua.mpPostText}}</div>
					<div :class="[sType == 2 ? 'sel':'']" @click="changeType"  data-s-type='2'>{{langua.mpComm}}</div>
				</div>
			</div>
		</div> 
		
		<!--帖子-->
		<scroll-view scroll-y class="ListView" @scrolltolower='postUpDate' :class="[isIphonex ? 'ixListView':'']" v-if="sType == 1">
			<postList :postList="postList" :showDel='showDel' :poLabel="poLabel" :noComment='noComment' @checkPerson="checkPerson" @eassDetial='eassDetial' :language="langua" @collectPost='collectPost' @postDianz='postDianz' @deletePost='deletePost' @checkImg='checkImg'/>
		</scroll-view>
		
		<!--评论-->
		<scroll-view scroll-y class="ListView" @scrolltolower='replyUpDate' :class="[isIphonex ? 'ixListView':'']" v-if="sType == 2">
			<div class="replyCn">
				<div class="replyList" v-for="(item,key) in reList" :key='reList'>
					<div class="poTop">
						<img class="headImg"  :src="item.avatar"  @click="checkPerson"/>
						<div class="poMsg">
							<div class="poSub"> 
								<div class="m1">{{item.user_nickname}}</div>
								<div class="m2">{{item.published_time}}</div>
							</div>
						</div>
						
						<!--评论的删除-->
						<div class="poCaoz">
							<div class="poDel" v-if="showDel" @click="delReply" :data-reply-id='item.id' :data-reply-index='key'>{{langua.mpDelete}}</div>
						</div>
					</div>
					<div class="poCn">{{item.content}}</div>
					<!--is_delete = 0 未删除-->
					<div class="sourceCn" v-if='item.is_delete == 0' :data-post-id='item.object_id' @click="eassDetial">
						<img :src="item.photo" v-if='item.photo != null'/>
						<img src="../../../static/img/nullImg.jpg" v-else/>
						<div class="souMsg">
							<div class="eli_one">@{{item.post_user_name}}</div>
							<div class="eli_one">{{item.post_content}}</div>
						</div>
					</div>
					<div  class="sourceCn" v-else>
						<div class="souMsg">
							<div class="eli_one">{{langua.isDelete}}</div>
						</div>
					</div>
				</div>
			</div>
		</scroll-view>
 
	</div>
</template>
 
<script>
	import postList from '../../components/postList'
	 
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				sType:1,//显示类型  1帖子  2评论
				poLabel:[1],//标签列表
				postList:[],//文章列表
				signPoList:[],//临时存放数组
				noComment:true,//没有评论列表
				showDel:true,//显示删除帖子
				reList:[],//评论列表
				langua:'',//静态文字的与语种
				postPage:1,//帖子列表页码
				replyPage:1,//回复列表页码
				isMyCom:true,//我的评论列表
				userId:wx.getStorageSync('userId'),//用户id
			}
		},

		components: {
			postList,
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
			//查看文章详情
			eassDetial(e){
				wx.navigateTo({
					url:'/pages/postDetail/main?postId='+e.currentTarget.dataset.postId
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
			//删除帖子
			deletePost(e){
				console.log(e)
				var that = this;
				var postId = e.currentTarget.dataset.postId;
				var postIndex = e.currentTarget.dataset.postIndex;
				var postList = this.postList;
				
				wx.showModal({
					title:that.langua.affirmDel+'？',
					success:res =>{
						console.log(res)
						if(res.confirm){
							that.Request.delFile(postId,'1',wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
								.then(res =>{
									if(res.code == 200){
										var sign  = [];
										for(var x in postList){
											if(x != postIndex){
												sign.push(postList[x]);
											}
										}
										that.postList = sign;
										wx.showToast({
											title:that.langua.delFinish
										})
									}
								})
						}
					}
				})
				console.log('删除帖子')
			},
			//删除回复
			delReply(e){
				console.log(e)
				var that = this;
				var replyId = e.currentTarget.dataset.replyId;
				var replyIndex = e.currentTarget.dataset.replyIndex;
				var reList = this.reList;
				
				wx.showModal({
					title:that.langua.affirmDel+'？',
					success:res =>{
						console.log(res)
						if(res.confirm){
							that.Request.delFile(replyId,'2',wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
								.then(res =>{
									if(res.code == 200){
										var sign  = [];
										for(var x in reList){
											if(x != replyIndex){
												sign.push(reList[x]);
											}
										}
										that.reList = sign;
										wx.showToast({
											title:that.langua.delFinish
										})
									}
								})
						}
					}
				})
				console.log('删除回复')
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
			//重新调用所有方法
			againShow(){
				this.myPostList().then(res =>{wx.hideLoading()});
				this.myCommentList();
			},
			//获取帖子列表
			async myPostList(){
				wx.showLoading({
					title:this.langua.loadText+'...',
					mask:true
				});
				var that  = this;
				await that.Request.myPostList(that.userId,that.postPage,10,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
//						console.log(res)
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
								this.myPostList().then(res =>{wx.hideLoading()});
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
					console.log(that.postList)
			},
			//获取评论列表
			async myCommentList(){
				var that = this;
				await that.Request.myCommentList(that.userId,that.replyPage,10,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							for(var k in res.data.list) {
								//转换时间显示格式
								res.data.list[k].published_time = that.util.changeTimeFormat(res.data.list[k].published_time);
								if(res.data.list[k].photo != null){
									//图片
									res.data.list[k].photo = that.Request.getUrl() + res.data.list[k].photo;
								}
							}
							
							var reList = that.util.converJSON(res.data.list);
	
							if(that.replyPage != 1 && that.replyPage != 'end') {
								var reList = that.util.concat(res.data.list);
							}
	
	
							that.reList = that.util.converJSON(reList);
							
							console.log(that.util.converJSON(reList));
	
							if(res.data.page.page < res.data.page.total) {
								that.replyPage = that.replyPage + 1;
							} else {
								that.replyPage = 'end';
							}
						}else if(res.code == 403){
							that.util.getSessionKey();
							setTimeout(function(){
								this.myCommentList();
							},1500)
						}
					})
					.catch(res =>{
						console.log(res)
					})
			},
			//上拉加载帖子
			postUpDate(){
				if(this.postPage  != 'end'){
					this.myPostList();
				}else{
					wx.showToast({
						title:this.langua.isEnd,
						icon:'none'
					})
				}
			},
			//上拉加载回复
			replyUpDate(){
				if(this.replyPage  != 'end'){
					this.myCommentList();
				}else{
					wx.showToast({
						title:this.langua.isEnd,
						icon:'none'
					})
				}
			}
		},
		onShareAppMessage: function(res) {
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
				path: '/pages/postDetial?postId='+postId,
				imageUrl:sImg
			}
		},
		onLoad(){
			this.langua = this.$util.util.prototype.changeLanguage();
			
			this.againShow();
		},
		onPullDownRefresh(){
			this.replyPage = 1;
			this.postPage = 1;
			var that = this;
		    //模拟加载
		    setTimeout(function()
		    {
		      	wx.stopPullDownRefresh() //停止下拉刷新
		      	that.againShow();
		    },500);
		},
		onUnload(){
			this.replyPage = 1;
			this.postPage = 1;
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
				path: '/pages/postDetail/main?postId='+postId,
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
		text-align: center;
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