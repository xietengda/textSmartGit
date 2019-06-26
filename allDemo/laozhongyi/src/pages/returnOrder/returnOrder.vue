<template>
  <div class="container">
			<div class="odHead">
				<div class="sub">
					<div v-if="odState == 1 ">
						<div class="til" v-if='rechange == 0'>买家申请退货</div>
						<div class="til" v-else>买家申请换货</div>
						<div class="time">{{reFundMsg.add_time_format}}</div>
					</div>
					<div v-if="odState == 4 || odState == 5">
						<div class="til" >商家已同意</div>
						<div class="time">{{reFundMsg.supplier_agree_time}}</div>
					</div>
					
					<div  v-if="odState == 2">
						<div class="til">买家退回商品</div>
						<div class="time">{{reFundMsg.buy_shipping_time}}</div>
					</div>
					
					<div v-if="odState == 7">
						<div class="til">商家收货</div>
						<div class="time">{{reFundMsg.receive_time}}</div>
					</div>
					
					<div v-if="odState == 12 && isFund == 0">
						<div class="til">退款退货完成</div>
						<div class="time">{{reFundMsg.refund_end_time}}</div>
					</div>
					
					<div  v-if='odState == 15'>
						<div class="til">换货完成</div>
						<div class="time">{{reFundMsg.refund_time}}</div>
					</div>
					
					<!--换货，商家收货-->
					<div  v-if='odState == 13'>
						<div class="til">商家收货，并发出货物</div>
						<div class="time">{{reFundMsg.rechange_time}}</div>
					</div>
					
					<!--换货，买家签收-->
					<div  v-if='odState == 14'>
						<div class="til">换货完成</div>
						<div class="time">{{reFundMsg.rechange_receive_time}}</div>
					</div>
					
					
					<!--仅退款-->
					<!--申请退款-->
					<div  v-if='odState == 10'>
						<div class="til">买家申请退款</div>
						<div class="time">{{reFundMsg.add_time_format}}</div>
					</div>
					<!--卖家同意退款-->
					<div  v-if='odState == 11 && isFund == 1'>
						<div class="til">卖家同意退款</div>
						<div class="time">{{reFundMsg.agree_refund_time}}</div>
					</div>
					<!--退款完成-->
					<div v-if="odState == 12 && isFund == 1">
						<div class="til">退款完成</div>
						<div class="time">{{reFundMsg.refund_end_time}}</div>
					</div>
					
					<div>
						
					</div>
					
				</div>
			</div>
			
			<div class="rePrice div_float" v-if="rechange != 1">
				<div class="L">退款总金额</div>
				<div class="R">{{reFundMsg.refund_amount}}</div>
			</div>
			
			
			
			<!--五个状态  (商家已发货)-->
			<div class="reProTwo" v-if='isFund == 0'>
				<div class="til">退款进度</div>
				<div class="proCn">
					<div class="line">
						<div><span :class="[odState == 1 || odState == 10 ? 'gouSel':'']"></span></div>
						<div><span :class="[odState == 4 ? 'gouSel':'']"></span></div>
						<div><span :class="[odState == 2 ? 'gouSel':'']"></span></div>
						<div><span :class="[odState == 7 || odState == 13 ? 'gouSel':'']"></span></div>
						<div><span :class="[odState == 12 || odState == 14 ? 'gouSel':'']"></span></div>
						<div class="lineView"></div>
					</div>
					<div class="subCn">
						<div>
							<!--设置换货 还是退货-->
							<div class="til" v-if='rechange == 0'>买家申请退货</div>
							<div class="til" v-else>买家申请换货</div>
							<div class="subtil">{{reFundMsg.add_time_format}}</div>
						</div>
						<div>
							<div class="til">商家已同意</div>
							<div class="subtil" v-if="reFundMsg.supplier_agree_time != ''">{{reFundMsg.supplier_agree_time}}</div>
						</div>
						<div>
							<div class="til">买家退回商品</div>
							<div class="subtil" v-if="reFundMsg.buy_shipping_time != ''">{{reFundMsg.buy_shipping_time}}</div>
						</div>
						<div>
							<div class="til">商家收货</div>
							<div class="subtil" v-if="reFundMsg.receive_time !=''  && rechange == 0">{{reFundMsg.receive_time}}</div>
							<!--换货，商家收货时间-->
							<div class="subtil" v-else>{{reFundMsg.rechange_time}}</div>
						</div>
						<div>
							<div class="til" v-if='rechange == 1'>换货完成</div>
							<div class="til" v-else>退款退货完成</div>
							<div class="subtil" v-if="reFundMsg.refund_end_time != '' && rechange == 0">{{reFundMsg.refund_end_time}}</div>
							<div class="subtil" v-else>{{reFundMsg.rechange_receive_time}}</div>
						</div>
					</div>
				</div>
			</div>
			
			<!--三个状态 (商家未发货状态)-->
			<div class="reProgress" v-if='isFund == 1 && rechange != 1'>
				<div class="til">退款进度</div>
				<div class="proCn">
					<div class="line">
						<div><span :class="[odState == 10  ? 'gouSel':'']"></span></div>
						<div><span :class="[odState == 11  ? 'gouSel':'']"></span></div>
						<div><span :class="[odState == 12  ? 'gouSel':'']"></span></div>
						<div class="lineView"></div>
					</div>
					<div class="subCn">
						<div>
							<div class="til">买家申请退款</div>
							<div class="subtil">{{reFundMsg.add_time_format}}</div>
						</div>
						<div>
							<div class="til">商家已同意</div>
							<div class="subtil">{{reFundMsg.agree_refund_time}}</div>
						</div>
						<div>
							<div class="til">退款成功</div>
							<div class="subtil">{{reFundMsg.refund_end_time}}</div>
						</div>
					</div>
				</div>
			</div>
			
    
    	<!--物流信息-->
    	<div class="exView" v-if="odState == 4 || odState == 5">
    		<div class="exTil">物流信息</div>
    		<div class="exCn">
    			<div class="list">
    				<label>物流公司</label>
    				<input type="text" v-model.lazy="shipName" placeholder="请输入快递公司" placeholder-class="placeClass" />
    			</div>
    			<div class="list">
    				<label>物流公司</label>
    				<input type="text" v-model.lazy="shipNumber" placeholder="请输入快递单号" placeholder-class="placeClass" />
    			</div>
    		</div>
    	</div>
    	
    	
    	<!--退款信息-->
    	<div class="reMsg">
    		<div class="reTil">退款信息</div>
    		<div class="reCn">
    			<div class="list div_float" v-for='(item,key) in reList' :key='item.id'>
    				<img :src="item.goods_thumb" />
    				<div class="R">
    						<div class="til">{{item.goods_name}}</div>
	    					<div class="ml" v-if="item.goods_attr">{{item.goods_attr}}</div>
    				</div>
    				<div class="num">×{{item.back_goods_number}}</div>
    			</div>
    		</div>
    	</div>
    	
    	<!--买家退款信息-->
    	<div class="reCausee buyer" v-if='odState == 2 || odState == 7 || odState == 12'>
    		<div class="til">退货物流信息：</div>
    		<div>退货快递公司：{{reFundMsg.buyer_shipping_name}}</div>
    		<div>退货快递单号：{{reFundMsg.buyer_invoice_no}}</div>
    	</div>
    	
    	<!--退款原因-->
    	<div class="reCausee">
    		<div>退款原因：{{reFundMsg.suggest_reason}}</div>
    		<div>退换说明：{{reFundMsg.suggest_remark}}</div>
    		<div v-if="rechange != 1">退款金额：{{reFundMsg.refund_amount}}</div>
    		<div>申请件数：{{reFundMsg.reFundNum}}</div>
    		<div>下单时间：{{reFundMsg.add_time}}</div>
    		<div>退款单号：{{reFundMsg.back_sn}}</div>
    	</div>
    	
    	<!--底部-->
    	<div class="odBtm">
    		<div class="verify"  v-if="odState == 4" @click="submitShipNum">确认</div>
    		<div class="service">联系客服 <button open-type='contact'></button></div>
    	</div>
    	
    	<!--返回个人中心图标-->
    	<div class="goMe" v-show="showMe" @click="goToMe">
    		<img src="../../../dist/static/img/me_sel.png" />
    	</div>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
    	Request: this.$api.api.prototype, //请求头
			util: this.$util.util.prototype, //工具类
			isFund:0,//售后类型  0：退货  1：退货退款
			rechange:0,// 1：换货  否则不是
      reList:[],//商品列表
      orderId:'',//订单id
      reFundMsg:'',//退款信息
      odState:0,//订单状态
      shipName:"",//物流公司名字
      shipNumber:'',//物流单号
      showMe:true,//显示返回个人中心图标
    }
  },

  components: {
    
  },

  methods: {
  	getDetailFun(){
  		var that = this;
  		wx.showLoading();
  		that.Request.getRefundDetail(wx.getStorageSync('userId'),that.orderId)	
  			.then(res =>{
  				console.log(res)
  				wx.hideLoading();
  				if(res.code == 200){
  					var signNum = 0;
  					for(var x in res.data.goods_list){
  						res.data.goods_list[x].goods_thumb = that.Request.getUrl() + res.data.goods_list[x].goods_thumb;
  						signNum = parseInt(signNum) + parseInt(res.data.goods_list[x].back_goods_number);
  					}
  					//商品
  					that.reList = that.util.conJson(res.data.goods_list);
  					
  					//售后类型  （0:退货   1：退款）
  					that.isFund = parseInt(res.data.is_refund);
  					
  					//是否换货类型  （ 1：换货  否则其他不是）
  					that.rechange = parseInt(res.data.rechange);
  					
  					//商品数量
  					res.data.reFundNum = signNum; 
  					
  					//退款信息
  					that.reFundMsg = that.util.conJson(res.data);
  					
  					that.odState = that.util.conJson(res.data.show_time_tips);
  				}
  			})
  			.catch(err =>{
  				console.log(err)
  			})
  	},
  	//提交物流单号
  	submitShipNum(){
  		let that  = this;
  		
  		let shipName = that.shipName;
  		let shipNum = that.shipNumber;
  		
  		if(shipName == ""){
  			wx.showToast({
  				title:'请输入快递公司名称',
  				icon:'none'
  			})
  			return;
  		}
  		
  		if(shipNum == ""){
  			wx.showToast({
  				title:'请输入快递单号',
  				icon:'none'
  			})
  			return;
  		}
  
  		wx.showLoading();
  		
  		that.Request.refundLogistics(wx.getStorageSync('userId'),that.orderId,shipName,shipNum)
  			.then(res =>{
  				console.log(res)
  				if(res.code == 200){
  					wx.hideLoading();
  					that.getDetailFun();
  				}
  			})
  			.catch(err =>{
  				console.log(res)
  			})
  	},
//	回到个人中心
		goToMe(){
			wx.removeStorageSync('showMe');
			wx.switchTab({
			  url: '/pages/me/main'
			});
		}
  },

  async onShow(){
  	var that = this;
  	this.page = 1;
  	this.orderId = this.$root.$mp.query.orderId;
  	await this.util.checkLogin()
  		.then(res =>{
  			that.getDetailFun();
  		})
  		
  	//判断是否显示个人中心图标
  	if(wx.getStorageSync('showMe')){
  		this.showMe = true;
  	}else{
  		this.showMe = false;
  	}
  		
  },
  onUnload(){
  	this.isFund = 0;//售后类型  0：退货  1：退货退款
		this.rechange = 0;// 1：换货  否则不是
	  this.reList = [];//商品列表
	  this.orderId = '';//订单id
	  this.reFundMsg = '';//退款信息
	  this.odState = 0;//订单状态
	  this.shipName = '';//物流公司名字
	  this.shipNumber = '';//物流单号
  }
}
</script>

<style scoped>
	.goMe{
		position: fixed;
		width: 80rpx;
		height: 80rpx;
		line-height: 70rpx;
		border: 2rpx solid #7F1313;
		right: 20rpx;
		bottom: 250rpx;
		background-color: white;
		opacity: 0.8;
		border-radius: 100%;
		text-align: center;
	}
	.goMe img{
		width: 50rpx;
		height: 50rpx;
		display: inline-block;
		vertical-align: middle;
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
	.odBtm button{
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
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
	.odBtm .service{
		border-color: #5B0E12;
		color: #5B0E12;
	}
	.reCausee>div{
		color: #666666;
		font-size: 24rpx;
		line-height: 50rpx;
	}
	.reCausee{
		margin-top: 20rpx;
		background-color: white;
		padding: 0 2%;
		padding-bottom: 120rpx;
	}
	.buyer{
		padding-bottom: 0;
	}
	.buyer .til{
		font-size: 26rpx;
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
	.exView .exCn .list input{
		display: inline-block;
		vertical-align: middle;
		width: 500rpx;
		height: 64rpx;
		background-color: #fafafa;
		border: solid 2rpx #e5e5e5;
		outline: none;
		font-size: 26rpx;
		color: #999999;
		padding-left: 15rpx;
	}
	.exView .exCn .list .sel span{
		display: inline-block;
		vertical-align: middle;
		width: 24rpx;
		height: 18rpx;
		position: absolute;
		right: 10rpx;
		margin: auto;
		top: 0;
		bottom: 0;
	}
	.exView .exCn .list .sel{
		display: inline-block;
		vertical-align: middle;
		width: 500rpx;
		height: 64rpx;
		background-color: #fafafa;
		border: solid 2rpx #e5e5e5;
		font-size: 26rpx;
		color: #999999;
		padding-left: 15rpx;
		position: relative;
	}
	.exView .exCn .list label{
		display: inline-block;
		vertical-align: middle;
		color: #333333;
		font-size: 24rpx;
		margin-right: 20rpx;
	}
	.exView .exCn .list{
		height: 70rpx;
		line-height: 70rpx;
		font-size: 0;
		margin-bottom: 20rpx;
	}
	.exView .exTil{
		height: 60rpx;
		line-height: 60rpx;
		color: #333333;
		font-size: 28rpx;
		margin-top: 15rpx;
	}
	
	.exView{
		margin-top: 20rpx;		
		background-color: white;
		padding: 0 2%;
		padding-bottom: 40rpx;
	}
	
	/*5个状态*/
	.reProTwo .proCn	.line span{
		display: inline-block;
		vertical-align: middle;
		width: 18rpx;
		height: 18rpx;
		border-radius: 100%;
		background-color: #5B0E12;
		position: absolute;
		z-index: 3;
		margin: auto;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.reProTwo .proCn	.line .gouSel{
		width: 30rpx;
		height: 30rpx;
	}
	.reProTwo .proCn	.line>div:nth-child(1){
		width: 70rpx;
	}
	.reProTwo .proCn	.line>div:nth-child(2){
		width: 140rpx;
	}
	.reProTwo .proCn	.line>div:nth-child(3){
		width: 138rpx;
	}
	.reProTwo .proCn	.line>div:nth-child(4){
		width: 138rpx;
	}
	.reProTwo .proCn	.line>div:nth-child(5){
		width: 85rpx;
	}
	.reProTwo .proCn	.line>div:nth-child(1) span{
		left: 0;
		right: initial;
	}

	.reProTwo .proCn	.line>div:nth-child(5) span{
		left: initial;
		right: 0;
	}
	.reProTwo .proCn	.line>div{
		display: inline-block;
		vertical-align: middle;
		height: 35rpx;
		/*text-align: center;*/
		position: relative;
	}
	.reProTwo .proCn	.line .lineView{
		position: absolute;
		margin: auto;
		height: 8rpx;
		width: 100%;
		background-color: #5B0E12;
		left: 0;
		top: 0;
		bottom: 0;
		border-radius: 8rpx;
	}
	.reProTwo .proCn	.line{
		width: 570rpx;
		height: 40rpx;
		line-height: 40rpx;
		margin: 0 auto;
		font-size: 0;
		position: relative;
	}
	.reProTwo .proCn .subCn .subtil{
		color: #333333;
		font-size: 20rpx;
	}
	.reProTwo .proCn .subCn .til{
		color: #333333;
		font-size: 24rpx;
	}
	.reProTwo .proCn .subCn>div{
		display: inline-block;
		vertical-align: middle;
		width: 20%;
		text-align: center;
	}
	.reProTwo .proCn .subCn{
		width: 100%;
		font-size: 0;
	}
	.reProTwo .proCn{
		margin-top: 20rpx;
	}
	.reProTwo>.til{
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		color: #333333;
	}
	.reProTwo{
		padding: 0 2%;
		padding-bottom: 43rpx;
		background-color: white;
	}

	/*5个状态*/	
	
	
	.reProgress .proCn	.line span{
		display: inline-block;
		vertical-align: middle;
		width: 18rpx;
		height: 18rpx;
		border-radius: 100%;
		background-color: #5B0E12;
		position: absolute;
		z-index: 3;
		margin: auto;
		top: 0;
		bottom: 0;
	}
	.reProgress .proCn	.line .gouSel{
		width: 30rpx;
		height: 30rpx;
	}
	.reProgress .proCn	.line>div:nth-child(1) span{
		left: 0;
	}
	.reProgress .proCn	.line>div:nth-child(2) span{
		left: 0;
		right: 0;
	}
	.reProgress .proCn	.line>div:nth-child(3) span{
		right: 0;
	}
	.reProgress .proCn	.line>div{
		display: inline-block;
		vertical-align: middle;
		width: 33.33%;
		text-align: center;
	}
	.reProgress .proCn	.line .lineView{
		position: absolute;
		margin: auto;
		height: 8rpx;
		width: 100%;
		background-color: #5B0E12;
		left: 0;
		top: 0;
		bottom: 0;
		border-radius: 8rpx;
	}
	.reProgress .proCn	.line{
		width: 510rpx;
		height: 40rpx;
		line-height: 40rpx;
		margin: 0 auto;
		font-size: 0;
		position: relative;
	}
	.reProgress .proCn .subCn .subtil{
		color: #333333;
		font-size: 20rpx;
	}
	.reProgress .proCn .subCn .til{
		color: #333333;
		font-size: 24rpx;
	}
	.reProgress .proCn .subCn>div{
		display: inline-block;
		vertical-align: middle;
		width: 33.33%;
		text-align: center;
	}
	.reProgress .proCn .subCn{
		width: 100%;
		font-size: 0;
	}
	.reProgress .proCn{
		margin-top: 20rpx;
	}
	.reProgress>.til{
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		color: #333333;
	}
	.reProgress{
		padding: 0 2%;
		padding-bottom: 43rpx;
		background-color: white;
	}
	.rePrice .R{
		float: right;
		color: #5b0e12;
		font-size: 28rpx;
	}
	.rePrice .L{
		float: left;
		color: #333333;
		font-size: 28rpx;
	}
	.rePrice{
		height: 86rpx;
		line-height: 86rpx;
		padding: 0 2%;
		border-bottom: 2rpx solid #E5E5E5;
		background-color: white;
	}
	.odHead .time{
		color: #ffffff;
		font-size: 24rpx;
	}
	.odHead .til{
		color: #ffffff;
		font-size: 32rpx;
	}
	.odHead .sub{
		display: inline-block;
		vertical-align: middle;
		line-height: 50rpx;
	}
	.odHead{
		height: 120rpx;
		line-height: 120rpx;
		background-color: #5b0e12;
		padding: 0 2%;
	}
	
	.container{
		background-color: #F7F7F7;
	}
</style>
