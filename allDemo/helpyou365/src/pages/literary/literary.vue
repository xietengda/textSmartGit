<template>
	<div class="container CnTop CnBtm" :class="[isIphonex ? 'ixPaddCn':'']">
		
		<!--导航栏-->
		<allHead :headTil='langua.aboutPost' />
		
		<div class="aboutText">
			<!--<p>{{articleTitle}}</p>
			<p>{{articleTime}}</p>-->
			<!--<div class="textContent" v-html="articleContent"></div>-->
			<wxParse v-if='articleContent' :content="articleContent" :imageProp='{domain:webUrl}'/>
		</div>
 
	</div>
</template>
 
<script>
	import allHead from '../../components/head' 
	import wxParse from 'mpvue-wxparse'
	 
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				langua:'',//静态文字的语种
				articleTitle: '', //文章标题
				articleTime: '', //文章发布时间
				articleContent:'',//文章内容，
				webUrl:this.$api.api.prototype.getUrl()+'upload/',//富文本图片ip
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
			//文章详情
			articleDetail() {
				var that = this;
				var detailId = parseInt(that.$root.$mp.query.id);    //接收文章列表传过来的id
				that.Request.articleDetail(wx.getStorageSync('sessionkey'),wx.getStorageSync('language'),detailId)
					.then(res =>{
						if(res.code == 200){
							//让图片自适应屏幕
							res.data.post_content = res.data.post_content.replace(/\width="410" height="335"/gi, '');
							//让图片自适应屏幕
							res.data.post_content = res.data.post_content.replace(/\ style="white-space: normal; width: 410px; height: 335px;"/gi, '');
							that.articleContent = res.data.post_content;
							that.articleTitle = res.data.post_title;
							that.articleTime = that.util.timestampToTime(res.data.published_time);
							
							
							
						}
					})
			}
		},
		onShow(){
			this.langua = this.$util.util.prototype.changeLanguage();
			this.articleDetail();
		}
	}
</script>

<style scoped>

	.aboutText {
		padding: 0 3%;
		margin-top: 30rpx;
		font-size: 30rpx;
		line-height: 60rpx;
	}
	.aboutText p:first-child {
		font-weight: bold;
		font-size: 32rpx;
	}
	.aboutText p{
		color: #2b2f37;
		text-align: center;
	}
	.aboutText .textContent {
		color: #333;
	}
</style>