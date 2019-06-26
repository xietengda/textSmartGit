<template>
	<div class="container" :catchtouchmove='catchtouchmove'>
		<div class="video">
			<video :src="essayCn.video" autoplay    controls  v-bind:hidden='hideVideo'></video>
		</div>
		<div class="videoMsg">
			<div class="tiltle eli_two">{{essayCn.title}}</div>
			<div class="time div_float">
				<div class="L">{{essayCn.date_add}}</div>
				<div class="R">
					<p class="eyeIcon"></p>{{essayCn.video_read_count}}
				</div>
			</div>
			<div class="describe">{{essayCn.abstract}}</div>
			<div class="collect">
				<div class="addCol" v-if="albCollect == 0" @click="addAlbCollect" data-type='add' :data-album-id='essayCn.special_id'><span class="collIcon"></span><label>收藏专辑</label></div>
				<div class="cutCol" v-else @click="addAlbCollect"  data-type='cut' :data-album-id='essayCn.special_id'><span class="gouIcon"></span><label>已收藏</label></div>
			</div>
			
			<!--标签-->
			<labelList :labelList="labelList"/>
			
		</div>
		
		<!--专辑-->
		<div class="album">
			<div class="albumTil div_float" @click="lookAlbum" :data-album-id='essayCn.special_id'>
				<div class="L">专辑视频</div>
				<div class="R">全{{albumList.length}}话></div>
			</div>
			<scroll-view class="albumList" scroll-x>
				<div v-for="(item,key) in albumList" :class="[item.id == essayCn.id ? 'sel' : '']" :key="item.id" :data-id='item.id' :data-special-id="item.special_id" @click="checkDetial">{{item.title}}</div>
			</scroll-view>
		</div>
		
		<!--推荐视频-->
		<div class="recommend">
			<div class="albumTil div_float">
				<div class="L">推荐视频</div>
			</div>
			<div class="reCn">
				<div class="reViList div_float" v-for="item in videoList" :key="item.id" :data-id='item.id' :data-special-id="item.special_id" @click="checkDetial"> 
					<img :src="item.img"/>
					<div class="reViMsg eli_two">{{item.title}}</div>
				</div>
			</div>
		</div>	
			
		<!--评论-->
		<Comment @submitFun='submitFun' @clickCollect='addCollect' @QxClickCollect="QxCollect" @ComInputFun="ComInput" @ComblurFun="Comblur" @getZan="dianZanFun" @replyFun="replyFun" @delComment="commentDel" @hideVideo="hideVideoFun" @showVideo="showVideo" :Onfocus="ReplyType" :openid="openid" :noComment="noComment" :essayCn="essayCn" :collect="collect" :commentList="commentList" :zan='zan' :placeText='placeText' :totalNum="totalNum" :submitType="submitType" :maskHidden="maskHidden" :showGoHome="showGoHome" :proCode='proCode'/>	
		
	</div>
</template>

<script>
	import labelList from '../../components/labelList'
	import Comment from '../../components/comment'
	
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求方法头
				cnId:'',//视频id
				special_id:'',//专辑id
				essayCn: '',//文章/视频内容（生成卡片可以用）
				labelList:[], //标签
				albumList:[],//专辑视频
//				videoid:0,
				videoList:[],//推荐视频
				catchtouchmove: false,
				noComment: false, //无评论
				commentList: [], //评论列表
				zan: 0, //点赞数
				collect: 0, //是否收藏视频  0未收藏  1已收藏
				albCollect: 0, //是否专辑视频  0未收藏  1已收藏
				openid: '',
				ReplyType: '', //input获取焦点
				placeText: '发表评论', //评论框占位符
				submitType: 'comment', //comment:评论，reply:回复
				replyInfo: '', //评论信息
				page:1,//评论分页
				totalNum:0,//评论条数
				hideVideo:false,//生成图片时，隐藏视频
				maskHidden:false,//分享卡片的显示,
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
			//获取视频详情
			getVideoDetial(){
				wx.showLoading({
					title:'加载中'
				});
				var that = this;
				
//				console.log(wx.getStorageSync('openid'),that.cnId,that.special_id,5)
				that.Request.getVideoDetial(wx.getStorageSync('openid'),that.cnId,that.special_id,5)
					.then(res => {
//						console.log(res.data)
						if(res.code == 0){
							res.data.one.img = that.Request.getUrl() + res.data.one.img;
							res.data.one.video = that.Request.getUrl() + res.data.one.video;
							
							//收藏状态
							that.collect = res.data.one.collection;
							
							that.albCollect = res.data.one.collection_special;
							
							that.essayCn = JSON.parse(JSON.stringify(res.data.one));
							
							var labelList = res.data.one.label.split(',');
							
							
							if(labelList.length == 1){
								var labelList = res.data.one.label.split('，');
								
							}
							if(labelList[0] == ''){
								var	labelList = [];
							}
							
							
							that.labelList = labelList;
							
							that.albumList = JSON.parse(JSON.stringify(res.data.list));
							
							for(var x in res.data.relevant){
								res.data.relevant[x].img = that.Request.getUrl() + res.data.relevant[x].img;
							}
							
							that.videoList = JSON.parse(JSON.stringify(res.data.relevant));
						}
					})
			},
			//获取评论列表
			getCommenList(){
				 var that = this;
				 that.Request.getCommendList(wx.getStorageSync('openid'),2,that.cnId,that.ComPage)
				 	.then(res => {
//				 		console.log(res.data.list)
				 		if(res.code == 0) {
							if(res.data.list.length != 0) {
								
								var commentList = res.data.list;
								
								
								if(that.page != 1 && that.page != 'end'){
									var commentList = that.commentList.concat(JSON.parse(JSON.stringify(res.data.list)));
								}
								that.totalNum = res.data.page.total_result;
																
								that.commentList = JSON.parse(JSON.stringify(commentList));
								
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
				 	.catch(res =>{
				 		console.log(res);
				 	})
			},
			//获取点赞数
			getCommendZan: function() {
				var that = this;
				that.Request.getCommendZan(wx.getStorageSync('openid'), 2, that.cnId)
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
				that.Request.addCollect(wx.getStorageSync('openid'), 2, that.cnId)
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
				that.Request.getQXCollect(wx.getStorageSync('openid'), 2, that.cnId)
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
				that.Request.getFabulous(wx.getStorageSync('openid'), 2, that.cnId)
					.then(res => {
						if(res.code == 0) {
							wx.showToast({
								title: '点赞成功'
							});
							that.zan = parseInt(parseInt(that.zan))+1;
//							that.getCommendZan();
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
//			//输入评论
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
										that.getCommenList();
									}
								})
						}
					}
				})

			},
			//隐藏视频
			hideVideoFun:function(){
				this.hideVideo = true;
			},
			//显示
			showVideo:function(){
				this.hideVideo = false;
			},
			//收藏专辑
			addAlbCollect(e){
				
				
				if(wx.getStorageSync('userInfo') == ''){
					wx.navigateTo({
						url: '../login/main'
					})
					return
				}
				
				var type = e.currentTarget.dataset.type;
				var albumId = e.currentTarget.dataset.albumId
				var that = this;
				
				
				if(type == 'add'){
					that.Request.addCollect(wx.getStorageSync('openid'),3,albumId)
						.then(res =>{
							if(res.code == 0){ 
								
								wx.showToast({
									title:'收藏专辑'
								})
								
								that.albCollect = 1;
							}
						})
				}else if(type == 'cut'){
					that.Request.getQXCollect(wx.getStorageSync('openid'),3,albumId)
						.then(res =>{
							
							if(res.code == 0){
								wx.showToast({
									title:'取消收藏'
								})
								
								that.albCollect = 0;
							}
						});
				}
			},
			//查看专辑列表
			lookAlbum:function(e){
				wx.redirectTo({
					url:'../albumVideo/main?special_id='+e.currentTarget.dataset.albumId
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
				
				
				
				//判断是否有用户信息
				if(wx.getStorageSync('userInfo')) {
					this.userInfo = wx.getStorageSync('userInfo'); 
				} else {
					wx.navigateTo({
						url: '../login/main'
					})
					that.submitType = 'comment';
					return;
				}
				

				//判断类型:  comment:评论，reply:回复
				//评论
				if(that.submitType == "comment") {
					that.Request.submitComment(wx.getStorageSync('openid'), cText, 2, that.cnId)
						.then(res => {
							if(res.code == 0) {
								//刷新评论列表
								that.getCommenList();
								that.getVideoDetial();
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
					
					that.Request.submitComment(wx.getStorageSync('openid'), cText, 2, that.cnId,replyInfo.comId)
						.then(res => {
							if(res.code == 0) {
								//刷新评论列表
								that.getCommenList();
								that.getVideoDetial();
							}
						})
				}

			},
			//请求视频排名
			videoVisit(){
				this.Request.videoVisit(this.cnId)
			},
			//查看视频详情
			checkDetial(e){
				wx.pageScrollTo({
			      scrollTop: 0
			    })
				var id = e.currentTarget.dataset.id;
				var specialId = e.currentTarget.dataset.specialId;
				
				this.cnId = id;
				this.special_id = specialId;
				this.getPV();

				
				this.submitType = 'comment'
				this.page = 1;
				this.ReplyType = false;
				
				this.getVideoDetial();
				this.getCommenList();
				this.getCommendZan();
				this.videoVisit();
				
			},
			//获取小程序码
			getProgramCode(){
				var that = this;
				that.proCode  = that.Request.getProgramCode(that.pagePath,that.pageScene);
				console.log(that.proCode)
			}
		},
		onLoad(options){ 
			var that = this;
			//扫码进入
			if(options.scene != undefined){
				var scene = decodeURIComponent(options.scene).split('&');
				
				that.cnId = scene[0];
				that.special_id = scene[1];
				
			
				that.pagePath = 'pages/videoDetail/main';
				
				var signString = scene[0]+'&'+scene[1];
				
				console.log(that.pagePath)
				console.log("扫码="+signString)
				
				that.pageScene =  encodeURIComponent(signString);
				
				this.getProgramCode();
				
			}
			//正常访问
			else{
				this.cnId = options.id;
				this.special_id = options.special_id;
				
				that.pagePath = 'pages/videoDetail/main';
				var signString = options.id+'&'+options.special_id;
				
				console.log(that.pagePath)
				console.log("正常="+signString)
				
				that.pageScene =  encodeURIComponent(signString);
				
				this.getProgramCode();
			}
			this.getPV();
		},
		onShow(options){
			console.log(this.$mp.appOptions)
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
			this.hideVideo = false;
			this.getVideoDetial();
			this.getCommenList();
			this.getCommendZan();
			this.videoVisit();
			
		},
		onHide(){
			this.maskHidden = false;
			//也可以换一种方法，这样可以跟踪每一个状态的变化
			this.$store.store.commit('changeShowHome', true); 
		},
		onShareAppMessage: function (res) {
			var that = this;
		    return{
		      title: that.essayCn.title,
		      path: '/pages/videoDetail/main?id='+that.essayCn.id+'&special_id='
		    }
		 }
	}
</script>

<style scoped>
	.video{
		width: 100%;
		height: 520rpx;
	}
	.video video{
		width: 100%;
		height: 100%;
	}
	.videoMsg{
		padding: 0 3%;
		margin-top: 30rpx;
		padding-bottom: 40rpx;
		border-bottom: 2rpx solid #e5e5e5;		
	}
	.videoMsg .tiltle{
		color: #121213;
		font-size: 36rpx;
	}
	.videoMsg .time{
		height: 80rpx;
		line-height: 80rpx;
	}
	.videoMsg .time .L{
		float: left;
		color: #929292;
		font-size: 24rpx;
	}
	.videoMsg .time .R{
		float: right;
		color: #929292;
		font-size: 24rpx;
	}
	.videoMsg .time .R p{
		display: inline-block;
		vertical-align: middle;
		margin-top: -5rpx;
		width: 37rpx;
		height: 25rpx;
		background-size: 100% 100%;
		margin-right: 10rpx;
	}
	.videoMsg .describe{
		color: #929292;
		font-size: 24rpx;
		line-height: 40rpx;
	}
	.collect{
		height: 100rpx;
		line-height: 100rpx;
	}
	.collect>div{
		width: 182rpx;
		height: 56rpx;
		border-radius: 11rpx;
		border: solid 2rpx #8fcd31;
		font-size: 26rpx;
		text-align: center;
		line-height: 56rpx;
		display: inline-block;
	}
	.collect>div span{
		display: inline-block;
		vertical-align: middle;
		background-size: 100% 100% !important;
		margin-right: 18rpx;
		margin-top: -5rpx;
	}
	.collect .addCol{
		background-color: white;
		color: #add66f;
	}
	.collect .addCol span{
		width: 18rpx;
		height: 18rpx;
	}
	.collect .addCol label{
		color: #656565;
	}
	.collect .cutCol{
		background-color: #add66f;
		color: white;
		border-color: #ADD66F;
	}
	.collect .cutCol span{
		width: 24rpx;
		height: 17rpx;
	}
	.videoLabel{
		font-size: 0;
		margin-top: 45rpx;
	}
	.videoLabel div{
		padding: 5rpx 20rpx;
		border-radius: 30rpx;
		color: #525252;
		font-size: 24rpx;
		background-color: #eeeeee;
		margin-right: 20rpx;
		display: inline-block;
	}
	.album{
		margin-top: 40rpx;
		padding: 0 4%;
	}
	.albumTil{
		height: 70rpx;
		line-height: 70rpx;
	}
	.albumTil .L{
		float: left;
		color: #121213;
		font-size: 40rpx;
	}
	.albumTil .R{
		float: right;
		color: #a9bed0;
		font-size: 28rpx;
		line-height: 80rpx;
	}
	.albumList{
		height: 160rpx;
		line-height: 160rpx;
		white-space: nowrap;
		font-size: 0;
	}
	.albumList div{
		display: inline-block;
		vertical-align: middle;
		margin-top: -10rpx;
		border: 2rpx solid #E5E5E5;
		width: 236rpx;
		height: 90rpx;
		padding: 23rpx 10rpx;
		color: #121213;
		font-size: 24rpx;
		white-space: pre-line;
		line-height: 30rpx;
		border: solid wrpx #979797;
		border-radius: 4rpx;
		margin-right: 24rpx;
	}
	.albumList .sel{
		border-color: #8fcd31 !important;
	}
	.recommend{
		margin-top: 30rpx;
		padding: 0 4%;
	}
	.recommend .reCn{
		margin-top: 43rpx;
	}
	
	.recommend .reViList{
		height: 145rpx;
		margin-bottom: 30rpx;
	}
	.recommend .reViList img{
		float: left;
		width: 217rpx;
		height: 145rpx;
		border-radius: 4rpx;
	}
	.recommend .reViList .reViMsg{
		float: right;
		width: 450rpx;
		color: #121213;
		font-size: 24rpx;
		padding-top: 5rpx;
	}
	
	.eyeIcon{
		background: url('data:image/png;base64,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');
	}
	.gouIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAARCAYAAADHeGwwAAAAAXNSR0IArs4c6QAAAR5JREFUOBG1lDEOAUEYRm22kMhWOq1S9A7gApyAGzgCV3AD4gCi0FEotqBXanUaIlGI8b7NRuww2ZWML3nZnZl/3vJndoPSH2KMqaJdwNm7HnkEW1Birw9AWIa1zOQANW8PQBbCHJQj1H3KA4RTmckJmt7kEiEcy0wu0PItHyVqY25c277lg1R+59rxLe8hfaT0nHIKlqBz23AWWQvUdkG/WhlYy9khBZukzJgr13529XNETRvUb2X4WWHNUFSBiarT6L5ilSVD5lugk6KMv9U459jQB/0LZQ+ZljFugs64ojMfOGWuBTY1QHLl1TLu66C3U9HbGrocufNstls2Y07fFWUF5VxJkQJE7y2TXCctKrK3cA1CtWwHMegb/3OeFGBqeii9Hl4AAAAASUVORK5CYII=');
	}
	.collIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAHFJREFUOBFj/A8EDHjAscezwLJWsml4VDEwsOCVBUq++HKNkBKwPBNRqohQNGoQ4UCiWhgxHn008z+xUYzLXRI8WgxUcREjIyMDI6GUve56AdghQZoTcDkILE4VF4FMGjUIbzhTN7AJlkegxAZKJ4QAAK/TF2Mx+NS7AAAAAElFTkSuQmCC');
	}
</style>