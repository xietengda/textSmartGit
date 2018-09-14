<template>
	<div class="container">
		
		<!--搜索框-->
		<seaInput :seaResult='seaResult' @seachFun='seachRea'/>
		
		<div v-show="!seachNull">
			<!--类型选择-->
			<div class="videoType">
				<div :data-type-id="1" @click="changeType">全部
					<div :class="[seaType == 1?'sel':'']"></div>
				</div>
				<div :data-type-id="2" @click="changeType">图文
					<div :class="[seaType == 2?'sel':'']"></div>
				</div>
				<div :data-type-id="3" @click="changeType">视频
					<div :class="[seaType == 3?'sel':'']"></div>
				</div>
			</div>
			
			<!--搜索结果-->
			<div class="resultCn">
				<videoList :videoData="videoData" />
			</div>
		</div>
		
		<!--搜索空结果-->
		<div class="cnNull" v-show="seachNull">
			<div class="icon seaNullIcon"></div>
			<div class="cn greendT">暂无相关内容</div>
			<div class="goPage">回首页~</div>
		</div>
			
	</div>
</template>

<script>
	import seaInput from '../../components/seaInput'
	import videoList from '../../components/videoList'
	
	export default {
		data() {
			return {
				seaType:1,
				videoData:[1,1,1,1,],
				seachNull:false,
				seaResult:true,//标识这是搜索结果页
			}
		},

		components: {
			seaInput,
			videoList
		},

		methods: {
			changeType:function(e){
				this.seaType = e.currentTarget.dataset.typeId;
			},
			seachRea:function(e){
				console.log(e+'父搜索')
			}
		},
	}
</script>

<style scoped>
	.videoType{
		text-align: center;
		height: 60rpx;
		line-height: 55rpx;
		margin-top: 40rpx;
		font-size: 0;
	}
	.videoType>div{
		display: inline-block;
		margin: 0 60rpx;
		color: #121213;
		font-size: 24rpx;
		position: relative;
	}
	.videoType>div>div{
		position: absolute;
		width: 34rpx;
		height: 7rpx;
		border-radius: 4rpx;
		background-color: white;
		margin: auto;
		left: 0;
		right: 0;
	}
	.videoType .sel{
		background-color: #d1e36f !important;
	}
	
	
	.seaNullIcon{
		background: url('data:image/png;base64,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');
		background-size: 100% 100%;
	}
	
</style>