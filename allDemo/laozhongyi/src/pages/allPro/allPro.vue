<template>
  <div class="container">
			
			<div class="allView">
				<div class="list">
					<div class="top div_float" :data-cls-id='0'  data-cls-name='全部商品' @click="skipSearch">
						<div>全部商品</div>
						<div><span class="arr_g"></span></div>
					</div>
				</div>
				<div class="listCn">
					<div class="list" v-for="(item,key) in allPro" :key='item.id'>
						<div class="top div_float"  :data-s-index='key' @click="openList">
							<div>{{item.name}}</div>
							<div><span class="arr_g down" :class="[item.open ?'up':'']"></span></div>
						</div>
						<div class="btm div_float" v-show="item.open">
							<div class="div_float">
								<div class="one" v-for="(item2,key2) in item.cat_id" :key='item2.id'>
									<div class="list" :data-cls-id='item2.id' @click="skipSearch"><div>{{item2.name}}</div></div>
								</div>
							</div>
							<div class="two"  :data-cls-id='allPro[key].cat_id[0].id' :data-cls-name='item.name' @click="skipSearch"><span>查看更多</span></div>
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
    	Request: this.$api.api.prototype, //请求头
			util: this.$util.util.prototype, //工具类 
     	allPro:[],//分类列表
    }
  },

  components: {
    
  },

  methods: {
    //打开列表
    openList(e){
    	var sIndex = e.currentTarget.dataset.sIndex;
    	var allPro = this.allPro;
    	var sign = true;
    	if(allPro[sIndex].open){
    		sign = false;
    	}
    	
    	for(var x in allPro){
    		allPro[x].open = false
    	}
    	allPro[sIndex].open = sign;
    	
    	this.allPro = allPro;
    	
    },
    //跳转搜索页
    skipSearch(e){
    	console.log(e.currentTarget.dataset.clsId)
    	//设置搜索页面标题
    	wx.setStorageSync('seaTil',e.currentTarget.dataset.clsName);
    	wx.navigateTo({
			  url: '/pages/seaResult/main?clsId='+e.currentTarget.dataset.clsId
			})
    },
    //获取商品分类
    getProClassFun(){
    	var that = this;
    	
    	that.Request.getProClass()
    		.then(res =>{
    			console.log(res)
    			if(res.code == 200){
    				for(let x in res.data.category_list){
    					res.data.category_list[x].open = false;
    				}
    				that.allPro  = that.util.conJson(res.data.category_list);
    			}
    		})
    		.catch(res =>{
    			console.log(res)
    		})
    }
  },

  onLoad() {
   this.getProClassFun();
  }
}
</script>

<style>
	.allView  .btm .two{
		text-align: right;
		color: #333333;
		font-size: 24rpx;
		margin-top: 20rpx;
		padding: 0 4%;
		line-height: 60rpx;
		
	}
	.allView .btm .list>div{
		width: 90%;
		height: 64rpx;
		background-color: #f2f2f2;
		border-radius: 8rpx;
		text-align: center;
		color: #333333;
		font-size: 24rpx;
		line-height: 64rpx;
		margin: 0 auto;
	}
	.allView .btm .list{
		float: left;
		width: 50%;
		padding: 10rpx 0;
	}
	.allView .btm{
		padding: 10rpx 0;
		background-color: white;
	}
	.allView{
		background-color: #F7F7F7;
		padding-top: 0.01rpx;
	}
	.allView .list .top{
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 2%;
		background-color: white;
		margin-top: 20rpx;
		color: #666666;
		font-size: 26rpx;
	}
	.allView .list .top>div:nth-child(1){
		float: left;
	}
	.allView .list .top>div:nth-child(2){
		float: right;
	}
	.allView .list .top>div:nth-child(2) span{
		display: inline-block;
		vertical-align: middle;
		width: 16rpx;
		height: 28rpx;
		margin-top: -5rpx;
	}
	.allView .list .top .down{
		transform: rotate(90deg);
		margin-right: 9rpx;
	}
	.allView .list .top .up{
		transform: rotate(270deg);
		margin-right: 9rpx;
	}
	page{
		background-color: #F7F7F7;
	}
	
</style>
