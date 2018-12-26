<template>
  <div class="container">
			<div class="seaView"  @click="skipSearch">
				<span class="seaIcon"></span>请输入商品名称
			</div>
			
			<div class="indexView" :style="{background: 'url('+indexBg.img+')',height:indexBg.height}">
				<div v-for="(item,kye) in viewDiv" :key="item.id" :style="{width:item.width,top:item.top,left:item.left,height:item.height}" @click="skipDetail" :data-goods-id='item.id'></div>
			</div>
			
    
  </div>
</template>

<script>

export default {
  data () {
    return {
      	Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类 
				indexBg:{
					img:''
				},//背景图
				viewDiv:[],//渲染div
    }
  },

  components: {
    
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
    						height:res.data[0].position[x].height+'rem',
    						left:res.data[0].position[x].left+'rem',
    						top:res.data[0].position[x].top+'rem',
    						width:res.data[0].position[x].width+'rem',
    						id:res.data[0].position[x].link.split('?id=')[1]
    					}
    					sign.push(signOb);
    				}
    				that.viewDiv = sign;
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
  onShow(){
   	//获取首页商品
   	this.indexAllFun();
  }
}
</script>

<style scoped>
	.container{
		min-height: 100%;
		/*border: 1px solid green;*/
	}
	.indexView{
		/*border: 1px solid red;*/
		margin-top: 20rpx;
		position: relative;
		width: 100%;
		background-size: 100% 100% !important;
	}
	.indexView div{
		position: absolute;
		border: 1px solid red;
		z-index: 3;
	}
	
</style>
