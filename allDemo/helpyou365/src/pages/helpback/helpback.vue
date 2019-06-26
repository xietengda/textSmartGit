<template>
	<div class="container CnTop CnBtm" :class="[isIphonex ? 'ixPaddCn':'']">
		
		<!--导航栏-->
		<allHead :headTil='langua.helpgroup' />
		
		<div class="aboutText">
			<p>{{langua.helpquestion}}</p>
			<div v-for="(item, index) in artList" :key="index" @click="handClick" :data-id="item.id">
				<div class="mCnList div_float">
					<div class="L">
						<img :src="item.post_imgs" alt="" v-if="item.post_imgs">
						<span class="fbIcon" v-else></span>
						{{item.post_title}}
					</div>
					<div class="R rArraw"></div>
				</div>
			</div>
			 
			 <div class="btn_context" style="border-bottom: none;">
				 <button open-type='contact'>{{langua.question}}</button>
				 <button open-type='contact'>{{langua.morethan}}</button>
			 </div>
		</div>
 
	</div>
</template>
 
<script>
	import wxParse from 'mpvue-wxparse' 
	import allHead from '../../components/head' 
	 
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				langua: '',//静态文字的语种
				artList:[],//文章列表
			}
		},

		components: {
			wxParse,
			allHead
		},
		computed: {
			isIphonex() {
				return this.$store.store.state.isIphonex
			},
		},
		methods: {
			
			//获取文章列表
			article(){
				var that = this;
				that.Request.article(wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							for(var x in res.data.list){
								res.data.list[x].post_imgs = that.Request.getUrl() + 'upload/' + res.data.list[x].post_imgs
							}
							var artList = res.data.list;
							if(that.page != '1' && that.page != 'end'){
								var artList = that.artList.concat(res.data.list);
							}
							
							that.artList = that.util.converJSON(artList);
							
							if(res.data.page.page < res.data.page.total_page){
								that.page = that.page + 1;
							}else{
								that.page = 'end';
							}
						}
					})
			},

			//点击列表跳转文章
			handClick(e) {
				let id = e.currentTarget.dataset.id;      //获取文章id
				wx.navigateTo({
					url:'/pages/literary/main?id='+ id
				})
			}
		},
		onShow(){
			this.langua = this.$util.util.prototype.changeLanguage();
			this.article();
		},
		onReachBottom(){
			if(this.page != 'end'){
				this.article();
			}else{
				wx.showToast({
					title:this.langua.isEnd,
					icon:'none'
				})
			}
		},
	}
</script>

<style scoped>
	.aboutText{
		padding: 0 4%;
		margin-top: 30rpx;
	}
	.aboutText p {
		font-size: 30rpx;
		color: #333;
		font-weight: bold;
	}
	.aboutText .mCnList .R{
		position: absolute;
		margin: auto;
		right: 0;
		top: 0;
		bottom: 0;
		width: 30rpx;
		height: 30rpx;
	}
	.aboutText .mCnList .L {
		display: flex;
		justify-content:flex-start;
	}
  	.aboutText .mCnList .L span{
		display: inline-block;
		width: 50rpx;
		height: 50rpx;
		vertical-align: middle;
		margin-top: -5rpx;
		margin-right: 20rpx;
		background-size: 100% 100%;
		margin: 30rpx 20rpx;
	}
	.aboutText .mCnList .L img {
		width: 50rpx;
		height: 50rpx;
		margin: 30rpx 20rpx;
	}
  	.aboutText .mCnList{
		height: 113rpx;
		line-height: 113rpx;
		border-bottom: 2rpx solid #E5E5E5;
		color: #2b2f37;
		font-size: 28rpx;
		position: relative;
	}
	.btn_context {
		display: flex;
		justify-content: space-between;
		width: 100%;
		position: absolute;
		bottom: 10%;
		left: 50%;
		margin-left: -50%;
	}
	.btn_context button::after {
		border: none;
	}
	.btn_context button {
		background-color: transparent;
		outline: none;
		font-size: 30rpx;
		color: #2b2f37;
		padding: 10rpx 70rpx;
		border-radius: 50rpx;
		border: 1rpx solid #dcdcdc;
	}
	.fbIcon {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAAyCAYAAADm33NGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkNWQ0ZDczMi1jNmE2LTgwNDItYjA0Zi04YTBiMTYzYmJlZjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUMwODk3NTVFN0Y3MTFFODgwRjhDODdENjVCMDJCMTciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUMwODk3NTRFN0Y3MTFFODgwRjhDODdENjVCMDJCMTciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjczQUVCN0Y3MUJFN0U4MTFCNERDOTEyM0U4ODExQkRDIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MGZlYTE3NzUtYWEwYi0xMWU4LWFlY2UtYjgyOWEyNzJmZTgzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+JH0CSAAAA35JREFUeNrsmluITVEYx/c5MWaaERmDISa3JpQxZ4ajlIYHFEoT5cGLGGqkNB4kU1NKpJDy5BjlEvFAyINcH8hlSDLKJJeEeThHzZHGMRnjv/LtrLNaa52999nO7L346lf7svba+7/X7fu+vSPWH1sHNoBpYBj4aYXPoiADukACnOdPXgQDBnLGFnjUUIE2+yO0wdslkLTCa2PBSvEgr3q7ZYa1CrqydiYZInIqrysqnCw3RORIccrlLWKIyKhOpJH2T4gc4rL8PLAWxEEFSIPH4By4E2Sh/Owa07T4iRyL7gVQGhBNc3VLiErkI4fexUtQEjSRTsZkgi7i7RW4Bp4Lx6vJDw5Vd62WtNZmoUwj6BPKLAxTd90rnN+pqHSVUO54mERe5s59pThTZa+5sg/DNCb5SYSJ/K4p+4nbLg6TM5AUQpjpinJDQQ23nwqTyFvCvmqstYPh3H7gHAPdmCwDvUKZDrAGzAJLwRXJDDwmz2di960CdWABhU6lfk08tZILGl2mG5o9ChsPWsAN0COp9zP1kAP0cnVW71akRRkDJwL3eAxwj9Gk5uZlvqElbpwfLWlbA7inuOEzWivddslDPiSqMtS6fKA8ny8jJrLYmHya4+Fi1B1GURTyhHxbN8aGwBFQKTnXRy4jq/cDHWNpmRk0Rqco6kxRjzsJJoL3qomn9i9PcsU0E6t6w1aFcN5YmHeQRMnq2U1LXa+X7pqvLQZvJQ+VlPjDTowtWW3kpIh1poTjBRHZpnjrrFVH5Fl3BQXtunHrKJ70aiWKdTRN49JPa3Iq0s+WrKdpXrzhVQfjzqvNAR9ziazy6WbNije6qwAe3GiaxJQil+d5gyJwWiKOLQvLCuiqxnQiM5SN82KLhJjS5gVlGApps3UibU65cLLLyOOQ1XPWQ9rTD4s7ETlATvIOiiNlxh5+G+hWXL9lECOruMqt+6F468xxvg3u0iJbRLPwEjBBUv4+2AQ6B1nkA5lb94VapiMPR7klIDGytrvaLcm66TsXAtutYH3b1IqsE1Ijqynl0SXJrXZS/DjTCp5pRdZoLqwkL4Z99JlsBduyRLqZ3ruJ0Nn/j7Cmiuw3RFe/TmSPISLTOpEbDRGZlU6R/XZ2k3IxYTX2l2eDeHCfZfYPhK220IShAg/b3dW2FWA9NTdLQIX1p95v1u8fNNinh+vs4C8BBgBS8rVtJn/XswAAAABJRU5ErkJggg==');
	}
</style>