<template>
	<div>
		<!--1首页： 2：分类  3：购物车  4:个人中心-->
		<div class="allFooter" :class="[isIphonex ? 'ixBtm':'']">
			<div class="footList" @click="skipHome">
				<img v-if="selType == 1" src="../../static/img/home_sel.png" />
				<img v-else src="../../static/img/home.png" />
				<p :class="[selType == 1?'sel':'']">首页</p>
			</div>
			<div class="footList" @click="skipClass">
				<img v-if="selType == 2" src="../../static/img/list_sel.png" />
				<img v-else src="../../static/img/list.png" />
				<p :class="[selType == 2?'sel':'']">分类</p>
			</div>
			<div class="footList" @click="skipCart">
				<img v-if="selType == 3" src="../../static/img/cart_sel.png" />
				<img v-else src="../../static/img/cart.png" />
				<p :class="[selType == 3?'sel':'']">购物车</p>
				<span class="num" :class="[shopNum > 9?'num2':'']" >{{shopNum}}</span>
			</div>
			<div class="footList" @click="skipMe">
				<img v-if="selType == 4" src="../../static/img/me_sel.png" />
				<img v-else src="../../static/img/me.png" />
				<p :class="[selType == 4?'sel':'']">个人中心</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			
			}
		},
		props: [
			'selType',
			'shopNum'
		],
		computed:{
            isIphonex(){
                return this.$store.getters.isIphonex;
            },
       	},
		methods: {
			skipHome:function(e){
				wx.reLaunch({
					'url':'../index/main'
				})
			},
			skipClass:function(){
				wx.reLaunch({
					'url':'../allPro/main'
				})
			},
			skipMe:function(){
				wx.reLaunch({
					'url':'../me/main'
				})
			},
			skipCart:function(){
				wx.reLaunch({
					'url':'../shopCart/main'
				})
			}
		},
	}
</script>

<style scoped="scoped">
	.allFooter {
		position: fixed;
		bottom: 0;
		height: 112rpx;
		line-height: 112rpx;
		width: 100%;
		background-color: white;
		border-top: 2rpx solid #E5E5E5;
		z-index: 3;
	}
	
	.allFooter .footList {
		display: inline-block;
		vertical-align: middle;
		width: 25%;
		text-align: center;
		font-size: 0;
		line-height: 35rpx;
		position: relative;
	}
	
	.allFooter .footList .num{
		position: absolute;
		width: 35rpx;
		height: 35rpx;
		line-height: 35rpx;
		background-color: #5b0e12;
		text-align: center;
		font-size: 24rpx;
		color: white;
		border-radius: 100%;
		right: 38rpx;
		top: 6rpx;
		border: 2rpx solid white;
	}
	.allFooter .footList .num2{
		padding: 0 5rpx;
		border-radius: 30rpx;
	}
	.footList img {
		width: 50rpx;
		height: 50rpx;
		display: block;
		margin: 0 auto;
		margin-top: 10rpx;
	}
	
	.footList p {
		color: #323232;
		font-size: 26rpx;
		display: inline-block;
		margin-top: 6rpx;
	}
	
	.footList .sel {
		color: #5b0e12 !important;
	}
	
</style>