<template>
  <div class="container">
			<div class="disView">
				<div class="list" v-for='(item,key) in disList' :key='item.id'>
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
    
  </div>
</template>

<script>

export default {
  data () {
    return {
    	Request: this.$api.api.prototype, //请求头
			util: this.$util.util.prototype, //工具类 
      disList:[],
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
  					
  					var bounsList = that.util.conJson(res.data.list);
  					
  					if(that.page != 1 && that.page != 'end'){
  						that.disList = that.disList.concat(bounsList);
  					}else{
  						that.disList = bounsList;
  					}
  					
  					if(res.data.pager.page < res.data.pager.page_count){
  						that.page = parseInt(that.page) + 1;
  					}else{
  						that.page = 'end'
  					}
  					
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
	.disView{
		padding: 0 2%;
	}
</style>
