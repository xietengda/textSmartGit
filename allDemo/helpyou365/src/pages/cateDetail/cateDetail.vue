<template>
	<div class="container CnTop CnBtm"  :class="[isIphonex ? 'ixPaddCn':'']">

		<div class="head" :class="[isIphonex ? 'ixHead':'']">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div class="headText">
					<div :class="[sType == 1 ? 'sel':'']" @click="changeType" data-s-type='1'>{{langua.cadBaseText}}</div>
					<div :class="[sType == 2 ? 'sel':'']" @click="changeType" data-s-type='2'>{{langua.cadMirror}}</div>
				</div>
			</div>
		</div>

		<!--基本情报-->
		<div v-if="sType == 1">
			<div class="detailCn">
				<!--轮播图-->
				<swiper class="banner" autoplay interval="5000" circular>
					<swiper-item v-for="item in bannerList" :key='bannerList'>
						<image :src="item" class="slide-image" />
					</swiper-item>
				</swiper>

				<!--基本信息-->
				<div class="detaMsg">
					<div class="til">{{merInfo.goods_name}}<span class="yh" v-if='merInfo.recommended == 1'>{{langua.iDiscount}}</span></div>
					<div class="MsgLi" @click="checkMap"><span class="sAddIcon"></span>{{merInfo.location_text}}<span class="map_g_icon"></span><label class="mapTil">{{langua.checkMap}}</label></div>
					<div class="MsgLi"><span class="moneyIcon"></span>{{langua.imean}}：{{merInfo.price}}{{langua.iUnit}}</div>
					<div class="MsgLi">
						<span class="two timeIcon"></span>{{langua.cadBusiness}}：{{merInfo.workhours}}
					</div>
					<div class="MsgLi"><span class="phoneIcon"></span>{{langua.cadPhone}}：
						<label v-for="(item,key) in phoneList" :key="phoneList" :data-phone='item' @click="telPhone" v-if='key+1 > 1 && key+1 < phoneList.length'>{{item}}丨</label>
						<label v-for="(item,key) in phoneList" :key="phoneList"  :data-phone='item' @click="telPhone" v-if='key+1'>{{item}}</label>
						<span class="red_phone" @click="showPhoneFun"></span><label @click="showPhoneFun">{{langua.telPhone}}</label>
					</div>
					<!--折扣优惠-->
					<div class="discount">
						<div class="disSub">
							<div class="til">{{langua.cadDis}}</div>
							<div class="subTil">{{merInfo.recommended_text}}</div>
							<div class="disCn">{{merInfo. recommended_subtext}}</div>
							<div class="disCn">{{langua.disRemark}}</div>
						</div>
					</div>
					<!--商家的故事-->
					<div class="deStory">
						<div class="til">{{langua.cadHistory}}</div>
						<!--<rich-text :nodes='merInfo.content' />-->
						 <wxParse v-if='merInfo.content' :content="merInfo.content" :imageProp='{domain:webUrl}'/>
					</div>
				</div>

				<!--底部-->
				<div class="detaBtm" :class="[isIphonex ? 'ixBtm':'']">
					<div>
						<span class="shareIcon_w"></span>
						<button type="text" open-type='share'></button>
					</div>
					<div><span :class="[collect == 1 ? 'collectIcon':'collectIcon_w']" @click="collectFun"></span></div>
					<div><span class="mapIcon" @click="checkMap"></span></div>
					<div><span class="bigPhone" @click="showPhoneFun"></span></div>
					<div>
						<span class="errorIcon"></span>
						<button open-type='contact'></button>
					</div>
				</div>
				
				<!--电话-->
				<div class="phoneList" v-show="showPhone" :class="[isIphonex ? 'ixPhoneList':'']">
					<div v-for="item in phoneList" :key='phoneList' :data-phone='item' @click="telPhone">{{item}}</div>
					<div  @click="showPhoneFun">{{langua.cadCancel}}</div>
				</div>

			</div>
		</div>

		<!--写真-->
		<div v-if="sType == 2">
			<div class="atlatView" v-if='atlasList.length != 0'>
				<div class="atlasList" v-for="(item1,index1) in atlasList" :key="item1">
					<div class="til">{{item1.name}}</div>
					<div class="atlasCn div_float">
						<div class="list" v-for="(item2,index2) in item1.pic" :key='item2'>
							<img mode='aspectFill'  :src="item2"  :data-o-index='index1'  :data-t-index='index2' @click="prePhoto" />
						</div>
					</div>
				</div>
			</div>
			
			<div class="atlasNull" v-else>
				<div class="icon nullPhoto"></div>
				<div class="til">{{langua.cadNoMirror}}</div>
			</div>
		</div>
		
		<!--回首页图标-->
		<goHome :isShowHome='isShowHome' />
		
		<!--语言选择弹框-->
		<selLangua :showLan='showLan'  @selLangua="selLanguage"/>

		<!-- 置顶图标 -->
		<div class="gotop" v-show="showGoTop" @click="goTopFun">
			<img src="../../../static/img/scrolltop.png"  alt="">
		</div>
		
	</div>
</template>

<script>
	import goHome from '../../components/goHome'
	import selLangua from '../../components/selLanguage'
	import wxParse from 'mpvue-wxparse'
	import scrollTop from '../../components/scroll_top'
	
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				sType: 1, //显示类型  1基本情报  2写真
				bannerList: [],
				phoneList:[],
				showPhone:false,//是否显示电话列表
				collect:0,//收藏 0：未收藏  1:已收藏
				atlasList:[],//店面写真
				langua:'',//静态文字的语种
				merInfo:'',//商家详情
				shareMsg:'',//分享信息
				isShowHome:false,//是否显示返回首页按钮（不属于正常情况进去都返回首页）
				showLan: false, //是否显示选择语言
				goodsId:'',//商家id
				webUrl:this.$api.api.prototype.getUrl()+'upload/',//富文本图片ip
				showGoTop: false, //置顶图标显示或隐藏
			}
		},

		components: {
			goHome,
			selLangua,
			wxParse,
			scrollTop
		},
		computed: {
			isIphonex(){
                return this.$store.store.state.isIphonex
            },
			showHome(){
				return  this.$store.store.state.showGoHome;
			}
		},
		methods: {
			//返回
			goBack() {
				wx.navigateBack();
			},
			//切换类型
			changeType: function(e) {
				this.sType = e.currentTarget.dataset.sType;
			},
			//出现拨打电话
			showPhoneFun(){
				var sign = true;
				
				if(this.showPhone){
					sign = false;
				}
				this.showPhone = sign;
			},
			//拨打电话
			telPhone(e){
				console.log(e)
				var that =this;
				var phone = e.currentTarget.dataset.phone;
				wx.makePhoneCall({
					phoneNumber:phone,
					success:function(){
						that.showPhone = false;
					}
				})
			},
			//点击收藏
			async collectFun(e){
				var that = this;
				
				//判断是否登陆
				await this.util.judgeLogin();
				
				that.Request.collectPost(wx.getStorageSync('openid'),1,that.merInfo.goods_id,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						if(res.code == 200){
							//未收藏
							if(that.collect == 0){
								wx.showToast({
									title:that.langua.collAdd
								})
								that.collect = 1;
							}
							//已收藏
							else{
								wx.showToast({
									title:that.langua.collCancel
								})
								that.collect = 0;
							}
						}else if(res.code == 403) {
							that.util.getSessionKey();
						}
					})
					.catch(res =>{
						console.log(res)
					})
			
				
			},
			//查看地图
			checkMap(){
				var that = this;
			    const latitude = parseFloat(that.merInfo.lat);
			    const longitude = parseFloat(that.merInfo.lng);
			    wx.openLocation({
			      latitude:latitude,
			      longitude:longitude,
			      name:that.merInfo.goods_name,
			      address:that.merInfo.location_text,
			      scale: 28
			    })
			},
			//预览图片
			prePhoto(e){
				var oIndex = e.currentTarget.dataset.oIndex;
				var tIndex = e.currentTarget.dataset.tIndex;
				var atlasList = this.atlasList;
				var signArr = [];
				
				for(var x in atlasList[oIndex].pic){
					signArr.push(atlasList[oIndex].pic[x])
				}
				
				wx.previewImage({
					current:signArr[tIndex],
					urls:signArr
				})
			},
			//获取商品详情
			async getMCDetail(goodsId){
				wx.showLoading({
					title:this.langua.loadText+'...',
					mask:true
				})
				var that = this;
				await that.Request.getMCDetail(goodsId,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							for(var x in res.data.detail.cover_pic){
								res.data.detail.cover_pic[x] = that.Request.getUrl() + res.data.detail.cover_pic[x];
							}
							
							for(var y in res.data.imgs){
								for(var  k in res.data.imgs[y].pic){
									res.data.imgs[y].pic[k] = that.Request.getUrl() + res.data.imgs[y].pic[k];
								}
							}
							
							//让图片自适应屏幕
//							res.data.detail.content = res.data.detail.content.replace(/\<img src="/gi, '<img style="max-width:100%;height:auto;display;block;margin:20px 0;" src="'+that.Request.getUrl()+'/upload/');

							//让图片自适应屏幕
							res.data.detail.content = res.data.detail.content.replace(/\width="410" height="335"/gi, '');
							//让图片自适应屏幕
							res.data.detail.content = res.data.detail.content.replace(/\ style="white-space: normal; width: 410px; height: 335px;"/gi, '');
								
							console.log(res.data.detail.content)

							
//							console.log(res.data.detail.content);
							
							//设置分享信息图片
							res.data.share.img = that.Request.getUrl() + res.data.share.img;
							
							
							that.collect = res.data.detail.is_collect;
							that.bannerList = res.data.detail.cover_pic;
							that.phoneList = res.data.detail.phone;
							that.atlasList = res.data.imgs;
							that.merInfo = that.util.converJSON(res.data.detail);
							that.shareMsg  = that.util.converJSON(res.data.share);
							console.log(res.data);
						}
					})
					.catch(res =>{
						console.log(res)
					})
			},
			//选择语言
			selLanguage(e) {
				this.showLan = false;
				//判断语种
				this.langua = this.util.changeLanguage();
				
				//判断是扫码进入 (扫码进入)
				if(this.$root.$mp.query.scene != undefined){
					console.log('扫码进入')
					var scene = decodeURIComponent(this.$root.$mp.query.scene);
					var goodsId = scene;
					this.getMCDetail(goodsId).then(res =>{wx.hideLoading()});
				}
				//还是正常进入
				else{
					console.log('正常进入')
					var goodsId = this.$root.$mp.query.goodsId;
					this.getMCDetail(goodsId).then(res =>{wx.hideLoading()});
				}
		
		
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
			var that = this;
			var sTil = that.shareMsg.title || that.merInfo.goods_name;
			var img = that.shareMsg.img || that.merInfo.cover_pic[0];
			return {
				title: sTil,
				path: '/pages/cateDetail/main?goodsId='+that.merInfo.goods_id,
				imageUrl:img
			} 
		},
		onShow(){
			var that = this;
			
			var scene = that.$mp.appOptions.scene;
			var signArr = [1007,1008,1011,1012,1013,1044,1047,1048,1049];
			
			if(that.showHome){
				//也可以换一种方法，这样可以跟踪每一个状态的变化
				that.$store.store.commit('changeShowHome', false); 
				
				console.log(signArr.indexOf(scene) != -1 +'是否显示')
				
				if(signArr.indexOf(scene) != -1){
					that.isShowHome = true;
				}else{
					that.isShowHome = false;
				}
			}else{
				that.isShowHome = false;
			}
			
			
			//判断是否有已经选择的语言
			if(!wx.getStorageSync('hasLanguage')) {
				this.showLan = true;
				
			} else {
				this.langua = this.$util.util.prototype.changeLanguage();
				
				//判断是扫码进入 (扫码进入)
				if(that.$root.$mp.query.scene != undefined){
					console.log('扫码进入')
					var scene = decodeURIComponent(that.$root.$mp.query.scene);
					var goodsId = scene;
					this.getMCDetail(goodsId).then(res =>{wx.hideLoading()});
				}
				//还是正常进入
				else{
					console.log('正常进入')
					var goodsId = this.$root.$mp.query.goodsId;
					this.getMCDetail(goodsId).then(res =>{wx.hideLoading()});
				}
				
			}
			
		
			
		},
		onHide(){
			//也可以换一种方法，这样可以跟踪每一个状态的变化
			this.$store.store.commit('changeShowHome', true); 
		},
		onUnload(){
			this.sType = 1;
			//也可以换一种方法，这样可以跟踪每一个状态的变化
			this.$store.store.commit('changeShowHome', true); 
			this.collect = '';
			this.bannerList =  '';
			this.phoneList =  '';
			this.atlasList =  '';
			this.merInfo =  '';
			this.showPhone = false;
		},
		onPageScroll(e) {
		 	console.log(e)
			var that = this;
			if(e.scrollTop >= 120) {
				//显示回到顶部图标
				that.showGoTop = true;
			}else{
				//隐藏回到顶部图标
				that.showGoTop = false;
			}
		},
	}
</script>

<style scoped>
	@import url("~mpvue-wxparse/src/wxParse.css");
	
	.gotop img {
		width:90rpx;
		height:90rpx;
		position: fixed; 
		bottom: 150rpx; 
		right:50rpx; 
		z-index: 10;
	}
	.disCn{
		color: #666;
		font-size: 26rpx;
	}
	.wxParse image{
		max-width: 100%;
		height: auto !important;
		border: 1px solid red;
	}
	.atlasList .atlasCn img{
		width: 210rpx;
		height: 210rpx;
		display: inline-block;
	}
	.atlasList .atlasCn .list{
		display: inline-block;
		width: 33%;
		font-size: 0;
		text-align: center;
		margin-bottom: 10rpx;
	}
	.atlasList .til{
		color: #333333;
		font-size: 32rpx;
		margin-bottom: 20rpx;
		padding: 0 1%;
		margin-top: 30rpx;
	}
	.atlatView{
		margin-top: 30rpx;
		padding: 0 5%;
		font-size: 0;
	}
	.phoneList>div{
		width: 480rpx;
		height: 80rpx;
		border-radius: 10rpx;
		color: #ffffff;
		font-size: 30rpx;
		background-color: #333333;
		color: white;
		font-size: 32rpx;
		text-align: center;
		line-height: 80rpx;
		margin: 0 auto;
		margin-bottom: 10rpx;
	}
	.phoneList{
		position: fixed;
		bottom: 112rpx;
		width: 100%;
	}
	.ixPhoneList{
		bottom: 185rpx;
	}
	.detaBtm>div button {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		opacity: 0;
	}
	
	.detaBtm>div span {
		display: inline-block;
		vertical-align: middle;
		width: 42rpx;
		height: 42rpx;
		background-size: 100% 100% !important;
	}
	
	.detaBtm>div {
		width: 20%;
		display: inline-block;
		position: relative;
	}
	
	.detaBtm {
		height: 100rpx;
		line-height: 100rpx;
		position: fixed;
		width: 90%;
		padding: 0 5%;
		bottom: 0;
		background-color: #333333;
		text-align: center;
	}
	
	.deStory .storeCn {
		color: #666666;
		font-size: 26rpx;
		line-height: 40rpx;
		margin-top: 20rpx;
	}
	
	.deStory .til {
		color: #333333;
		font-size: 32rpx;
	}
	
	.deStory {
		margin-top: 35rpx;
	}
	
	.detaMsg .subTil {
		color: #ff4444;
		font-size: 26rpx;
	}
	
	.detaMsg .til {
		color: #333333;
		font-size: 32rpx;
		font-weight: bold;
	}
	
	.detaMsg .disSub {
		display: inline-block;
		vertical-align: middle;
		line-height: 50rpx;
	}
	
	.detaMsg .discount {
		line-height: 150rpx;
		margin-top: 38rpx;
		border-top: 2rpx solid #E5E5E5;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.detaMsg .mapTil{
		color: red;
	}
	.detaMsg .MsgLi span {
		display: inline-block;
		vertical-align: middle;
		width: 25rpx;
		height: 25rpx;
		margin-right: 25rpx;
		margin-top: -5rpx;
		background-size: 100% 100%;
	}
	.detaMsg .MsgLi span:nth-child(2),.detaMsg .MsgLi .red_phone{
		margin-left: 10rpx;
		width: 30rpx;
		height: 30rpx;
	}
	.detaMsg .MsgLi label:last-child{
		color: #F90000;
	}
	.detaMsg .MsgLi {
		color: #333333;
		font-size: 26rpx;
	}
	
	.detaMsg .til {
		color: #333333;
		font-size: 32rpx;
		font-weight: bold;
	}
	
	.detaMsg {
		padding: 0 3%;
		margin-top: 38rpx;
		line-height: 60rpx;
		padding-bottom: 70rpx;
	}
	.yh {
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
		margin-left: 10rpx;
	}
	
	.banner image {
		width: 100%;
		height: 100%;
	}
	
	.banner {
		width: 100%;
		height: 443rpx;
	}
	
	.detailCn {
		margin-top: 37rpx;
	}
	
	.headText .sel {
		color: #F90000 !important;
		border-bottom: 2rpx solid #F90000;
	}
	
	.headText>div {
		display: inline-block;
		line-height: 78rpx;
		text-align: center;
		line-height: ;
	}
	
	.headText>div:nth-child(1) {
		margin-right: 80rpx;
	}
	
	.headText {
		display: inline-block;
		color: #333333;
		font-size: 32rpx;
	}
	
	
	/*金钱袋*/
	
	.moneyIcon {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAZCAYAAADaILXQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVFMDlERDBBQjY2MDExRThCNDVDODQ5QUVGMUFENUIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVFMDlERDBCQjY2MDExRThCNDVDODQ5QUVGMUFENUIwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUUwOUREMDhCNjYwMTFFOEI0NUM4NDlBRUYxQUQ1QjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUUwOUREMDlCNjYwMTFFOEI0NUM4NDlBRUYxQUQ1QjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7mKhw8AAACDklEQVR42qSVTUhVQRTH3335ASnpQirEDyikQJOiRRQmqAgaD6OF7UJwKy01FUnwA3LhomW0MGwRpSj6nlabUCtIFI0WLty1MH1aZGGlZNnvwBEu8ubOvDzwg3dnzvxn5pwz53nRaDTkaO+gH4b8g5FIxLgg7ChcCZfgqW/Mg+xYLOYlK14NHXBGv9t8gs+gFz7COqSbxFMM4+egWxGRQt9cve+3hGgn2ZPfh7j+LjT4LMNNYr6XrPgfuG7Jwz1booISOgudAfOfbOIplvkuOAE3IAO2NBxv4OVhxa9pUpsSzN3SzUb/JywPYAJW4DkMwjC8h7/6PUKdd5gEPMMLnYTakLu9kBKlcraCTn4EppMUFquBJW5xIUh8CsoTLO7W3iL2GVoT+OTDHBucTiTeB2WGk8krvAxvoRQWDX5y85mD4rJbi2HBhta7VMc4XNEGtmbwz+X0nf6EvoIKg/MdeAKnYBVOagXJTR4H5CFT6jw3QFisB+7CV43rQ7jo8kbCFmGxbfgJPyBV4/9LCbLzsvtxi1OPXl96+a7GXhJXpQ/JZGki/s0i3g634bucBh5BCRy1rFsV8Q8WpyxFTv0bCiDP4WG9lpjPwxcHZ4l7Eew5+MZpBXP7dd7gsOCYtttiB99G/yOa0IHN0OGtmVNPHuznAzAGdXAVzkKO/kl4hnCENRdxbQ2DCC/sT/4TYADnV3oJE5PK8AAAAABJRU5ErkJggg==');
	}
	/*时间*/
	
	.timeIcon {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZCQTk2NUJCQjY2MDExRThCMEQxOEIzNzlCMzM0M0JFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZCQTk2NUJDQjY2MDExRThCMEQxOEIzNzlCMzM0M0JFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkJBOTY1QjlCNjYwMTFFOEIwRDE4QjM3OUIzMzQzQkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkJBOTY1QkFCNjYwMTFFOEIwRDE4QjM3OUIzMzQzQkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4LJJ4/AAABoElEQVR42qyVTShEURTH35uGxM7WVywQSfnaoCZ25rGwUKZkZRbsyM5CsbKwtKAsaBZoFG/KSpMyFmRhUpKUlVJSNEMWyv/ovLpe1733mTn1600z5/7emfvuOc92XddSRAxEQSeoA2UgD+5BBuw5jpOWLbT/EJNwCTRY+jgGs7hBVvwyJElcBwlDKcUguEqlUhMq8Q6YUkg+FL9tQR6TiefBmGLhNKgGz4qcBOSNorgKrGj+Mu3hC3jS5O2K4kWDvazka6kmrx1VR0hcAsat4kacxF2gIsAi2yCnj8RthsIvvtYb5NaE+MGZRJ6vk+BRl0zinKGYjmMzNw8VEwc3KvGdoTjKoiToABugBQyBE19ujsTnAZ/4KLgEp2AEM+IIRPB5U8i5DvN+XYDugDfoBQc4s7c05XgCepH0GmS5gDPbBBaoMcRB5okPuepixBy25k0cQsPgs0BpGtJV/3Sj4dID3v8pzfBs/omwZIK1gm1qywDSNVQ6o3uDPIB+7rAzzdDfpwL8UlnFv94IXPkAH6VaUA5euanoHGchlS7+FmAAADBcw0bSMsgAAAAASUVORK5CYII=');
	}
	/*电话*/
	
	.phoneIcon {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkY1QUNDOTNBQjY2MDExRThBMjc1RTRBQ0RCQkM5OTE5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkY1QUNDOTNCQjY2MDExRThBMjc1RTRBQ0RCQkM5OTE5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjVBQ0M5MzhCNjYwMTFFOEEyNzVFNEFDREJCQzk5MTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjVBQ0M5MzlCNjYwMTFFOEEyNzVFNEFDREJCQzk5MTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz60Yp/pAAAB1klEQVR42qyVSyhEURjH7xwijUgojyQWkqxYYaOxvRoWSFmoSV6NjUdKpqQUsRMRNc1yJJtZyo5Rys7WaErKQqE8ZjD+3/RdXbczd+bemX/9Ovfe853/uef1HUcikVBkCoVCAoULjIJOUAWKwDt4AOcgAM7Aj8zDITOHsYpiD9Qo6XUPJqiZqTlMC1AEgVuxriMwAmLah3yD8QVoV+xpgEfq0joQuspgFsaauoBfexG6OXYrudEw6Eua867wS4K+wQzYttHBPnnTnA+CckNlHHTzGpAqwZAFc4rvEfx3Rj3pjEnLNv6+n8xbJBUVoJqfS8CWDfMOMi+WVOSBcX52gl4b5g2CjWRa5HNAR33KhnmpSJUXoEI+daRdcGDR/JnMP0wCaL/u8PMYj0bTGjg2aRuhYUdBs0nQJHgDc2AdXFFmVFU1zAdwA8W8pN2l4GOfTrM8LU5OsWGtAp0spGhzQuar4CuDDjzgFkyDMl3CC0hiaapPkykXAT68rFhYrFdwDepAo6R+idbkL5+jgzsU9TlIXDeg1Zhym8BLlsaPoO1fyuWFoQRfywF2FOVpiqW7Qw/5YhYZmMb5vvUaK6SNMQoP3/Z0gCL6v2F98s7Z5O3plfn8CjAAX2V7IxMvx1QAAAAASUVORK5CYII=');
	}
	/*地图*/
	
	.mapIcon {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAsCAYAAAATmipGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBFQzUxNDhBQjY2MjExRThBMUVFOTdDMUNEQUYwN0EyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBFQzUxNDhCQjY2MjExRThBMUVFOTdDMUNEQUYwN0EyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEVDNTE0ODhCNjYyMTFFOEExRUU5N0MxQ0RBRjA3QTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEVDNTE0ODlCNjYyMTFFOEExRUU5N0MxQ0RBRjA3QTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7H2gH3AAAEMElEQVR42syZV2gUQRzG987EEluU2NGgUVATBYkoFkTFgvVBgogiig1FiQ8WogRfRGMFRbFhRbAgPlgRK3bsii2oUTEBEyGaxMTE3F3iN/gtDOPe3u3O5swffmRnbvb2uyn/svFVV1cbGtYUzAJjQR/QDHwB98FxcC/SF8THx0f1IJ+G0OlgC+hgM+YAyAaF/0vofjA3yrFlYBB4oyPU70Lk+jAiP4LXoFTpbwEeglY6e8yp0O5gldJ3E6SDFJAGOoMsi728XUeo06VXl/w8mBRm7EhwTelL5mGr06VPVESKX5hhM/462KX0LY7F0g9Q2ifB7wj3CK9QI7UHxkJoR6X9OIp7PoFyqZ0UC6EVFvstkrUGCVL7ZyyEvlPaM6O4Zx6Ik9rvdU/9ZDCFriXAzxrwwEzlbPrpK+WZXAPWhvnuJJ7wJlKf+K5TvJ4DZkjP+ycWgGJwDp7hqBCaId1sZSt4KITNBoeUz7fRt1ZJfWPAYSW85oJeUrvWwYQuF0I/0FkLK+GvMJ2bj9FmIggxypRafNFXcBFUgt70oaotBHt5ncJAEbIYF2Jy00bqqxRCg1xmIWgwY7NsLXkITDcjIkymi23WQjpMzejaAlYOPxAINGa0Owa6gKCfs2DG6jKLB5QqvjA7zKzaWZZy4stt9qaIVlXgLi7PmDPql/ZKQpQPFQ/c6kBkEdhoaJrf5X2HHByG3Rr64nSFFnALRDKxDzcYHphf494cLqudzY8iH6hzoWLpN9l8/h0c1dRX8s8ecGk7wTKLhMVgvyODWxJ6eoC2nMQ0r4SaOalabT5gZIpW4FyGcOE723m99KaJ0viORYXqxKaB8eFEqkJDGmIzlfLkY4TxS8ERqb3anFyuxjF6lVtWS+/TEPoMnGUWtijC2NlMZAyG7U0spcVLjOeISN+kLdEIf4apMzqEg93aEu7XApsxQ5XsawRDZgW4LItUKwJZqAihl+j73Fg+OG3zeVdwVUkfx+n40X18b+QzvDORIp0AjaRgscWtw3/LYsw8hS9ZHjf3QGgHqYq9Ih0eV0KFL+wJnrCdyhcOnTwQms/ku5izqRVCe9CB92cikU+3kystn1NbwOgiwu0FZvb3dYXKiayogbqBHVJfHsuNaPZua5Yde3mAkqUkvMrrpCQoXR9khTqOJa/YY/2U8aJ8GM6qNI+zaTDajI9V9iTX42L51oGnfFvSUTqANxhREhU3tCdWQnNY6m5W6qp0KfTelvo/s1xJpRuq1RXqJHsSh2olRc+h62ooJc95nLlXfItXa3hobtK8H5wtQXuW2iEeskVGHZluPlro8s2Hqz1q7tNfRv2zMnlGm/I6mUsZ4HLGxJDKWXXXUFsq283FK51HjEam0w96lPnrmCnUjIZFQmhfXLww6rdNMN+PjgajjL//CwrWE3FxfH30EAn1yT8CDAAgxwwzCZXVTgAAAABJRU5ErkJggg==');
	}
	/*大电话icon*/
	
	.bigPhone {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAmCAYAAAClI5npAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE1MUFBRkU3QjY2MjExRTg5QTU4RjYwNUQ3NDk3MEY0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE1MUFBRkU4QjY2MjExRTg5QTU4RjYwNUQ3NDk3MEY0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTUxQUFGRTVCNjYyMTFFODlBNThGNjA1RDc0OTcwRjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTUxQUFGRTZCNjYyMTFFODlBNThGNjA1RDc0OTcwRjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4X3mvrAAADZ0lEQVR42rSYW0gWQRTHPz/MqCTMUsIghC6mlpVkkfkQRWaEvpTdnqIXu1g91Es9RPoQFHSFjETwISh76GJBgUVlJoRJJWmpXSyMbkZk8EUGtZ0D/5HTMrO707cN/Ph2ds6Z/e/ZOWdGExzHiWhaCZFPFBHpRBLxkrhInImE2ViAYDRxwfFuB1w+cZEgIjCeaCWy0K9D/xv6xUQFrtcTDWFH4JF4y2UGxfUYHwgrAupiLSb+QSz2cYrBdqOPXToRDSpAvf2RAKpVFDo8bIph008cJWZ7CZgnQp8XQEChsM802JRpFu91IkMnoBoGzwN+txHiM6zwsJtBVBItQsRnROcvAVcwWGuxeB7DpzygfT7RJ4QsUWNRSoQMJES/RfLE8JtoGOc0PUGsJvgZD4lcohPjTcQ0lYa9ULXdIgI9PhH4Lt72I9YE3x8pInFfRcDxeRt3SyWm4PqDwYaLWQ3xFqW8kSglhlDmuS0gClhVGxRVBXz7alEzkgzfO1X020U0UnCvGf0m7lxCp97nwaXEQTHZDo3NTDFeL7KmC/d2u9OUO4dw3ebx8EpXTjcb7CYRT4RdA+6vQ/8B+onELyVgFQZ/ukKnmCgmbCS2GUIv2SR8ZGS+CJs+NZgmjMs0k2WL8XEWmSIFzBcvqcaf8g3OggGiBSszW7Oie4lnuD5lUSvY5x2u+beHOIx+yvCzoGYXFN4JUNuTA0YgigWoGxtLvOZPom4sFA+YbnB6gfFjIZ0FWGCy6vDJ6A0eUGdw2ClETg77QMJs0BQMN50Yv/w/BETwXRy8rc5hlk/GROMVsAeTx7Bx6JzOCxGjcG8pasR7nJRqkXrWAlJwaOB23ODERahb1XLsIaZ2jVhkI0BWxt8eKVegedg9fJbNxF3XWIWNAHlIbUeG6GyWE+eIm8RWw/gNIaLKRkCucNwf50q/KuYqDyqA2SIcV8Yp4qSYKyuoAOaWcJwapwhV6G7bCBjetZAdmXEImKPbVYM4csi+wvGT7o8LC9R+UiSP5X6Nt9EcYpBII7qJwn/8W3gIv2NM/x/wIk/sBQ5ORjb+a4TvBJtPIOGa0Com4gU1N6B41U7bLkIde12V7izOge4zJff3EYOidEfCEMDkuNJUtS6U5Q7X/U5dVQ1jTy8hakSeu9srRExb0v8IMAB2Ox35i3hx+gAAAABJRU5ErkJggg==');
	}
	
	
	/*地图灰色*/
	.map_g_icon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAsCAYAAAATmipGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUU2OTY0NjlENjg5MTFFODgyMjlBQzdDMDE2MjBDMjgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUU2OTY0NjhENjg5MTFFODgyMjlBQzdDMDE2MjBDMjgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkZBREM4QUFENUFFMTFFOEJFNjQ4QTM0ODhCM0ZCMjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkZBREM4QUJENUFFMTFFOEJFNjQ4QTM0ODhCM0ZCMjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6M+HVIAAAEL0lEQVR42sxZWWwNURieXq2uKLGV0FiaoEiEEEsEscT6ICJChNhCSD1YUtJ4EUpVQogt1kgsEQ/WiDXWxk6sQRFtopWgrVbLvbf1nfgmOTnmzr0zZ3r1T77cOWfOzHz9z7+exvgTEgwNSQZmAWOAXkAK8AkoAI4Cd8K9ILa6OqIPxWgQnQ7kA2k2a/YBOUDJ/yK6F5gb4doKYCDwUoeozwXJ9SFIvgdeAOXKfFPgHtBcx8acEu0KrFLmrgN9gS5AT6ADkG1hy1t1iDrdenXLzwITQ6wdAVxR5tLpbPW69akKyd/AFJv1V4EdytziaGx9f2V8HPgV5hkRFWql8YBoEG2njB9E8MwHoFIat4wG0SoLewsnLYAkafwjGkTfKOOZETwzT/iLNH6r6/WTgMkMLX7ea0SHmUpt+hgrZU2uAdaGeHdLeniiNCfedYLXc4AZ0vdUiQO+AmcQGQ4LolOkh61kBZ1CyGzggHJ/C2NrjTQ3GjiopNfXQHdpXOdAocsF0XcM1kLK+FfEmRpntpkABJllyi1e9Bk4D4ig2IMxVJWFwG5ed2GiCFqsC7K4aSXNVQuiAW6zIDSIuVmWZnQCM8yIDJPlwsyaSs6UwtDmtwr4gcTEBGa7I0BHMeWjFsxcXWHxgXIlFuaE0KqdZCseX2ljmyJb1QC3cXnK1KhPspWkCD8qPrjZAclSYKOhKT6Xzx1w4Aw7NfjF6hItpgmEE2GHGwwPxKfxbC631U7mR1AP1DtRsfV5Nve/AYc1+ZX9YwMuZTuwzKJgMTjvSBCWBJ8MoDWV2NMromZNqnabd5mZIiU4lylcxM42Xm+9KaI1vmXRoTqRacC4UCRVokENsllKe/I+zPqlwCFpvJq/fu7GEUaVG1ZbH6NB9DFwmlXYojBrZ7OQMZi289hKi0OMJ8hIXySTiMfPUFWjg7nYrSyhvRbbrBmiVF/DmTKrgIsySbUjkImKFHqBsc+NFAEnbe53Ai4r5eNYnTi6h+dGMYZ3IsrGY0C8lCzy3Qb8V2zGTC98xva4iQdE06Qu9pLkPK6IiljYDXjIcSYPHNp7QLSIxfdXalMrhWYwgPdjIVHEsPNa2j6nsoDZRaTbc6zsC3SJyoWs6IE6A9ukuUK2G5HYbgu2HbvpQOlSEV7jdVESkK73s0Mdy5ZX2FgfZb1oH4axKy2kNg1mm3HRqp7kflxs3zrgEU9L2kkOeI0ZJVUJQ7uiRTSXre4mpa/qK6Xem9L8R7YrmQxDdbpEnVRPwqlWkvQchq7GUvFcSM095yleneGhuCnzvlNbAm3ZagfpZIuMehLderTE5cmHKxs17fSn0fCkQtZoMq/TuZV+bmdUBKWc1XQtuWVy3EQc6dxnNjKDfsCjyl9HTKJmNiwVRHvj4qnRsGW8eT46Chhp/P1fUKCBkIvl8dE9FNTH/wgwAFphBopBjFhrAAAAAElFTkSuQmCC');
	}
	
	
	/*电话  红色*/
	.red_phone{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAmCAYAAAClI5npAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjYzOTlFNjJFMDk4MTFFODg0QjI5QTRGMzU2RTJGRTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjYzOTlFNjFFMDk4MTFFODg0QjI5QTRGMzU2RTJGRTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTUxQUFGRTdCNjYyMTFFODlBNThGNjA1RDc0OTcwRjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTUxQUFGRThCNjYyMTFFODlBNThGNjA1RDc0OTcwRjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz58NYUJAAAD+ElEQVR42rSYe2iOURzHXxtzfxu7pIVErG3GzC33DWPF5trEP+ZSZLSJJHI3iyzlMrkrESOFIlbM/ZbbzN1iLkNoaKaZNt9ffU8dT8/zvM978atP55z3Oc9zvs85v/M7v+dtUNukicvEUkEiGAgiQQgoA8fBAVcArYFBQDMOMN7mnjyw5H8ICANXQTTbu9n+wfYIMIv1yeBwoAXcAwnaYEUm/feBTPAFRARCQBDLSRy8BiRbDC42DVSDcAqxs0jt+R4FLGZZAIo93FPIcr5NH5nBT6AcbALd7QT00qZ+v4NZ28WyG+hg0Ueta1uQA+6DMyDKTEA66y9BiQMBt7kMYjEWfU7y2jxwRdvaJZydfwSot7/g0G9qwQvWW9j0ewq2gkGgJ3jNnXYWDNUFqGl564Xz/mTZ0OK6bNPNYCLHuAviQCmvnwOdlQA3f/zmhYBwln8sru/h9B8FH7jM1fQ3mYlgFVFFQL2HtzFaa9CJ9Y8WfaK5o95xO54AadzmqezTF/QWAd/5Q6hDATl8A3nYTZPriVyiLNAO3NEcU8Z4Bi7xt1wR8J6N9h4GljdYD5axvQj8NvTpygG/MmqK9QOPWZ/JMp9lSpDm0XE2g8/lGyxi+xKdzGiVmqNl8ryQXbNGi7hip0Gd8gE1jQlcX6O1AVu0aRQxKRZCZTbjwQzDgEpUJ8153ygBaj0a8fw3WiutLm+1zWTqjbbX0G5mEjd+KQGfwWWbyPYcPGF9uxdbVe6pYL2CzpevOXyMfhwvABvBRZBk8rB0biWxlqDK4UkbTB8wmpth2a1Ow2ssh4AuFrG9jPW1DmegzmJwF5OcjrLzlIAbyik0TzeacsRsB1vWqcAqPSOaAg5qjmcWmku5XWU5xgYyIxI7xARCbKrNISM2RjvGrZ7ntQCxHSzXgcYm/R9qGZHMQlPWh7EtceAB2An6+JKWhzIxCWOkyza5J4QeHM3c8TpYbvF8yYJymV07EiA2ARzjKem22HK9wS3DbzLIBuYXU5iIKJutza5HAXqKfoeD1Zv0GcnIGMEvpgKT6wvBcLZXgxVOBejZyyqw0g9HPwVGs57BJMWj1z4Cc1gX1aP8EJCmzU6h9uVlOwPKzvNDxcUc7qUfQsoZwIq1Z3oU4GIyEcMkQ+V0vlgCfUuldZVOA8c4pm1h9PwoHwXc186TOG8ilxyjsRQRwXy/v48ialg29zZ0ynk+mM7Zkns+y8vBM/giLi1R9Sp2lzDdUkf3Vn5N9XBwr3xHHmF9Jz/vfTo8JCANAEvZTuJXjxxk001yytYM0yrjKtL+5HC8C6wslrOQbLJrKrlU3QyxJd4YVf0RoP+hlc5gZZaovOLfPXlmIf2vAAMAgBrj4MYozk8AAAAASUVORK5CYII=');
		background-size: 100% 100%;
	}
	
	/*报错*/
	.errorIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAADqElEQVRYR9WZP1YUQRDGvzqBkpkBmZlwAjEyFE+gnEDIzITMTDiBcAIhNBJOIGRmaGamnKB8v7Eaemdndmd6e5/S7+17+3Z2er7+quqrP2NaYLn7hqSnkrYkPYwPv7EuJf2Oz7mkCzPjt6JlY+9y9zVJbyRtS+J7vm4CIL8B+EHr+ndJp5KOzIzvg9dgoAHwnaTXsTugeChsnZoZ7HUud+dQfGB+Nf50LOlgKOBBQN39g6TdeMCVpH0zA+To5e6A3Q+X4X72Opi30Uyg7o7ffQkz/ohNYWLhFYDZC4bx3WezrNILNALlU/jhCYzO2qgUubsD9pUkfPZlX8B1Ag2QMAmje2Z2WApkyH3ujlvhXvg5zE6pwxTQMPfXYHLHzKqYeh5gdydIPwazm23rdQEFJNKydCbb4DNmL81sM78+AdTdMTEaeWJmSYbmkdFcd3fYaN9zbGY7gzaIP2U+i3ShDs26BRo6eS2J6N4YGzi1gMahCSzUYD3pbA40RV+RX1YGitYSzLeWbYBmbF6ZWcrVYyxWzfTpoe5OxqOOaFhNQJNvomOlGaeKj2ZAE6vUBbsJKL65YmboZtGqafoMLL7qZrZuIe5I0uhIz0+0JKApbjYBmrJCURBlp69q+ogdKi7S+B5A8ckXYfreUm2ePyyD0QDrks4A2kSXmQ0q+foALxnoBUDxTySgOJBqZqaOtIqVrwEKtfQzyEHxWiKjfy1+n4BS+62a2UoxnRWLkg7T/6L+uFfBVEue3kp63mLks5m9L7VUFPEw2shTFcEvBTPrvqzqbwSfamnhFLokoHcpNCtUHywaULXBujtmvzGztZplHnm5XcvS+5SWjSnPT5R5zJAo9aaaqqEs1RZ8dwcPuO4K5zD//9SKpNZ5shVptSMUq1N99TxmazHamitMN3cBNrUkJW3uY0mPWgf6aWbf5h2ypwDvbpezApiU+uQfDSDo4xltTjWZfSOdJv9LWqjqH8lk8svOucKsIRnlFRNjpnhHYx469r/uDouwyXB4a9CQLHMBNBENhFkUgVlUcavSBT4ChykebMLk9qixYwaWqh9m8VnUgOkws9KFl7szE4VFtJIpNkz2EjGoT3L35OQAxH8BfFaC1t1pJFGX9KJiIrr79hwENNNZAMMEi9Onlw1nfWyEeQFHq0NaTL0ZluHAg96ODAaauQNMUBry0PSGI10GfJoW4+PthhE/5HCHQwGmjUcDbYkzYGAqfyGGP7Pwu/yF2PkiL8T+ANMXFOLDF+7iAAAAAElFTkSuQmCC') no-repeat;
		background-size: 100% 100%;
	}
		
</style>