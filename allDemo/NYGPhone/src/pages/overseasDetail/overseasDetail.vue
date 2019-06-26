<template>
	<div class="container" :catchtouchmove='catchtouchmove'>
		<div class="ovDetail">
			<div class="ovTil eli_two">{{essayCn.title}}</div>
			<div class="ovTime">{{essayCn.date_add}}</div>
			<div class="ovAuthor div_float">
				<img :src="essayCn.portrait" />
				<p>{{essayCn.name}}</p>
			</div>
			<div class="ovCn">
				<rich-text :nodes="essayCn.content"></rich-text>
			</div>

			<!--标签-->
			<labelList :labelList="labelList" />

			<!--作者简介-->
			<div class="synopsis">
				<div class="syTop div_float">
					<img :src="essayCn.portrait" />
					<div>{{essayCn.name}}</div>
				</div>
				<div class="syMsg">{{essayCn.autograph}}</div>
			</div>

		</div>

		<!--评论-->   
		<Comment @submitFun='submitFun' @clickCollect='addCollect'  @QxClickCollect="QxCollect" @ComInputFun="ComInput" @ComblurFun="Comblur" @getZan="dianZanFun" @replyFun="replyFun" @delComment="commentDel" :Onfocus="ReplyType" :openid="openid" :noComment="noComment" :essayCn="essayCn" :collect="collect" :commentList="commentList" :zan='zan' :placeText='placeText' :totalNum="totalNum" :submitType="submitType" :maskHidden='maskHidden' :showGoHome="showGoHome" :proCode='proCode'/>

	</div>
</template>

<script>
	import labelList from '../../components/labelList'
	import Comment from '../../components/comment'

	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求方法头
				essayCn: '',//文章/视频内容（生成卡片可以用）
				contentId: '', //内容id
				labelList: [],
				catchtouchmove: false,
				noComment: false, //无评论
				commentList: [], //评论列表
				zan: 0, //点赞数
				collect: 0, //是否收藏  0未收藏  1已收藏
				openid: '',
				ReplyType: false, //input获取焦点
				placeText: '发表评论', //评论框占位符
				submitType: 'comment', //comment:评论，reply:回复
				replyInfo: '', //评论信息
				page:1,//评论分页
				totalNum:0,//评论条数
				maskHidden:false,//分享卡片的显示
				showGoHome:false,//是否显示返回首页按钮（不属于正常情况进去都返回首页）
				pagePath:'',//页面地址 （请求二维码用的）
				pageScene:'',//页面参数（请求二维码用的）
				proCode:'',//小程序码
			}
		},
		components: {
			Comment,
			labelList
		},
		
		computed: {
			inShowHome(){
				return  this.$store.store.state.showGoHome;
			}
		},
		methods: {
			//PV
			getPV(){
				this.Request.getPV();
			},
			//获取文章详情
			getEssayDetial: function() {
				wx.showLoading({
					title:'加载中'
				});
				var that = this;
				that.Request.getEssayDetial(that.contentId, wx.getStorageSync('openid'))
					.then(res => {
//						console.log(res);
						if(res.code == 0) {
							res.data.img = that.Request.getUrl() + res.data.img;
							res.data.portrait = that.Request.getUrl() + res.data.portrait;
							

							//让图片自适应屏幕
							res.data.content = res.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display;block;margin:20px 0;"');

							//让网址换行
							res.data.content = res.data.content.replace(/<p style="white-space: normal;">/gi, '<p style="">');
							
							
							//替换不可以编译的文字
							res.data.content = res.data.content.replace(/xss=removed/gi, 'xss="removed"');
						
//							console.log(res.data.content)
							
							
							if(res.data.label != ''){
								var labelList = res.data.label.split(',');
								if(labelList.length == 1){
									var labelList = res.data.label.split('，');
									
								}
								
								if(labelList[0] == ''){
									var	labelList = [];
								}
								
								that.labelList = labelList;
							}


							
							that.essayCn = JSON.parse(JSON.stringify(res.data));
							

							that.collect = res.data.collection;

							that.contentId = res.data.id;

							//请求评论列表
							that.getCommendList(res.data.id);

							//请求文章/视频点赞
							that.getCommendZan(res.data.id);
						}
					})
					.catch(res => {
						console.log(res);
					})
			},
			//获取评论列表
			getCommendList: function(catId) {
				var that = this;
				that.Request.getCommendList(wx.getStorageSync('openid'),1, catId,that.page)
					.then(res => {
//						console.log(res.data.list)
						if(res.code == 0) {
							if(res.data.list.length != 0) {
								var commentList = JSON.parse(JSON.stringify(res.data.list));
								
								if(that.page != 1 && that.page != 'end'){
									var commentList = that.commentList.concat(JSON.parse(JSON.stringify(res.data.list)));
								}
								that.totalNum = res.data.page.total_result;
								
								that.commentList = commentList;
								
								if(res.data.page.page < res.data.page.total_page){
									that.page = that.page + 1;
								}else{
									that.page = "end";
								}
								
								that.noComment = false;
							} else {
								that.noComment = true;
								that.totalNum = 0;
							}
						}
					})
			},
			//获取点赞数
			getCommendZan: function(catId) {
				var that = this;
				that.Request.getCommendZan(wx.getStorageSync('openid'), 1, catId)
					.then(res => {
						if(res.code == 0) {
							that.zan = res.data.all["0"].count;
							//也可以换一种方法，这样可以跟踪每一个状态的变化
							that.$store.store.commit('changeZanNum', res.data.all["0"].count); 
						}
					})
			},
			//点击收藏
			addCollect: function() {
				var that = this;
				
				that.Request.addCollect(wx.getStorageSync('openid'), 1, that.contentId)
					.then(res => {
						if(res.code == 0) {
							wx.showToast({
								title: '收藏成功'
							});
							that.collect = 1;
						}
					})
			},
			//取消收藏
			QxCollect: function() {
				var that = this;
				that.Request.getQXCollect(wx.getStorageSync('openid'), 1, that.contentId)
					.then(res => {
						if(res.code == 0) {
							wx.showToast({
								title: '取消收藏'
							});
							that.collect = 0;
						}
					})
			},
			//点击点赞函数
			dianZanFun: function() {
				var that = this;
				that.Request.getFabulous(wx.getStorageSync('openid'), 1, that.contentId)
					.then(res => {
						if(res.code == 0) {
							wx.showToast({
								title: '点赞成功'
							});
							that.zan  =  parseInt(parseInt(that.zan))+1;
							//也可以换一种方法，这样可以跟踪每一个状态的变化
							that.$store.store.commit('changeZanNum', parseInt(parseInt(that.zan))); 
						} else if(res.code == 401) {
							wx.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					})
			},
			//点击回复
			replyFun: function(e) {
				var that = this;
				that.ReplyType = true;
				that.placeText = "@" + e.userName;
				that.submitType = 'reply';
				that.replyInfo = e;
			},
			//输入评论
//			ComInput:function(){
//				this.ReplyType = true;
//			},
			//评论框失去焦点
			Comblur: function() {
				var that = this;
				that.ReplyType = false;
				if(that.submitType == 'reply') {
					that.placeText = '发表评论';
					that.submitType = 'comment';
				}
			},
			//删除评论 
			commentDel: function(e) {
				var that = this;

				wx.showModal({
					content: '是否删除评论？',
					success: function(res) {
						if(res.confirm) {
							that.Request.delComment(e.comId)
								.then(res => {
									if(res.code == 0) {
										that.page = 1;
										//刷新评论列表
										that.getCommendList(that.contentId);
									}
								})
						}
					}
				})

			},
			//提交评论
			submitFun: function(e) {
				var cText = e.mp.detail.value;
				var that = this;
				
				if(cText.toString().length == 0){
					wx.showToast({
						title: '请输入内容!',
						icon:'none'
					});
					return;
				}
				
				
				that.page = 1;
				that.ReplyType = false;
				that.placeText = '发表评论';
				
				

				//判断类型:  comment:评论，reply:回复
				//评论
				if(that.submitType == "comment") {
					console.log('评论')
					that.Request.submitComment(wx.getStorageSync('openid'), cText, 1, that.contentId, '')
						.then(res => {
							if(res.code == 0) {
								//刷新评论列表
								that.getCommendList(that.contentId);
								that.getEssayDetial();
							} else if(res.code == 401) {
								wx.showToast({
									title: res.msg,
									icon: 'none' 
								});
							}
						})
				}
				//回复
				else if(that.submitType == "reply") {
					console.log('回复')
					that.submitType = 'comment';
					that.placeText = '发表评论';
					var replyInfo = JSON.parse(JSON.stringify(that.replyInfo));
					
					that.Request.submitComment(wx.getStorageSync('openid'), cText, 1, that.contentId,replyInfo.comId)
						.then(res => {
							if(res.code == 0) {
								//刷新评论列表 
								that.getCommendList(that.contentId);
								that.getEssayDetial();
							}
						})
				}

			},
			//请求文章排名
			articleVisit(){
				this.Request.articleVisit(this.contentId)
			},
			//获取小程序码
			getProgramCode(){
				var that = this;
				console.log(that.pageScene)
				that.proCode  = that.Request.getProgramCode(that.pagePath,that.pageScene);
				console.log(that.proCode)
			}
		},
		onLoad: function(options) {
			
			var that = this;
			//扫码进入
			if(options.scene != undefined){
				var scene = decodeURIComponent(options.scene);
				
				this.contentId = scene;
				
			
				that.pagePath = 'pages/overseasDetail/main';
				
				var signString = scene;
				
				console.log("扫码="+signString)
				
				that.pageScene =  encodeURIComponent(signString);
				
				this.getProgramCode();
				
			}
			//正常访问
			else{
				this.contentId = options.article_id;
				
				that.pagePath = 'pages/overseasDetail/main';
				var signString = options.article_id;
				
				console.log("正常="+signString)
				
				that.pageScene =  encodeURIComponent(signString);
				
				this.getProgramCode();
			}
			
			
			this.getPV();

		},
		onShow(){
			console.log(this)
			
			var that = this;
			
			
			var scene = that.$mp.appOptions.scene;
			var signArr = [1007,1008,1011,1012,1013,1044,1047,1048,1049]
			if(this.inShowHome){
				//也可以换一种方法，这样可以跟踪每一个状态的变化
				that.$store.store.commit('changeShowHome', false); 
				if(signArr.indexOf(scene) != -1){
					that.showGoHome = true;
				}else{
					that.showGoHome = false;
				}
			}else{
				that.showGoHome = false;
			}
			
			this.openid = wx.getStorageSync('openid');
			this.page = 1;
			this.getEssayDetial();
			this.articleVisit();
		},
		onReachBottom:function(){
			if(this.page != 'end'){
				this.getCommendList(this.contentId);
			}else{
				wx.showToast({
					title: '已经到底了！',
					icon:'none'
				});
			}
		},
		onHide(){
			this.maskHidden = false;
			//也可以换一种方法，这样可以跟踪每一个状态的变化
			this.$store.store.commit('changeShowHome', true); 
		},
		onShareAppMessage: function (res) {
			var that = this;
		    return {
		      title: that.essayCn.title,
		      path: '/pages/overseasDetail/main?article_id='+that.essayCn.id
		    }
		 }
	}
</script>

<style scoped>
	.ovDetail {
		padding: 0 3%;
		border-bottom: 2rpx solid #e5e5e5;
	}
	
	.ovTil {
		color: #121213;
		font-size: 36rpx;
		margin-top: 29rpx;
	}
	
	.ovTime {
		color: #6fa0cd;
		font-size: 26rpx;
		margin-top: 33rpx;
	}
	
	.ovAuthor {
		line-height: 78rpx;
		margin-top: 27rpx;
	}
	
	.ovAuthor img {
		float: left;
		width: 78rpx;
		height: 78rpx;
		border-radius: 100%;
	}
	
	.ovAuthor p {
		float: left;
		color: #929292;
		font-size: 26rpx;
		margin-left: 20rpx;
	}
	
	.ovCn {
		margin-top: 40rpx;
	}
	.ovCn rich-text{
		overflow-wrap: break-word;
	}
	.ovCn img {
		height: 338rpx;
		width: 100%;
		margin-bottom: 37rpx;
	}
	
	.ovCn div {
		color: #3d3d3d;
		font-size: 30rpx;
		line-height: 45rpx;
		margin-bottom: 20rpx;
	}
	
	.synopsis {
		width: 633rpx;
		/*height: 280rpx;*/
		margin: 0 auto;
		margin-top: 99rpx;
		background-size: 100% 100%;
		margin-bottom: 30rpx;
		box-shadow: 0px 0px 5px #E5E5E5;
		border-radius: 6rpx;
		padding: 23rpx 29rpx;
	}
	
	.synopsis .syTop {
		height: 78rpx;
		line-height: 78rpx;
	}
	
	.synopsis .syTop img {
		float: left;
		width: 78rpx;
		height: 78rpx;
	}
	
	.synopsis .syTop>div {
		float: left;
		color: #121213;
		font-size: 28rpx;
		margin-left: 25rpx;
	}
	
	.synopsis .syMsg {
		color: #8f8f8f;
		font-size: 24rpx;
		padding: 20rpx 25rpx;
	}
</style>