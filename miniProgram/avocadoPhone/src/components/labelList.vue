<template>
	<div class="label">
		<div  v-for="item in labelList" :key="item.id">留学</div>
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
		border-radius: 18rpx;
		margin-right: 20rpx;
		color: #525252;
		font-size: 26rpx;
	}
</style>