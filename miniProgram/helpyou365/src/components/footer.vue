<template>
	<div>
		<!--1首页： 2：社区 3：个人中心-->
		<div class="allFooter" :class="[isIphonex ? 'ixBottom':'']" v-if="selType == 1">
			<div class="footList" @click="skipHome">
				<img src="../../static/img/home_sel.png" />
				<p class="sel">首页</p>
			</div>
			<div class="footList" @click="skipOverseas">
				<img src="../../static/img/msg.png" />
				<p>社区</p>
			</div>
			<div class="footList" @click="skipMe">
				<img src="../../static/img/me.png" />
				<p>我的</p>
			</div>
		</div>
		<div class="allFooter" :class="[isIphonex ? 'ixBottom':'']" v-else-if="selType == 2">
			<div class="footList"  @click="skipHome">
				<img src="../../static/img/home.png" />
				<p>首页</p>
			</div>
			<div class="footList">
				<img src="../../static/img/msg_sel.png" />
				<p class="sel">社区</p>
			</div>
			<div class="footList" @click="skipMe">
				<img src="../../static/img/me.png" />
				<p>我的</p>
			</div>
		</div>

		<div class="allFooter" :class="[isIphonex ? 'ixBottom':'']" v-else="selType == 3">
			<div class="footList"  @click="skipHome">
				<img src="../../static/img/home.png" />
				<p>首页</p>
			</div>
			<div class="footList"  @click="skipOverseas">
				<img src="../../static/img/msg.png" />
				<p>社区</p>
			</div>
			<div class="footList">
				<img src="../../static/img/me_sel.png" />
				<p class="sel">我的</p>
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
		],
		computed:{
            isIphonex(){
                return this.$store.store.state.isIphonex
            },
       	},
		methods: {
			skipHome:function(e){
				wx.reLaunch({
					'url':'../index/main'
				})
			},
			skipOverseas:function(){
				wx.reLaunch({
					'url':'../community/main'
				})
			},
			skipMe:function(){
				wx.reLaunch({
					'url':'../me/main'
				})
			}
		}
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
	}
	
	.allFooter .footList {
		display: inline-block;
		vertical-align: middle;
		width: 33.22%;
		text-align: center;
		font-size: 0;
		line-height: 35rpx;
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
		font-size: 24rpx;
		display: inline-block;
		margin-top: 6rpx;
	}
	
	.footList .sel {
		color: #F91D1D !important;
	}
	
</style>