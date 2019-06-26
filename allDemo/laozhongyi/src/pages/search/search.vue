<template>
  <div class="container">
			<div class="searchView">
				<span class="seaIcon"></span>
				<input type="text" v-model:lazy="seaText" placeholder="请输入商品名称"  placeholder-class='placeClass'/>
				<button @click="searchFun">搜索</button>
			</div>
			
			<div class="hotSearch">
				<div class="til">热门推荐</div>
				<div class="hsCn">
					<div class="list" v-for="(item,key) in hotSeaList" :key='item.id' :data-sea-text='item' @click="hotSearch">{{item}}</div>
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
      hotSeaList:[1,1,1,1],
      seaText:'',//搜索文字
    }
  },

  components: {
    
  },

  methods: {
  	//点击搜索
    searchFun(){
    	var seaText = this.seaText;
    	
    	if(seaText == ''){
    		wx.showToast({
    			title:'请输入商品名称',
    			icon:'none'
    		})
    		return;
    	}
    	wx.setStorageSync('seaText',seaText);
    	wx.navigateTo({
    		url:'/pages/seaResult/main'
    	})
    	
    },
    //点击热门搜索
    hotSearch(e){
    	wx.setStorageSync('seaText',e.currentTarget.dataset.seaText);
    	this.seaText = e.currentTarget.dataset.seaText;
    	wx.navigateTo({
    		url:'/pages/seaResult/main'
    	})
    },
   	//获取热门搜索
   	getHotSearchFun(){
   		var that = this;
   		that.Request.getHotSearch()
   			.then(res =>{
   				console.log(res)
   				if(res.code == 200){
   					that.hotSeaList = that.util.conJson(res.data);
   				}
   			})
   			.catch(res =>{
   				console.log(res)
   			})
   	}
  },

  onShow() {
   this.getHotSearchFun();
  },
  onUnload(){
  	this.seaText = '';
  	wx.removeStorageSync('seaText')
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
		background-color: #5B0E12;
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
