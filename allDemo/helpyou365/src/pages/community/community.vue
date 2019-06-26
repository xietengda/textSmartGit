<template>
	<div class="container CnTop CnBtm" :class="[isIphonex ? 'ixPaddCn':'']">
		
		<!--隐藏帖子内容-->
		<div :hidden="true">
			<div class="head" :class="[isIphonex ? 'ixHead':'']">
				<div>{{langua.programTil}}</div>
			</div>
		
			<!--搜索框-->
			<div class="search">
				<div class="seaTu seaIcon"></div>
				<input type="text" :placeholder="langua.seaPlace" confirm-type='search'  @confirm='seaSumit'  />
			</div>
			
			<!--类型选择-->
			<div class="comTwo" :class="[fixedType ? 'comFixed':'',isIphonex &&  fixedType? 'comFix_x':'']">
				<div class="comType div_float">
					<div class="comL">
						<div :class="[cType == 1?'sel':'']" data-s-type='1' @click="changeType">{{langua.CComposite}}</div>
						<div :class="[cType == 2?'sel':'']" data-s-type='2' @click="changeType">{{langua.CHelp}}</div>
					</div>
					<div class="comR" @click="changLanguage">{{showLan}}<span class="doArraw"></span></div>
				</div>
			</div>
			
			<!--类型选择内容-->
			<div class="TypeView" :class="[!isIphonex && fixedType?'TypeViewPo':'',isIphonex ? 'ixTypeView':'',isIphonex && fixedType ? 'ixTypeViewPo':'']" v-show="selLan" @click="closeLayer">
				<div class="comTwoCn">
					<div class="div_float" data-lan='1' :data-lan-text='langua.CJP' @click.stop="selLanguage"><span class="japan2"></span><div>{{langua.jpCom}}</div></div>
					<div class="div_float" data-lan='2' :data-lan-text='langua.CKR' @click.stop="selLanguage"><span class="korea2"></span><div>{{langua.krCom}}</div></div>
					<div class="div_float" data-lan='3' :data-lan-text='langua.CSC' @click.stop="selLanguage"><span class="china2"></span><div>{{langua.scCom}}</div></div>
					<div class="div_float" data-lan='0' :data-lan-text='langua.CAll' @click.stop="selLanguage"><span class="allLan"></span><div>{{langua.allCom}}</div></div>
				</div>
			</div>
			 
			
			<!--帖子内容-->
			<postList :postList="postList"  @eassDetial='eassDetial' @checkPerson='checkPerson' @checkMore='checkMore' :language="langua" @collectPost='collectPost' @postDianz='postDianz' @checkImg='checkImg'/>
			
			<!--发布信息按钮-->
			<div class="issueBtn" :class="[langua.type == 'sc' && langua.type != 'jp' ?'scIcon':'krIcon',langua.type == 'jp'?'jpIcon':'',isIphonex ? 'fbBtn':'']" @click="addComment"></div>
			
	
			<!-- 置顶图标 -->
			<div class="gotop" v-show="showGoTop" @click="goTopFun">
				<img src="../../../static/img/scrolltop.png"  alt="">
			</div>
		</div>
		
		<!--暂未开放，敬请期待-->
		<div class="atlasNull">
			<div class="icon nullPhoto"></div>
			<div class="til">{{langua.unrealized}}</div>
		</div>
		
		
		<!--公共底部--> 
		<allFooter :selType="selType" :isIndex="isIndex" :language="langua"/> 

	</div>
</template>

<script>
	import allFooter from '../../components/footer'
	import postList from '../../components/postList'
	import scrollTop from '../../components/scroll_top.vue'
	
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				selLan:false,//选择语言
				showLan:'简体中文',//目前的语言
				showlangua:'',//社区请求语言
				postList:[],//文章列表
				signList:'',//临时存放列表
				selType:2,//社区标志
				cType:1,//帖子类型  1:综合  2：求助
				langua:'',//静态文字的与语种
				keyword:'',//搜索文字
				page:1,//页码
				fixedType:false,//固定搜索条件框
				show: false,
				showGoTop: false, //置顶图标显示或隐藏
			}
		},

		components: {
			allFooter,
			postList,
			scrollTop
		},
		computed: {
			isIphonex() {
				return this.$store.store.state.isIphonex
			},
		},
		methods: {
			//更换帖子类型 
			changeType(e){
				this.cType = e.currentTarget.dataset.sType;
				this.page  = 1;
				this.getPostList().then(res =>{wx.hideLoading()});
			},
			//更换语言
			changLanguage(){
				var sign = true;
				if(this.selLan){
					sign = false;
				}
				this.selLan = sign;
			},
			//选择语言
			selLanguage(e){
				//选中类型
				var selLang = e.currentTarget.dataset.lan;
				this.selLan = false;
				this.showLan = e.currentTarget.dataset.lanText;
				this.showlangua = selLang;
				this.page = 1;
				
				//请求列表
				this.getPostList().then(res =>{wx.hideLoading()});
			},
			//关闭选择框
			closeLayer(){
				this.selLan = false;
			},
			//查看帖子
			async eassDetial(e){
				//判断是否登陆
				await this.util.judgeLogin();
//				
//				console.log(e)
//				
//				return
				
				
				wx.navigateTo({
					url:'/pages/postDetail/main?postId='+e.currentTarget.dataset.postId
				})
			},
			//查看更多评论
			async checkMore(e){
				//判断是否登陆
				await this.util.judgeLogin();
				
				wx.navigateTo({
					url:'/pages/postDetail/main?postId='+e.currentTarget.dataset.postId
				})
			},
			//发布帖子
			async addComment(){
				//判断是否登陆
				await this.util.judgeLogin();
				
				var addType = this.cType;
				
				wx.navigateTo({
					url:'/pages/addComment/main?addType='+addType
				})
			},
			//查看帖子作者
			async checkPerson(e){
				//判断是否登陆
				await this.util.judgeLogin();
				
				console.log(e);
				var authorId = e.currentTarget.dataset.authorId;
				wx.navigateTo({
					url:'/pages/hisPost/main?authorId='+authorId
				})
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
								that.postList[pIndex].post_like = parseInt(that.postList[pIndex].post_like) + 1;
							}else{
								that.postList[pIndex].user_islike = 0;
								that.postList[pIndex].post_like = parseInt(that.postList[pIndex].post_like) - 1;
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
			//获取帖子列表
			async getPostList(){
				wx.showLoading({
					title:this.langua.loadText+'...',
					mask:true
				})
				var that = this;
				 await that.Request.getPostList(that.showlangua,that.cType,that.keyword,that.page,10,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200 && res.data != ''){
							for(var k in res.data.list){
								//转换时间显示格式
								res.data.list[k].published_time = that.util.changeTimeFormat(res.data.list[k].published_time);
								//图片
								for(var x in res.data.list[k].photos){
									res.data.list[k].photos[x] = that.Request.getUrl() + res.data.list[k].photos[x];
								}
							}
							
							
							var postList = that.util.converJSON(res.data.list);
							if(that.page != 1 && that.page != 'end'){
								var postList = that.postList.concat(res.data.list);
							}
							
							that.signList = postList;
							
							
							if(res.data.page.page < res.data.page.total_page){
								that.page = that.page + 1;
							}else{
								that.page = 'end';
							}
						}else if(res.code == 403) {
							that.util.getSessionKey();
						}else{
							that.signList = '';
						}
					})
					.catch(res =>{
						console.log(res)
					})
					
					
					//判断图片显示样式 sType: cro 横向  row 竖向 squ 正方形
					var postList2 = that.util.converJSON(that.signList);
					for(var i in postList2){
						//帖子内容长度
						postList2[i].conLength = postList2[i].post_content.length;
						//点赞头像长度
						postList2[i].HeadLength = postList2[i].userlike_avatar.length;
						if(postList2[i].photos.length == 1){
							await that.util.getImgInfo(postList2[i].photos[0])
								.then(rs =>{
									postList2[i].sType = rs;
								})
						}else{
							postList2[i].pLength = postList2[i].photos.length;
						}
						
					}
					that.postList = postList2;
			},
			//搜索接口
			seaSumit(e){
				console.log(e.mp.detail.value)
				this.keyword = e.mp.detail.value;
				this.page  = 1;
				this.getPostList().then(res =>{wx.hideLoading()});
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
		onLoad(){
			this.langua = this.$util.util.prototype.changeLanguage();
			this.page = 1;
			
			if(wx.getStorageSync('hasLanguage') == 'china'){
				this.showlangua = 3;
				this.showLan = this.langua.CSC;
			}else if(wx.getStorageSync('hasLanguage') == 'korea'){
				this.showlangua = 2;
				this.showLan = this.langua.CKR;
			}else if(wx.getStorageSync('hasLanguage') == 'japan'){
				this.showlangua = 1;
				this.showLan = this.langua.CJP;
			}
			
			this.getPostList().then(res =>{wx.hideLoading()});
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
		onHide(){
			this.page = 1;
			this.cType = 1;
		},
		onUnload(){
			this.page = 1;
			this.cType = 1;
		},
		onReachBottom(){
			var that  = this;
			if(this.page != 'end'){
				this.getPostList().then(res =>{wx.hideLoading()});
			}else{
				wx.showToast({
					title:that.langua.isEnd,
					icon:'none'
				})
			}
		},
		onPullDownRefresh(){
			console.log('下拉刷新')
			var that = this;
			this.page = 1;
		    //模拟加载
		    setTimeout(function()
		    {
		    	that.getPostList().then(res =>{wx.hideLoading()});
		      	wx.stopPullDownRefresh() //停止下拉刷新
		    },500);
		},
		onPageScroll(e){
			var that  = this;
			if(e.scrollTop >= 37){
				that.fixedType = true;
				that.show = true;
			}else{
				that.fixedType = false;
				that.show = false;
			}
			
			if(e.scrollTop >= 120) {
				//显示回到顶部图标
				that.showGoTop = true;
			}else{
				//隐藏回到顶部图标
				that.showGoTop = false;
			}

		}
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
	
	.fbBtn{
		bottom: 190rpx !important;
	}
	.comFix_x{
		top: 176rpx !important;
	}
	.comFixed{
		position: fixed;
		width: 90%;
		top: 135rpx;
		background-color: white;
		margin-top: 0rpx !important;
		z-index: 3;
	}
	
	.TypeView{
		position: fixed;
		width: 100%;
		bottom: 0;
		background-color: rgba(0,0,0,.3);
		top: 310rpx;
		z-index: 3;
	}
	.TypeViewPo{
		top:215rpx;
	}
	.ixTypeView{
		top: 355rpx;
	}
	.ixTypeViewPo{
		top: 256rpx;
	}
	.comTwoCn{
		background-color: white;
	}
	.comTwoCn>div{
		height: 92rpx;
		line-height: 92rpx;
		border-bottom: 2rpx solid #E5E5E5;
		width: 80%;
		margin: 0 auto;
		text-align: center;
		color: #2b2f37;
		font-size: 28rpx;
	}
	.comTwoCn>div>span{
		display: inline-block;
		width: 74rpx;
		height: 50rpx;
		vertical-align: middle;
		float: left;
		margin-top: 22rpx;
		margin-left: 121rpx;
		margin-right: 21rpx;
	}
	.comTwoCn>div>div{
		float: left;
	}
	.comTwoCn>div:last-child{
		border: none;
	}
	.comType .comR>span{
		display: inline-block;
		vertical-align: middle;
		width: 27rpx;
		height: 17rpx;
		margin-left: 24rpx;
	}
	.comType .comR{
		float: right;
		color: #333333;
		font-size: 24rpx;
	}
	.comType .comL .sel{
		color: #f90000;
		border-bottom: 2rpx solid #f90000;
	}
	.comType .comL>div{
		float: left;
		padding:0 40rpx;
	}
	.comType .comL{
		float: left;
		color: #333333;
		font-size: 32rpx;
		line-height: 78rpx;
	}
	.comTwo .comType{
		height: 78rpx;
		line-height: 78rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.comTwo{
		margin-top: 20rpx;
		padding: 0 5%;
	}
	.search input{
		height: 65rpx;
		line-height: 65rpx;
		border-radius: 30rpx;
		background-color: #efefef;
		color: #191919;
		font-size: 30rpx;
		padding-left: 73rpx;
	}
	.search .seaTu{
		position: absolute;
		width: 32rpx;
		height: 32rpx;
		margin: auto;
		top: 0;
		bottom: 0;
		left: 60rpx;
	}
	.search{
		height: 70rpx;
		line-height: 70rpx;
		padding: 0 5%;
		position: relative;
		padding-top: 0.01rem;
		margin-top: 10rpx;
	}
	.issueBtn{
		position: fixed;
		z-index: 3;
		width: 130rpx;
		height: 130rpx;
		margin: auto;
		left: 0;
		right: 0;
		bottom: 130rpx;
		border-radius: 100%;
	}
	
	/*中文*/
	.scIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAACICAYAAAA8uqNSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjI4RkNEN0FEN0ZEMTFFOEExRjJBMjUxRDgxMzY1NEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjI4RkNENzlEN0ZEMTFFOEExRjJBMjUxRDgxMzY1NEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDo4Rjc5OUNEQkY3RDdFODExQTBFMUJGQkUzQkE1RDZFNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Rjc5OUNEQkY3RDdFODExQTBFMUJGQkUzQkE1RDZFNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpVe8MgAAAyPSURBVHja7J1/bFRV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');
		background-size: 100% 100%;
	}
	
	/*韩文*/
	.krIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAACICAYAAAA8uqNSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0U2RDM4MTVEN0ZEMTFFOEE0N0REOEU4M0YxOERCMEEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0U2RDM4MTREN0ZEMTFFOEE0N0REOEU4M0YxOERCMEEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDo4Rjc5OUNEQkY3RDdFODExQTBFMUJGQkUzQkE1RDZFNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Rjc5OUNEQkY3RDdFODExQTBFMUJGQkUzQkE1RDZFNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhAxOT8AAAv6SURBVHja7J17jBX1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');
		background-size: 100% 100%;
	}
	
	/*日文*/
	.jpIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAACICAYAAAA8uqNSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTk1NzM2RDBEN0ZEMTFFOEEwNzI5OERBNjMzNzY0QjgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTk1NzM2Q0ZEN0ZEMTFFOEEwNzI5OERBNjMzNzY0QjgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDo4Rjc5OUNEQkY3RDdFODExQTBFMUJGQkUzQkE1RDZFNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Rjc5OUNEQkY3RDdFODExQTBFMUJGQkUzQkE1RDZFNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuZZT5cAAA06SURBVHja7F15jFXV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');
		background-size: 100% 100%;
	}
</style>