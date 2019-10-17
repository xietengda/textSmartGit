<template>
  <div class="container">
			<div class="seaView">
				<span class="seaIcon"></span>请输入商品名称
			</div>
			
			<div class="condiTion_1">
					<div class="list"><span class="sel">时间</span></div>
					<div class="list"><span>销量</span></div>
					<div class="list"><span>价格</span></div>
			</div>
			
			
			<div class="seaCn div_float">
				<div class="sList" v-for="(item,index) in proList" :key='item.id' @click="goDetialFun(item.id)" >
					<div class="sub"  :class="[index % 2 == 0 ?'rBorder':'']" >
						<img src="../../../static/images/list1.png" />
						<div class="til eli_one">呼唤清透水润防晒乳换新版</div>
						<div class="price">
							<span class="rp">¥45</span>
							<span class="op">¥85</span>
						</div>
					</div>
				</div>
			</div>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
      proList:[1,1,1,1],
    }
  },

  components: {
    
  },

  methods: {
	//跳转商品详情
	goDetialFun(goodsId){
		wx.navigateTo({
			url:'/pages/proDetail/main'
		})
	}
  },

  created () {
   
  }
}
</script>

<style scoped>

	/*搜索框*/
	
	.seaView span {
		width: 30rpx;
		height: 30rpx;
		display: inline-block;
		vertical-align: middle;
		margin: 0 20rpx;
		margin-top: -5rpx;
	}
	
	.seaView {
		width: 95%;
		height: 64rpx;
		line-height: 64rpx;
		background-color: #f2f2f2;
		border-radius: 8rpx;
		color: #999999;
		font-size: 28rpx;
		margin: 0 auto;
	}
	.rBorder{
		border-right: 2rpx solid #E5E5E5;
	}
	.seaCn .sList:nth-last-child(1),.seaCn .sList:nth-last-child(2){
		margin-bottom: 0rpx;
	}
	.seaCn .sList .op{
		color: #999999;
		font-size: 24rpx;
		margin-left: 10rpx;
		text-decoration: line-through;
	}
	.seaCn .sList .rp{
		color: #293462;
		font-size: 36rpx;
	}
	.seaCn .sList .price{
		margin-top: 22rpx;
	}
	.seaCn .sList .til{
		color: #333333;
		font-size: 28rpx;
	}
	.seaCn .sList img{
		width: 345rpx;
		height: 345rpx;
		display: block;
		margin: 0 auto;
	}
	.seaCn .sList .sub{
		padding:0 2%;
		width: 95%;
		/*margin: 0 auto;*/
		/*border: 1px solid red;*/
	}
	.seaCn .sList{
		float: left;
		width: 50%;
		padding: 10rpx 0;
		margin-bottom: 20rpx;
		background-color: white;
	}
	.seaCn{
		background-color: #F7F7F7;
	}
	
	.condiTion_1 .list .sel{
		color: #293462 !important;
		border-bottom: 4rpx solid #293462;
	}
	.condiTion_1 .list span{
		display: inline-block;
		vertical-align: top;
		padding: 0 10rpx;
		line-height: 85rpx;
		color: #333333;
		font-size: 32rpx;
	}
	.condiTion_1 .list:nth-child(2){
		width: 40%;
	}
	.condiTion_1 .list{
		display: inline-block;
		vertical-align: middle;
		line-height: 90rpx;
		text-align: center;
		width: 30%;
	}
	.condiTion_1{
		height: 90rpx;
		line-height: 90rpx;
		margin-top: 20rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.container{
		padding-bottom: 68rpx;
	}
	
	
</style>
