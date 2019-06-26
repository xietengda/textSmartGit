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
			
			<div class="condiTion_2">
				<div class="list">
					<div>
						{{cdt_one[c_one]}}<span class="downIcon"></span>
						<picker  @change="cdtOneChange" :value="c_one" :range="cdt_one">
					    <view class="picker"></view>
					  </picker>
					</div>
				</div>
				<div class="list">
					<div>
						{{cdt_two[c_two]}}<span class="downIcon"></span>
						<picker  @change="cdtTwoChange" :value="c_two" :range="cdt_two">
					    <view class="picker"></view>
					  </picker>
					</div>
				</div>
				<div class="list">
					<div>
						{{cdt_third[c_third]}}<span class="downIcon"></span>
						<picker  @change="cdtThirdChange" :value="c_third" :range="cdt_third">
					    <view class="picker"></view>
					  </picker>
					</div>
				</div>
			</div>
			
			<div class="seaCn div_float">
				<div class="sList" v-for="(item,index) in proList" :key='item.id' >
					<div class="sub"  :class="[index % 2 == 0 ?'rBorder':'']" >
						<img src="../../../static/img/list1.png" />
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
      cdt_one:['孕安保湿系列','hhe'],
      c_one:0,
      cdt_two:['产品类型','hhe'],
      c_two:0,
      cdt_third:['肌肤需求','hhe'],
      c_third:0,
      proList:[1,1,1,1],
    }
  },

  components: {
    
  },

  methods: {
    //第一个下拉条件
    cdtOneChange(e){
    	console.log(e);
    	this.c_one = e.mp.detail.value;
    },
    //第二个下拉条件
    cdtTwoChange(e){
    	this.c_two = e.mp.detail.value;
    },
    //第三个下拉条件
    cdtThirdChange(e){
    	this.c_third = e.mp.detail.value;
    },
  },

  created () {
   
  }
}
</script>

<style scoped>
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
		color: #5b0e12;
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
	.condiTion_2 .list  .picker{
		position: absolute;
		margin: auto;
		top: 0;
		left: 0;
		
		bottom: 0;
		height: 72rpx;
		width: 100%;
		height: 100%;
	}
	/*.condiTion_2 .list picker{
		position: absolute;
		margin: auto;
		top: 0;
		bottom: 0;
		height: 72rpx;
		width: 100%;
		height: 100%;
		left: 0;
		
	}*/
	.condiTion_2 .list>div span{
		display: inline-block;
		vertical-align: middle;
		width: 16rpx;
		height: 14rpx;
		margin-left: 5rpx;
	}
	.condiTion_2 .list>div{
		display: inline-block;
		vertical-align: middle;
		padding: 0 20rpx;
		height: 72rpx;
		line-height: 72rpx;
		background-color: #f2f2f2;
		border-radius: 8rpx;
	}
	.condiTion_2 .list{
		display: inline-block;
		vertical-align: middle;
		width: 33.33%;
		text-align: center;
		color: #666666;
		font-size: 28rpx;
		position: relative;
	}
	.condiTion_2{
		height: 132rpx;
		line-height: 132rpx;
		font-size: 0;
	}
	.condiTion_1 .list .sel{
		color: #5b0e12 !important;
		border-bottom: 4rpx solid #5b0e12;
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
