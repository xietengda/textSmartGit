<template>
  <div class="container"> 
			
			<scroll-view class="allView" scroll-y> <!--:class="[isIphonex ? 'allViewBtm':'']"-->
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
									<div class="list" :data-cls-id='item2.id' :data-sel-name="item2.name" :data-cls-name='item.name' @click="skipSearch"><div>{{item2.name}}</div></div>
								</div>
							</div>
							<div class="two"  :data-cls-id='item.id' :data-cls-name='item.name' :data-sel-name='allPro[key].cat_id[0].name' @click="skipSearch"><span>查看更多</span></div>
						</div>
						
					</div>
				</div>
			</scroll-view>
			
			<!--公共底部-->
			<!--<allFooter :selType='2' :shopNum='carLength'/>-->
    
  </div>
</template>

<script>
import allFooter from '../../components/footer'

export default {
  data () {
    return {
    	Request: this.$api.api.prototype, //请求头
			util: this.$util.util.prototype, //工具类 
     	allPro:[],//分类列表,
     	carLength:0,//购物车数量
    }
  },

  components: {
    allFooter
  },
  computed:{
	    isIphonex(){
	        return this.$store.getters.isIphonex;
	    },
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
    	//设置选中系列
    	wx.setStorageSync('selClass',e.currentTarget.dataset.selName);
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
    },
    //获取购车商品
		getShopCartFun() {
			var that = this;
			//加载动画
			wx.showLoading();
			that.Request.getShopCart(wx.getStorageSync('userId'))
				.then(res => {
					//隐藏加载动画
					wx.hideLoading();
					if(res.code == 200){
						var goodsList = res.data.supplier_list[0].goods_list;
						var signLength = 0;
						for(var x in goodsList){
							signLength = parseInt(goodsList[x].goods_number) + signLength;
						}
						//购物车数量
						wx.setTabBarBadge({
						  index: 2,
						  text: signLength.toString()
						})
					}
				})
		},
  },

  onLoad() {
  	var that = this;
   	this.getProClassFun();
   	//检查session是否过期 
		wx.checkSession({
		  success(res) {
		    //判断用户信息是否为空
		    if(wx.getStorageSync('userMsg') == '' || wx.getStorageSync('userMsg') == undefined){
		    	//未登录默认是0
		    	that.carLength = 0;
		    }else{
		    	that.getShopCartFun();
		    }
		  },
		  fail(err) {
		    //未登录默认是0
	    	that.carLength = 0;
		  }
		});
  }
}
</script>

<style scoped="scoped">
	page{
		background-color: white;
		background-image: none;   
	}
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
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 2;
	}
	.allViewBtm{
		bottom: 180rpx;
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
	.listCn{
		padding-bottom: 20rpx;
	}
	page{
		background-color: #F7F7F7;
	}
	
</style>
