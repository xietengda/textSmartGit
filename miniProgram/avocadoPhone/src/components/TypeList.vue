<template>
	<!--分类-->
	<div class="albumTilAll">
		<scroll-view class="albumTil" scroll-x>
			 <p v-for="(item,key) in TypeList" :class="[item.id == TypeListId ? 'sel':'']" :key="TypeList" @click="changeType" :data-type-id='item.id'>{{item.text}}</p>
		</scroll-view>
		<div class="Shadow shaDowIcon"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props:[
			'TypeList',
			'TypeListId'
		],
		components: {
		},

		methods: {
			changeType:function(e){
				console.log(e.currentTarget.dataset.typeId)
				this.$emit('changeType',e.currentTarget.dataset.typeId)
			}
		},
	}
</script>

<style>
	.albumTilAll{
		position: relative;
		width: 92%;
		margin: 0 auto;
	}
	.albumTil{
		height: 75rpx;
		white-space: nowrap;
		margin-top: 10rpx;
		border: none;
	}
	.albumTilAll .Shadow{
		position: absolute;
		right: 0;
		width: 20rpx;
		height: 75rpx;
		top: 0;
	}
	.albumTil p{
		color: #757575;
		font-size: 26rpx;
		display: inline-block;
		margin-right: 110rpx;
		line-height: 70rpx;
	}
	.albumTil .sel{
		border-bottom: 5rpx solid #d1e36f;
		color: #121213 !important;
	}
</style>