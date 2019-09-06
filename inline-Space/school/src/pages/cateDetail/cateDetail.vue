<template>
	<div class="container CnBtm">

		<!--基本情报-->
		<div>
			<div class="detailCn">
				<!--轮播图-->
				<swiper class="banner" autoplay interval="5000" circular>
					<swiper-item v-for="(item,key) in bannerList" :key='key'>
						<image :src="item.src" class="slide-image" />
					</swiper-item>
				</swiper>


				<!-- 切换显示 -->
				<div class="head">
					<div class="headSub">
						<!-- <div class="back backIcon" @click="goBack"></div> -->
						<div class="headText">
							<div :class="[sType == 1 ? 'sel':'']" @click="changeType" data-s-type='1'>基本情报</div>
							<div :class="[sType == 2 ? 'sel':'']" @click="changeType" data-s-type='2'>写真</div>
						</div>
					</div>
				</div>

				<!-- 两种显示类型 -->
				<div>
					<!--基本信息-->
					<div class="detaMsg" :hidden="sType != 1">
						<div class="til">一宗深夜食堂/日本料理<span class="yh">惠</span></div>
						<div class="MsgLi"><span class="sAddIcon"></span>越秀区北京教育路34号</div>
						<div class="MsgLi"><span class="moneyIcon"></span>人均：60元<span class="two timeIcon"></span>营业时间：11:00 - 21:00</div>
						<div class="MsgLi"><span class="phoneIcon"></span>预约电话：020-6351828丨15089887867</div>
						<div class="discount">
							<div class="disSub">
								<div class="til">折扣优惠</div>
								<div class="subTil">只需凭APP即可打9折</div>
							</div>
						</div>
						<!--商家的故事-->
						<div class="deStory">
							<div class="til">商家故事</div>
							<div class="storeCn">古朴的和风原木在奢华的商场里独树一帜，雪花澳洲和牛牛小排有着摄人心魄的美妙，餐厅里的每样摆件和器皿都是来源于日本</div>
						</div>
					</div>

					<!--写真-->
					<div :hidden="sType != 2">
						<div class="atlatView" v-if='atlasList.length != 0'>
							<div class="atlasList" v-for="(item1,index1) in atlasList" :key="item1">
								<div class="til">{{item1.til}}</div>
								<div class="atlasCn div_float">
									<div class="list" v-for="(item2,index2) in item1.List" :key='item2'>
										<img :src="item2.src"  :data-o-index='index1'  :data-t-index='index2' @click="prePhoto" />
									</div>
								</div>
							</div>
						</div>
						
						<div class="atlasNull" v-else>
							<div class="icon nullPhoto"></div>
							<div class="til">暂无图片</div>
						</div>
					</div>
				</div>

				<!--底部-->
				<div class="detaBtm">
					<div>
						<span class="shareIcon_w"></span>
						<button type="text" open-type='share'></button>
					</div>
					<div><span :class="[collect ? 'collectIcon':'collectIcon_w']" @click="collectFun"></span></div>
					<div><span class="mapIcon" @click="checkMap"></span></div>
					<div><span class="bigPhone" @click="showPhoneFun"></span></div>
				</div>
				
				<!--电话-->
				<div class="phoneList" v-show="showPhone">
					<div v-for="(item,key) in phoneList" :key='key' :data-phone='item.phone' @click="telPhone">{{item.phone}}</div>
					<div  @click="showPhoneFun">取消</div>
				</div>

			</div>
		</div>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				sType: 1, //显示类型  1基本情报  2写真
				bannerList: [
					{src: '/static/images/banner.png'},
					{src: '/static/images/banner.png'},
					{src: '/static/images/banner.png'}
				],
				phoneList:[
					{phone:'020-6351828'},
					{phone:'15089887867'}
				],
				showPhone:false,//是否显示电话列表
				collect:false,//收藏
				atlasList:[
					{til:'店面环境',List:
						[
							{src: '/static/images/banner.png'},
							{src: '/static/images/banner.png'},
							{src: '/static/images/banner.png'}
						]
					},
					{til:'料理',List:
						[
							{src: '/static/images/banner.png'},
							{src: '/static/images/banner.png'},
							{src: '/static/images/banner.png'},
							{src: '/static/images/banner.png'},
							{src: '/static/images/banner.png'}
						]
					}
				]
			}
		},

		components: {

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
			collectFun(e){
				var that = this;
				
				//未收藏
				if(!that.collect){
					wx.showToast({
						title:'收藏成功'
					})
					that.collect = true;
				}else{
					wx.showToast({
						title:'取消收藏'
					})
					that.collect = false;
				}
			},
			//查看地图
			checkMap(){
				wx.getLocation({
				  type: 'gcj02', //返回可以用于wx.openLocation的经纬度
				  success (res) {
				    const latitude = res.latitude
				    const longitude = res.longitude
				    wx.openLocation({
				      latitude,
				      longitude,
				      name:'123',
				      address:'昌岗中路',
				      scale: 28
				    })
				  }
				})
			},
			//预览图片
			prePhoto(e){
				console.log(e)
				var oIndex = e.currentTarget.dataset.oIndex;
				var tIndex = e.currentTarget.dataset.tIndex;
				var atlasList = this.atlasList;
				var signArr = [];
				
				for(var x in atlasList[oIndex].List){
					signArr.push(atlasList[oIndex].List[x].src)
				}
				
				console.log(signArr[tIndex])
				
				wx.previewImage({
					current:signArr[tIndex],
					urls:signArr
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
		width: 94%;
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
		height: 150rpx;
		line-height: 150rpx;
		margin-top: 38rpx;
		border-top: 2rpx solid #E5E5E5;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.MsgLi .two {
		margin-left: 50rpx;
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
		padding-bottom: 60rpx;
	}
	
	.yh {
		width: 35rpx;
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
		/* margin-top: 37rpx; */
	}
	
	.headText .sel {
		color: #F90000 !important;
		border-bottom: 2rpx solid #F90000;
	}
	
	.headText>div {
		display: inline-block;
		line-height: 78rpx;
		text-align: center;
		line-height: 78rpx;
	}
	
	.headText>div:nth-child(1) {
		margin-right: 80rpx;
	}
	
	.headText {
		display: inline-block;
		color: #333333;
		font-size: 32rpx;
	}
	
	.head .back {
		width: 18rpx;
		height: 37rpx;
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
		/* position: fixed; */
		/* padding-top: 47rpx; */
		top: 0;
		z-index: 3;
		width: 90%;
		background-color: white;
		border-bottom: 2rpx solid #E5E5E5;
		text-align: center;
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
	
	
	
</style>