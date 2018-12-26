<template>
	<div>
		<!--1：视频 2：资讯 3：个人中心-->
		<div class="allFooter" :class="[isIphonex ? 'ixBottom':'']" v-if="selType == 1">
			<div class="footList" @click="skipHome" :data-is-index="isIndex">
				<img src="../../static/img/video_sel.png" />
				<p class="sel">精选视频</p>
			</div>
			<div class="footList" @click="skipOverseas">
				<img src="../../static/img/msg.png" />
				<p>留学资讯</p>
			</div>
			<div class="footList" @click="skipMe">
				<img src="../../static/img/me.png" />
				<p>个人中心</p>
			</div>
		</div>
		<div class="allFooter" :class="[isIphonex ? 'ixBottom':'']" v-else-if="selType == 2">
			<div class="footList"  @click="skipHome">
				<img src="../../static/img/video.png" />
				<p>精选视频</p>
			</div>
			<div class="footList">
				<img src="../../static/img/msg_sel.png" />
				<p class="sel">留学资讯</p>
			</div>
			<div class="footList" @click="skipMe">
				<img src="../../static/img/me.png" />
				<p>个人中心</p>
			</div>
		</div>

		<div class="allFooter" :class="[isIphonex ? 'ixBottom':'']" v-else="selType == 3">
			<div class="footList"  @click="skipHome">
				<img src="../../static/img/video.png" />
				<p>精选视频</p>
			</div>
			<div class="footList"  @click="skipOverseas">
				<img src="../../static/img/msg.png" />
				<p>留学资讯</p>
			</div>
			<div class="footList">
				<img src="../../static/img/me_sel.png" />
				<p class="sel">个人中心</p>
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
			'isIndex'
		],
		computed:{
            isIphonex(){
                return this.$store.store.state.isIphonex
            },
       	},
		methods: {
			skipHome:function(e){
				var isIndex = e.currentTarget.dataset.isIndex;
				if(!isIndex){
					wx.reLaunch({
						'url':'../index/main'
					})
				}
			},
			skipOverseas:function(){
				wx.reLaunch({
					'url':'../overseasInfo/main'
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
	}
	
	.allFooter .footList {
		display: inline-block;
		vertical-align: middle;
		width: 33.22%;
		text-align: center;
		font-size: 0;
		line-height: 35rpx;
	}
	
	.allFooter>div:nth-child(2) img {
		width: 65rpx !important;
	}
	
	.footList img {
		width: 50rpx;
		height: 50rpx;
		display: block;
		margin: 0 auto;
		margin-top: 10rpx;
	}
	
	.footList p {
		color: #8b9fb0;
		font-size: 24rpx;
		display: inline-block;
		margin-top: 6rpx;
	}
	
	.footList .sel {
		color: #8fcd31 !important;
	}
	
</style>