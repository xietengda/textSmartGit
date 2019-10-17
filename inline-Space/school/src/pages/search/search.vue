<template>
  <div class="container">
			<div class="searchView">
				<span class="seaIcon"></span>
				<input type="text" placeholder="请输入商品名称"  placeholder-class='placeClass'/>
				<button>搜索</button>
			</div>
			
			<div class="hotSearch">
				<div class="til">热门推荐</div>
				<div class="hsCn">
					<div class="list" v-for="(item,key) in hotSeaList" :key='item.id'>护肤</div>
				</div>
			</div>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
      hotSeaList:[1,1,1,1],
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
	.hsCn .list{
		padding: 0 26rpx;
		height: 58rpx;
		line-height: 58rpx;
		text-align: center;
		background-color: #f5f5f5;
		border-radius: 29rpx;
		display: inline-block;
		vertical-align: middle;
		color: #333333;
		font-size: 24rpx;
		margin: 10rpx;
	}
	.hsCn{
		padding:2%;
	}
	.hotSearch .til{
		color: #666666;
		font-size: 28rpx;
	}
	.hotSearch{
		padding: 0 2%;
		margin-top: 40rpx;
	}
	
	.searchView button{
		width: 100rpx;
		height: 64rpx;
		line-height: 64rpx;
		background-color: #293462;
		color: white;
		text-align: center;
		color: #fefefe;
		font-size: 28rpx;
		display: inline-block;
		vertical-align: middle;
		padding: 0;
		margin-left: 13rpx;
	}
	.searchView input{
		width: 530rpx;
		height: 64rpx;
		line-height: 64rpx;
		color: #232323;
		font-size: 28rpx;
		display: inline-block;
		vertical-align: middle;
		background-color: #f2f2f2;
		border-radius: 8rpx;
		padding-left: 70rpx;
	}
	.searchView span{
		width: 30rpx;
		height: 30rpx;
		margin: auto;
		top: 0;
		bottom: 0;
		position: absolute;
		display: inline-block;
		vertical-align: middle;
		margin-left: 20rpx;
	}
	.searchView{
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 2%;
		position: relative;
		font-size: 0;
	}
</style>
