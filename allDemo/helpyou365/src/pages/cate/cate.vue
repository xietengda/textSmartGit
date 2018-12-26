<template>
	<div class="container CnTop CnBtm"  :class="[isIphonex ? 'ixPaddCn':'']">
		
		<!--导航栏-->
		<allHead :headTil='langua.tourRemmend' />
		
		<div class="cateCn">
			<div class="cateList" v-for="(item,index) in cateList" :key="cateList" :data-art-id='item.id'  @click="skipArtDetial">
				<img :src="item.post_imgs" />
				<div class="caMsg">
					<div class="til eli_one">{{item.post_title}}</div>
					<div class="subTil div_float">
						<div class="L eli_one">{{item.post_content}}</div>
						<div class="R">{{item.create_time}}</div>
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
				cateList:[],
				langua:'',//静态文字的语种
				page:1,//页码
				lat:'',//纬度
				lng:'',//经度
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
				console.log(e)
				var goodsId = e.currentTarget.dataset.goodsId;
				wx.navigateTo({
					url:'/pages/cateDetail/main?goodsId='+goodsId
				})
			},
			//获取格调美食列表
			getStyleList(){
				var that = this;
				that.Request.getStyleList(that.lat,that.lng,that.page,10,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						if(res.code == 200){
							for(var x in res.data.list){
								res.data.list[x].cover_pic = that.Request.getUrl() + res.data.list[x].cover_pic;
							}
							
							var lifeList = res.data.list;
							if(that.page != '1' && that.page != 'end'){
								var lifeList = that.lifeList.concat(res.data);
							}
							
							that.cateList = that.util.converJSON(lifeList);
							
							if(res.data.page.page < res.data.page.total_page){
								that.page = that.page + 1;
							}else{
								that.page = 'end';
							}
						}else if(res.code = 403){
							that.util.getSessionKey();
							setTimeout(function(){
								that.getStyleList();
							},1500)
						}
					})
			},
			//获取旅游列表
			getTourFun(){
				var that = this;
				that.Request.getTour(wx.getStorageSync('sessionkey'),wx.getStorageSync('language'),that.page)
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							for(var x in res.data.list){
								res.data.list[x].post_imgs = that.Request.getUrl()  + 'upload/' +  res.data.list[x].post_imgs;
								res.data.list[x].create_time = that.util.changeTimeFormat(res.data.list[x].create_time);
							}
							
							var lifeList = res.data.list;
							if(that.page != '1' && that.page != 'end'){
								var lifeList = that.lifeList.concat(res.data);
							}
							
							that.cateList = that.util.converJSON(lifeList);
							
							if(res.data.page.page < res.data.page.total_page){
								that.page = that.page + 1;
							}else{
								that.page = 'end';
							}
						}else if(res.code = 403){
							that.util.getSessionKey();
							setTimeout(function(){
								that.getStyleList();
							},1500)
						}
					})
					.catch(res =>{
						console.log(res)
					})
			},
			//点击列表跳转文章
			skipArtDetial(e) {
				let artId = e.currentTarget.dataset.artId;      //获取文章id
				wx.navigateTo({
					url:'/pages/literary/main?id='+ artId
				})
			}
		},
		onShow(){
			this.langua = this.$util.util.prototype.changeLanguage();
//			wx.getLocation({
//				type: 'gcj02',
//				success: res => {
//					this.lat = res.latitude;
//					this.lng = res.longitude;
//					this.getStyleList();
//				}
//			});
			//获取旅游文章
			this.getTourFun();
		},
		onReachBottom(){
			if(this.page != 'end'){
				this.getStyleList();
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
			console.log('下拉刷新')
			var that = this;
		    //模拟加载
		    setTimeout(function()
		    {
		      	wx.stopPullDownRefresh() //停止下拉刷新
		      	that.page = 1;
		      	that.getStyleList();
		    },500);
		}
	}
</script>

<style scoped>
	.cateList .caMsg .subTil .R{
		float: right;
		color: #333333;
	}
	.cateList .caMsg .subTil .L{
		float: left;
		color: #2b2f37;
		width: 450rpx;
	}
	.cateList .caMsg .subTil{
		margin-top: 25rpx;
		font-size: 24rpx;
	}
	.cateList .caMsg .til{
		color: #333333;
		font-size: 32rpx;
	}
	.cateList .caMsg{
		margin-top: 25rpx;
		padding: 0 5%;
	}
	.cateList>img{
		width: 100%;
		height: 420rpx;
		display: block;
	}
	.cateCn>div:last-child{
		margin-bottom: 0;
	}
	.cateCn .cateList{
		background-color: white;
		padding-bottom: 30rpx;
		margin-bottom: 16rpx;
	}
	.cateCn{
		background-color: #F5F5F5;
		margin-top: 30rpx;
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