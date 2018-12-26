<template>
	<div class="container CnTop CnBtm"  :class="[isIphonex ? 'ixPaddCn':'']">

		<!--头部返回-->
		<div class="mTop" :class="[isIphonex ? 'ixHead':'']">
			<div class="headSub">
				<div class="back backIcon_w" @click="goBack"></div>
			</div>
		</div>

		<!--用户信息-->
		<div class="userMsg">
			<div class="uSub div_float">
				<img :src="userInfo.avatar" />
				<div class="uMsg">
					<div>{{userInfo.user_nickname}} </div>
					<div><span>{{langua.mAtten}} {{userInfo.follow}}</span><span>{{langua.mFans}} {{userInfo.fans}}</span></div>
					<div class="uAtten" v-if='userInfo.user_id != userId'>
						<div v-if='userInfo.is_follow != 1' :data-user-id='userInfo.user_id' @click="addAtten">+{{langua.mAtten}}</div>
						<div v-else :data-user-id='userInfo.user_id' @click="removeAtten">{{langua.mfCancelAtten}}</div>
					</div>
				</div>
			</div>
		</div>

		<!--切换模式-->
		<div class="selType" > <!--:class="isScrollTop ? 'isScrollTop':''"-->
			<div :class="[sType== 1 ? 'sel':'']" @click="changeType" data-s-type='1'>{{langua.hisPost}}</div>
			<div :class="[sType== 2 ? 'sel':'']" @click="changeType" data-s-type='2'>{{langua.hisReply}}</div>
		</div>

		<!--他的帖子-->
		<div class="hisPost" v-if="sType == 1">
			<postList :postList="postList" :poLabel="poLabel" :noComment="noComment" :language='langua' @collectPost='collectPost'  @eassDetial='skipDetial' @postDianz='postDianz'  @checkImg='checkImg'/>
		</div>

		<!--他的回复-->
		<div class="hisReply" v-if="sType == 2">
			<replyList :reList='reList'  @skipDetial='skipDetial' @lookPerson="checkPerson" :language='langua' @dianZReply='dianZReply' @replyCom='replyCom'/>
		</div>
		
		<!--回复框-->
		<div class="btmInput" v-if='replyFous'>
			<div class="inputView div_float" >
				<img :src="toUserInfo.toUserAva" />
				<input type="text"  :focus='replyFous'  @blur='inputBlur' @confirm='submitReply'    :placeholder="toUserInfo.toUserName" />
			</div>
		</div>

	</div>
</template>

<script>
	import postList from '../../components/postList'
	import replyList from '../../components/replyList'

	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				sType: 1, //切换类型：1帖子  2回复
				poLabel: [1], //标签列表
				postList: [], //文章列表
				noComment: true, //没有评论列表
				reList: [], //回复列表
				langua: '', //静态文字的语种
				userInfo:'',//用户信息
				authorId:'',//用户id
				userId:wx.getStorageSync("userId"),//登陆用户id
				postPage:1,//帖子页码
				replyPage:1,//回复页码
				isScrollTop:false,//是否滚动到左右切换标题
				replyFous:false,//回复框回去焦点
				toUserInfo:'',//回复用户信息
			}
		},
 
		components: {
			postList,
			replyList
		},
		computed: {
			isIphonex() {
				return this.$store.store.state.isIphonex
			},
		},
		methods: {
			//返回
			goBack() {
				wx.navigateBack();
			},
			//切换类型
			changeType: function(e) {
				this.sType = e.currentTarget.dataset.sType;
			},
			//点击点赞帖子
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
			//点击收藏帖子
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
			//获取评论焦点
			replyCom(e){
				console.log(e)
				var sign = {
					parentId:e.currentTarget.dataset.parentId,
					postId:e.currentTarget.dataset.postId,
					toUserId:e.currentTarget.dataset.toUserId,
					toUserName: '@'+e.currentTarget.dataset.toUserName,
					toUserAva:e.currentTarget.dataset.toUserAva
				}
				this.toUserInfo = sign;
				this.replyFous = true;
			},
			//失去焦点
			inputBlur(){
				this.replyFous = false;
			},
			//回复评论
			submitReply(e){
				var that = this;
				var reCn = e.mp.detail.value;
				var toUser = that.toUserInfo;
				that.Request.postReply(toUser.postId,toUser.parentId,reCn,toUser.toUserId)
					.then(res =>{
						if(res.code == 200){
							wx.showToast({
								title:that.langua.addReply
							})
						}
					})
					.catch(res =>{
						console.log(res)
					})
			},
			//查看评论的详情
			async skipDetial(e){
				//判断是否登陆
				await this.util.judgeLogin();
				
				wx.navigateTo({
					url:'/pages/postDetail/main?postId='+e.currentTarget.dataset.postId
				})
			},
			
			//点赞回复
			dianZReply(){
				console.log('点赞评论')
			},
			//添加关注
			addAtten(e){
				console.log('添加关注')
				var userId = e.currentTarget.dataset.userId;
				var that = this;
					that.Request.attenUser(userId,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
						.then(res =>{
							if(res.code == 200){
								that.userInfo.is_follow = 1;
								wx.showToast({
									title:that.langua.attenYes
								})
							}
						})
			},
			//取消关注
			removeAtten(e){
				console.log('取消关注')
				var userId = e.currentTarget.dataset.userId;
				var that = this;
				that.Request.cancelAttenUser(userId,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						if(res.code == 200){
							that.userInfo.is_follow = 0;
							wx.showToast({
								title:that.langua.mfCancelAtten
							})
						}
					})
			},
			againFun(){
				this.attenAndFans();
				this.myPostList().then(res =>{wx.hideLoading()});
				this.myCommentList();
			},
			//获取用户信息
			async attenAndFans(){
				//加载动画
				wx.showLoading({title:this.langua.loadText+'...'});
				var that = this;
				that.Request.attenAndFans(that.authorId,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							that.userInfo = res.data;
						}else if(res.code == 403){
							that.util.getSessionKey();
							setTimeout(function(){
								that.attenAndFans();
							},1500)
						}
					})
					.catch(res =>{
						console.log(res)
					})
			},
			//获取帖子列表
			async myPostList(){
				wx.showLoading({
					title:this.langua.loadText+'...',
					mask:true
				});
				var that  = this;
				await that.Request.myPostList(that.authorId,that.postPage,10,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
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
								that.myPostList();
							},1500)
						}
					})
					.catch(res =>{
						console.log(res)
					})
					
					
					//判断图片显示样式 sType: cro 横向  row 竖向 squ 正方形
					var postList2 = that.util.converJSON(that.signPoList);
					
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
				await that.Request.myCommentList(that.authorId,that.replyPage,10,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
//						console.log(res)
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
								that.myCommentList();
							},1500)
						}
					})
					.catch(res =>{
						console.log(res)
					})
			},
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
		onLoad() {
			this.langua = this.$util.util.prototype.changeLanguage();
			console.log(this.$root.$mp.query);
			this.authorId = this.$root.$mp.query.authorId;
			this.againFun();
		},
		onUnload(){
			this.postPage = 1;
			this.replyPage = 1;
			this.sType = 1;
			this.postList = '';
			this.reList = '';
		},
		onPageScroll(e){
			if(e.scrollTop > 127){
				this.isScrollTop = true;
			}else{
				this.isScrollTop = false;
			}
		},
		onReachBottom(){
			var that  = this;
			var sType = this.sType;
			//帖子
			if(sType == 1){
				if(that.postPage != 'end'){
					console.log(postPage)
					this.myPostList().then(res =>{wx.hideLoading()});
				}else{
					wx.showToast({
						title:that.langua.isEnd,
						icon:'none'
					})
				}
			}
			//回复
			else{
				if(that.replyPage != 'end'){
					wx.showLoading({
						title:that.langua.loadText+'...',
						mask:true
					});
					this.myCommentList().then(res =>{wx.hideLoading()});
				}else{
					wx.showToast({
						title:that.langua.isEnd,
						icon:'none'
					})
				}
			}
		},
		
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
	.isScrollTop{
		position: fixed;
		width: 100%;
		top: 127rpx;
		background-color: white;
		z-index: 3;
	}
	.selType .sel {
		color: #F90000 !important;
		border-bottom: 2rpx solid #F90000;
	}
	
	.selType>div {
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #333333;
		font-size: 32rpx;
	}
	
	.selType {
		height: 86rpx;
		line-height: 84rpx;
		padding: 0 3%;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.uAtten>div {
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
	
	.uAtten {
		position: absolute;
		right: 0;
		bottom: 10rpx;
	}
	
	.userMsg .uMsg>div:nth-child(2) {
		font-size: 30rpx;
	}
	
	.userMsg .uMsg>div:nth-child(1) {
		font-size: 36rpx;
	}
	
	.uMsg span {
		margin-right: 40rpx;
	}
	
	.userMsg .uMsg {
		display: inline-block;
		vertical-align: middle;
		line-height: 80rpx;
		color: white;
		margin-left: 30rpx;
		width: 500rpx;
		position: relative;
	}
	
	.userMsg .uSub img {
		display: inline-block;
		vertical-align: middle;
		width: 152rpx;
		height: 152rpx;
		border-radius: 100%;
	}
	
	.userMsg .uSub {
		padding: 0 2%;
	}
	
	.userMsg {
		height: 258rpx;
		line-height: 258rpx;
		background-color: #1C1A1B;
	}
	
	.headSub .back {
		width:18rpx;
		height:80rpx;
		padding-right:80rpx;
		background-size:18rpx 37rpx;
		background-repeat:no-repeat;
		position:absolute;
		margin:auto;
		top:0;
		bottom:0;
		left:0;
		background-position:center left;
	}
	
	.headSub {
		position: relative;
		width: 100%;
		height: 90rpx;
	}
	
	.mTop {
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
		background-color: #1c1a1b;
		border-bottom: none !important;
		text-align: center;
	}
</style>