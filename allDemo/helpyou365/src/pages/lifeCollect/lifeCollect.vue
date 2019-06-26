<template>
	<div class="container  CnTop CnBtm" :class="[isIphonex ? 'ixPaddCn':'']">
		
		<!--导航栏-->
		<allHead :headTil='langua.lfTil' />
		
		<!--合集列表-->
		<div class="lifeCn">
			<div class="lifeSub div_float">
				<div class="lifeList" v-for="item in lifeList" :key="lifeList" :data-goods-id='item.goods_id' @click="skipDetail">
					<img :src="item.thumbnail" />
					<div class="lMsg">
						<div class="lTil eli_one">{{item.goods_name}}</div>
						<div class="lAddr">{{item.city}}丨{{item.district}} <span class="sAddIcon"></span></div>
						<div class="ldisc eli_one" v-if='item.recommended == 1'><span class="ze">{{langua.lfZhe}}</span>{{item.recommended_text}}</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 置顶 -->
		<scrollTop></scrollTop>

	</div>
</template>

<script> 
	import allHead from '../../components/head'
	import scrollTop from '../../components/scroll_top'
	
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				lifeList:[],
				langua:'',//静态文字的语种
				page:1,//页码
			}
		},

		components: {
			allHead,
			scrollTop
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
			//查看商家详情
			skipDetail(e){
				var goodsId = e.currentTarget.dataset.goodsId;
				wx.navigateTo({
					url: '/pages/cateDetail/main?goodsId='+goodsId
				})
			},
			//获取狠优惠列表
			getDiscountList(){
				var that = this;
				that.Request.getDiscountList(that.page,10,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							for(var x in res.data.list){
								res.data.list[x].thumbnail = that.Request.getUrl() + res.data.list[x].thumbnail;
							}
							
							var lifeList = res.data.list;
							if(that.page != '1' && that.page != 'end'){
								var lifeList = that.lifeList.concat(res.data.list);
							}
							
							that.lifeList = that.util.converJSON(lifeList);
							
							if(res.data.page.page < res.data.page.total_page){
								that.page = that.page + 1;
							}else{
								that.page = 'end';
							}
						}else if(res.code == 403){
							that.util.getSessionKey();
							setTimeout(function(){
								that.getDiscountList();
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
			this.getDiscountList();
		},
		onReachBottom(){
			if(this.page != 'end'){
				this.getDiscountList();
			}else{
				wx.showToast({
					title:this.langua.isEnd,
					icon:'none'
				})
			}
		},
		onUnload(){
			this.page = 1;
		},
		onHide(){
			this.page = 1;
		},
		onPullDownRefresh(){
			var that = this;
			
		    //模拟加载
		    setTimeout(function()
		    {
		      	wx.stopPullDownRefresh() //停止下拉刷新
		      	that.page  = 1;
		      	that.getDiscountList();
		    },500);
		}
	}
</script>

<style scoped>
	.lMsg .ldisc{
		color: #ff4a4a;
		font-size: 24rpx;
	}
	.lMsg .lAddr span{
		display: inline-block;
		vertical-align: middle;
		width: 23rpx;
		height: 27rpx;
		position: absolute;
		margin: auto;
		top: 0;
		bottom: 0;
		right: 0;
	}
	.lMsg .lAddr{
		color: #333333;
		font-size: 24rpx;
		position: relative;
	}
	.lMsg .lTil{
		color: #333333;
		font-size: 32rpx;
	}
	.lifeList .lMsg{
		width: 324rpx;
		padding:0 1%;
		margin: 0 auto;
		margin-top: 10rpx;
	}
	.lifeList .lMsg div{
		line-height: 50rpx;
	}
	.lifeList img{
		width: 326rpx;
		height: 180rpx;
		display: block;
		margin: 0 auto;
		margin-top: 20rpx;
	}
	.lifeList{
		float: left;
		width: 44%;
		height: 355rpx;
		background-color: white;
		padding: 0 3%;
		padding-bottom: 15rpx;
		margin-bottom: 10rpx;
		border-bottom: 5rpx solid #E5E5E5;
	}
	.lifeSub{
		margin-top: 30rpx;
		padding: 0 2%;
	}
	.lifeCn{
		margin-top: 30rpx;
		background-color: white;
	}
	.ze{
		padding: 0 10rpx;
		height: 35rpx;
		border-radius: 5rpx;
		background-color: #ff4444;
		color: white;
		font-size: 24rpx;
		display: inline-block;
		text-align: center;
		line-height: 35rpx;
		vertical-align: middle;
		margin-top: -5rpx;
		margin-right: 10rpx;
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