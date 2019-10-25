<template>  
  <div class="container"> <!--CnTop CnBtm-->

		<div class="iTop div_float">
			<div class="iTL"><span class="addIcon"></span>中山校区</div>
			<div class="iTM" @click="goSearch"><span class="seaIcon"></span>搜索</div>
			<div class="iTR">
				<span class="shareIcon"></span>
				<button open-type="share"></button>
			</div>
		</div>

		<!--轮播图-->
		<swiper class="banner" autoplay circular previous-margin="50rpx" next-margin="50rpx">
			<swiper-item v-for='(item,key) in bannerList' :key="key">
				<image :src="item" />
			</swiper-item>
		</swiper>

		<div class="menuView">
			<!--滑动菜单-->
			<swiper class="menu" circular @change='menuChange'>
				<swiper-item v-for='(item,key1) in menuList' :key="key1" class='div_float'>
					<div class="mList" v-for="(item,key2) in item" :key="key2" @click="goSearchResult">
						<img src="/static/images/cIcon.png" />
						<div>取快递</div>
					</div>
				</swiper-item>
			</swiper>
			<!--分页器-->
			<div class="page">
				<div :class="[key1 == mPage ? 'sel':'']" v-for='(item,key1) in menuList' :key="key1"></div>
			</div>
		</div>

		<!--最新推荐-->
		<div class="newCom">
			<div class="ncTil div_float">
				<div>最新推荐</div>
				<div @click="goSearch">查看更多</div>
			</div>
			<div class="nCCn">
				<!--推荐列表-->
				<comList :comList="comList"  @skipDetail="skipDetail"/>
			</div>
		</div>
		

	</div>
</template>

<script>
import comList from '../../components/comList'

export default {
  data () {
    return {
      Request: this.$api.api.prototype, //请求头
      util: this.$util.util.prototype, //工具类
      bannerList: [
					'/static/images/banner.png',
					'/static/images/banner.png',
					'/static/images/banner.png'
				],
				menuList: [
					[1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1]
				],
				mPage: 0, //菜单下标
				comList:[1,1,1],//推荐列表
				showLan:false,//是否显示选择语言
				selType:1,//首页标志
    }
  },
  components: {
    comList
  },
  methods: {
    //菜单切换
			menuChange: function(e) {
				this.mPage = e.target.current;
			},
			//跳转搜索
			goSearch(){
				wx.navigateTo({
					url:'/pages/search/main'
				})
			},
			//跳转搜索结果
			goSearchResult(){
				wx.navigateTo({
					url:'/pages/searchResult/main'
				})
			},
			//点击推荐列表
			skipDetail(){
				wx.navigateTo({
					url:'/pages/proDetail/main'
				})
			}
  },
  onShareAppMessage: function(res) {
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },

  created () {
  }
}
</script>

<style scoped>
  .language{
		position: fixed;
		top: 125rpx;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0,0,0,.3);
	}
	.language .lanSub{
		position: inherit;
		margin: auto;
		left: 0;
		right: 0;
		top: 300rpx;
		width: 500rpx;
		height: 295rpx;
		background-color: white;
		border-radius: 10rpx;
		color: #2b2f37;
		font-size: 28rpx;
	}
	.language .lanSub>div{
		height: 92rpx;
		line-height: 92rpx;
		border-bottom: 2rpx solid #E5E5E5;
		width: 80%;
		margin: 0 auto;
		text-align: center;
	}
	.language .lanSub>div>span{
		/* display: inline-block; */
		width: 55rpx;
		height: 55rpx;
		vertical-align: middle;
		float: left;
		margin-top: 22rpx;
		margin-left: 121rpx;
		margin-right: 21rpx;
	}
	.language .lanSub>div>div{
		float: left;
	}
	.language .lanSub>div:last-child{
		border: none;
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
		width: 100%;
		background-color: white;
	}
	
	.iTop {
		height: 90rpx;
		line-height: 90rpx;
		padding: 0 5%;
		border-bottom: 2rpx solid #e5e5e5;
	}
	
	.iTL {
		float: left;
		color: #191919;
		font-size: 30rpx;
	}
	
	.iTL>span {
		display: inline-block;
		vertical-align: middle;
		width: 35rpx;
		height: 39rpx;
		margin-right: 33rpx;
	}
	
	.iTM {
		float: left;
		width: 353rpx;
		height: 50rpx;
		color: #191919;
		opacity: 0.6;
		font-size: 30rpx;
		line-height: 50rpx;
		background-color: #efefef;
		margin-top: 19rpx;
		margin-left: 24rpx;
		border-radius: 34rpx;
	}
	
	.iTM>span {
		display: inline-block;
		width: 32rpx;
		height: 32rpx;
		vertical-align: middle;
		margin-left: 21rpx;
		margin-right: 17rpx;
	}
	
	.iTR {
		float: right;
		height: 100%;
		position: relative;
	}
	
	.iTR>span {
		display: inline-block;
		vertical-align: middle;
		width: 38rpx;
		height: 38rpx;
		margin-top: -12rpx;
	}
	
	.iTR button {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 2;
		top: 0;
		left: 0;
		opacity: 0;
	}
	
	.banner {
		margin: 34rpx 0;
		height: 386rpx;
		width: 100%;
		overflow: hidden;
	}
	
	.banner swiper-item {
		width: 670rpx;
	}
	
	.banner swiper-item image {
		width: 95%;
		height: 100%;
		margin:0 auto;
		display:block;
	}
	
	.menuView{
		position: relative;
		padding-bottom: 10rpx;
		padding: 0 5%;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.menu {
		height: 221rpx;
	}
	
	.menu .mList {
		float: left;
		width: 20%;
		text-align: center;
	}
	
	.menu .mList img {
		width: 72rpx;
		height: 72rpx;
		display: inline-block;
		margin-top: 20rpx;
	}
	
	.menu .mList>div {
		color: #323332;
		font-size: 26rpx;
		margin-top: 31rpx;
	}
	
	.menuView .page {
		position: absolute;
		width: 100%;
		bottom: 0;
		text-align: center;
		left: 0;
	}
	
	.menuView .page>div {
		width: 14rpx;
		height: 14rpx;
		border-radius: 100%;
		margin: 10rpx;
		background-color: #DDD;
		display: inline-block;
	}
	
	.menuView .page .sel {
		background-color: #293462;
	}
	
	.icList{
		width: 320rpx;
		height: 216rpx;
		border-radius: 8rpx;
		position: relative;
	}
	.icList img{
		width: 100%;
		height: 100%;
		border-radius: 5rpx;
	}
	.icList>div{
		position: absolute;
		width: 103rpx;
		height: 39rpx;
		border-bottom-right-radius: 20rpx;
		left: 0;
		top: 0;
		color: #ffffff;
		font-size: 24rpx;
		text-align: center;
		line-height: 39rpx;
	}
	.newCom{
		margin-top: 40rpx;
		background-color: #f5f5f5;
	}
	.newCom .ncTil{
		height:80rpx;
		line-height: 80rpx;
		padding: 0 5%;
		background-color: white;
		padding-bottom: 30rpx;
	}
	.ncTil>div:nth-child(1){
		float: left;
		color: #333333;
		font-size: 42rpx;
		font-weight: bold;
	}
	.ncTil>div:nth-child(2){
		float: right;
		color: #333333;
		font-size: 24rpx;
	}
	
	
	
	
	.addIcon {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAnCAMAAACylgF9AAAAllBMVEUAAAApNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGIpNGI2HRc5AAAAMXRSTlMAaPbxmr59JkQM7KluVweGdFvZw7SSYlMyLCIdFxLUzq2Kg0A258mORgPfo5Q6409LPJK/kwAAAdtJREFUOMt9U+lisjAQjAlyVqpyKILgWbX3vP/LfewmXwLVdv5ks1kmuzNBDBGtnvOsbTNvshGPMUnOsJgemvuKUwaGOsdgSP9niY8eWVEG0S2tr34iAeyCUcmU6MNBonlGj+Mg8wJgL8YIOwCOaQeo6r7FBJC1iZ8AnEy8+S5X1c11sNTR2l7ceEsQPvOTLZpw8AboMa8KFk+aFVC01v1qx1eXyaI8EJvHOU9/fzE0H3SwFYw5zCUpIPslhqSTKAbmdqQZzW0amdHnO9r0miVD84AXHojSc816U5CpGKA1RHn7ITytTQi8iyEWdInTONA6rsbvgPhdzUZP4iw1jcwHplSPeNZGx3qxJXmuup/iYT8dcjHRnCmrPX4uFa2kQQVMKS7Gg5VAR+uRXXkFGiZyw/LVCEy7X2zlhXYrcjvS/xBZcaBoC6i0T0hAGDcQe2U4K2IAb5zLuVv2f2/eo0Nh3o9xqMF/SYP3noHZ1ry/LYGFmcH9JdGXvz/MItN5BrzSajqRVuXRT/dZu529ziHqQKo4eHdFm163s7XZDu4NLVXAcsvhuMi5egWX/MQ3gGlqTUcyPnYHnRUzFw9RxUDbO7lnt35BoAAZUokvfkVNQrEMfyFTUp6P49w/ks5LSyLy2hcAAAAASUVORK5CYII=');
		background-size: 100% 100%
	}
</style>
