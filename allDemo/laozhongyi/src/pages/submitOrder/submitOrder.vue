<template>
  <div class="container">
			<!--地址-->
			<div class="adrMsg div_float">
				<div class="L"><span class="adrIcon"></span></div>
				<div class="R" :data-adr-id='adrMsg.address_id' @click="selAddress">
					<div class="sub">
						<div><span>{{adrMsg.consignee}}</span>{{adrMsg.mobile}}</div>
						<div>{{adrMsg.province_name}}{{adrMsg.city_name}}{{adrMsg.district_name}}{{adrMsg.address}}</div>
					</div>
				</div>
				<div class="arr_g"></div>
			</div>
			
			<!--商品-->
			<div class="proList">
				<div class="top" v-for="(item,index) in proMsg" :key='item.id'>
					<img :src="item.goods_thumb" />
					<div class="Msg">
						<div class="til">{{item.goods_name}}</div>
						<div class="ml" v-if='item.goods_attr'>{{item.goods_attr}}</div>
						<div class="price">¥{{item.goods_price}}</div>
					</div>
					<div class="num">x{{item.goods_number}}</div>
				</div>
				<div class="btm">
					<div class="L">配送方式</div>
					<div class="R">商家配送</div>
				</div>
			</div>
			
			<!--订单信息-->
			<div class="odMsg">
				<div class="div_float" @click="selInvoice">
					<div class="L">发票信息</div>
					<div class="R" v-if='!invoice'>不开发票 ></div>
					<div class="R" v-else>电子发票 ></div>
				</div>
				<div class="div_float">
					<div class="L">商城活动</div>
					<div class="R" v-if="orderTotal.discount_name != '' && orderTotal.discount_name != null ">{{orderTotal.discount_name}}</div>
					<div class="R" v-else>无活动</div>
				</div>
				<div class="div_float">
					<div class="L">优惠券</div>
					<div class="R" v-if="disList.length == 0">无可用券 ></div>
					<div class="R" v-else @click='selBounsFun'>{{selDisText}} ></div>
				</div>
				<div>
					<label>客户留言：</label>
					<input type="text" v-model.lazy="remark" placeholder="选填：订单的备注说明，建议与商家协商后填写"  placeholder-class="placeClass"/>
				</div>
			</div>
			
			<!--商品总额-->
    	<div class="priceView">
    		<div class="div_float">
    			<div class="L">商品总额</div>
    			<div class="R">{{orderTotal.goods_price_formated}}</div>
    		</div>
    		<div class="div_float">
    			<div class="L">运费</div>
    			<div class="R">{{orderTotal.shipping_fee_formated}}</div>
    		</div>
    		<div class="div_float">
    			<div class="L">减免</div>
    			<div class="R">-{{orderTotal.discount_formated}}</div>
    		</div>
    		<div class="div_float">
    			<div class="L">优惠券</div>
    			<div class="R">-{{discountMoney}}</div>
    		</div>
    	</div>
    	
    	<!--提交按钮-->
    	<div class="submitBtn">
    		<span>应付金额：{{orderTotal.amount_formated}}</span>  
    		<span @click="submitFun">提交订单</span>
    	</div>
			
    
  </div>
</template>

<script>

export default {
  data () {
    return {
    	Request: this.$api.api.prototype, //请求头
			util: this.$util.util.prototype, //工具类
     	proArr:'',//商品id
     	proMsg:'',//商品信息
     	adrMsg:'',//地址信息
     	invoice:false,//是否开票
     	orderTotal:'',//订单金额
     	orderInfo:'',//订单信息
     	disList:[],//可用优惠券列表
     	hasBouns:false,//是否使用优惠券
     	selDisText:'选择优惠券',//选中的优惠券
     	discountMoney:'¥0.00',//优惠券优惠金额
     	remark:'',//备注信息
    }
  },

  components: {
    
  },

  methods: {
  	getOrderDetail(){
  		var that = this;
    	that.Request.confirmOrder(wx.getStorageSync('userId'),that.proArr)
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							var goodsList = res.data.supplier_list["0"].goods_list;
							for(let x in goodsList){
								goodsList[x].goods_thumb = that.Request.getUrl() + goodsList[x].goods_thumb;
							}
							//设置商品信息
							that.proMsg = that.util.conJson(goodsList);
							
							//设置订单金额
							that.orderTotal = that.util.conJson(res.data.order_total);
							
							//设置订单信息
							that.orderInfo = that.util.conJson(res.data.order_info);
							
							//设置收货地址
							if(wx.getStorageSync('adrId') == '' || wx.getStorageSync('adrId') == undefined){
								//本地缓存没有地址id时，选择默认地址
								that.adrMsg  = that.util.conJson(res.data.def_addr);
							}else{
								//否则循环地址，然后显示选中地址
								for(let y in res.data.address_list){
									if(parseInt(res.data.address_list[y].address_id) == parseInt(wx.getStorageSync('adrId'))){
										that.adrMsg  = res.data.address_list[y];
									}
								}
							}
							
							//设置可用优惠券列表		
							var disList = res.data.supplier_list["0"].bonus_list;
							
							//如果可用优惠券不为空，存进本地
							if(disList.length != 0){
								wx.setStorageSync('bounsList',disList)
								that.disList = disList;
							}
							
							
							//判断是否有选中优惠券
							if(wx.getStorageSync('selDisId') != null || wx.getStorageSync('selDisId') != ''){
								//如果有，重新计算价格
								var bounsList = wx.getStorageSync('bounsList');
					   		for(var x in bounsList){
					   			if(parseInt(bounsList[x].bonus_id) == parseInt(wx.getStorageSync('selDisId'))){
					   				console.log(bounsList[x])
					   				//设置优惠券优惠金额
					   				that.discountMoney = bounsList[x].bonus_money_formated;
					   				//计算总额度
					   				var count = (that.orderTotal.amount - bounsList[x].type_money).toFixed(2);
					   				that.orderTotal.amount_formated = '¥'+count;
					   			}
					   		}
							}
							
						}
					})
					.catch(res =>{
						console.log(res)
					})
  	},
  	//点击发票
  	selInvoice(){
  		wx.navigateTo({
  			url:'/pages/invoice/main'
  		})
  	},
  	//点击选择地址
  	selAddress(e){
  		wx.navigateTo({
  			url:'/pages/selAddress/main?adrId='+e.currentTarget.dataset.adrId
  		})
  	},
  	//提交订单
  	submitFun(){
  		var that = this;
  		var sign = {
				supplier: [{
					supplier_id: 0,//店铺id，默认0
					shipping_id: that.orderInfo.shipping_id,//物流id
					pickup_point: 0,//自提点  默认0
					bonus_id: wx.getStorageSync('selDisId') || 0,//优惠券id 默认 0
					bonus_sn: "", //优惠券码
					message: that.remark,//用户备注信息
					inv_type: "vat_invoice",//发票类型
					inv_payee_type: "unit",//发票抬头  个人/单位
					inv_payee: "",//发票抬头  传空
					vat_inv_company_name: "", //单位名称
					vat_inv_taxpayer_id: "666888",//纳税人识别码
					vat_inv_registration_address: "",//注册地址
					vat_inv_registration_phone: "",//注册电话
					vat_inv_deposit_bank: "",//开户银行
					vat_inv_bank_account: "",//银行账户
					inv_content: "",//发票内容
					inv_email:'',//邮箱
				}]
			}
  		
  		//判断是否开票
  		if(wx.getStorageSync('invoice') == null || wx.getStorageSync('invoice') == undefined){
  			sign.supplier[0].inv_type = '';
  			sign.supplier[0].inv_payee_type = '';
  			sign.supplier[0].inv_payee = '';
  			sign.supplier[0].vat_inv_company_name = '';
  			sign.supplier[0].vat_inv_taxpayer_id = '';
  		}else{
  			let invoice = wx.getStorageSync('invoice');
  			//个人发票
  			if(invoice.type  == 'individual'){
  				sign.supplier[0].inv_payee_type = 'individual';
  				sign.supplier[0].inv_content = invoice.email;
  			}
  			//单位发票
  			else{ 
  				sign.supplier[0].inv_payee_type = 'unit';
  				sign.supplier[0].vat_inv_company_name = invoice.name;
  				sign.supplier[0].vat_inv_taxpayer_id = invoice.num
  				sign.supplier[0].inv_content = invoice.email;
  			}
  		}
  		
  		//出现加载动画
  		wx.showLoading({
  			mask:true
  		});
  		
  		console.log('提交商品信息',wx.getStorageSync('userId'),that.proArr,JSON.stringify(sign),that.adrMsg.address_id);
  		that.Request.submitOrder(wx.getStorageSync('userId'),that.proArr,JSON.stringify(sign),that.adrMsg.address_id)
  			.then(res =>{
  				console.log('提交订单返回',res)
  				if(res.code == 200){
  					//隐藏加载动画
  					wx.hideLoading();
  					
  					//设置未不开发票
				  	wx.removeStorage({
				  		key: 'invoice'
				  	});
				  	//删除优惠券列表
				  	wx.removeStorage({
				  		key: 'bounsList'
				  	});
				  	//删除选中优惠券
				  	wx.removeStorage({
				  		key: 'selDisId'
				  	});
				  	
				  	//删除发票信息
				  	wx.removeStorage({
				  		key: 'invoice'
				  	});
				  	
				  	this.selDisText = '选择优惠券';
				  	
				  	var payMent = JSON.parse(res.data.payment.prepay);
				  	
				  	console.log('支付信息',payMent)
				  	
				  	//调用微信支付
				  	wx.requestPayment({
						  timeStamp: payMent.timeStamp.toString(),
						  nonceStr: payMent.nonceStr,
						  package: payMent.package,
						  signType: 'MD5',
						  paySign: payMent.paySign,
						  success:(res)=>{ 
						  	console.log(res);
						  	//跳转支付完成页面
						  	wx.navigateTo({
						  		url:'/pages/payMentFinish/main'
						  	})
						  },
						  fail:(res)=>{ 
						  	//返回支付退回购物车
						  	wx.navigateBack();
						  }
						})
				  	
  					
  				}
  			})
  			.catch(res =>{
  				console.log('出错',res)
  			})
  		
  		
  	},
  	//点击选择优惠券
  	selBounsFun(){
  		wx.navigateTo({
  			url:'/pages/selDiscount/main'
  		})
  	}
  },

  async onShow(){
  	
  	await this.util.checkLogin().then(res =>{
  		console.log(this.$root.$mp.query)
  		var proArrString = this.$root.$mp.query.selPro;
  		if(proArrString.indexOf(',') != -1){
  			this.proArr = proArrString.split(',');
  		}else{
  			this.proArr = proArrString;
  		}
  		
  	
	   	this.getOrderDetail();
	   	
	   	//设置发票信息
	   	if(wx.getStorageSync('invoice') == null || wx.getStorageSync('invoice') == ''){
	   		this.invoice = false;
	   		wx.setStorageSync('invoice',null)
	   	}else{
	   		this.invoice = true;
	   	}
	   	
	   	
	   	//设置优惠券信息
	   	if(wx.getStorageSync('bounsList') != null || wx.getStorageSync('bounsList') != ''){
	   		//然后判断是否已经选中优惠券
	   		if(wx.getStorageSync('selDisId') != null || wx.getStorageSync('selDisId') != ''){
		   		var bounsList = wx.getStorageSync('bounsList');
		   		for(var x in bounsList){
		   			if(parseInt(bounsList[x].bonus_id) == parseInt(wx.getStorageSync('selDisId'))){
		   				this.selDisText = bounsList[x].type_name;
		   			}
		   		}
		   	}
	   	}else{
	   		
	   	}
	   	
  	})
  	.catch(res =>{
  		console.log(res)
  	})
  	
   	
  },
  onUnload(){
  	//设置未不开发票
  	wx.removeStorage({
  		key: 'invoice'
  	});
  	//删除优惠券列表
  	wx.removeStorage({
  		key: 'bounsList'
  	});
  	//删除选中优惠券
  	wx.removeStorage({
  		key: 'selDisId'
  	});
  	
  	//删除发票信息
  	wx.removeStorage({
  		key: 'invoice'
  	});
  	
  	//删除选中地址信息
  	wx.removeStorage({
  		key: 'adrId'
  	});
  	
  	
  	
  	this.selDisText = '选择优惠券';
  	this.discountMoney = '¥0.00'
  }
}
</script>

<style scoped>
	.submitBtn{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 98rpx;
		line-height: 98rpx;
		text-align: right;
		border-top: 2rpx solid #E5E5E5;
		font-size: 0;
		background-color: white;
	}
	.submitBtn>span{
		display: inline-block;
		vertical-align: middle;
	}
	.submitBtn>span:nth-child(1){
		color: #5b0e12;
		font-size: 28rpx;
		margin-right: 32rpx;
	}
	.submitBtn>span:nth-child(2){
		color: white;
		font-size: 28rpx;
		width: 260rpx;
		height: 98rpx;
		background-color: #5B0E12;
		text-align: center;
	}
	.priceView>div .R{
		float: right;
		color: #5B0E12;
		font-weight: bold;
	}
	.priceView>div .L{
		float: left;
	}
	.priceView>div{
		line-height: 50rpx;
		color: #666666;
		font-size: 28rpx;
		background-color: white;
		padding: 0 2%;
	}
	.priceView>div:nth-child(1){
		padding-top: 10rpx;
	}
	.priceView>div:last-child{
		padding-bottom: 10rpx;
	}
	.priceView{
		background-color: white;
		padding-top: 20rpx;
		background-color: #F7F7F7;
	}
	
	.odMsg{
		background-color: #F7F7F7;
		padding-top: 20rpx;
	}
	.odMsg>div{
		height: 90rpx;
		line-height: 90rpx;
		padding: 0 2%;
		border-bottom: 2rpx solid #E5E5E5;
		color: #666666;
		font-size: 24rpx;
		background-color: white;
	}
	.odMsg>div .L{
		float: left;
	}
	.odMsg>div .R{
		float: right;
	}
	.odMsg>div label,.odMsg>div input{
		display: inline-block;
		vertical-align: middle;
	}
	.odMsg>div input{
		width: 580rpx;
	}
	.proList .btm{
		height: 83rpx;
		line-height: 83rpx;
		color: #666666;
		font-size: 24rpx;
	}
	.proList .btm .L{
		float: left;
	}
	.proList .btm .R{
		float: right;
	}
	.proList .top .Msg{
		display: inline-block;
		vertical-align: middle;
		width: 70%;
		line-height: 30rpx;
		margin-left: 25rpx;
		color: #333333;
		font-size: 24rpx;
	}
	.proList .top .Msg .price{
		color: #5b0e12;
		margin-top: 30rpx;
	}
	.proList .top .Msg .ml{
		font-size: 20rpx;
	}
	.proList .top .num{
		position: absolute;
		right: 2%;
		bottom: 27rpx;
		line-height: 40rpx;
		color: #333333;
		font-size: 24rpx;
	}
	.proList .top img{
		width: 120rpx;
		height: 120rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.proList .top{
		height: 185rpx;
		line-height: 185rpx;
		position: relative;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.proList{
		padding: 0 2%;
	}
	.adrMsg .arr_g{
		position: absolute;
		display: inline-block;
		vertical-align: middle;
		width: 16rpx;
		height: 28rpx;
		margin: auto;
		top: 0;
		bottom: 0;
	}
	.adrMsg .R span{
		font-size: 28rpx;
		font-weight: bold;
		margin-right: 30rpx;
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
		padding-bottom: 10rpx;
		font-size: 0;
		background-color: white;
		position: relative;
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu0AAAAICAYAAABNqMF/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU1RDhFNjg2RDk4MzExRTg4RThCQkI4MDhENUZFQjQwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU1RDhFNjg3RDk4MzExRTg4RThCQkI4MDhENUZFQjQwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTVEOEU2ODREOTgzMTFFODhFOEJCQjgwOEQ1RkVCNDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTVEOEU2ODVEOTgzMTFFODhFOEJCQjgwOEQ1RkVCNDAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5lgIOPAAACsElEQVR42uyboUtEQRDG9xQuCHognMkomK4qChabggbBIIfFpiBW8Q9Qu+g1EfSwGVS0WQTBbDUKhkuWC4Kes7zB6O2G9/kNzMKH5cF9zu/tvHkz+yrNkdHvEEIllL+eRfOibsK1B6LdgFlt0bqoZ9jXpugE5CuH44l6Y4sX0ldLtJV4LZLjg2hB9Gk4Xs7ROTpH59hv7eqzm4ljrLnORU2yeLH6QnO8Fq2IvsjidViRor0H+KFX0ayoYzhRsvpaFl2JBsk4MiZK1o2P5vgimhN9GI6Xc3SOztE59ltNLaoqZByRDcCceLH6QnKkbjAjivaOFnqvhhMlq69pLViHAL5yOLImStaNj+T4JprRv1bj5Rydo3N0jv1WvO5eVCXjyDoZZ/WF5EjfYC67aO9qwJ8NJ0pWXxOiJ1Ed4CuHI2uiRPuaEr2TcfzQF5wXw4mS1ZdzdI7OkcdXQ/QoqpFxZJ2Ms/pCcjTRYB4o8YfiyGMtsdCLifIGVBjHf3wxozBm9FXXRIl4sORwbOiNXCWL13/4eifjGI8OrSQ+WJDx6mgHoWPYl3N0js6Rx9eY6A5U6OVwjA3AS1ChlxMvVl/jQI6xMbmUWLAj4/Wm9cTvSYIyi/btUJxZspooWX0N6YvERMCsVI7IDZYTL1ZfSI5xmrYRiomR1UTJ6ss5OkfnyMXxWv0xcUQ2AHPixeqrpvcXgqOpBnNZRfthKL4KtpooWX3FM4Nn+qaHWKkch4EbLCdeNVJfg/qmjuK4F4qPWKwmSlZfztE5OkfnmBKv28A3GWed2MfJTZzgNEAcd4KhBnMZRXtbb2arG4zVV1z7olWQrxyOF8ANlhov9MbP4XgUijNxiNXSly+2eKVOcFh9OUfn6BydY2q8JsnixTqxj43J01B8K4HieEwWrz8bgD8CDAA8sLbi4qCi/QAAAABJRU5ErkJggg==');
		background-size: 100% 8rpx;
		background-position: bottom;
		background-repeat: no-repeat;
	}
	
	.container{
		padding-bottom: 100rpx;
	}
</style>
