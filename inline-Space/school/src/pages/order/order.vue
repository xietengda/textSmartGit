<template>
  <div class="container">
			<div class="orderHead">
				<div><span :class="[oState == 0?'sel':'']">全部</span></div>
				<div><span>待付款</span></div>
				<div><span>待收货</span></div>
				<div><span>已完成</span></div>
				<div><span>退款/售后</span></div>
			</div>
			
			
			<div class="orderCn">
				<div class="list">
					<div class="til">待付款</div>
					<div class="oMsg">
						<img src="../../../static/images/list1.png" />
						<div class="proTil">呼唤晒后修复精华焕新版</div>
					</div>
					<div class="btm">
						<div class="price">共1件商品，实付款<span>¥680.00</span></div>
						<div class="btmView">
							<div>去付款</div>
						</div>
					</div>
				</div>
				
				<div class="list">
					<div class="til">待收货</div>
					<div class="oMsg">
						<img src="../../../static/images/list1.png" />
						<div class="proTil">呼唤晒后修复精华焕新版</div>
					</div>
					<div class="oMsg">
						<img src="../../../static/images/list1.png" />
						<img src="../../../static/images/list1.png" />
					</div>
					<div class="btm">
						<div class="price">共1件商品，实付款<span>¥680.00</span></div>
						<div class="btmView">
							<div>查看订单</div>
							<div>售后进度</div>
						</div>
					</div>
				</div>

				
			</div>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
      oState:0,//订单状态
    }
  },

  components: {
    
  },

  methods: {
  	
  },

  created () {
   
  }
}
</script>

<style scoped>
	.orderCn .list .btm  .btmView>div{
		display: inline-block;
		vertical-align: middle;
		width: 140rpx;
		height: 64rpx;
		border-radius: 8rpx;
		border: solid 2rpx #5b0e12;		
		color: #5b0e12;
		font-size: 24rpx;
		text-align: center;
		line-height: 64rpx;
	}
	.orderCn .list .btm  .btmView{
		text-align: right;
	}
	.orderCn .list .btm .price span{
		color: #333333;
		font-size: 32rpx;
		font-weight: bold;
	}
	.orderCn .list .btm .price{
		height: 90rpx;
		line-height: 90rpx;
		text-align: right;
		color: #666666;
		font-size: 24rpx;
		letter-spacing: 4rpx;
	}
	.orderCn .list .oMsg .proTil{
		display: inline-block;
		vertical-align: top;
		width: 75%;
		color: #333333;
		font-size: 24rpx;
		line-height: 40rpx;
		margin-top: 30rpx;
	}
	.orderCn .list .oMsg img{
		display: inline-block;
		vertical-align: middle;
		width: 120rpx;
		height: 120rpx;
		border: 2rpx solid #e5e5e5;
		margin-right: 24rpx;
	}
	.orderCn .list .oMsg{
		min-height: 185rpx;
		line-height: 185rpx;
		font-size: 0;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.orderCn .list .til{
		height: 79rpx;
		line-height: 79rpx;
		font-size: 24rpx;
		color: #333333;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.orderCn .list{
		background-color: white;
		padding: 0 2%; 
		border-bottom: 2rpx solid #E5E5E5;
		margin-bottom: 20rpx;
		padding-bottom: 32rpx;
	}
	.orderCn{
		background-color: #F7F7F7;
	}
	.orderHead>div .sel{
		color: #5B0E12;
		border-bottom: 2rpx solid #5B0E12;
	}
	.orderHead>div span{
		padding: 0 5rpx;
		display: inline-block;
		vertical-align: middle;
		line-height: 68rpx;
	}
	.orderHead>div{
		display: inline-block;
		vertical-align: middle;
		line-height: 82rpx;
		color: #333333;
		font-size: 28rpx;
		width: 20%;
		text-align: center;
	}
	.orderHead{
		height: 86rpx;
		line-height: 86rpx;
		padding: 0 2%;
		border-bottom: 2rpx solid #E5E5E5;
	}
</style>
