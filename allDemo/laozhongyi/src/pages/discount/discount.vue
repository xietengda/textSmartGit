<template>
  <div class="container">
			<div class="disView" >
				<div class="til">{{canList.cat_name}}</div>
				<div class="list" v-for='(item,key) in canList.list' :key='item.id'>
					<div class="L">
						<span>¥{{item.type_money}}</span>
					</div>
					<div class="Msg">
						<div>{{item.type_name}}</div>
						<div>满{{item.min_goods_amount}}可用</div>
						<div>使用日期：{{item.use_startdate}}</div>
						<div>{{item.use_enddate}}</div>
					</div>
					<div class="R">
						<span>{{item.status}}</span>
					</div>
				</div>
			</div>
			
			<div class="disView">
				<div class="til">{{usedList.cat_name}}</div>
				<div class="list" v-for='(item,key) in usedList.list' :key='item.id'>
					<div class="L">
						<span>¥{{item.type_money}}</span>
					</div>
					<div class="Msg">
						<div>{{item.type_name}}</div>
						<div>满{{item.min_goods_amount}}可用</div>
						<div>使用日期：{{item.use_startdate}}</div>
						<div>{{item.use_enddate}}</div>
					</div>
					<div class="R">
						<span>{{item.status}}</span>
					</div>
				</div>
			</div>
			
			<div class='noProduct' :hidden="true">
			    <div class='nullCart'>
			      <div class='nullIcon nullOrder'></div>
			      <div class='nullText'>暂无优惠券</div>
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
     	canList:[],//可以使用
     	overdueList:[],//过期的
     	usedList:[],//已使用
      page:1,
    }
  },

  components: {
    
  },

  methods: {
  	myDiscountFun(){
  		var that = this;
  		that.Request.myDiscount(wx.getStorageSync('userId'),that.page)
  			.then(res =>{
  				console.log(res)
  				if(res.code == 200){
  					that.canList = that.util.conJson(res.data.bonus_can);
  					that.overdueList = that.util.conJson(res.data.bonus_overdue);
  					that.usedList = that.util.conJson(res.data.bonus_used);
  				}
  			})
  			.catch(res =>{
  				console.log(res)
  			})
  	}
  },
  onShow () {
  	this.page = 1;
    this.myDiscountFun();
  },
  onReachBottom(){
  	if(this.page != 'end'){
  		this.myDiscountFun();
  	}else{
  		wx.showToast({
  			title:'暂无更多！',
  			icon:'none'
  		})
  	}
  }
}
</script>

<style scoped>
	.disView .list .R{
		width: 25%;
		color: #333333;
		font-size: 28rpx;
		text-align: center;
		font-weight: bold;
	}
	.disView .list .Msg{
		width: 54%;
		padding-right: 26rpx;
		color: #999999;
		font-size: 24rpx;
		line-height: 40rpx;
		border-right: 2rpx solid #E5E5E5; 
		text-align: right;
	}
	.disView .list .L{
		width: 12%;
		text-align: center;
		color: #333333;
		font-size: 40rpx;
		padding-left: 3%;
	}
	.disView .list>div{
		display: inline-block;
		vertical-align: middle;
	}
	.disView .list{
		height: 170rpx;
		line-height: 170rpx;
		font-size: 0;
		border-radius: 8rpx;
		border: solid 2rpx #5b0e12;
		margin-bottom: 24rpx;
	}
	.disView .til{
		font-weight: bold;
		color: #323232;
		font-size: 34rpx;
		line-height: 80rpx;
	}
	.disView{
		padding: 0 2%;
	}
</style>
