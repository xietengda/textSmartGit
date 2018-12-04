<template>
  <div class="container">
			<div class="disView">
				<div class="list" v-for='(item,key) in disList' :key='item.id'>
					<div class="L">
						<span>¥100</span>
					</div>
					<div class="Msg">
						<div>指定商品</div>
						<div>满198可用</div>
						<div>使用日期：2018.09.30-2018.11.01</div>
					</div>
					<div class="R">
						<span>立即使用</span>
					</div>
				</div>
			</div>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
     disList:[1,1,1]
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
		width: 15%;
		text-align: center;
		color: #333333;
		font-size: 40rpx;
	}
	.disView .list>div{
		display: inline-block;
		vertical-align: middle;
	}
	.disView .list{
		height: 144rpx;
		line-height: 144rpx;
		font-size: 0;
		border-radius: 8rpx;
		border: solid 2rpx #5b0e12;
		margin-bottom: 24rpx;
	}
	.disView{
		padding: 0 2%;
	}
</style>
