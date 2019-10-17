<template>
  <div class="container">
			<div class="orderHead">
				<div><span :class="[oState == 0?'sel':'']" data-s-type="0" @click="selOrderType">全部</span></div>
				<div><span :class="[oState == 1?'sel':'']" data-s-type="1" @click="selOrderType">待付款</span></div>
				<div><span :class="[oState == 2?'sel':'']" data-s-type="2" @click="selOrderType">待收货</span></div>
				<div><span :class="[oState == 3?'sel':'']" data-s-type="3" @click="selOrderType">已完成</span></div>
				<div><span :class="[oState == 4?'sel':'']" data-s-type="4" @click="selOrderType">退款/售后</span></div>
			</div>
			
			
			<div class="orderCn">
				<div class="list" v-for="(order,idx1) in orderLlist" :key="idx1" @click="skipOrderDetail(order.id)">
					<div class="til">
						<span v-if="idx1 == 0">待付款</span>
						<span v-else-if="idx1 == 1">待收货</span>
						<span v-else-if="idx1 == 2">已完成</span>
						<span v-else>退款/售后</span>
					</div>
					<div class="oMsg">
						<img src="/static/images/list1.png" />
						<div class="proTil">呼唤晒后修复精华焕新版</div>
					</div>
					<div class="btm">
						<div class="price">共1件商品，实付款<span>¥680.00</span></div>
						<div>
							<div class="btmView" v-if="idx1 == 0">
								<div>去付款</div>
							</div>

							<div class="btmView" v-else-if="idx1 == 1">
								<div>确认收货</div>
								<div>联系客服</div>
							</div>

							<div class="btmView" v-else-if="idx1 == 2">
								<div>联系客服</div>
							</div>

							<div class="btmView" v-else>
								<div>联系客服</div>
							</div>
						</div>
					</div>
				</div>
				
				<!-- <div class="list" @click="skipOrderDetail(1)">
					<div class="til">待收货</div>
					<div class="oMsg">
						<img src="/static/images/list1.png" />
						<div class="proTil">呼唤晒后修复精华焕新版</div>
					</div>
					<div class="oMsg">
						<img src="/static/images/list1.png" />
						<img src="/static/images/list1.png" />
					</div>
					<div class="btm">
						<div class="price">共1件商品，实付款<span>¥680.00</span></div>
						<div class="btmView">
							<div>查看订单</div>
							<div>售后进度</div>
						</div>
					</div>
				</div> -->

				
			</div>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
	  oState:0,//订单状态
	  orderLlist:[1,1,1,11,1]
    }
  },

  components: {
    
  },

  methods: {
	  //跳转订单详情
	  skipOrderDetail(orderId){
		  wx.navigateTo({
			  url: '/pages/orderDatail/main'
		  })
	  },
	  //选择订单类型
	  selOrderType(ele){
			this.oState = ele.currentTarget.dataset.sType;
	  }
  },
  onLoad(option){
	  console.log(option)
	this.oState = option.orderType;
	//请求
  },
}
</script>

<style scoped>
	.orderCn .list .btm  .btmView>div{
		display: inline-block;
		vertical-align: middle;
		width: 140rpx;
		height: 64rpx;
		border-radius: 8rpx;
		border: solid 2rpx #293462;		
		color: #293462;
		font-size: 24rpx;
		text-align: center;
		line-height: 64rpx;
		margin-left: 20rpx;
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
		color: #293462;
		border-bottom: 2rpx solid #293462;
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
