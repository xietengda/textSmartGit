<template>
	<div class="container">
			
		<div v-show="!nullMsg">
			<!--图文收藏列表-->
			<videoList :videoData="essayData"  @skipDetail="lookEssay"/>
		</div>
		
		<!--收藏为空-->
		<div class="cnNull" v-if="essayData.length == 0">
			<div class="icon collNullIcon"></div>
			<div class="cn greendT">暂无收藏</div> 
			<div class="goPage" @click="goHome">去逛逛~</div>
		</div>
			
	</div>
</template>

<script>
	import videoList from '../../components/videoList'

	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求方法头
				essayData:[],
				openid:'',
				page:1,
			}
		},

		components: {
			videoList
		},

		methods: {
			//获取收藏列表
			getCollect(){
				wx.showLoading({
					title:'加载中'
				});
				var that = this;
				that.Request.getCollect(that.openid,1,that.page)
					.then(res => {
						console.log(res);
						if(res.code == 0){
							for(var x in res.data.list){
								res.data.list[x].img = that.Request.getUrl() + res.data.list[x].img;
								res.data.list[x].CollectType = 'essay';
							}
							
							var essayData = res.data.list;
							
							if(that.page != '1' && that.page !='end'){
								var essayData = that.essayData.concat(res.data.list);
							}
							
							if(res.data.page.page < res.data.page.total_page){
								that.page = that.page + 1;
							}else{
								that.page = 'end';
							}
							
							
							this.essayData = essayData;
						}
					})
					.catch(res => {
						console.log(res);
					})
			},
			//跳转详情
			lookEssay(e){
				console.log(e)
				wx.navigateTo({
					url:'../overseasDetail/main?article_id='+e.id
				});
			},
			//回资讯
			goHome(){
				wx.reLaunch({
					url:'../overseasInfo/main'
				})
			}
		},
		onShow(){
			this.page = 1;
			//判断是否有openid
			if(wx.getStorageSync('openid')) {
				this.openid = wx.getStorageSync('openid');
				this.getCollect();
			} else {
				wx.navigateTo({
					url: '../login/main'
				});
				return
			}
			
		},
		onReachBottom(){
			if(this.page !='end'){
				this.getCollect();
			}else{
				wx.showToast({
					title:'已经到底了！',
					icon:'none'
				})
			}
		},
		onPullDownRefresh() {
			var that = this;
			that.page = 1;
			
		    //模拟加载
		    setTimeout(function()
		    {
		    	that.getCollect();
		      	wx.stopPullDownRefresh() //停止下拉刷新
		    },1500);
		}
	}
</script>

<style scoped>
	.cnNull .icon{
		width: 110rpx !important;	
	}
	.collNullIcon{
		background: url('data:image/png;base64,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');
	}
</style>