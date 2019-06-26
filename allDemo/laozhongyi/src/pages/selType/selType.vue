<template>
  <div class="container">
			<div class="selView">
				<div class="list" @click="skipRefund">
					<div class="L returnIcon"></div>
					<div class="Msg">
						<div class="til">退货退款</div>
						<div class="subTil">已收到货，需要退已收到货物</div>
					</div>
					<div class="R"><span class="arr_g"></span></div>
				</div>
				<div class="list" @click="skipChange">
					<div class="L changeIcon"></div>
					<div class="Msg">
						<div class="til">换货</div>
						<div class="subTil">对已收到的商品不满意，与卖家协商换货</div>
					</div>
					<div class="R"><span class="arr_g"></span></div>
				</div>
			</div>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
     orderId:'',//订单id
    }
  },

  components: {
    
  },

  methods: {
  	//退货
  	skipRefund(){
  		wx.navigateTo({
  			url:'/pages/salesReturn/main?orderId='+this.orderId
  		})
  	},
  	//换货
  	skipChange(){
  		wx.navigateTo({
  			url:'/pages/salesChange/main?orderId='+this.orderId
  		})
  	}
  },
  onShow(){
   this.orderId = this.$root.$mp.query.orderId;
  }
}
</script>

<style scoped>
	.list .R span{
		display: inline-block;
		vertical-align: middle;
		width: 18rpx;
		height: 32rpx;
	}
	.list .R{
		position: absolute;
		right: 2%;
		line-height: 130rpx;
	}
	.list .Msg .subTil{
		margin-top: 24rpx;
		color: #999999;
		font-size: 24rpx;
	}
	.list .Msg .til{
		color: #333333;
		font-size: 28rpx;
		font-weight: bold;
	}
	.list .Msg{
		line-height: 35rpx;
		width: 80%;
		margin-left: 20rpx;
	}
	.list .L{
		width: 46rpx;
		height: 46rpx;
	}
	.list>div{
		display: inline-block;
		vertical-align: middle;
	}
	.selView .list{
		height: 130rpx;
		line-height: 130rpx;
		position: relative;
		padding: 0 2%;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	
	/*退货*/
	.returnIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI3REI5Q0FERDgwNjExRTg5MTZDREY1NzZBREQ1MjkwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI3REI5Q0FFRDgwNjExRTg5MTZDREY1NzZBREQ1MjkwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjdEQjlDQUJEODA2MTFFODkxNkNERjU3NkFERDUyOTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjdEQjlDQUNEODA2MTFFODkxNkNERjU3NkFERDUyOTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6EPBssAAAGeklEQVR42rxa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');
		background-size: 100% 100%;
	}
	
	/*换货*/
	.changeIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJCNzM4Q0U5RDgwNjExRThBRDdCRjJGOEE2Qjc5OUMwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJCNzM4Q0VBRDgwNjExRThBRDdCRjJGOEE2Qjc5OUMwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkI3MzhDRTdEODA2MTFFOEFEN0JGMkY4QTZCNzk5QzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkI3MzhDRThEODA2MTFFOEFEN0JGMkY4QTZCNzk5QzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5mzdBPAAAGvElEQVR42rxa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');
		background-size: 100% 100%;
	}
</style>
