<template>
	<div>
		<div class="comList div_float" v-for="item in comList" :key='comList' @click="goDetial">
			<div class="L"><img  src="../../static/img/list2.png" /></div>
			<div class="R">
				<div class="cMsg">
			 		<div class="til eli_one">小叮当寿司<span class="yh">惠</span></div>
					<div class="subTil eli_one">リトルジングル寿司</div>
					<div class="price">人均：80元丨日本料理</div>
					<div class="addr div_float"><span class="sAddIcon"></span>广州市丨天河区 </div>
					<div class="distance">2.4km</div>
				</div>
			</div>
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
			'comList'
		],
		components: {
			
		},

		methods: {
			//点击推荐列表
			goDetial(){
				this.$emit('skipDetail');
			}
		},

		created() {}
	}
</script>

<style scoped>
	.comList{
		height: 244rpx;
		background-color: white;
		margin-bottom: 20rpx;
		padding: 0 5%;
		
	}
	.comList .L{
		float: left;
		height: 224rpx;
		line-height: 244rpx;
	}
	.comList .L img{
		width: 280rpx;
		height: 180rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.comList .R{
		float: left;
		height: 224rpx;
		line-height: 244rpx;
		margin-left: 30rpx;
	}
	.comList .cMsg{
		display: inline-block;
		vertical-align: middle;
		line-height: 45rpx;
		width: 350rpx;
		position: relative;
	}
	.cMsg .til{
		color: #333333;
		font-size: 32rpx;
	}
	.yh{
		width: 35rpx;
		height: 35rpx;
		border-radius: 5rpx;
		background-color: #ff4444;
		color: white;
		font-size: 24rpx;
		display: inline-block;
		text-align: center;
		line-height: 35rpx;
		vertical-align: middle;
		margin-top: -5rpx;
		margin-left: 10rpx;
	}
	.cMsg .subTil,.price{
		color: #666666;
		font-size: 24rpx;
	}
	.cMsg .addr{
		color: #333333;
		font-size: 24rpx;
	}
	.cMsg .addr>span{
		display: inline-block;
		vertical-align: middle;
		width: 21rpx;
		height: 23rpx;
		margin-right: 13rpx;
		margin-top: -5rpx;
	}
	.cMsg .distance{
		position: absolute;
		color: #333333;
		font-size: 24rpx;
		right: 0;
		bottom: 0;
	}
</style>