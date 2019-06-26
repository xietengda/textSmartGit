<template>
	<div>
		<div v-if='comList.length != 0' class="comlistCn">
			<div class="comList div_float"v-for="item in comList" :key='comList' :data-goods-id='item.goods_id' @click="goDetial">
				<div class="L"><img  :src="item.thumbnail" /></div>
				<div class="R">
					<div class="cMsg">
				 		<div class="til eli_one">{{item.goods_name}}<span class="yh"  v-if='item.recommended == 1'>{{language.iDiscount}}</span></div>
						<div class="subTil eli_one">{{item.sub_name}}</div>
						<div class="price">{{language.imean}}：{{item.price}}{{language.iUnit}}丨{{item.sort_name}}</div>
						<div class="addr div_float"><span class="sAddIcon"></span>{{item.city}}丨{{item.district}} </div>
						<div class="distance" :hidden="hideKm">{{item.distance}}km</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="atlasNull" v-else>
			<div class="icon nullPhoto"></div>
			<div class="til">{{language.noMerChart}}</div>
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
			'comList',
			'language',
			'hideKm'
		],
		components: {
			
		},

		methods: {
			//点击推荐列表
			goDetial(e){
				this.$emit('skipDetail',e);
			}
		},

		created() {}
	}
</script>

<style scoped>
	
	.comlistCn{
		background-color: #F5F5F5;
	}
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
		padding: 0 10rpx;
		min-width: 35rpx;
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