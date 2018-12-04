<template>
		<div class="head">
			<div class="headSub">
				<div class="back backIcon" @click="goBack" :hidden="hiddenBack"></div>
				<div class="headText">{{headTil}}</div>
			</div>
		</div> 
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:[
			'headTil',
			'hiddenBack',//隐藏返回按钮
		],
		components: {
			
		},

		methods: {
			//点击推荐列表
			goDetial(){
				this.$emit('skipDetail');
			}
		},

		created() {}
	}
</script>

<style scoped>
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