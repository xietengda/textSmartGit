<template>
	<div v-show="noMore" class="noMore">
		<p>-  暂无更多内容  -</p>
	</div>	
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:[
			'noMore',
		],
		methods:{
			
		}
	}
</script>

<style scoped="scoped">
	.noMore{
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		color: #a9bed0;
		font-size: 24rpx;
	}
</style>