<template>
	<div class="container CnTop CnBtm" :class="[isIphonex ? 'ixPaddCn':'']">

		<!--导航栏-->
		<allHead :headTil='langua.atTil' />
		
		<div class="attenCn" v-if='atteList.length != 0'>
			<div class="attenList" v-for="item in atteList" :key='atteList'>
				<img :src="item.avatar"  @click="checkPerson"/>
				<div><span>{{item.user_name}}</span>{{langua.atForYou}}</div>
			</div>
		</div>
		
		<div class="nullMsg" v-else>
			<span class="jusang"></span>{{langua.atNoAtten}}
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
				atteList:[],//列表
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
			//查看个人主页
			checkPerson(){
//				wx.navigateTo({
//					url:'/pages/hisPost/main'
//				})
			},
			againFun(){
				this.userFans().then(res =>{wx.hideLoading()});
			},
			//获取粉丝列表
			async userFans(){
				//加载动画
				wx.showLoading({title:this.langua.loadText+'...'});
				var that = this;
				await that.Request.userFans(that.page,10,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							var atteList = res.data.list;
							
							if(that.page != 1 && that.page != 'end'){
								var atteList = that.atteList.concat(res.data.list);
							}
							
							that.atteList = atteList;
							
							if(res.data.page.page < res.data.page.total_page){
								that.page = that.page + 1;
							}else{
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
		      	that.againFun();
		    },500);
		}
	}
</script>

<style scoped>
	.attenList div span{
		margin-right: 20rpx;
	}
	.attenList div{
		display: inline-block;
		vertical-align: middle;
		font-size: 28rpx;
		color: #2b2f37;
		width: 500rpx;
		margin-left: 30rpx;
	}
	.attenList img{
		display: inline-block;
		vertical-align: middle;
		width: 80rpx;
		height: 80rpx;
		border-radius: 100%;
	}
	.attenCn .attenList{
		height: 114rpx;
		line-height: 114rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.attenCn{
		padding: 0 5%;
	}
	
</style>