<template>
	<div  class="albumCn div_float">
		<div class="albumList" v-for="item in albumList" :key="item.id" :data-id="item.id" :data-special-id='item.special_id'  @click='skipDetail'>
			<div class="img">
				<img :src="item.img" />
				<div class="num">共{{item.num}}话</div>
			</div>
			<div class="Til eli_two" >{{item.title}}</div>
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
			skipDetail(e){
				var sign ={
					'id':e.currentTarget.dataset.id,
					'specialId':e.currentTarget.dataset.specialId,
				}
				this.$emit('skipDetail',sign);
			}
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
		width:281rpx;
		height: 380rpx;
		margin: 0 auto;
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
		width:281rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		color: #121213;
		font-size: 28rpx;
		height: 80rpx;
		line-height: 40rpx;
		
	}
</style>