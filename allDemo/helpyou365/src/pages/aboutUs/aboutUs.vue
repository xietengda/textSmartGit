<template>
	<div class="container CnTop CnBtm" :class="[isIphonex ? 'ixPaddCn':'']">
		
		<!--导航栏-->
		<allHead :headTil='langua.setAboutUs' />
		
		<div class="aboutText">
			<!--<div>"365 ，是2010年3月4日成立的团购网站。有着“吃喝玩乐全都有”和“美团一次美一次”的服务宣传宗旨。总部位于北京市朝阳区望京东路6号。</div>
			<div>014年美团全年交易额突破460亿元，较去年增长180%以上，市场份额占比超过60%，比2013年的53%增长了7个百分点。 [2]  </div>
			<img src="../../../static/img/list2.png" />-->
			<wxParse :content="aboutUsCn" />
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
				langua:'',//静态文字的语种
				aboutUsCn:'',//关于我们内容
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
			
			//获取关于我们文章
			aboutUs(){
				var that = this;
				that.Request.aboutUs(wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							//让图片自适应屏幕
							res.data = res.data.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display;block;margin:20px 0;"');
							that.aboutUsCn = that.util.converJSON(res.data);
						}
					})
			}
		},
		onShow(){
			this.langua = this.$util.util.prototype.changeLanguage();
			this.aboutUs();
		}
	}
</script>

<style scoped>
	.aboutText img{
		margin:20rpx 0;
		width: 100%;
		height: 300rpx;
	}
	.aboutText div{
		color: #2b2f37;
		font-size: 30rpx;
		line-height: 60rpx;
	}
	.aboutText{
		padding: 0 3%;
		margin-top: 30rpx;
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