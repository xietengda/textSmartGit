<template>
	<div class="container CnTop CnBtm" :class="[isIphonex ? 'ixPaddCn':'']">
		
		<!--导航栏-->
		<allHead :headTil='langua.grTil' />
		
		<div class="ReplyCn">
			<replyList :reList='reList' :showDel='showDel' @skipDetial='skipDetial' @deletePost='delReply' :language="langua" @lookPerson="checkPerson" @replyCom='replyCom' @dianZReply='dianZReply'/>
		</div>
		
		<!--回复框-->
		<div class="btmInput" v-if='replyFous'>
			<div class="inputView div_float" >
				<img :src="toUserInfo.toUserAva" />
				<input type="text"  :focus='replyFous'  @blur='inputBlur' @confirm='submitReply'    :placeholder="toUserInfo.toUserName" />
			</div>
		</div>
		
		<div class="nullMsg"  v-if='reList.length == 0'> 
			<span class="jusang"></span>{{langua.noAttenMsg}}
		</div>
		
	</div>
</template>
 
<script>
	import replyList from '../../components/replyList'
	import allHead from '../../components/head' 
	
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				reList:[],
				langua:'',//静态文字的语种
				replyFous:false,//回复框回去焦点
				to_user_name:'@大番薯',//回复 评论的名字
				page:1,//页码
				toUserInfo:'',//发布评论用户信息
			}
		},

		components: {
			replyList,
			allHead
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
			//查看评论的详情
			skipDetial(e){
				wx.navigateTo({
					url:'/pages/postDetail/main?postId='+e.currentTarget.dataset.postId
				})
			},
			//查看作者信息
			checkPerson(){
				wx.navigateTo({
					url:'/pages/hisPost/main'
				})
			},
			//获取评论焦点
			replyCom(e){
				var sign = {
					parentId:e.currentTarget.dataset.parentId,
					postId:e.currentTarget.dataset.postId,
					toUserId:e.currentTarget.dataset.toUserId,
					toUserName:'@'+e.currentTarget.dataset.toUserName,
					toUserAva:e.currentTarget.dataset.toUserAva
				}
				this.toUserInfo = sign;
				this.replyFous = true;
			},
			//失去焦点
			inputBlur(){
				this.replyFous = false;
			},
			//点赞评论
			async dianZReply(e){
				var that  = this;
				var sign = true;
				var reList = that.reList;
				var cIndex = e.currentTarget.dataset.cIndex;
				
				//判断是否登陆
				await that.util.judgeLogin();
				
				
				//等于1是已点赞
				if(that.reList[cIndex].user_islike == 1){
					sign = false;
				}
				
				that.Request.likePost(that.reList[cIndex].id,2)
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							if(sign){
								that.reList[cIndex].user_islike = 1;
								that.reList[cIndex].like = that.reList[cIndex].like + 1;
							}else{
								that.reList[cIndex].user_islike = 0;
								that.reList[cIndex].like = that.reList[cIndex].like - 1;
							}
						}
					})
					.catch(res =>{
						console.log(res)
					})
			},
			//重新加载
			againFun(){
				this.getMyComment().then(res =>{wx.hideLoading()});
			},
			//获取评论我的列表
			async getMyComment(){
				wx.showLoading({
					title:this.langua.loadText+'...'
				})
				var that = this;
				await that.Request.getMyComment(that.page,10,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
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
	
							if(that.page != 1 && that.page != 'end') {
								var reList = that.util.concat(res.data.list);
							}
	
	
							that.reList = that.util.converJSON(reList);
							
							console.log(that.util.converJSON(reList));
	
							if(res.data.page.page < res.data.page.total) {
								that.page = that.page + 1;
							} else {
								that.page = 'end';
							}
						}else if(res.code == 403) {
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
			}
		},
		onShow(){
			this.langua = this.$util.util.prototype.changeLanguage();
			
			this.againFun();
		},
		onHide(){
			this.page = 1;
		},
		onUnload(){
			this.page = 1;
		},
		onPullDownRefresh(){
			console.log('下拉刷新')
			var that = this;
		    //模拟加载
		    setTimeout(function()
		    {
		      	wx.stopPullDownRefresh() //停止下拉刷新
		      	that.page = 1;
		      	that.againFun();
		    },500);
		},
		onReachBottom(){
			if(this.page != 'end'){
				this.againFun();
			}else{
				wx.showToast({
					title:this.langua.isEnd,
					icon:'none'
				})
			}
		}
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
		bottom: 500px;
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