<template>
  <div class="container">
			<div class="header">
				<div><span class="yesIcon"></span></div>
				<div>
					<div>支付成功</div>
					<div>您可以在会员中心进行查看订单等操作</div>
				</div>
			</div>
			
			<div class="cnView">
				<div>
					<div class="one" @click="goMe">返回会员中心</div>
				</div>
				<div>
					<div class="two" @click="goHome">继续购买</div>
				</div>
				<div>
					<div class="one" @click="skipOrder">查看我的订单</div>
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
    }
  },

  components: {
    
  },

  methods: {
    //跳转订单列表
    skipOrder(e){
    	wx.reLaunch({
    		url:'/pages/order/main?odState=0'
    	})
    },
    //回首页
    goHome(){
    	wx.switchTab({
    		url:'/pages/index/main'
    	})
    },
    //回个人中心
    goMe(){
    	wx.switchTab({
    		url:'/pages/me/main'
    	})
    }
  },

  async onShow(){
   		await this.util.checkLogin();
  }
}
</script>

<style scoped>
	.header{
		text-align: center;
	}
	.header>div:nth-child(1)>span{
		display: inline-block;
		vertical-align: middle;
		width: 62rpx;
		height: 62rpx;
		margin-top: 59rpx;
	}
	.header>div:nth-child(2){
		margin-top: 45rpx;
		line-height: 40rpx;
		color: #232323;
		opacity: 0.6;
		font-size: 24rpx;
	}
	.cnView{
		padding: 0 5%;
		text-align: center;
		margin-top: 115rpx;
	}
	.cnView>div{
		display: inline-block;
		vertical-align: middle;
		width: 33.33%;
	}
	.cnView>div .one{
		width: 180rpx;
		height: 64rpx;
		line-height: 64rpx;
		border-radius: 8rpx;
		border: 2rpx solid #666;
		color: #666666;
		font-size: 24rpx;
		display: inline-block;
	}
	.cnView>div .two{
		width: 140rpx;
		height: 64rpx;
		line-height: 64rpx;
		border-radius: 8rpx;
		border: 2rpx solid #7f1313;
		color: white;
		background-color: #7f1313;
		font-size: 24rpx;
		display: inline-block;
	}
	
	.yesIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA+CAYAAABzwahEAAAEA0lEQVRoge2bv2sUQRSAv0whBNOJiHY2iqhZYQVbfyHYCWIj0SKKLEmjiOifoFhoo2yhFkFsJGBno6Y+cMHRhHA2dkFRm5AQsAgW8+7cS243+2Nm9k79qiTsvn3fzeR29s3bERwSxOEu4ARwCDgA7AN2AmPAdjlsFVgBvgOfgUVgHpjTUfLNVW4jtgMGcTgOXALOAgdrhlsAXgPPdZTourmlsSIexOE2YBKIgMBGzD5oIAae6Sj5VTdYLXERngJuAXvqJlOQJeA+8LjOB1BZPIjDU8AjYH/VGDVpA9M6St5WObm0eBCHYxjhy1Uu6IAZzAewUuakUuJBHB4GXtLcKGfRBi7oKPlU9ARV9MAgDs8BLQZPGkxOLcmxEIXEgzi8AswCoxUT88EoMCu5bsmWU10CPamblWeu6ih5mndArrhMnVlK/EsMCOvAeR0lr7IOyBSXL7IWgz2981gDjmV94fUVl1vWewbzi6wMbeBov1td1hRucmFik/0Yl01sGnFZkb1xnZFnTm9c4fWIy9r7I3/HaKdpA+Pptf3GqT7F3ycNxmkq/YfuiMtof8HfU5ZvloC9nVFPj/gkwyv9AziFqdxksQfjCPSKR46Scs0P4KSOknfASeBnzrFdRwUQxGGAu8qJSzrSnUXKTWBHzvGBuHZHfMJhcq7okQ7i8C5wu8B5E/BH/Kyb3JxRVRrEdURKwF/d5OeEOtIdditM3XtYsCENcFxhiv3DgC1pgEMKs8Mx6NiUBjigMNs6RVmWJHxiWxpgn8LsZRVhGTiDWST4knchDbBTYTbwivBKR0lLkvAh70oaYEzxZ9dyKy7LxfEg71IaYHvZIuJtD/KupQGzclsteY5LeS/SwKrCbMqXxYW8L2mAFYXpRKiCTXmf0gDfFab9oio25H1LA3xWmJ6TOtSRb0IaYFGRX64pShX5pqQB5hUwZylYGfkmpQHmlLRULVgKWES+aekFHSXfOguY1xYD58k3LQ3i2hF/bjl4P/lFmpcGcU1vKHzAfqX1no6SOxJf6ShZl5+bktY6So5Ab109dnCh9Mg3LQ0px7T4M8w2i2268g1LL2Ecgc27pdeBB44u3AKOOYpdhBs6Sh52ftn4WPoYs6Xqgial2xi3Lj3ispM47TMjT0xv7HvdVIiQzoEZbym5Z6Zfv2tWBWYad1PeJ20yZnBfcekSuoBpmRpW1jD9rX0LLZk1N1lhXcQ0yw0b68DFvKbe3GKjdAZes52VB67ldTVCgVZN6Qm9ynCM/DoF+lihRL+69LW+YHBbPNcw0zt3pDv8b9QvggQ+ymDd52cw/aqFpeEffhmnch+6XHAcuIGbp7osluSa41Wl4f8Ld/aQPrIJ/oVXLLMY5JdqfwNqF/KWc5KA7gAAAABJRU5ErkJggg==') no-repeat;
		background-size: 100% 100%;
	}
	
</style>
