<template>
	<div class="container CnTop CnBtm"  :class="[isIphonex ? 'ixPaddCn':'']">
		
		<!--导航栏-->
		<allHead :headTil='langua.pumTil' />
		
		<div class="ReplyCn" v-if="pushList.length != 0">
			<div class="reList div_float" v-for="(item,key) in pushList" :key="pushList">
				<div class="reTop" @click="checkCn" :data-s-index='key' :data-is-read='item.is_read'>
					<div class="L tuiS"></div>
					<div class="reCn">{{item.title}}</div>
					<div class="tishi" v-if='item.is_read == 0'></div>
					<div class="R rArraw" :class="[item.showCn ? 'sel':'']"></div>
				</div>
				<div class="reLiCn" v-show="item.showCn">{{item.content}}</div>
			</div>
		</div>
		
		<div class="nullMsg" v-else>
			<span class="jusang"></span>{{langua.pumNoMsg}}
		</div>
		
	</div>
</template>
 
<script>
	import allHead from '../../components/head'  
	
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util:this.$util.util.prototype,//转换json
				pushList:[],
				langua:'',//静态文字的语种
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
			//查看系统消息
			checkCn(e){
				var that = this;
				var sIndex = e.currentTarget.dataset.sIndex;
				var isRead = e.currentTarget.dataset.isRead;
				var pushList = this.pushList;
				for(var x in pushList){
					if(x == sIndex){
						if(pushList[x].showCn){
							pushList[x].showCn = false;
						}else{
							pushList[x].showCn = true;
						}
					}else{
						pushList[x].showCn = false;
					}
				}
				this.pushList = this.util.converJSON(pushList);
				
				//如果是未读就请求
				if(isRead == 0){
					that.Request.setIsRead(that.pushList[sIndex].id,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
						.then(res =>{
							console.log(res.code)
							if(res.code == 200){
								that.pushList[sIndex].is_read = 1;
							}
						})
				}
			},
			//获取系统消息
			systemInfo(){
				var that = this; 
				that.Request.systemInfo(wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							for(var x  in res.data.list){
								res.data.list[x].showCn = false;
							}
							
							
							var pushList = that.util.converJSON(res.data.list);
							if(that.page != 1 && that.page != 'end'){
								var pushList = that.pushList.concat(res.data.list);
							}
							
							that.pushList = pushList;
							
							if(res.data.page.page < res.data.page.total){
								that.page = that.page + 1;
							}else{
								that.page = 'end';
							}
						}
					})
					.catch(res =>{
						console.log(res)
					})
			}
		},
		onLoad(){
			this.langua = this.$util.util.prototype.changeLanguage();
			
			var pushList = this.pushList;
			for(var x in pushList){
				pushList[x].showCn = false;
			}
			this.pushList = pushList;
			
			this.systemInfo();
			
		},
		onPullDownRefresh(){
			var that = this;
		    //模拟加载
		    setTimeout(function()
		    {
		      	wx.stopPullDownRefresh() //停止下拉刷新
		      	that.page = 1;
		      	that.systemInfo();
		    },500);
		},
		onReatchBottom(){
			if(this.page != 'end'){
				that.systemInfo();
			}else{
				wx.showToast({
					title:that.langua.isEnd,
					icon:'none'
				})
			}
		}
	}
</script>

<style scoped>
	.reList .tishi{
		position: absolute;
		display: inline-block;
		vertical-align: middle;
		top: 20rpx;
		width: 20rpx;
		height: 20rpx;
		border-radius: 100%;
		background-color: #F90000;
		right: 10%;
	}
	.reTop .sel{
		transform: rotate(270deg) !important;
	}
	.reList .reLiCn{
		margin-top: 30rpx;
		padding: 10rpx 30rpx;
		font-size: 26rpx;
		color: #333;
	}
	.reList .R{
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		width: 30rpx;
		height: 30rpx;
		transform: rotate(90deg);
	}
	.reList .reCn{
		width: 500rpx;
		line-height: 40rpx;
		display: inline-block;
		vertical-align: middle;
		margin-left: 25rpx;
		color: #2b2f37;
		font-size: 28rpx;
	}
	.reList .L{
		display: inline-block;
		vertical-align: middle;
		height: 55rpx;
		width: 55rpx;
		background-size:  100% 100% !important;
	}
	.reList .reTop{
		position: relative;
	}
	.ReplyCn .reList{
		padding: 20rpx 0rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.ReplyCn{
		padding: 0 5%;
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