<template>
	<div class="container CnTop CnBtm"  :class="[isIphonex ? 'ixPaddCn':'']">

		<!--导航栏-->
		<allHead :headTil='langua.pmTil' />
		
		<div class="ReplyCn"  :class="[isIphonex ? 'ixBtm':'']" v-if='praiseList.length != 0'>
			<div class="reList div_float" v-for='item in praiseList' :key="praiseList">
				<img :src="item.avatar" />
				<div class="reCn" v-if="item.type == 1"><span>{{item.user_nickname}}</span>{{langua.priseMePost}}</div>
				<div class="reCn" v-else><span>{{item.user_nickname}}</span>{{langua.priseMeReply}}</div>
				<!--<div class="R rArraw"></div>-->
			</div>
		</div>
		
		
		<div class="nullMsg" v-else>
			<span class="jusang"></span>{{langua.pmNoLikeMe}}
		</div>
		
	</div>
</template>
 
<script>
	import allHead from '../../components/head'  
	
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				praiseList:[],//列表
				langua:'',//静态文字的与语种
				page:1,
			}
		},

		components: {
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
			againFun(){
				this.priseMeList().then(res =>{wx.hideLoading()});
			},
			//赞我的列表
			async priseMeList(){
				//加载动画
				wx.showLoading({title:this.langua.loadText+'...'});
				var that = this;
				await that.Request.priseMeList(that.page,10,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							var praiseList = that.util.converJSON(res.data.list);

							if(that.page != 1 && that.page != 'end') {
								var praiseList = that.praiseList.concat(res.data.list);
							}

							that.praiseList = that.util.converJSON(praiseList);

							if(res.data.page.page < res.data.page.total) {
								that.page = that.page + 1;
							} else {
								that.page = 'end';
							}
						}else if(res.code == 403){
							that.util.getSessionKey();
							setTimeout(function(){
								that.againFun();
							},1500)
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
		      	that.aginFun();
		    },500);
		}
	}
</script>

<style scoped>
	
	.reList .R{
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		width: 30rpx;
		height: 30rpx;
	}
	.reCn span{
		margin-right: 15rpx;
	}
	.reList .reCn{
		width: 500rpx;
		line-height: 40rpx;
		display: inline-block;
		vertical-align: middle;
		margin-left: 25rpx;
		color: #2b2f37;
		font-size: 28rpx;
	}
	.reList img{
		display: inline-block;
		vertical-align: middle;
		height: 80rpx;
		width: 80rpx;
		border-radius: 100%;
	}
	.ReplyCn .reList{
		padding: 20rpx 0rpx;
		border-bottom: 2rpx solid #E5E5E5;
		position: relative;
	}
	.ReplyCn{
		padding: 0 5%;
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