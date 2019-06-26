<template>
	<div class="container CnTop CnBtm" :class="[isIphonex ? 'ixPaddCn':'']">
		
		<!--导航栏--> 
		<allHead :headTil='langua.pdTil' />
		  
		<!--帖子内容--> 
		<postList :postList="postList"  :showAtten='showAtten' :noPeration="noPeration" :noComment='noComment' :language='langua' :essayDetail='essayDetail' @checkPerson='checkPerson' @postDianz='postDianz'  @checkImg='checkImg' @attenPerson='attenPerson'/>
		
		<!--评论列表-->
		<div class="comView" >
			<div  v-for='(item,key1) in postList' :key="postList">
				<div class="comTil">{{langua.pdComText}}<span>({{item.comment_count}})</span></div>
				<div class="comTop div_float">
					<img :src="userInfo.avatarUrl" />
					<div @click="addCommend">{{langua.pdComplace}}</div>
				</div>
			</div> 
			<div class="comCn"  :class="[isIphonex ? 'ixBtm':'']">
				<div class="comList div_float" v-for='(com1,key1) in commentList' :key="commentList">
					<img class="L" :src="com1.avatar" />
					<div class="R">
						<div class="til eli_one">{{com1.user_name}}</div>
						<div class="time">{{com1.create_time}}</div>
						<div class="cn">{{com1.content}}</div>
						<div class="opera">
							<div class="pl msgIcon" :data-id='com1.id' :data-to-user-id='com1.user_id'   :data-to-user-name='com1.user_name' @click="addReply"></div>
							<div class="dz" :data-c-index='key1'  @click="dianzReply"><span :class="com1.user_islike == 1?'ydzIcon':'dzIcon'" ></span>{{com1.like}}</div>
						</div>
						
						<!--回复列表-->
						<div class="reply" v-if='com1.chComLen != 0'>
							<div class="reList" v-for="(com2,cIndex2) in  com1.child_comment" :key="com1.child_comment">
								<div class="reName">{{com2.user_name}}</div>
								<div class="reCn"><label>@{{com2.to_user_name}}</label>：{{com2.content}}</div>
							</div>
						</div>
		
					</div>
				</div>
			</div>
		</div>
		
		<!--回复框和评论框-->
		<div class="btmInput" v-if='comFous || replyFous'>
			<div class="inputView div_float" v-if='comFous'>
				<img :src="userInfo.avatarUrl" />
				<input type="text" :focus='comFous' @blur='inputBlur' @confirm='submitCom' :placeholder="langua.pdComplace2" />
			</div>
			<div class="inputView div_float" v-else>
				<img :src="userInfo.avatarUrl" />
				<input type="text"  :focus='replyFous'  @blur='inputBlur' @confirm='submitReply'   :placeholder="to_user_name" />
			</div>
		</div>
		
		
		<!--底部分享-->
		<div class="postBtm"  v-for='(item,key1) in postList' :key="postList"  :class="[isIphonex ? 'ixBtm':'']">
			<div class="poBtmList">
				<button open-type='share' :data-post-id='item.id' />
				<span class="shareIcon_w"></span>{{langua.pdShare}}
			</div>
			<div class="poBtmList" @click="addCollect">
				<span :class="[item.user_iscollect == 1 ? 'collectIcon':'collectIcon_w']"></span>{{langua.pdCollect}}：{{item.collect_count}}
			</div>
			<div class="poBtmList" @click="addCommend">
				<span class="msgIcon_w"></span>{{langua.pdComText}}：{{item.comment_count}}
			</div>
		</div>
		
		
		<!--语言选择弹框-->
		<selLangua :showLan='showLan'  @selLangua="selLanguage"/>
		
		<!--回首页图标-->
		<goHome :isShowHome='isShowHome' />
		
		<!-- 置顶图标 -->
		<div class="gotop" v-show="showGoTop" @click="goTopFun">
			<img src="../../../static/img/scrolltop.png"  alt="">
		</div>
 
	</div>
</template>
 
<script>
	import postList from '../../components/postList'
	import selLangua from '../../components/selLanguage'
	import goHome from '../../components/goHome'
	import allHead from '../../components/head'  
	
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				postId:'',//帖子Id
				postList:[],//文章列表
				signPoList:[],//临时存放列表
				commentList:[],//评论列表
				noPeration:true,//没有操作（列表将不显示转发/评论/点赞按钮）
				noComment:true,//没有评论列表
				showAtten:true,//显示关注按钮 
				langua:'',//静态文字的语种
				essayDetail:true,//是详情页面
				showLan:false,//显示选择语言弹框
				comFous:false,//评论框获取焦点
				replyFous:false,//回复框获取焦点
				collect:false,//是否收藏
				isShowHome:false,//是否显示回主页按钮
				to_user_name:'',//被回复用户名称
				to_user_id:'',//被评论的用户id
				to_com_id:'',//被评论的评论id
				page:1,//评论页码
				userInfo:wx.getStorageSync('userInfo'),//用户信息
				showGoTop: false, //置顶图标显示或隐藏
			}
		},

		components: {
			postList,
			selLangua,
			goHome,
			allHead
		},
		computed: {
			showHome(){
				return  this.$store.store.state.showGoHome;
			},
			isIphonex() {
				return this.$store.store.state.isIphonex
			},
		},

		methods: {
			//选择语言
			selLanguage(e){
				var that = this;
				//隐藏弹框
				this.showLan = false;
				//判断语种
				this.langua = this.$util.util.prototype.changeLanguage();
				
				//判断扫码进来
				if(that.$root.$mp.query.scene != undefined){
					that.postId = that.$root.$mp.query.scene;
					that.postDetial()
						.then(res =>{
							that.postComment();
							wx.hideLoading();
						});
				}
				//还是正常进来
				else{
					that.postId = that.$root.$mp.query.postId;
					that.postDetial()
						.then(res =>{
							that.postComment();
							wx.hideLoading();
						});
				}
				
			},
			//返回
			goBack(){
				wx.navigateBack();
			},
			//查看作者信息
			checkPerson(e){
				var authorId = e.currentTarget.dataset.authorId;
				wx.navigateTo({
					url:'/pages/hisPost/main?authorId='+authorId
				})
			},
			//点击关注作者
			async attenPerson(e){
				console.log('关注作者')
				console.log(e.currentTarget.dataset.userId)
				var that = this;
				//判断是否登陆
				await that.util.judgeLogin();
				
				that.Request.attenUser(e.currentTarget.dataset.userId,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							that.postList[0].user_isfollow = 1;
							wx.showToast({
								title:that.langua.attenYes
							})
						}
					})
					.catch(res =>{
						console.log(res)
					})
				
			},
			//点击评论
			async addCommend(){
				var that = this;
				//判断是否登陆
				await that.util.judgeLogin();
				
				that.comFous = true;
			},
			//提交评论
			submitCom(e){
				wx.showLoading();
				var that = this;
				that.Request.comPost(that.postId,e.mp.detail.value,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						if(res.code == 200){
							wx.showToast({
								title:that.langua.addCom
							})
							that.page = 1;
							that.postComment();
						}
					})
			},
			//点击回复
			async addReply(e){
				var that = this;
				//判断是否登陆
				await that.util.judgeLogin();
				
				that.replyFous = true;
				
				that.to_user_id = e.currentTarget.dataset.toUserId;
				that.to_com_id = e.currentTarget.dataset.id;
				that.to_user_name = '@'+e.currentTarget.dataset.toUserName;
			},
			//提交回复信息
			submitReply(e){
				wx.showLoading();
				var that = this;
				that.Request.postReply(that.postId,that.to_com_id,e.mp.detail.value,that.to_user_id,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						if(res.code == 200){
							wx.showToast({
								title:that.langua.addReply
							})
							that.page = 1;
							this.postComment();
						}
					})
			},
			//评论框，回复框失去焦点
			inputBlur(){
				this.comFous = false;
				this.replyFous = false;
			},
			//点击收藏
			async addCollect(){
				console.log('点击收藏')
				var that = this;
				var sign = true;
				var postList = that.postList;
				
				//判断是否登陆
				await that.util.judgeLogin();
				
				//等于1是已收藏
				if(that.postList[0].user_iscollect == 1){
					sign = false;
				}
				
				that.Request.collectPost(wx.getStorageSync('openid'),2,that.postId)
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							if(sign){
								wx.showToast({
									title:this.langua.collAdd,
								})
								that.postList[0].user_iscollect = 1;
								that.postList[0].collect_count = parseInt(that.postList[0].collect_count) + 1;
							}else{
								wx.showToast({
									title:this.langua.collCancel,
								})
								that.postList[0].user_iscollect = 0;
								that.postList[0].collect_count = parseInt(that.postList[0].collect_count) - 1;
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
			//点击点赞帖子
			async postDianz(e){
				var that  = this;
				var sign = true;
				var postList = that.postList;
				
				
				//判断是否登陆
				await that.util.judgeLogin();
				
				//等于1是已点赞
				if(that.postList[0].user_islike == 1){
					sign = false;
				}
				
				that.Request.likePost(that.postId,1)
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							if(sign){
								that.postList[0].user_islike = 1;
								that.postList[0].post_like = parseInt(that.postList[0].post_like) + 1;
							}else{
								that.postList[0].user_islike = 0;
								that.postList[0].post_like = parseInt(that.postList[0].post_like) - 1;
							}
						}
					})
					.catch(res =>{
						console.log(res)
					})
			},
			//点赞评论
			async dianzReply(e){
				console.log('点赞评论')
				console.log(e)
				var that  = this;
				var sign = true;
				var commentList = that.commentList;
				var cIndex = e.currentTarget.dataset.cIndex;
				
				//判断是否登陆
				await that.util.judgeLogin();
				
				
				//等于1是已点赞
				if(that.commentList[cIndex].user_islike == 1){
					sign = false;
				}
				
				that.Request.likePost(that.commentList[cIndex].id,2)
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							if(sign){
								that.commentList[cIndex].user_islike = 1;
								that.commentList[cIndex].like = that.commentList[cIndex].like + 1;
							}else{
								that.commentList[cIndex].user_islike = 0;
								that.commentList[cIndex].like = that.commentList[cIndex].like - 1;
							}
						}
					})
					.catch(res =>{
						console.log(res)
					})
			},
			//获取帖子详情
			async postDetial(){
				wx.showLoading({title:this.langua.loadText+'...'});
				var that = this;
				await that.Request.postDetial(that.postId,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
								//转换时间显示格式
								res.data.published_time = that.util.changeTimeFormat(res.data.published_time);
								
								//图片
								for(var x in res.data.photos){
									res.data.photos[x] = that.Request.getUrl() + res.data.photos[x];
								}
								
							var signArr = [];
							signArr.push(res.data)
							
							that.signPoList = that.util.converJSON(signArr);
							
							
						}else if(res.code == 403) {
							that.util.getSessionKey();
							setTimeout(function(){
								that.getPostList();
							},1000)
						}
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
						//如果是多张图片 设置图片个数
						postList2[i].pLength = postList2[i].photos.length;
					}
					
				}
				that.postList = postList2;
			},
			//获取评论列表
			postComment(){
				var that = this;
				that.Request.postComment(that.postId,that.page,10,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							//转换评论的时间
							for(var x in res.data.list.comment){
								res.data.list.comment[x].create_time = that.util.timestampToTime(res.data.list.comment[x].create_time);
								res.data.list.comment[x].chComLen = res.data.list.comment[x].child_comment.length;
							}
							
							var commentList = that.util.converJSON(res.data.list.comment);
							
							if(that.page != 1 && that.page != 'end'){
								var commentList = that.commentList.concat(res.data.list.comment);
							}
							
							that.commentList = commentList;
							
							if(res.data.page.page < res.data.page.total_page){
								that.page = that.page + 1;
							}else{
								that.page ='end';
							}
							
							
						}else if(res.code == 403){
							that.util.getSessionKey();
							setTimeout(function(){
								that.postComment();
							},1000)
						}
						
						wx.hideLoading();
					})
					.catch(res =>{
						console.log(res)
					})
			},
			//回到顶部
			goTopFun(){
				wx.showLoading({
				  title: '',
				})
				wx.pageScrollTo({
				  scrollTop: 0,
				  duration: 200
				})
				setTimeout(function () {
				  wx.hideLoading()
				}, 200)
			}
		},
		onShareAppMessage(res){
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
		onLoad(){
			var that = this;
			
			var scene = that.$mp.appOptions.scene;
			var signArr = [1007,1008,1011,1012,1013,1044,1047,1048,1049];
			
			console.log(this.showHome +'shoHome')
			if(that.showHome){
				//也可以换一种方法，这样可以跟踪每一个状态的变化
				that.$store.store.commit('changeShowHome', false); 
				
				console.log(signArr.indexOf(scene) != -1 +'是否显示')
				
				if(signArr.indexOf(scene) != -1){
					that.isShowHome = true;
				}else{
					that.isShowHome = false;
				}
			}else{
				that.isShowHome = false;
			}
			
			console.log(scene+"场景值")
			
			//判断是否有已经选择的语言 
			if(!wx.getStorageSync('hasLanguage')){
				that.showLan = true;
			}else{
				that.langua = that.$util.util.prototype.changeLanguage();
				
				console.log(that.$root.$mp.query.scene)
				
				//判断扫码进来
				if(that.$root.$mp.query.scene != undefined){
					that.postId = that.$root.$mp.query.scene;
					that.postDetial()
						.then(res =>{
							that.postComment();
							wx.hideLoading();
						});
				}
				//还是正常进来
				else{
					that.postId = that.$root.$mp.query.postId;
					that.postDetial()
						.then(res =>{
							that.postComment();
							wx.hideLoading();
						});
				}
			}
			
			
			 
		},
		onHide(){
			//也可以换一种方法，这样可以跟踪每一个状态的变化
			this.$store.store.commit('changeShowHome', true); 
		},
		onUnload(){
			this.page = 1;
			this.postList =[];
			this.commentList = [];
			//也可以换一种方法，这样可以跟踪每一个状态的变化
			this.$store.store.commit('changeShowHome', true); 
		},
		onReachBottom(){
			var that = this;
			
			if(this.page != 'end'){
				this.postComment();
			}else{
				wx.showToast({
					title:that.langua.isEnd,
					icon:'none'
				})
			}
		},
		onPageScroll(e) {
			var that = this;
			if(e.scrollTop >= 120) {
				//显示回到顶部图标
				that.showGoTop = true;
			}else{
				//隐藏回到顶部图标
				that.showGoTop = false;
			}
		},
	}
</script>

<style scoped>
	
	.gotop img {
		width:90rpx;
		height:90rpx;
		position: fixed; 
		bottom: 150rpx; 
		right:50rpx; 
		z-index: 10;
	}
	
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
		bottom: 500rpx;
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
		vertical-align: top;
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