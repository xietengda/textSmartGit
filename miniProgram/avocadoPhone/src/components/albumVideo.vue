<template>
	<div  class="albumCn div_float">
		<div class="albumList" v-for="item in albumList" :key="item.id">
			<div class="img">
				<img src="../../static/img/list1.png" />
				<div class="num">共2话</div>
			</div>
			<div class="Til eli_two">加拿大系列《新生必修:落地,请开宝典!》</div>
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
			'albumList'
		],
		components: {
			
		},

		methods: {
			
		},
	}
</script>

<style>
	.albumCn{
		margin-top: 38rpx;
	}
	.albumCn .albumList{
		width: 46%;
		float: left;
		padding: 0 2%;
		margin-bottom: 40rpx;
	}
	.albumList .img{
		height: 380rpx;
		position: relative;
	}
	.albumList .img img{
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}
	.albumList .img .num{
		position: absolute;
		bottom: 12rpx;
		right: 31rpx;
		color: #ffffff;
		font-size: 24rpx;
	}
	.albumList .Til{
		margin-top: 20rpx;
		color: #121213;
		font-size: 28rpx;
	}
</style>