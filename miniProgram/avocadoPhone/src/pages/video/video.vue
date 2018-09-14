<template>
	<div class="container">
			<!--搜索框-->
			<div class="searchAll" @click="skipSearch">
				<seaInput/>
				<div class="layer"></div>
			</div>
			
			<!--分类名称-->
			<TypeList :TypeList='TypeList' :TypeListId="TypeListId" @changeType="changeTypeId"/>
			
			<!--视频列表-->
			<div class="videoList">
				<div class="viList" v-for="item in videoList" :key="item.id">
					<img src="../../../static/img/list2.png" />
					<div class="eli_two">加拿大择校必看“菲 排行榜”背后真正的参考价值|卑诗省篇</div>
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
				videoList:[1,1,1,1,1],
				selType:1
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
				this.TypeListId = e
			}
		},
	}
</script>

<style scoped>
	
	.videoList{
		margin-top: 30rpx;
		padding: 0 4%;
		padding-bottom: 1.6rem;
	}
	.videoList .viList{
		height: 586rpx;
		margin-top: 58rpx;
	}
	.videoList .viList img{
		width: 100%;
		height: 458rpx;
		border-radius: 8rpx;
	}
	.videoList .viList div{
		color: #3d3d3d;
		font-size: 32rpx;
		margin-top: 25rpx;
		line-height: 48rpx;
	}
</style>