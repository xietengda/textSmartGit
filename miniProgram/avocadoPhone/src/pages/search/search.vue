<template>
	<div class="container">
		
		<!--搜索框-->
		<seaInput :foucsText="foucsText"/>
		
		<!--标签-->
		<div class="labelCn">
			<div class="labelTil">热门搜索</div>
			<div class="labelList">
				<labelList :labelList="labelList"/>
			</div>
		</div>
			
	</div>
</template>

<script>
	import labelList from '../../components/labelList'
	import seaInput from '../../components/seaInput'
	
	export default {
		data() {
			return {
				labelList:[1,1,1,1],
				foucsText:true
			}
		},

		components: {
			seaInput,
			labelList
		},

		methods: {
		},
	}
</script>

<style scoped>
	.labelCn{
		margin-top: 50rpx;
		padding: 0 50rpx;
	}
	.labelCn .labelTil{
		color: #757575;
		font-size: 24rpx;
	}
	.labelCn .labelList{
		margin-top: 50rpx;
	}
</style>