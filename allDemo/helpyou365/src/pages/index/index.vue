<template>
	<div class="container CnTop CnBtm" :class="[isIphonex ? 'ixPaddCn':'']">

		<div class="head" :class="[isIphonex ? 'ixHead':'']">
			<div>{{langua.proTil}}</div>
		</div>

		<div class="iTop div_float">
			<div class="iTL"><span class="addIcon"></span>{{uLocation.city}}{{uLocation.district}}</div>
			<div class="iTM" :data-c-id='0' @click="goSearch"><span class="seaIcon"></span>{{langua.seaPlace}}</div>
			<div class="iTR">
				<span class="shareIcon"></span>
				<button open-type="share"></button>
			</div>
		</div>

		<!--轮播图-->
		<swiper class="banner" autoplay circular previous-margin="50rpx" next-margin="50rpx">
			<swiper-item v-for='item in bannerList' :key="bannerList" :data-s-type='item.type' :data-goods-id='item.goods_id' :data-article-id='item.article_id' :data-web-src='item.url' @click='bannerSkip'>
				<image :src="item.image" />
			</swiper-item>
		</swiper>

		<div class="menuView">
			<!--滑动菜单-->
			<swiper class="menu" circular @change='menuChange'>
				<swiper-item v-for='(item,key1) in menuList' :key="menuList" class='div_float'>
					<div class="mList" v-for="(item2,key2) in item" :key="item" :data-c-id='item2.id' @click="goSearch">
						<img :src="item2.image" />
						<div>{{item2.title}}</div>
					</div>
				</swiper-item>
			</swiper>
			<!--分页器-->
			<div class="page">
				<div :class="[key1 == mPage ? 'sel':'']" v-for='(item,key1) in menuList' :key="menuPage"></div>
			</div>
		</div>

		<!--推荐-->
		<div class="iCom div_float">

			<div class="icList" v-for="(item,key) in recomMenu" :key='recomMenu'>
				<div>{{item.name}}</div>
				<img :src="item.pic" v-if='key == 0' @click="goLife" />
				<img :src="item.pic" v-if='key == 1' @click="goGeiao" />
			</div>
		</div>

		<!--最新推荐-->
		<div class="newCom" :class="[isIphonex ? 'ixBtm':'']">
			<div class="ncTil div_float">
				<div>{{langua.newRecom}}</div>
				<div :data-c-id='0' @click="goSearch">{{langua.checkMore}}>></div>
			</div>
			<div class="nCCn">
				<!--推荐列表-->
				<comList :comList="comList" @skipDetail="skipDetail" :language='langua' />
			</div>
		</div>

		<!--语言选择弹框-->
		<selLangua :showLan='showLan' @selLangua="selLanguage" />

		<!--公共底部-->
		<allFooter :selType="selType" :isIndex="isIndex" :language="langua" />

		<!--提示下滑-->
		<div class="scrollView" v-if="showUpToast">
			<div class="icon"><span class="upICon"></span></div>{{langua.upToast}}
		</div>

		<!-- 置顶图标 -->
		<div class="gotop" v-show="showGoTop" @click="goTopFun">
			<img src="../../../static/img/scrolltop.png"  alt="">
		</div>
		
		<!--外链-->
		<web-view v-if='showWebView' class="skipView" :src="webSrc"></web-view>


	</div>
</template>

<script>
	import comList from '../../components/comList'
	import allFooter from '../../components/footer'
	import selLangua from '../../components/selLanguage'

	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				bannerList: [], //轮播图
				menuList: [], //二级菜单
				recomMenu: [], //推荐菜单
				mPage: 0, //菜单下标
				comList: [], //推荐列表
				showLan: false, //是否显示选择语言
				selType: 1, //首页标志
				langua: '', //静态文字的与语种
				uLocation: '', //定位信息
				shareInfo: '', //分享信息
				showUpToast: true, //显示提示
				scrollTop: 0, //置顶滚动距离 
				showGoTop: false, //置顶图标显示或隐藏
				isLoading: false, //请求上拉加载前为false
				page: 1, //页码
				showWebView:false,//显示跳转外链框
				webSrc:'',//外链链接
			}
		},

		components: {
			comList,
			allFooter,
			selLangua,
		},
		computed: {
			chooiseLang() {
				return this.$store.store.state.language
			},
			hasSesison() {
				return this.$store.store.state.hasSession
			},
			isIphonex() {
				return this.$store.store.state.isIphonex
			},
		},
		created() {},
		methods: {

			//选择语言
			selLanguage(e) {
				//				var lType = e.currentTarget.dataset.lType;
				//				//也可以换一种方法，这样可以跟踪每一个状态的变化
				//				this.$store.store.commit('changeLanguage', lType);
				//				wx.setStorageSync('hasLanguage', lType);
				this.showLan = false;

				//判断语种
				this.langua = this.util.changeLanguage();

				this.getBanner().then(res => {
					wx.hideLoading()
				});
				this.secondMenu();
				this.lifeMenu();
				this.indexShare();

				wx.getLocation({
					type: 'gcj02',
					success: res => {
						this.homeRecom(res.latitude, res.longitude);
						this.getLocation(res.latitude, res.longitude);
					}
				});

			},
			//菜单切换
			menuChange: function(e) {
				this.mPage = e.target.current;
			},
			//跳转搜索
			goSearch(e) {
				wx.navigateTo({
					url: '/pages/searchResult/main?cId=' + e.currentTarget.dataset.cId
				})
			},
			//跳转生活合集
			goLife() {
				wx.navigateTo({
					url: '/pages/lifeCollect/main'
				})
			},
			//跳转格调美食
			goGeiao() {
				wx.navigateTo({
					url: '/pages/cate/main'
				})
			},
			//点击推荐列表
			skipDetail(e) {
				console.log(e)
				wx.navigateTo({
					url: '/pages/cateDetail/main?goodsId=' + e.currentTarget.dataset.goodsId
				})
			},
			//轮播图跳转
			bannerSkip(e) {
				console.log(e)
				var goodsId = e.currentTarget.dataset.goodsId;
				var sType = e.currentTarget.dataset.sType;
				var articleId = e.currentTarget.dataset.articleId;
				var webSrc = e.currentTarget.dataset.webSrc;

				//跳转商家
				if(sType == 1) {
					wx.navigateTo({
						url: '/pages/cateDetail/main?goodsId=' + goodsId
					})
				}
				// 3：很优惠
				else if(sType == 3) {
					this.goLife();
				}
				// 4：有格调    7.旅游
				else if(sType == 4 || sType == 7) {
					this.goGeiao();
				}
				//跳转到"设置"的"文章"里   5、文章
				else if(sType == 5){
					if(articleId != 0){
						//地址带id跳转到具体的文章
						wx.navigateTo({
							url: '/pages/literary/main?id=' + articleId
						})
					}else{
						//跳文章列表
						wx.navigateTo({
							url: '/pages/helpback/main'
						})
					}
					
				}
				//6、跳外链
				else if(sType == 6) {
					//显示外链窗口
					this.showWebView = true;
					//设置外链
					this.webSrc = webSrc;
				}

			},
			//登陆接口
			async login() {
				await this.$util.util.prototype.getSessionKey()
					.then(res => {
						console.log(res)
					})
			},
			//获取轮播图
			async getBanner() {
				var that = this;
				//				wx.showLoading({
				//					title:that.langua.loadText+'...'
				//				})

				if(wx.getStorageSync('sessionkey') != '') {
					await that.Request.getBanner(wx.getStorageSync('sessionkey'), wx.getStorageSync('language'))
						.then(res => {
							//console.log(res)
							if(res.code == 200) {
								for(var x in res.data) {
									res.data[x].image = that.Request.getUrl() + res.data[x].image;
								}
								that.bannerList = that.util.converJSON(res.data);
							} else if(res.code == 403) {
								that.util.getSessionKey();
								setTimeout(function() {
									that.getBanner();
								}, 1500)

							}
						})
				} else {
					that.login();
					setTimeout(function() {
						that.getBanner();
					}, 1000)
				}

			},
			//获取二级菜单
			async secondMenu() {
				var that = this;
				await that.Request.secondMenu(wx.getStorageSync('sessionkey'), wx.getStorageSync('language'))
					.then(res => {
						//						console.log(res)
						if(res.code == 200) {

							for(var x in res.data) {
								res.data[x].image = that.Request.getUrl() + res.data[x].image;
							}

							var signIndex = 1;
							var allArr = [];
							var signArr = [];
							for(var x in res.data) {
								if(signIndex <= 5) {
									signArr.push(res.data[x]);
								} else {
									allArr.push(signArr);
									signIndex = 2;
									signArr = [];
									signArr.push(res.data[x]);
								}
							}

							allArr.push(signArr);

							that.menuList = that.util.converJSON(allArr);

						} else if(res.code == 403) {
							//							that.util.getSessionKey();

							setTimeout(function() {
								that.secondMenu();
							}, 1500)
						}
					})
					.catch(res => {
						console.log(res)
					})
			},
			//获取优惠列表和格调列表
			async lifeMenu() {
				var that = this;
				await that.Request.lifeMenu(wx.getStorageSync('sessionkey'), wx.getStorageSync('language'))
					.then(res => {
						//						console.log(res)
						if(res.code == 200) {
							for(var x in res.data) {
								res.data[x].pic = that.Request.getUrl() + res.data[x].pic;
							}
							that.recomMenu = that.util.converJSON(res.data);

						} else if(res.code == 403) {
							//							that.util.getSessionKey();

							setTimeout(function() {
								that.lifeMenu();
							}, 1500)
						}
					})
					.catch(res => {
						console.log(res)
					})
			},
			//获取推荐列表
			async homeRecom(lat, lng) {
				var that = this;
				await that.Request.homeRecom(wx.getStorageSync('sessionkey'), wx.getStorageSync('language'), lat, lng)
					.then(res => {
						//						console.log(res)
						if(res.code == 200) {
							for(var x in res.data.list) {
								res.data.list[x].thumbnail = that.Request.getUrl() + res.data.list[x].thumbnail;
							}
							that.comList = that.util.converJSON(res.data.list);

						} else if(res.code == 403) {
							//							that.util.getSessionKey();

							setTimeout(function() {
								that.homeRecom();
							}, 1500)
						}
					})
					.catch(res => {
						console.log(res)
					})
			},
			//获取定位
			async getLocation(lat, lng) {
				var that = this;
				that.Request.getLocation(lat, lng, wx.getStorageSync('sessionkey'), wx.getStorageSync('language'))
					.then(res => {
						//						console.log(res)
						if(res.code) {
							that.uLocation = that.util.converJSON(res.data);
						} else if(res.code == 403) {
							//							that.util.getSessionKey();

							setTimeout(function() {
								console.log('定位')
								wx.getLocation({
									type: 'gcj02',
									success: res => {
										that.getLocation(res.latitude, res.longitude);
									}
								});
							}, 1500)
						}
					})
					.catch(res => {
						console.log(res)
					})
			},
			//获取分享信息
			async indexShare() {
				var that = this;
				await that.Request.indexShare(wx.getStorageSync('sessionkey'), wx.getStorageSync('language'))
					.then(res => {
						//						console.log(res)
						if(res.code == 200) {
							res.data.img = that.Request.getUrl() + res.data.img;
							that.shareInfo = res.data;
						} else if(res.code == 403) {
							//							that.util.getSessionKey();
							setTimeout(function() {
								that.indexShare();
							}, 1500)
						}
					})
					.catch(res => {
						console.log(res)
					})
			},
			
			//回到顶部
			goTopFun(){
				wx.showLoading({
				  title: '',
				})
				wx.pageScrollTo({
				  scrollTop: 0,
				  duration: 200
				})
				setTimeout(function () {
				  wx.hideLoading()
				}, 200)
			}

		},
		onShareAppMessage: function(res) {
			var share = this.shareInfo;
			return {
				title: share.title,
				path: '/pages/index/main',
				imageUrl: share.img
			}
		},
		onLoad() {

			//判断是否有已经选择的语言
			if(!wx.getStorageSync('hasLanguage')) {
				this.showLan = true;
			} else {
				this.langua = this.util.changeLanguage();
				this.getBanner().then(res => {
					wx.hideLoading()
				});
				this.secondMenu();
				this.lifeMenu();
				this.indexShare();

				wx.getLocation({
					type: 'gcj02',
					success: res => {
						console.log(res)
						this.homeRecom(res.latitude, res.longitude);
						this.getLocation(res.latitude, res.longitude);
					}
				});
			}

			//判断显示提示语
			if(!Boolean(wx.getStorageSync('upToast'))) {
				if(wx.getStorageSync('upToast').toString() == '') {
					this.showUpToast = true;
				} else {
					this.showUpToast = false;
				}
			} else {
				this.showUpToast = true;
			}
		},
		onPageScroll(e) {
			var that = this;
			if(e.scrollTop >= 120) {
				//显示回到顶部图标
				that.showGoTop = true;
				that.showUpToast = false;
				wx.setStorageSync('upToast', false)
			}else{
				//隐藏回到顶部图标
				that.showGoTop = false;
			}
		},

	}
</script>

<style scoped>
	
	.skipView{
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 5;
	}
	
	
	/* scrollView回到顶部 */
	
	.scrollEnable {
		position: fixed;
		top: 176rpx;
		bottom: 136rpx;
	}
	
	.gotop img {
		width: 90rpx;
		height: 90rpx;
		position: fixed;
		bottom: 200rpx;
		right: 50rpx;
		z-index: 10;
	}
	
	.scrollView .icon {
		width: 40rpx;
		height: 70rpx;
		line-height: 70rpx;
		display: inline-block;
		vertical-align: middle;
	}
	
	.scrollView .icon span {
		display: inline-block;
		vertical-align: middle;
		width: 35rpx;
		height: 35rpx;
		transition: all .4s;
		transform: scale(1.05);
		animation: upMove .8s infinite;
		margin-top: -10rpx;
	}
	
	.scrollView {
		color: white;
		font-size: 34rpx;
	}
	
	@keyframes upMove {
		0% {
			/*width:25rpx;*/
			height: 35rpx;
		}
		100% {
			/*width:28rpx;*/
			height: 40rpx;
			margin-top: -15rpx;
		}
	}
	
	.scrollView {
		position: fixed;
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
		bottom: 113rpx;
		z-index: 3;
		background-color: rgba(153, 153, 153, .6);
		/*background: -webkit-linear-gradient( rgba(153,153,153,0), rgba(153,153,153,.6));*/
		text-align: center;
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
		width: 250rpx;
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
		margin-top: 20rpx;
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
		margin-top: -5rpx;
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
		width: 100%;
	}
	
	.banner swiper-item image {
		width: 95%;
		height: 100%;
		display: block;
		margin: 0 auto;
	}
	
	.menuView {
		position: relative;
		padding-bottom: 10rpx;
		padding: 0 5%;
	}
	
	.menu {
		height: 235rpx;
		border-bottom: 2rpx solid #E5E5E5;
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
		background-color: #999;
	}
	
	.iCom {
		margin-top: 40rpx;
		border-bottom: 2rpx solid #E5E5E5;
		padding: 0 5%;
		padding-bottom: 40rpx;
	}
	
	.iCom>div:nth-child(1) {
		float: left;
	}
	
	.iCom>div:nth-child(1)>div {
		background-color: #ff4848;
	}
	
	.iCom>div:nth-child(2) {
		float: right;
	}
	
	.iCom>div:nth-child(2)>div {
		background-color: #f68837;
	}
	
	.icList {
		width: 320rpx;
		height: 216rpx;
		border-radius: 8rpx;
		position: relative;
	}
	
	.icList img {
		width: 100%;
		height: 100%;
		border-radius: 5rpx;
	}
	
	.icList>div {
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
	
	.newCom {
		margin-top: 40rpx;
		background-color: #f5f5f5;
	}
	
	.newCom .ncTil {
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 5%;
		background-color: white;
		padding-bottom: 30rpx;
	}
	
	.ncTil>div:nth-child(1) {
		float: left;
		color: #333333;
		font-size: 42rpx;
		font-weight: bold;
	}
	
	.ncTil>div:nth-child(2) {
		float: right;
		color: #333333;
		font-size: 24rpx;
	}
	
	.upICon {
		background: url('data:image/png;base64,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');
		background-size: 100% 100%;
	}
	
	.addIcon {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAnCAYAAACFSPFPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFBQzI5RDAzQUYyOTExRTg4NzdBQTRDODU3QzU0OTZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFBQzI5RDA0QUYyOTExRTg4NzdBQTRDODU3QzU0OTZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUFDMjlEMDFBRjI5MTFFODg3N0FBNEM4NTdDNTQ5NkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUFDMjlEMDJBRjI5MTFFODg3N0FBNEM4NTdDNTQ5NkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz70O5/WAAADgUlEQVR42sSYaUhVQRTHbw8z28wsotUKWmxRKfJLSGliCxR9yIqwKIokW6UgaBXCrCgKW7CiEsoPYlEYhF9steiDWWCGbRQRiJhYtlBmZf+Bc+FwmLnvzvNZB35wn+c/5x5n3pw58yIce+sF5oBkMBn0B7HgD2gBL0E1qARvnC6ybFAKGkGHT26DfDAoXElMA1UeL/wEGkAzzY5O8xXs6GwiezWBH4BCsBKMB31ABOgJRoC5YBcooyT42GtgnG0S3cBNEegOyLCMo5anQMT5BdJsgjwUAQ51coZngUciobF+Bl5hgz6CSWHcBJdZ7B9gpJd4s5iR5CDBx4AFYA1YBBJAIMiYShb/tUk0RSSSatANBWfBK8POeQ+u0y402S2mX68TXGSCnYYgs0GrRZ3ZZIgzimm+SGccaGd1Q2d54kUqqaMgB6ygpcqnCsx1ZwzxzjHNHu44whx5moHTxQtOg4Eey7BV6HM0mijm/8ZrShP9sQ3EaM6iJjZwu8+ds0QkFK/RXGL+pfK/vqoZcID5yyy38lo2tlrjn8r8ats72zymM4JqjTuVUSHUlqcsvq7QVYBakKJqwgTmeCyEaWzZLlChsrUDonxImwcSwf0A9SOutQjhRPZ8N8Sqy3uaGC9hQFTMDs0yudYaYjI/2XO/YMm0sc+Rwt/OnvuG4WzSLbNqO7LAgAA1Rq4NF8J69pwaYgJ8Szdp/OWgBBQHxGGVIIT32NKtCjGZXPb8TNM3Jbm9T4Be6Np8IVZLeJIt0ynLRFazk/8JqBP+Gew7W+v+8S2rBbJ5Vt+j38y/zGciGT4qcCnzL9T1usc0gzJF4I0g2pCE6okXC/0+jS6W/ZOfQXfX0Rt8Z4OdIMdCB9WkIlqKdJqxQrolcF2JIV6513lX5KPnzbXoZRTHPTpEfmL3kILBIlC2IZA6Pk6AD4YEmqkTTPKobS+YPotvLW5q+xazzzPFbpPfjXQ6V6KpoKndcoPuSyZTF8IUen5HXZ/R9ospzAzj7aBS9MrDbAcZm2YLUzWqRsQcYhPgvBi8LsRERtPJ7cZpoEudtRX4bK69rj/8NvGc6kvIVuBzu+quNXxcfWcT4d2Y/N0l0kOfJfRlTphtuXhBjUG3RegquurXq0RR7utEk33Qx5kUVoung43XIlX8DotEdjv/yOI0tYizwfkPVkWz1EYz1Gj7qxS3vwIMAPbaft2jB6bfAAAAAElFTkSuQmCC');
		background-size: 100% 100%
	}
	/* .scroll_top {
		width:70rpx;
		height:70rpx;
		background-color: transparent;
		position:fixed;
		bottom:150rpx;
		right:40rpx;
	}
	.scroll_top .icon {
		width: 70rpx;
	}
	.scroll_top .icon span {
		width: 70rpx;
		height: 70rpx;
		display: inline-block;
		animation: none;
	}
	.topIcon {
		background: url('data:image/png;base64,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');
		background-size: 100% 100%;
	} */
</style>