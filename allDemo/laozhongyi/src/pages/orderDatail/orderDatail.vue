<template>
  <div class="container">
			<div class="sub">
				<div class="odHead">
					<div class="sub">
						<div><span class="gouIcon"></span>{{orderMsg.status_name}}</div>
					</div>
				</div>
					
				<!--地址-->
				<div class="adrMsg div_float">
					<div class="L"><span class="adrIcon"></span></div>
					<div class="R">
						<div class="sub">
							<div><span>{{orderMsg.consignee}}</span>{{orderMsg.mobile}}</div>
							<div>{{orderMsg.address}}</div>
						</div>
					</div>
				</div>
	    	
	    	<!--商品信息-->
	    	<div class="reMsg">
	    		<div class="reCn">
	    			<div class="list div_float" v-for='(item,key) in goodList' :key='item.id'>
	    				<img :src="item.goods_thumb" />
	    				<div class="R">
	    						<div class="til">{{item.goods_name}}</div>
		    					<div class="ml">数量：{{item.goods_number}}</div>
	    				</div>
	    				<div class="num">{{item.formated_goods_price}}</div>
	    			</div>
	    		</div>
	    	</div>
	    	
	    	<!--订单信息-->
	    	<div class="odMsg">
	    		<div>订单编号：{{orderMsg.order_sn}}</div>
	    		<div>下单时间：{{orderMsg.add_time}}</div>
	    	</div>
	    	
	    	<!--付款方式-->
	    	<div class="payType">
	    		<div>付款方式：{{payMsg.pay_desc}}</div>
	    		<div>配送方式：{{orderMsg.shipping_name}}</div>
	    	</div>
	    	
	    	<!--发票-->
	    	<div class="invoice">
	    		<div class="no" v-if="!invoiceMsg.isOpen">发票类型：不开发票</div>
	    		<!--个人-->
	    		<div class="yes" v-else-if="invoiceMsg.isOpen && invoiceMsg.inv_payee_type == 'individual'">
	    			<div>发票类型：{{invoiceMsg.inv_type_name}}</div>
	    			<div>电子邮箱：{{invoiceMsg.inv_content}}</div>
	    		</div>
	    		<!--单位-->
	    		<div class="yes" v-else-if="invoiceMsg.isOpen && invoiceMsg.inv_payee_type == 'unit'">
	    			<div>发票类型：{{invoiceMsg.inv_type_name}}</div>
	    			<div>发票抬头：{{invoiceMsg.vat_inv_company_name}}</div>
	    			<div>纳税人识别号：{{invoiceMsg.vat_inv_taxpayer_id}}</div>
	    			<div>电子邮箱：{{invoiceMsg.inv_content}}</div>
	    		</div>
	    	</div>
	    	
				<!--物流信息-->    	
	    	<div class="express" v-if="orderMsg.status == 3 || orderMsg.status == 4">
	    		<div class="head" @click="openExpress">
	    			<div class="L">
	    				<div class="til">物流信息</div>
	    				<div>运单号：申通快递   910025412684155</div>
	    			</div>
	    			<div class="R arr_g" :class="[showExpress ? 'expOpen':'']"></div>
	    		</div>
	    		<div class="expressCn" v-if="showExpress">
	    			<div>
	    				<div>仓库已发货，快递揽件中</div>
	    				<div>2018-10-13 10：41：33</div>
	    			</div>
	    			<div>
	    				<div>仓库已发货，快递揽件中</div>
	    				<div>2018-10-13 10：41：33</div>
	    			</div>
	    		</div>
	    	</div>
	    	
	    	<!--商品总额-->
	    	<div class="priceView">
	    		<div class="div_float">
	    			<div class="L">商品总额</div>
	    			<div class="R">{{orderMsg.formated_goods_amount}}</div>
	    		</div>
	    		<div class="div_float">
	    			<div class="L">运费</div>
	    			<div class="R">{{orderMsg.formated_shipping_fee}}</div>
	    		</div>
	    		<div class="div_float">
	    			<div class="L">减免</div>
	    			<div class="R">-¥0.00</div>
	    		</div>
	    		<div class="div_float">
	    			<div class="L">优惠券</div>
	    			<div class="R">-{{orderMsg.formated_bonus}}</div>
	    		</div>
	    	</div>
	    	
	    	<!--实付-->
	    	<div class="payment">
	    		<div>需付款：<span>{{orderMsg.formated_order_amount}}</span></div>
	    	</div>
	    	
	    	
	    	<!--待付款-->
	    	<div class="odBtm div">
	    		<div v-if='odState == 2 || odState == 3 || odState == 6'>联系客服 <button open-type='contact'></button></div>
	    		<div v-if='odState == 2' @click="cancelOrderFun">取消订单</div>
	    		<div v-if='odState == 2' class="sel" >去支付</div>
	    		<div v-if='odState == 3' class="sel">退款</div>
	    		<div v-if='odState == 6' @click="delOrderFun">删除订单</div>
	    		<div v-if='odState == 8'>确认</div>
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
     	showExpress:false,//显示物流信息
     	orderId:'',//订单id
     	odState:'',//订单状态
     	orderMsg:'',//订单信息
     	goodList:[],//商品列表
     	payMsg:'',//付款信息
     	invoiceMsg:'',//发票信息 
    }
  },

  components: {
    
  },

  methods: {
  	//展开物流信息
  	openExpress(){
  		var sign = true;
  		if(this.showExpress){
  			sign = false;
  		}
  		this.showExpress = sign;
  	},
  	//获取订单详情
  	getOrderDetial(){
  		var that = this; 
  		that.Request.orderDetail(wx.getStorageSync('userId'),that.orderId)
  			.then(res =>{
  				console.log(res)
  				if(res.code == 200){
  					//设置订单信息
  					that.orderMsg = that.util.conJson(res.data.order_info);
  					//设置订单状态
  					that.odState = res.data.order_info.status;
  					
  					for(let x in res.data.goods_list){
  						res.data.goods_list[x].goods_thumb = that.Request.getUrl() + res.data.goods_list[x].goods_thumb;
  					}
  					//设置商品信息
  					that.goodList = that.util.conJson(res.data.goods_list);
  					
  				
						//设置付款信息
						that.payMsg = that.util.conJson(res.data.order_info.payment);
						
						//判断是否开票
						if(res.data.order_info.invoice.inv_payee_type == 'individual'){
							//个人
							res.data.order_info.invoice.isOpen = true;
						}else if(res.data.order_info.invoice.inv_payee_type == 'unit'){
							//单位
							res.data.order_info.invoice.isOpen = true;
						}else{
							res.data.order_info.invoice.isOpen = false;
						}
						
							//设置发票信息
						that.invoiceMsg = that.util.conJson(res.data.order_info.invoice);

						
						
  				}
  			})
  			.catch(res =>{
  				console.log(res)
  			})
  	},
  	//取消订单
  	cancelOrderFun(){
  		var that  = this;
  		that.Request.cancelOrder(wx.getStorageSync('userId'),that.orderId)
  			.then(res =>{
  				console.log(res)
  				if(res.code == 200){
  						this.getOrderDetial();
  				}
  			})
  	},
  	//删除订单
  	delOrderFun(){
  		var that = this;
  		that.Request.delOrder(wx.getStorageSync('userId'),that.orderId)
  			.then(res =>{
  				console.log(res)
  				if(res.code == 200){
  					wx.navigateBack();
  				}
  			})
  			.catch(err =>{
  				console.log(err);
  			})
  	}
  },

  onShow () {
  	this.orderId = this.$root.$mp.query.orderId;
  	this.getOrderDetial();
  }
}
</script>

<style scoped>
	.expressCn>div>div:nth-child(2){
		color: #999999;
		font-size: 20rpx;
	}
	.expressCn>div{
		color: #666666;
		font-size: 24rpx;
		line-height: 40rpx;
		margin-bottom: 20rpx;
	}
	.expressCn{
		padding: 20rpx 2%;
	}
	.express .head .R{
		position: absolute;
		right: 31rpx;
		bottom: 16rpx;
		display: inline-block;
		vertical-align: middle;
		width: 16rpx;
		height: 38rpx;
		transform: rotate(90deg);
	}
	.expOpen{
		transform: rotate(270deg) !important;
	}
	.express .head .til{
		color: #333333;
		font-size: 28rpx;
	}
	.express .head .L{
		display: inline-block;
		vertical-align: middle;
		color: #666666;
		font-size: 24rpx;
		line-height: 50rpx;
	}
	.express .head{
		height: 134rpx;
		line-height: 134rpx;
		padding: 0 2%;
		border-bottom: 2rpx solid #E5E5E5;
		position: relative;
	}
	.express{
		margin-top: 20rpx;
		background-color: white;
	}
	.payment span{
		color: #5b0e12;
		font-size: 36rpx;
		font-weight: bold;
	}
	.payment{
		height: 78rpx;
		line-height: 78rpx;
		text-align: right;
		padding: 0 2%;
		color: #666666;
		font-size: 28rpx;
		background-color: white;
	}
	.priceView>div .R{
		float: right;
	}
	.priceView>div .L{
		float: left;
	}
	.priceView>div{
		line-height: 50rpx;
		color: #666666;
		font-size: 28rpx;
	}
	.priceView{
		padding: 20rpx 2%;
		background-color: white;
		margin-top: 20rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.invoice .yes>div{
		padding: 0 2%;
		color: #666666;
		font-size: 24rpx;
		line-height: 50rpx;
	}
	.invoice .no{
		border: none;
	}
	.invoice{
		padding-top: 20rpx;
		padding-bottom: 40rpx;
		background-color: white;
	}
	.payType>div,.invoice .no{
		height: 82rpx;
		line-height: 82rpx;
		border-bottom: 2rpx solid #E5E5E5;
		color: #666666;
		font-size: 24rpx;
		padding: 0 2%;
		background-color: white;
	}
	.odMsg{
		color: #666666;
		font-size: 24rpx;
		line-height: 50rpx;
		background-color: white;
		padding: 10rpx 2%;
		border-bottom: 2rpx solid #E5E5E5;
		margin-top: 20rpx;
	}
	.adrMsg .R span{
		font-size: 28rpx;
		font-weight: bold;
		margin-right: 35rpx;
	}
	.adrMsg .R .sub{
		display: inline-block;
		vertical-align: middle;
		line-height: 50rpx;
	}
	.adrMsg .R{
		float: left;
		color: #666666;
		font-size: 24rpx;
		margin-left: 20rpx;
		width: 90%;
	}
	.adrMsg .L span{
		display: inline-block;
		vertical-align: middle;
		width: 24rpx;
		height: 32rpx;
	}
	.adrMsg>div{
		float: left;
	}
	.adrMsg{
		height: 136rpx;
		line-height: 136rpx;
		padding: 0 2%;
		font-size: 0;
		background-color: white;
	}
	.odBtm>div{
		display: inline-block;
		vertical-align: middle;
		width: 140rpx;
		height: 64rpx;
		text-align: center;
		line-height: 64rpx;
		color: #666666;
		font-size: 24rpx;
		border: 2rpx solid #666;
		border-radius: 8rpx;
		margin: 0 10rpx;
		position: relative;
	}
	.odBtm{
		height: 98rpx;
		line-height: 98rpx;
		font-size: 0;
		text-align: right;
		width: 100%;
		bottom: 0;
		position: fixed;
		background-color: white;
		border-top: 2rpx solid #E5E5E5;
		position: relative;
	}
	.odBtm button{
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.odBtm .sel{
		border-color: #5B0E12;
		color: #5B0E12;
	}

	.reMsg .reCn .list .num{
		position: absolute;
		right: 0;
		bottom: 27rpx;
		color: #333333;
		font-size: 24rpx;
		line-height: 40rpx;
	}
	.reMsg .reCn .list .R .ml{
		margin-top: 46rpx;
	}
	.reMsg .reCn .list .R{
		display: inline-block;
		vertical-align: middle;
		width: 60%;
		line-height: 40rpx;
		height: 120rpx;
		color: #333333;
		font-size: 24rpx;
		margin-left: 25rpx;
	}
	.reMsg .reCn .list img{
		display: inline-block;
		vertical-align: middle;
		width: 120rpx;
		height: 120rpx;
	}
	.reMsg .reCn .list:last-child{
		border: none;
	}
	.reMsg .reCn .list{
		height: 184rpx;
		line-height: 184rpx;
		position: relative;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.reMsg .reTil{
		height: 90rpx;
		line-height: 90rpx;
		font-size: 24rpx;
		color: #333333;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.reMsg{
		margin-top: 20rpx;
		background-color: white;
		padding: 0 2%;
		padding-bottom: 20rpx;
	}
	
	.odHead .sub span{
		display: inline-block;
		vertical-align: middle;
		width: 43rpx;
		height: 43rpx;
		margin-top: -5rpx;
		margin-right: 35rpx;
	}
	.odHead .sub{
		display: inline-block;
		vertical-align: middle;
		line-height: 50rpx;
		color: #ffffff;
		font-size: 32rpx;
		font-weight: bold;
	}
	.odHead{
		height: 120rpx;
		line-height: 120rpx;
		background-color: #5b0e12;
		padding: 0 2%;
	}
	
	.container>.sub{
		background-color: #F7F7F7;
	}
	.container{
		padding-bottom: 100rpx;
	}
</style>
