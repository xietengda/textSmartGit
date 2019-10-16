<template>
  <div class="container">
			<!--地址-->
			<div class="adrMsg div_float">
				<div class="L"><span class="adrIcon"></span></div>
				<div class="R">
					<div class="sub">
						<div><span>猪小姐</span>15915804116</div>
						<div>广州市海珠区昌岗中路166号富盈国际大厦2505室</div>
					</div>
				</div>
				<div class="arr_g"></div>
			</div>
			
			<!--商品-->
			<div class="proList">
				<div class="top">
					<img src="../../../static/images/list1.png" />
					<div class="Msg">
						<div class="til">呼唤晒后修复精华焕新版</div>
						<div class="ml">规格：15ml</div>
						<div class="price">¥600.00</div>
					</div>
					<div class="num">x1</div>
				</div>
				<div class="btm">
					<div class="L">配送方式</div>
					<div class="R">商家配送</div>
				</div>
			</div>
			
			<!--订单信息-->
			<div class="odMsg">
				<div class="div_float">
					<div class="L">发票信息</div>
					<div class="R">不开发票 ></div>
				</div>
				<div class="div_float">
					<div class="L">商城活动</div>
					<div class="R">满150.00减5 ></div>
				</div>
				<div class="div_float">
					<div class="L">优惠券</div>
					<div class="R">无可用券 ></div>
				</div>
				<div>
					<label>客户留言：</label>
					<input type="text" placeholder="选填：订单的备注说明，建议与商家协商后填写"  placeholder-class="placeClass"/>
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
    	
    	<!--提交按钮-->
    	<div class="submitBtn">
    		<span>应付金额：￥3200.00</span>
    		<span>提交订单</span>
    	</div>
			
    
  </div>
</template>

<script>

export default {
  data () {
    return {
     
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
	.submitBtn{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 98rpx;
		line-height: 98rpx;
		text-align: right;
		border-top: 2rpx solid #E5E5E5;
		font-size: 0;
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
