<template>
  <div class="container">   <!--:class="[isIphonex ? 'ixPaddCn':'']"-->
			<div class="seaView"  @click="skipSearch">
				<span class="seaIcon"></span>请输入商品名称
			</div>
			
			<div class="indexView"  :style="{background: 'url('+indexBg.img+')',height:indexBg.height}">
				<div v-for="(item,kye) in viewDiv" :key="item.id" :style="{width:item.width,top:item.top,left:item.left,height:item.height}" @click="skipDetail" :data-goods-id='item.id'></div>
			</div>
			
			<!--公共底部-->
			<!--<allFooter :selType='1' :shopNum='carLength'/>-->
    
  </div>
</template> 

<script>
import allFooter from '../../components/footer'

export default {
  data () {
    return {
      	Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类 
				indexBg:{
					img:'',
					height:''
				},//背景图
				viewDiv:[],//渲染div
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
  	//首页商品
    indexAllFun(){ 
    	var that = this;
    	that.Request.getIndexAll()
    		.then(res =>{
    			if(res.code == 200){
    				wx.getImageInfo({
						  src: res.data[0].ad_img,
						  success (data) {
						  	console.log(res)
						    let mulriple =  (data.width/750).toFixed(2);
						    let signImg = {
						    	width:(data.width/mulriple).toFixed(2),
						    	height:(data.height/mulriple).toFixed(2)+'rpx',
						    	img:res.data[0].ad_img
						    }
						    
						    that.indexBg = signImg;
						  }
						})
    			
    				var sign = [];
    				for(var x in res.data["0"].position){
    					var signOb = {
    						height:parseFloat(res.data[0].position[x].height) * 85+'rpx',
    						left:parseFloat(res.data[0].position[x].left) * 95+'rpx',
    						top:parseFloat(res.data[0].position[x].top) * 90+'rpx',
    						width:parseFloat(res.data[0].position[x].width) * 80+'rpx',
    						id:res.data[0].position[x].link.split('?id=')[1]
    					}
    					sign.push(signOb);
    				}
    				that.viewDiv = sign;
    			}
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
    //点击跳转
    skipDetail(e){
    	wx.navigateTo({
    		url:'/pages/proDetail/main?goodsId='+e.currentTarget.dataset.goodsId
    	})
    },
    //跳转搜索页
    skipSearch(){
    	wx.navigateTo({
    		url:'/pages/search/main'
    	});
    }
  },
  onLoad(){
  	var that = this;
   	//获取首页商品
   	this.indexAllFun();
   	//检查session是否过期 
		wx.checkSession({
		  success(res) {
		    //判断用户信息是否为空
		    if(wx.getStorageSync('userMsg') == '' || wx.getStorageSync('userMsg') == undefined){
		    	//未登录默认是0
		    	that.carLength = 0;
		    	wx.setStorageSync('userId', 0);
		    }else{
		    	that.getShopCartFun();
		    }
		  },
		  fail(err) {
		    //未登录默认是0
	    	that.carLength = 0;
	    	wx.setStorageSync('userId', 0);
		  }
		});
		
		wx.showShareMenu({
		  withShareTicket: true
		})
		
   	
  },
  onShareAppMessage(){
  	return {
      title: '老中医',
      path: '/pages/index/main'
    }
  }
}
</script>

<style scoped>
	.container{
		min-height: 100%;
		/*padding-bottom: 112rpx;*/
	}
	.indexView{
		margin-top: 20rpx;
		position: relative;
		width: 100%;
		background-size: 100% 100% !important;
	}
	.indexView div{
		position: absolute;
		z-index: 3;
	}
	
</style>
