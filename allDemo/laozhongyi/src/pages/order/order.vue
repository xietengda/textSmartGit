<template>
  <div class="container">
			<div class="orderHead">
				<div><span :class="[odState == 0?'sel':'']" data-od-state='0' @click="seaOrder">全部</span></div>
				<div><span :class="[odState == 2?'sel':'']" data-od-state='2' @click="seaOrder">待付款</span></div>
				<div><span :class="[odState == 3?'sel':'']" data-od-state='3' @click="seaOrder">待收货</span></div>
				<div><span :class="[odState == 4?'sel':'']" data-od-state='4' @click="seaOrder">已完成</span></div>
				<div><span :class="[odState == 5?'sel':'']" data-od-state='5' @click="seaOrder">退款/售后</span></div>
			</div>
			
			
			<div class="orderCn" v-if='orderList.length != 0'>
				<div class="list" v-for='(item,key) in orderList' :key='item.id'>
					<div class="til">{{item.status_name}}</div>
					<div v-if="item.goods_list.length == 1" :data-order-id='item.order_id' @click="skipDetail">
						<div class="oMsg"  v-for="(item2,key2) in item.goods_list" :key='item2.id'>
							<img :src="item2.goods_thumb" />
							<div class="proTil">{{item2.goods_name}}</div>
						</div>
					</div>
					<div class="oMsg" v-else :data-order-id='item.order_id' @click="skipDetail">
						<img :src="item3.goods_thumb" v-for="(item3,key3) in item.goods_list" :key='item3.id' />
					</div>
					<div class="btm">
						<div class="price">共{{item.goods_count}}件商品，需付款<span>{{item.format_total_fee}}</span></div>
						<div class="btmView">
							<!--待付款-->
							<div v-if="item.status == 2">去支付</div>
							<!--待发货-->
							<div v-else-if="item.status == 3">查看订单</div>
							<!--待收货-->
							<div v-else-if="item.status == 4">查看订单</div>
							<!--已完成-->
							<div v-else-if="item.status == 5">已完成</div>
							<!--退款成功-->
							<div v-else-if="item.status == 7">售后进度</div>
						</div>
					</div>
				</div>
				
			</div>
			
			<div class='noProduct' v-else>
			    <div class='nullCart'>
			      <div class='nullIcon nullOrder'></div>
			      <div class='nullText'>没有相关订单</div>
			    </div>
			</div>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
    	Request: this.$api.api.prototype, //请求头
			util: this.$util.util.prototype, //工具类
      odState:0,//订单状态
      page:1,//页码
      orderList:[],//订单列表
    }
  },

  components: {
    
  },

  methods: {
  	//获取订单列表
  	getOrderListFun(){
  		var that  = this;
  		//出现加载动画
  		wx.showLoading();
  		
  		that.Request.getOrderList(wx.getStorageSync('userId'),that.odState,that.page)
  			.then(res =>{
  				console.log(res)
  				if(res.code == 200){
  					//隐藏加载动画
  					wx.hideLoading();
  					
  					let oList = res.data.order_list;
  					for(let x in oList){
  						for(let y in oList[x].goods_list){
  							oList[x].goods_list[y].goods_thumb = that.Request.getUrl() + oList[x].goods_list[y].goods_thumb;
  						}
  					}
  					
  					
  					if(that.page != '1' && that.page != 'end'){
  						//设置订单列表
  						that.orderList  = that.orderList.concat(oList);
  					}else{
  						//设置订单列表
  						that.orderList = that.util.conJson(oList);
  					}
  					
  					if(res.data.pager.page < res.data.pager.page_count){
  						that.page = parseInt(that.page) + 1;
  					}else{
  						that.page = 'end';
  					}
  					
  				}
  			})
  			.catch(res =>{
  				console.log(res)
  			})
  	},
  	//切换订单列表
  	seaOrder(e){
  		this.odState = e.currentTarget.dataset.odState;
  		this.page  = 1;
  		this.getOrderListFun();
  	},
  	//跳转订单详情
  	skipDetail(e){
  		wx.navigateTo({
  			url:'/pages/orderDatail/main?orderId='+e.currentTarget.dataset.orderId
  		});
  	}
  },

  async onShow(){
  	var that = this;
  	this.page = 1;
  	this.odState = this.$root.$mp.query.odState;
  	console.log(this.odState)
  	await this.util.checkLogin()
  		.then(res =>{
  			console.log(res)
  			that.getOrderListFun();
  		})
  		.catch(res =>{
  			console.log(rse)
  		})
   	
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
