<template>
  <div class="container">
			<div class="odHead">
				<div class="sub">
					<div class="til">退款成功</div>
					<div class="time">2018-10-10  17：21：11</div>
				</div>
			</div>
			
			<div class="rePrice div_float">
				<div class="L">退款总金额</div>
				<div class="R">¥680.00</div>
			</div>
			
			<!--三个状态-->
			<div class="reProgress">
				<div class="til">退款进度</div>
				<div class="proCn">
					<div class="line">
						<div><span></span></div>
						<div><span></span></div>
						<div><span class="gouSel"></span></div>
						<div class="lineView"></div>
					</div>
					<div class="subCn">
						<div>
							<div class="til">买家退款</div>
							<div class="subtil">2018-10-10 17：12</div>
						</div>
						<div>
							<div class="til">商家已同意</div>
							<div class="subtil">2018-10-10 17：12</div>
						</div>
						<div>
							<div class="til">退款成功</div>
							<div class="subtil">2018-10-10 17：12</div>
						</div>
					</div>
				</div>
			</div>
			
			<!--五个状态-->
			<div class="reProTwo">
				<div class="til">退款进度</div>
				<div class="proCn">
					<div class="line">
						<div><span></span></div>
						<div><span></span></div>
						<div><span class="gouSel"></span></div>
						<div><span></span></div>
						<div><span></span></div>
						<div class="lineView"></div>
					</div>
					<div class="subCn">
						<div>
							<div class="til">买家申请退货</div>
							<div class="subtil">2018-10-10 17：12</div>
						</div>
						<div>
							<div class="til">商家已同意</div>
							<div class="subtil">2018-10-10 17：12</div>
						</div>
						<div>
							<div class="til">买家已退货</div>
							<div class="subtil">2018-10-10 17：12</div>
						</div>
						<div>
							<div class="til">商家已收货</div>
							<div class="subtil">2018-10-10 17：12</div>
						</div>
						<div>
							<div class="til">退款成功</div>
							<div class="subtil">2018-10-10 17：12</div>
						</div>
					</div>
				</div>
			</div>
			
    
    	<!--物流信息-->
    	<div class="exView">
    		<div class="exTil">物流信息</div>
    		<div class="exCn">
    			<div class="list">
    				<label>物流公司</label>
    				<div class="sel">
    					请选择<span class="downIcon"></span>
    				</div>
    			</div>
    			<div class="list">
    				<label>物流公司</label>
    				<input type="text" placeholder="请输入快递单号" placeholder-class="placeClass" />
    			</div>
    		</div>
    	</div>
    	
    	
    	<!--退款信息-->
    	<div class="reMsg">
    		<div class="reTil">退款信息</div>
    		<div class="reCn">
    			<div class="list div_float" v-for='(item,key) in reList' :key='key'>
    				<img src="/static/images/list1.png" />
    				<div class="R">
    						<div class="til">呼唤晒后修复精华焕新版</div>
	    					<div class="ml">规格：15ml</div>
    				</div>
    				<div class="num">×1</div>
    			</div>
    		</div>
    	</div>
    	
    	<!--退款原因-->
    	<div class="reCausee">
    		<div>退款原因：7天无理由退货</div>
    		<div>退换说明：没有</div>
    		<div>退款金额：￥600.00</div>
    		<div>申请件数：3</div>
    		<div>下单时间：2018-10-10  17:12</div>
    		<div>退款编号：13238047</div>
    	</div>
    	
    	<!--底部-->
    	<div class="odBtm">
    		<div class="verify">确认</div>
    		<div class="service">联系客服</div>
    	</div>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
     reList:[1,1,1]
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
	.odBtm .service{
		border-color: #293462;
		color: #293462;
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
		background-color: #293462;
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
		background-color: #293462;
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
		background-color: #293462;
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
		background-color: #293462;
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
		color: #293462;
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
		background-color: #293462;
		padding: 0 2%;
	}
	
	.container{
		background-color: #F7F7F7;
	}
	
	.gouSel {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAzQjYzMDY3RDhDNTExRThCOTE4QTE2NDQ4MjY2NkE0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAzQjYzMDY4RDhDNTExRThCOTE4QTE2NDQ4MjY2NkE0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDM3NzA4RDFEOEM1MTFFOEI5MThBMTY0NDgyNjY2QTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDM3NzA4RDJEOEM1MTFFOEI5MThBMTY0NDgyNjY2QTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz45t2ZEAAADD0lEQVR42mKM5hNiIALwALE3EDsCsQEQKwIxP1TuIxDfB+ILQLwfiLcC8RdiDGUhIK8CxOVAHAnE3DjUiEGxORCnA/FXIF4OxJ1AfAef4Uw4xDmAuAOIrwJxCh6LsQFuqJ6rUAdwkGK5MhAfh/qYjYF8ANJbBjVLhRjLjYD4KDReqQVAZh2Bmo3TcpDrdgCxOAP1gTjUbBVslnMC8RogFmWgHQCZvRZqF4rlDUCsz0B7oAe1C245KIEV0so2bXs7hujWZmShQljwg/J5BRCz0sJifjFRhtI1KxlY2NgYROXlGSbExDFA7QLZmcIELUCoDoSlpRka9+0GWwzOd1ycyNIRQMzLRGIBQhSQUlNlaD9+mEFEVhbM3z5lGkNXUCh6QeTFQvWgFhdjaDqwl4GDmxtu8dLqWmxKnZmoHtR7d8EtPrh4KS6LwSmfiVZBvW3yVIbZOXn4tCiz0CKot06awrC8tp6QNj4Mn2fMnM4QWF5KUlA3AVM1zOIDi5YQYzFmfV6xYS2DjqMDmP3m8WOGw8tW4A9qdTWGht07GLj4+UnxMQx8QvH5+Z274Oz06VMZbCLD8Qf1/j3kWgwCd1Es3zl9JkN/VAwiCmZMY7CLjiSYqg8sXEyqxSBwCSPOz27dztDi5Qvnp02bwmAbFYES1O0njsBT9daJkxnm5BWQk073MkHbXCjgxtFjDP3RsShRoGVny8DOxcXQDEzVXHx8cIuX1zWQY/E3UG4EWY41VZ3dsg0lCqo2b2DoPX8G7AB4UJNnMQO0gfmZCdpQ/I3VAWhRICABaeRsmTCJ3KBmgNrVCavPQc3bflwq0aMAZPGK+kZKyqQJQHwbxGDWYwdXdaBGoy+u9tvzW7cZvn78yPANiOcXFlNi8SUgjoWFNCNSjwXUujhGw3bcayC2Qu5IIGc1kKAHEL+kgcUvoWbfwdduPwfENtDgoRa4BDXzHDE9ljvQflcXrlxAQqrugpp1h5S+2g9od0kbiOdACwViwXcgngvVWw41CytgJKGL7IPWRRaAyn1A6yJvIbaLDBBgACGI2WiFAMySAAAAAElFTkSuQmCC');
		background-size: 100% 100%;
	}
</style>
