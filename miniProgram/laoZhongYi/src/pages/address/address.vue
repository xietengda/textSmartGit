<template>
  <div class="container">
			<div class="inputView">
				<div class="list">
					<label>联系人：</label>
					<input type="text" placeholder="请填写收货人姓名" placeholder-class="placeClass" />
				</div>
				<div class="list">
					<label>手机号码：</label>
					<input type="text" placeholder="请填写收货人手机号码" placeholder-class="placeClass"  />
				</div>
				<div class="list">
					<label>所在地区：</label>
					<div class="R">
						<div class="sList">
							{{province[pIndex]}}<span class="arr_g"></span>
							<picker @change="provinceChange" :value="pIndex" :range="province">
						    <view class="picker"> </view>
						  </picker>
						</div>
						<div class="sList">
							{{city[cIndex]}}<span class="arr_g"></span>
							<picker @change="cityChange" :value="cIndex" :range="city">
						    <view class="picker"> </view>
						  </picker>
						</div>
						<div class="sList">
							{{sanjak[sIndex]}}<span class="arr_g"></span>
							<picker @change="sanjakChange" :value="sIndex" :range="sanjak">
						    <view class="picker"> </view>
						  </picker>
						</div>
					</div>
				</div>
				<div class="list">
					<label>详细地址：</label>
					<input type="text" placeholder="请输入街道、楼牌号等" placeholder-class="placeClass"  />
				</div>
				<div class="subBtn">保存地址</div>
			</div>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
      province:['请选择','广东省'],
      pIndex:0,
      city:['请选择','广州市','珠海市'],
      cIndex:0,
      sanjak:['请选择','海珠区','白云区'],
      sIndex:0,
    }
  },

  components: {
    
  },

  methods: {
    //省份选择
    provinceChange(e){
    	this.pIndex =  e.mp.detail.value;
    },
    //城市选择
    cityChange(e){
    	this.cIndex =  e.mp.detail.value;
    },
    //区域选择
    sanjakChange(e){
    	this.sIndex =  e.mp.detail.value;
    },
  },

  created () {
   
  }
}
</script>

<style scoped>
	.sList .picker{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}
	.subBtn{
		width: 96%;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		background-color: #5b0e12;
	  border-radius: 8rpx;
	  color: white;
	  margin: 0 auto;
	  margin-top: 44rpx;
	}
	.inputView .list .R>div>span{
		display: inline-block;
		vertical-align: middle;
		width: 10rpx;
		height: 16rpx;
		transform: rotate(90deg);
		margin-left: 10rpx;
		
	}
	.inputView .list .R>div{
		display: inline-block;
		vertical-align: middle;
		width: 33.33%;
		font-size: 24rpx;
		color: #666666;
		position: relative;
	} 
	.inputView .list .R{
		display: inline-block;
		vertical-align: middle;
		line-height: 93rpx;
		width: 75%;
	}
	.inputView .list input{
		display: inline-block;
		vertical-align: middle;
		line-height: 93rpx;
		width: 65%;
		font-size: 28rpx;
		color: #232323;
	}
	.inputView .list label{
		color: #333333;
		font-size: 28rpx;
		display: inline-block;
		vertical-align: middle;
		width: 20%;
		font-weight: bold;
	}
	.inputView .list{
		height: 93rpx;
		line-height: 93rpx;
		font-size: 0;
		padding: 0 2%;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.inputView{
		margin-top: 20rpx;
	}
</style>
