<template>
	<div class="label">
		<div  v-for="item in labelList" :key="item.id" :data-sea-text='item' @click="skipSearch">{{item}}</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:[
			'labelList',
		],
		methods:{
			skipSearch:function(e){
				wx.navigateTo({
					url:'../searchResult/main?searchText='+e.currentTarget.dataset.seaText
				})
			}
		}
	}
</script>

<style>
	.label{
		margin: 50rpx 0;
	}
	.label div{
		display: inline-block;
		padding: 4rpx 22rpx;
		background-color: #eeeeee;
		border-radius: 50rpx;
		margin-right: 20rpx;
		color: #525252;
		font-size: 26rpx;
		margin-bottom: 20rpx;
	}
</style>