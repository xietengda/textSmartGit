<template>
  <div class="container" :class="[isIphonex ? 'containerIx':'']"> 
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
	    						<div class="arrt">{{item.goods_attr}}</div>
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
	    		<div v-if="odState != 2">付款方式：在线支付</div>
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
	    	<div class="express" v-if="orderMsg.status == 4 || orderMsg.status == 5">
	    		<div class="head" @click="openExpress">
	    			<div class="L">
	    				<div class="til">物流信息</div>
	    				<div>运单号：{{delivery.shipping_name}}   {{delivery.invoice_no}}</div>
	    			</div>
	    			<div class="R arr_g" :class="[showExpress ? 'expOpen':'']"></div>
	    		</div>
	    		<div class="expressCn" v-if="showExpress">
	    			<div v-for="(item,key) in delivery.wms_list">
	    				<div>{{item.context}}</div>
	    				<div>{{item.ftime}}</div>
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
	    			<div class="L" v-if="orderMsg.discount_name == null">减免</div>
	    			<div class="L" v-else>{{orderMsg.discount_name}}</div>
	    			<div class="R">-{{orderMsg.formated_discount}}</div>
	    		</div>
	    		<div class="div_float">
	    			<div class="L">优惠券</div>
	    			<div class="R">-{{orderMsg.formated_bonus}}</div>
	    		</div>
	    	</div>
	    	
	    	<!--实付-->
	    	<div class="payment">
	    		<!--状态等于2（未付款）-->
	    		<div v-if='orderMsg.status == 2 || orderMsg.status == 6'>需付款：<span>{{orderMsg.formated_order_amount}}</span></div>
	    		<!--已付款-->
	    		<div v-else>实付款：<span>{{orderMsg.formated_total_fee}}</span></div>
	    	</div>
	    	
	    	
	    	<!--待付款-->
	    	<div class="odBtm div" :class="[isIphonex ? 'odBtmIx':'']">
	    		<div v-if='odState == 2 || odState == 3 || odState == 4  || odState == 5 || odState == 6'>联系客服 <button open-type='contact'  size="mini" :session-from="concatText"></button></div>
	    		<div v-if='odState == 2' @click="cancelOrderFun">取消订单</div>
	    		<div v-if='odState == 2' class="sel" @click="payOrder">去支付</div>
	    		<div v-if='odState == 3 || odState == 4 || odState == 5' class="sel" @click="refundFun">申请售后</div>
	    		<div v-if='odState == 6' @click="delOrderFun">删除订单</div>
	    		<div v-if='odState == 4' @click="confirmPro">确认收货</div>
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
     	delivery:'',//物流信息
     	concatText:'',//客服信息
    }
  },

  components: {
    
  },
  computed:{
	    isIphonex(){
	        return this.$store.getters.isIphonex;
	    },
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
  	async getOrderDetial(){
  		var that = this; 
  		await that.Request.orderDetail(wx.getStorageSync('userId'),that.orderId)
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
  	//获取物流信息
  	deliveryDetailFun(){
  		var that = this;
  		that.Request.deliveryDetail(that.orderId)
  			.then(res =>{
  				console.log(res)
  				if(res.code == 200){
  					that.delivery = that.util.conJson(res.data);
  				}
  			})
  			.catch(err =>{
  				console.log(err)
  			})
  	},
  	//取消订单
  	cancelOrderFun(){
  		var that  = this;
  		wx.showModal({
		  content: '是否取消订单',
			  success(res) {
			    if (res.confirm) {
			      	that.Request.cancelOrder(wx.getStorageSync('userId'),that.orderId)
				  			.then(res =>{
				  				if(res.code == 200){
				  					that.getOrderDetial();
				  					
				  					//将这次操作缓存本地，告知列表要刷新列表
							  		wx.setStorageSync('isOperate',true);
				  				}
				  			})
			    }
			  }
			})
  		
  	},
  	//删除订单
  	delOrderFun(){
  		var that = this;
  		wx.showModal({
		  content: '是否删除订单',
			  success(res) {
			    if (res.confirm) {
			      	that.Request.delOrder(wx.getStorageSync('userId'),that.orderId)
				  			.then(res =>{
				  				if(res.code == 200){
				  					wx.navigateBack();
				  					//将这次操作缓存本地，告知列表要刷新列表
						  			wx.setStorageSync('isOperate',true);
				  				}
				  			})
			    }
			  }
			})
  	},
  	//点击退款
  	refundFun(){
  		
  		//未发货 ：退款
  		//已发货： 退款退货
  		//已收货：退款退货  换货
  		//back_type  => 4 退款  2 换货  1 退货退款
  		
  		//如果是待发货直接退款
  		if(this.odState == 3){
  			wx.navigateTo({
	  			url:"/pages/salesReturn/main?orderId="+this.orderId+'&refundType=4'
	  		})
  		}
  		//待收货 
  		else if(this.odState == 4){
  			wx.navigateTo({
	  			url:"/pages/salesReturn/main?orderId="+this.orderId+'&refundType=1'
	  		})
  		}
  		//如果是 已完成  选择售后方式
  		else if(this.odState == 5){
  			wx.navigateTo({
	  			url:"/pages/selType/main?orderId="+this.orderId
	  		})
  		}
  		
  		
  	},
  	//点击支付
  	payOrder(e){
  		var that = this;
  		var orderId = that.orderId;
  		that.Request.repetitionPay(wx.getStorageSync('userId'),orderId)
  			.then(res =>{
  					var payMent = JSON.parse(res.data.payment.prepay);
				  	//调用微信支付
				  	wx.requestPayment({
						  timeStamp: payMent.timeStamp.toString(),
						  nonceStr: payMent.nonceStr,
						  package: payMent.package,
						  signType: 'MD5',
						  paySign: payMent.paySign,
						  success:(res)=>{ 
						  	//跳转支付完成页面
						  	wx.navigateTo({
						  		url:'/pages/payMentFinish/main'
						  	})
						  }
						})
  			})
  	},
  	//确认收货
  	confirmPro(e){
  		var that = this;
  		var orderId = that.orderId;
  		wx.showModal({
		  content: '是否确认收货',
			  success(res) {
			    if (res.confirm) {
			      	that.Request.comfirmGetPro(wx.getStorageSync('userId'),orderId)
				  			.then(res =>{
				  				if(res.code  == 200){
				  					that.getOrderDetial();
				  					//如果是待收货状态，就获取物流信息
							  		if(that.odState == 4){
							  			that.deliveryDetailFun();
							  			
							  			//将这次操作缓存本地，告知列表要刷新列表
							  			wx.setStorageSync('isOperate',true);
							  		}
				  				}
				  			})
			    }
			  }
			})
  		
  	},
  	//获取会员信息
    getUserInfoFun(){
    	var that = this;
    	that.Request.getUserInfo(wx.getStorageSync('userId'))
    		.then(res =>{
    			console.log(res)
    			if(res.code  == 200){
    				
    				var userMsg = wx.getStorageSync('userMsg');
   					//配置第三方客服信息
			   		var customer_info = {
						    "email": res.data.email, //邮箱
						    "ip": "192.168.1.1", //IP
						    "description": "描述",
						    "organization_id": 1, //所属公司ID
						    "tags": "标签1,标签2", //标签 已英文号分割
						    "owner_id": 1, //客户负责人ID
						    "owner_group_id": 1, //客户负责组ID
						    "level": "normal", // 等级
						    "cellphones": [["", res.data.mobile_phone]], //数组 [[电话ID, 电话文本]]
						    "other_emails": [["", "13100000002@udesk.cn"]], //数组 [[邮箱ID, 邮箱]]
						    "custom_fields": {
						        "TextField_1": "普通文本内容",
						    }
						}
			   		
			   		var nick_name = userMsg.nickName;// 客户昵称
						var avatar = userMsg.avatarUrl; // 客户头像
						
						var note_info = {
						    "title": "测试标题",
						    "custom_fields": {
						        "TextField_1": "普通文本内容",
						    }
						}
						
						
						var customer_info_str = JSON.stringify(customer_info);
						var note_info_str = JSON.stringify(note_info);
						
						that.concatText = "udesk|"+nick_name+"|"+avatar+"| customer^"+customer_info_str+"| note^"+note_info_str;	
   					
    				
    			}
    		})
    		.catch(res =>{
    			console.log(res)
    		})
    },
  },

  onShow () {
  	var that = this;
  	this.orderId = this.$root.$mp.query.orderId;
  	wx.showLoading();
  	this.getOrderDetial()
	  	.then(res =>{
	  		wx.hideLoading();
	  		//如果是待收货状态，就获取物流信息
	  		if(that.odState == 4){
	  			that.deliveryDetailFun();
	  		}
	  		
	  		that.getUserInfoFun();
	  	})
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
		position: fixed;
		width: 100%;
		bottom: 0;
		background-color: white;
		z-index: 3;
	}
	.odBtmIx{
		padding-bottom: 68rpx;
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
		margin-top: 5rpx;
	}
	.reMsg .reCn .list .R{
		display: inline-block;
		vertical-align: middle;
		width: 60%;
		line-height: 40rpx;
		/*height: 120rpx;*/
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
	.containerIx{
		padding-bottom: 168rpx;
	}
</style>
