<template>
	<div class="container CnTop">

		<div class="head">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div class="headText">首页</div>
			</div>
		</div> 
 
 

		<!--轮播图-->
		<swiper class="banner" autoplay circular previous-margin="50rpx" next-margin="50rpx">
			<swiper-item v-for='item in bannerList' :key="bannerList">
				<image :src="item" />
			</swiper-item>
		</swiper>

		<div class="menuView">
			<!--滑动菜单-->
			<swiper class="menu" circular @change='menuChange'>
				<swiper-item v-for='(item,key1) in menuList' :key="menuList" class='div_float'>
					<div class="mList" v-for="(item,key2) in item" :key="item" @click="goSearch">
						<img src="../../../static/img/cIcon.png" />
						<div>学校</div>
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
			<div class="icList" @click="goLife">
				<div>狠优惠</div>
				<img src="../../../static/img/banner.png" />
			</div>
			<div class="icList" @click="goGeiao">
				<div>有格调</div>
				<img src="../../../static/img/banner.png" />
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
		
		
		<!--语言选择框-->
		<div class="language" v-show="showLan">
			<div class="lanSub">
				<div class="div_float"><span class="japan"></span><div>日本語</div></div>
				<div class="div_float"><span class="korea"></span><div>한국어.</div></div>
				<div class="div_float"><span class="china"></span><div>简体中文</div></div>
			</div>
		</div>

	</div>
</template>

<script>
	import comList from '../../components/comList'
	
	export default {
		data() {
			return {
				bannerList: [
					'../../../static/img/banner.png',
					'../../../static/img/banner.png',
					'../../../static/img/banner.png'
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
			comList,
		},

		methods: {
			//菜单切换
			menuChange: function(e) {
				this.mPage = e.target.current;
			},
			//跳转搜索
			goSearch(){
				wx.navigateTo({
					url:'/pages/searchResult/main'
				})
			},
			//跳转生活合集
			goLife(){
				wx.navigateTo({
					url:'/pages/lifeCollect/main'
				})
			},
			//跳转格调没事
			goGeiao(){
				wx.navigateTo({
					url:'/pages/cate/main'
				})
			},
			//点击推荐列表
			skipDetail(){
				wx.navigateTo({
					url:'/pages/cateDetail/main'
				})
			}
		},
		onShareAppMessage: function(res) {
			return {
				title: '自定义转发标题',
				path: '/page/user?id=123'
			}
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
		display: inline-block;
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
	}
	
	.menu {
		height: 221rpx;
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
	.iCom{
		margin-top: 40rpx;
		border-bottom: 2rpx solid #E5E5E5;
		padding: 0 5%;
		padding-bottom: 40rpx;
	}
	.iCom>div:nth-child(1){
		float: left;
	}
	.iCom>div:nth-child(1)>div{
		background-color: #ff4848;
	}
	.iCom>div:nth-child(2){
		float: right;
	}
	.iCom>div:nth-child(2)>div{
		background-color: #f68837;
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
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAnCAYAAACFSPFPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFBQzI5RDAzQUYyOTExRTg4NzdBQTRDODU3QzU0OTZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFBQzI5RDA0QUYyOTExRTg4NzdBQTRDODU3QzU0OTZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUFDMjlEMDFBRjI5MTFFODg3N0FBNEM4NTdDNTQ5NkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUFDMjlEMDJBRjI5MTFFODg3N0FBNEM4NTdDNTQ5NkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz70O5/WAAADgUlEQVR42sSYaUhVQRTHbw8z28wsotUKWmxRKfJLSGliCxR9yIqwKIokW6UgaBXCrCgKW7CiEsoPYlEYhF9steiDWWCGbRQRiJhYtlBmZf+Bc+FwmLnvzvNZB35wn+c/5x5n3pw58yIce+sF5oBkMBn0B7HgD2gBL0E1qARvnC6ybFAKGkGHT26DfDAoXElMA1UeL/wEGkAzzY5O8xXs6GwiezWBH4BCsBKMB31ABOgJRoC5YBcooyT42GtgnG0S3cBNEegOyLCMo5anQMT5BdJsgjwUAQ51coZngUciobF+Bl5hgz6CSWHcBJdZ7B9gpJd4s5iR5CDBx4AFYA1YBBJAIMiYShb/tUk0RSSSatANBWfBK8POeQ+u0y402S2mX68TXGSCnYYgs0GrRZ3ZZIgzimm+SGccaGd1Q2d54kUqqaMgB6ygpcqnCsx1ZwzxzjHNHu44whx5moHTxQtOg4Eey7BV6HM0mijm/8ZrShP9sQ3EaM6iJjZwu8+ds0QkFK/RXGL+pfK/vqoZcID5yyy38lo2tlrjn8r8ats72zymM4JqjTuVUSHUlqcsvq7QVYBakKJqwgTmeCyEaWzZLlChsrUDonxImwcSwf0A9SOutQjhRPZ8N8Sqy3uaGC9hQFTMDs0yudYaYjI/2XO/YMm0sc+Rwt/OnvuG4WzSLbNqO7LAgAA1Rq4NF8J69pwaYgJ8Szdp/OWgBBQHxGGVIIT32NKtCjGZXPb8TNM3Jbm9T4Be6Np8IVZLeJIt0ynLRFazk/8JqBP+Gew7W+v+8S2rBbJ5Vt+j38y/zGciGT4qcCnzL9T1usc0gzJF4I0g2pCE6okXC/0+jS6W/ZOfQXfX0Rt8Z4OdIMdCB9WkIlqKdJqxQrolcF2JIV6513lX5KPnzbXoZRTHPTpEfmL3kILBIlC2IZA6Pk6AD4YEmqkTTPKobS+YPotvLW5q+xazzzPFbpPfjXQ6V6KpoKndcoPuSyZTF8IUen5HXZ/R9ospzAzj7aBS9MrDbAcZm2YLUzWqRsQcYhPgvBi8LsRERtPJ7cZpoEudtRX4bK69rj/8NvGc6kvIVuBzu+quNXxcfWcT4d2Y/N0l0kOfJfRlTphtuXhBjUG3RegquurXq0RR7utEk33Qx5kUVoung43XIlX8DotEdjv/yOI0tYizwfkPVkWz1EYz1Gj7qxS3vwIMAPbaft2jB6bfAAAAAElFTkSuQmCC');
		background-size: 100% 100%
	}
</style>