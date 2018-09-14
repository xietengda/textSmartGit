<template>
	<div class="container">
			<!--搜索框-->
			<div class="searchAll" @click="skipSearch">
				<seaInput/>
				<div class="layer"></div>
			</div>
			
			<!--分类名称-->
			<TypeList :TypeList='TypeList' :TypeListId="TypeListId" @changeType="changeTypeId"/>
			
			<!--文章列表-->
			<div class="albumCn div_float">
				<div class="albList" v-for="(item,key) in albumList" :key="albumList" @click="skipOverseInfo">
					<div class="sub">
						<img src="../../../static/img/list2.png" />
						<div class="eli_two">加拿大择校必看“菲沙排行榜”背后真正的参考价值</div>
					</div>
				</div>
			</div>
				
			<!--公共底部-->
			<allFooter :selType="selType"/>
			
	</div>
</template>

<script>
	import seaInput from '../../components/seaInput'
	import allFooter from '../../components/footer'
	import TypeList from '../../components/TypeList'

	export default {
		data() {
			return {
				TypeList:[
					{text:'全部',id:1},
					{text:'分类1',id:2},
					{text:'分类2',id:3},
					{text:'分类3',id:4},
					{text:'分类4',id:5},
				],
				TypeListId:1,
				albumList:[1,1,1,1,1,1,1,1],
				selType:2
			}
		},

		components: {
			seaInput,
			allFooter,
			TypeList
		},

		methods: {
			skipSearch:function(){
				wx.navigateTo({
					url:'../search/main'
				})
			},
			changeTypeId:function(e){
				this.TypeListId = e;
			},
			//点击跳转
			skipOverseInfo:function(e){
				wx.navigateTo({
					url:'../overseasDetail/main'
				})
			}
		},
	}
</script>

<style scoped>
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
	.albumCn{
		margin-top: 40rpx;
		padding: 0 2%;
		padding-bottom: 1.2rem;
	}
	.albumCn .albList{
		float: left;
		width: 50%;
		margin-bottom: 20rpx;
		height: 380rpx;
	}
	.albumCn .albList .sub{
		width: 93%;
		margin: 0 auto;
	}
	.albumCn .albList img{
		width: 100%;
		height: 227rpx;
	}
	.albumCn .albList div{
		color: #121213;
		font-size: 28rpx;
		margin-top: 26rpx;
	}
</style>