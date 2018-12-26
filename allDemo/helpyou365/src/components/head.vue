<template>
	<div>
		<!--公共头部-->
		<div class="head" :class="[isIphonex ? 'ixHead':'']">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div class="headText">{{headTil}}</div>
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
			'headTil',
		],
		computed:{
            isIphonex(){
                return this.$store.store.state.isIphonex
            },
       	},
		methods: {
			//返回
			goBack(){
				wx.navigateBack();
			},
		}
	}
</script>

<style scoped="scoped">
	.headText{
		font-size: 38rpx;
	}
	.head .back{
		width:18rpx;
		height:80rpx;
		padding-right:80rpx;
		background-size:18rpx 37rpx;
		background-repeat:no-repeat;
		position:absolute;
		margin:auto;
		top:0;
		bottom:0;
		left:0;
		background-position:center left;
	}
	.headSub {
		position: relative;
	}
	.head {
		height: 90rpx;
		line-height: 90rpx;
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