<template>
  <div class="container">
			<div class="odHead">
				<div class="sub">
					<div><span class="gouIcon"></span>已付款</div>
				</div>
			</div>
				
			<!--地址-->
			<div class="adrMsg div_float">
				<div class="L"><span class="adrIcon"></span></div>
				<div class="R">
					<div class="sub">
						<div><span>朱小姐</span>15915804116</div>
						<div>广州市海珠区昌岗中路166号富盈国际大厦2505室</div>
					</div>
				</div>
			</div>
    	
    	<!--商品信息-->
    	<div class="reMsg">
    		<div class="reCn">
    			<div class="list div_float" v-for='(item,key) in reList' :key='key'>
    				<img src="/static/images/list1.png" />
    				<div class="R">
    						<div class="til">呼唤晒后修复精华焕新版</div>
	    					<div class="ml">数量：2</div>
    				</div>
    				<div class="num">¥600.00</div>
    			</div>
    		</div>
    	</div>
    	
    	<!--订单信息-->
    	<div class="odMsg">
    		<div>订单编号：13238047</div>
    		<div>下单时间：2018-10-10  17:12</div>
    	</div>
    	
    	<!--付款方式-->
    	<div class="payType">
    		<div>付款方式：在线付款</div>
    		<div>配送方式：商家配送</div>
    	</div>
    	
    	<!--发票-->
    	<div class="invoice">
    		<div class="no">发票类型：不开发票</div>
    		<div class="yes">
    			<div>发票类型：电子发票</div>
    			<div>发票抬头：广州市惟诚网络科技有限公司</div>
    			<div>发票内容：商品明细</div>
    			<div>纳税人识别号：916553525533555</div>
    		</div>
    	</div>
    	
			<!--物流信息-->    	
    	<div class="express">
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
    			<div class="R">¥3200.00</div>
    		</div>
    		<div class="div_float">
    			<div class="L">运费</div>
    			<div class="R">¥0.00</div>
    		</div>
    		<div class="div_float">
    			<div class="L">减免</div>
    			<div class="R">-¥0.00</div>
    		</div>
    		<div class="div_float">
    			<div class="L">优惠券</div>
    			<div class="R">-¥10.00</div>
    		</div>
    	</div>
    	
    	<!--实付-->
    	<div class="payment">
    		<div>需付款：<span>¥3200.00</span></div>
    	</div>
    	
    	
    	<!--待付款-->
    	<div class="odBtm div" :hidden="true">
    		<div>联系客服</div>
    		<div>取消订单</div>
    		<div class="sel">去支付</div>
    	</div>
    	
    	<!--代发货-->
    	<div class="odBtm">
    		<div>联系客服</div>
    		<div class="sel" @click="skipSalesRetrun">退款</div>
    	</div>
    	
    	<!--已取消-->
    	<div class="odBtm"  :hidden="true">
    		<div>删除订单</div>
    		<div class="sel">联系客服</div>
    	</div>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
     reList:[1,1,1],
     showExpress:false,//显示物流信息
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
	  //跳转订单详情
	  skipSalesRetrun(){
		  wx.navigateTo({
			  url: '/pages/salesReturn/main'
		  })
	  }
  },

  created () {
   
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
		margin-right: 15rpx;
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
	
	.container{
		background-color: #F7F7F7;
		padding-bottom: 100rpx;
	}
</style>
