<template>
	<div class="container CnTop CnBtm" :class="[isIphonex ? 'ixPaddCn':'']">

		<div class="head" :class="[isIphonex ? 'ixHead':'']">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div class="headText">
					<div :class="[sType == 1 ? 'sel':'']" @click="changeType"  data-s-type='1'>{{langua.mfAtten}}</div>
					<div :class="[sType == 2 ? 'sel':'']" @click="changeType"  data-s-type='2'>{{langua.mfFans}}</div>
				</div>
			</div>
		</div> 
		
		<!--我的关注-->
		<scroll-view scroll-y class="ListView" @scrolltolower='attenUpDate' :class="[isIphonex ? 'ixListView':'']" v-if="sType == 1">
			<div class="attenCn" :class="[isIphonex ? 'ixBtm':'']" v-if='attenList.length != 0'>
				<div class="attenList" v-for="(item,key) in attenList" :key="attenList">
					<img :src="item.avatar" :data-author-id='item.user_id' @click="checkPerson" />
					<div class="msg">
						<div>{{item.user_nickname}}</div>
						<!--<div>{{item.}}</div>-->
					</div>
					<div class="attOprea">
						<div v-if='item.atten' :data-c-index='key'  :data-user-id='item.user_id' @click="removeAtten"><span class="tick_g"></span>{{langua.mfHasAtten}}</div>
						<div v-else  :data-c-index='key'  :data-user-id='item.user_id' @click="addAtten"><label class="gou_r"></label>{{langua.mAtten}}</div>
					</div>
				</div>
			</div>
			<!--暂无关注-->
			<div class="atlasNull" v-else>
				<div class="icon nullPhoto"></div>
				<div class="til">{{langua.atNoAtten}}</div>
			</div>
		</scroll-view>
		
		<!--我的粉丝-->
		<scroll-view scroll-y class="ListView" @scrolltolower='fansUpdate' :class="[isIphonex ? 'ixListView':'']" v-if="sType == 2">
			<div class="attenCn" :class="[isIphonex ? 'ixBtm':'']" v-if='fansList.length != 0'>
				<div class="attenList" v-for="(item,key) in fansList" :key="fansList" >
					<img :src="item.avatar"  :data-author-id='item.user_id' @click="checkPerson"/>
					<div class="msg">
						<div>{{item.user_name}}</div>
						<!--<div>{{item.}}</div>-->
					</div>
					<div class="attOprea">
						<div v-if='item.is_follow == 0' :data-c-index='key' :data-user-id='item.user_id' @click="addAtten"><label class="gou_r"></label>{{langua.mAtten}}</div>
						<div v-else  :data-c-index='key' :data-user-id='item.user_id' @click="removeAtten">{{langua.mfMutual}}</div>
					</div>
				</div>
			</div>
			<!--暂无粉丝-->
			<div class="atlasNull" v-else>
				<div class="icon nullPhoto"></div>
				<div class="til">{{langua.noFans}}</div>
			</div>
		</scroll-view>
 
	</div>
</template>
 
<script>
	 
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				sType:1,//显示类型  1我的关注  2我的粉丝
				attenList:[],//关注列表
				fansList:[],//粉丝列表
				langua:'',//静态文字的语种
				atPage:1,//关注列表分页
				faPage:1,//粉丝列表分页
			}
		},

		components: {
			
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
			//切换类型
			changeType:function(e){
				this.sType = e.currentTarget.dataset.sType;
			},
			//查看帖子作者
			checkPerson(e){
				console.log(e);
				var authorId = e.currentTarget.dataset.authorId;
				wx.navigateTo({
					url:'/pages/hisPost/main?authorId='+authorId
				})
			},
			againFun(){
				this.userAtten().then(res =>{wx.hideLoading()});
				this.userFans().then(res =>{wx.hideLoading()});
			},
			//获取用户的关注列表
			async userAtten(){
				//加载动画
				wx.showLoading({title:this.langua.loadText+'...'});
				var that = this;
				await that.Request.userAtten(that.atPage,10,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
//						console.log(res);
						if(res.code == 200){
							
							for(var x in res.data.list){
								res.data.list[x].atten = true;
							}
							
							var attenList = res.data.list;
							
							if(that.atPage != 1 && that.atPage != 'end'){
								var attenList = that.attenList.concat(res.data.list);
							}
							
							that.attenList = attenList;
							
							if(res.data.page.page < res.data.page.total_page){
								that.atPage = that.atPage + 1;
							}else{
								that.atPage = 'end';
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
			},
			//获取用户粉丝
			async userFans(){
				var that = this;
				await that.Request.userFans(that.faPage,10,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res);
						if(res.code == 200){
							
							
							var fansList = res.data.list;
							
							if(that.faPage != 1 && that.faPage != 'end'){
								var fansList = that.fansList.concat(res.data.list);
							}
							
							that.fansList = fansList;
							
							if(res.data.page.page < res.data.page.total_page){
								that.faPage = that.faPage + 1;
							}else{
								that.faPage = 'end';
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
			},
			//上拉加载关注列表
			attenUpDate(){
				console.log('上拉加载关注列表');
				this.userAtten().then(res =>{wx.hideLoading()});
			},
			//上拉加载粉丝列表
			fansUpdate(){
				console.log('上拉加载粉丝列表');
				this.userFans().then(res =>{wx.hideLoading()});
			},
			//添加关注
			addAtten(e){
				console.log('添加关注')
				var cIndex = e.currentTarget.dataset.cIndex;
				var userId = e.currentTarget.dataset.userId;
				var that = this;
				//我的关注
				if(that.sType == 1){
					that.Request.attenUser(userId)
						.then(res =>{
							if(res.code == 200){
								that.attenList[cIndex].atten = true;
								wx.showToast({
									title:that.langua.attenYes
								})
							}
						})
						.catch(res =>{
							console.log(res)
						})
				}
				//我的粉丝
				else if(that.sType == 2){
					that.Request.attenUser(userId)
						.then(res =>{
							if(res.code == 200){
								that.fansList[cIndex].is_follow = 1;
								wx.showToast({
									title:that.langua.attenYes
								})
							}
						})
						.catch(res =>{
							console.log(res)
						})
				}
			},
			//取消关注
			removeAtten(e){
				console.log('取消关注')
				var cIndex = e.currentTarget.dataset.cIndex;
				var userId = e.currentTarget.dataset.userId;
				var that = this;
				//我的关注
				if(that.sType == 1){
					that.Request.cancelAttenUser(userId)
						.then(res =>{
							if(res.code == 200){
								that.attenList[cIndex].atten = false;
								wx.showToast({
									title:that.langua.mfCancelAtten
								})
							}
						})
						.catch(res =>{
							console.log(res)
						})
				}
				//我的粉丝
				else if(that.sType == 2){
					that.Request.cancelAttenUser(userId)
						.then(res =>{
							if(res.code == 200){
								that.fansList[cIndex].is_follow = 0;
								wx.showToast({
									title:that.langua.mfCancelAtten
								})
							}
						})
						.catch(res =>{
							console.log(res)
						})
				}
			}
		},
		onLoad(e){
			this.langua = this.$util.util.prototype.changeLanguage();
			var oType  = this.$root.$mp.query.type;
			//点击关注
			if(oType == 'gz'){
				this.sType = 1;
			}
			//点击粉丝
			else if(oType == 'fs'){
				this.sType = 2;
			}
			this.againFun();
		},
		onUnload(){
			this.atPage = 1;
			this.faPage = 1;
		},
		onPullDownRefresh(){
			var that = this;
		    //模拟加载
		    setTimeout(function()
		    {
		      	wx.stopPullDownRefresh(); //停止下拉刷新
		    },500);
		},
	}
</script>

<style scoped>
	.ixListView{
		top: 170rpx !important;
	}
	.ListView{
		position: fixed;
		top: 128rpx;
		width: 100%;
		bottom: 0;
	}
	.attOprea label{
		display: inline-block;
		vertical-align: middle;
		width: 20rpx;
		height: 20rpx;
		margin-top: -5rpx;
		margin-right: 5rpx;
	}
	.attenList .attOprea span{
		display: inline-block;
		vertical-align: middle;
		width: 30rpx;
		height: 28rpx;
		margin-top: -5rpx;
	}
	.attenList .attOprea>div{
		display: inline-block;
		vertical-align: middle;
		border: 2rpx solid #e5e5e5;
		min-width: 120rpx;
		padding: 0 10rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		border-radius: 35rpx;
		color: #636363;
		font-size: 24rpx;
	}
	.attenList .attOprea{
		position: absolute;
		right: 0;
		margin: auto;
		top: 0;
		bottom: 0;
	}
	.attenList .msg>div:nth-child(2){
		color: #999999;
		font-size: 24rpx;
	}
	.attenList .msg>div:nth-child(1){
		color: #333333;
		font-size: 32rpx;
	}
	.attenCn .attenList .msg{
		display: inline-block;
		line-height: 48rpx;
		vertical-align: middle;
		width: 500rpx;
		margin-left: 30rpx;
	}
	.attenCn .attenList img{
		display: inline-block;
		vertical-align: middle;
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
	}
	.attenCn .attenList{
		height: 180rpx;
		line-height: 180rpx;
		border-bottom: 2rpx solid #E5E5E5;
		position: relative;
	}
	.attenCn{
		padding: 0 3%;
		padding-bottom: 60rpx;
	}
	.headText .sel{
		color: #F90000 !important;
		border-bottom: 2rpx solid #F90000;
	}
	.headText>div{
		display: inline-block;
		line-height: 78rpx;
		text-align: center;line-height: ;
	}
	.headText>div:nth-child(1){
		margin-right: 50rpx;
	}
	.headText{
		display: inline-block;
		color: #333333;
		font-size: 32rpx;
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