<template>
	<div class="container">
			
			<div class="meTop meBg">
				<img :src="userInfo.avatarUrl" />
				<div>{{userInfo.nickName}}</div>
			</div>
			
			<div class="meCn">
				<div class="meList div_float" data-type="sp" @click="skipList">
					<div class="L">视频收藏</div>
					<div class="R arrR"></div>
				</div>
				<div class="meList div_float" data-type="tw" @click="skipList">
					<div class="L">图文收藏</div>
					<div class="R arrR"></div>
				</div>
				<div class="meList div_float" data-type="xx" @click="skipList">
					<div class="L">消息</div>
					<div class="R arrR"></div>
					<div class="num" v-if='msgCount > 999'>999+</div>
					<div class="numOne" v-else-if="msgCount > 0">{{msgCount}}</div>
				</div>
				<div class="meList div_float" data-type="lx" @click="skipList">
					<div class="L">联系我们</div>
					<div class="R arrR"></div>
				</div>
			</div>
				
			<!--公共底部-->
			<allFooter :selType="selType"/>
			
	</div>
</template>

<script>
	import allFooter from '../../components/footer'

	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求方法头
				selType:3,
				userInfo:'',
				msgCount:0,//未读消息
			}
		},

		components: {
			allFooter
		},
 
		methods: {
			skipList:function(e){
				var type = e.currentTarget.dataset.type;
				//视频跳转
				if(type == 'sp'){
					wx.navigateTo({
						url:'../videoCollect/main'
					})
				}
				//图文收藏
				else if(type == 'tw'){
					wx.navigateTo({
						url:'../overseasCollect/main'
					})
				}
				//消息
				else if(type == 'xx'){
					wx.navigateTo({
						url:'../message/main'
					})
				} 
				//联系我们
				else{
					wx.navigateTo({
						url:'../aboutUs/main'
					})
				}
			},
			//PV
			getPV(){
				this.Request.getPV();
			},
			//获取未读消息
			unreadMsg(){
				var that = this;
				that.Request.unreadMsg(wx.getStorageSync('openid'))
					.then(res =>{
						if(res.code == 0){
							that.msgCount = res.data["0"].count;
						}
					})
			}
		},
		onShow(){
			//判断是否有用户信息
			if(wx.getStorageSync('userInfo')) {
				this.userInfo = wx.getStorageSync('userInfo'); 
				this.getPV();
				this.unreadMsg();
			} else {
				wx.navigateTo({
					url: '../login/main'
				})
			}
		} 
	} 
</script>

<style scoped>
	.meTop{
		height: 274rpx;
		line-height: 274rpx;
		background-size: 100% 100% !important;
	}
	.meTop img{
		display: inline-block;
		width: 142rpx; 
		height: 142rpx;
		border-radius: 100%;
		vertical-align: middle;
		margin-left: 50rpx;
	}
	.meTop>div{
		display: inline-block;
		vertical-align: middle;
		color: #121213;
		font-size: 28rpx;
		margin-left: 32rpx;
	}
	.meCn{
		padding: 0 3%;
	}
	.meCn .meList{
		height: 107rpx;
		line-height: 107rpx;
		position: relative;
		border-bottom: 2rpx solid #f5f5f5;
	}
	.meList .L{
		float: left;
		color: #121213;
		font-size: 32rpx;
	}
	.meList .R{
		float: right;
		width: 15rpx;
		height: 100%;
		background-size: 15rpx 15rpx;
		background-position: center center;
	}
	.meList .numOne{
		position: absolute;
		width: 48rpx;
		height: 48rpx;
		line-height: 48rpx;
		border-radius: 100%;
		text-align: center;
		color: white;
		background-color: #fa7889;
		right: 42rpx;
		top: 35rpx;
		font-size: 20rpx;
	}
	.meList .num{
		position: absolute;
		height: 36rpx;
		line-height: 36rpx;
		padding: 0rpx 13rpx;
		border-radius: 18rpx;
		text-align: center;
		color: white;
		background-color: #fa7889;
		right: 42rpx;
		top: 35rpx;
		font-size: 20rpx;
	}
	
	
	
	.arrR{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAYAAABit09LAAAAAXNSR0IArs4c6QAAAPdJREFUKBVjXHXwouL/fwwHGf8zrAhz0i9jwAGYoOKi/xn+l67ef2EKDnUMTGH2+veZ//8PYGBk/PHvP0M2LsWMMBPW7Lvg/peRcQPD//8cTIwMU0MdDXJgciAarhDEwacYRSE+xRgKcSnGqhBdMSMjQyUseEByKCDEyWAnUBIcXP//M4biNHHlgYuRjP/+L/7PwMAM9HImC4oxUA6KIiaGunAHgxkYCpEVAa2rD3MwaAbpR7EaQ5GTQRPMRrhCfIrgJhJSBFa4at8lewaGf3tBvgO7Cck6mLUgmuU/I6MsUMF/Jgam2lBHvRZkSQz2qmOPOTEE0QQAZjl+qfmGjAIAAAAASUVORK5CYII=') no-repeat;
	}
	
	.meBg{
		background: url('data:image/png;base64,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');
	}
</style>