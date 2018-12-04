<template>
  <div class="container">
    	<div class="addView">
    		<div class="list" v-for='(item,index) in adrList' :key='item.id'>
    			<div class="sub">
    				<div class="L">
	    				<span class="cb_no" :class="[item.sel ?'cb_sel':'']" :data-s-index='index' @click="selAddres"></span>
	    			</div>
	    			<div class="Msg">
	    				<div class="top">
	    					<span class="name">张婕 </span>
	    					<span class="phone">15915804116</span>
	    					<span class="default">默认</span>
	    				</div> 
	    				<div class="btm">广州市海珠区昌岗中路166号富盈国际大厦2505室</div>
	    			</div>
    			</div>
    			<div class="setView">
    				<div><span class="no_sel"></span>设置为默认地址</div>
    			</div>
    		</div>
    	</div>
    	
    	
    	<!--底部操作-->
    	<div class="addBtm">
    		<div class="list">编辑</div>
    		<div class="list add">新增收货地址</div>
    		<div class="list">删除</div>
    	</div>
    	
  </div>
</template>

<script>

export default {
  data () {
    return {
      adrList:[
	      {id:1,sel:false},
	      {id:2,sel:false}
      ]
    }
  },

  components: {
    
  },

  methods: {
    //选择地址
    selAddres(e){
    	var adrList = this.adrList;
    	var sIndex = e.currentTarget.dataset.sIndex;
    	
    	for(var x in adrList){
    		adrList[x].sel = false;
    	}
    	
    	adrList[sIndex].sel = true;
    	this.adrList = adrList;
    }
  },

  created () {
   
  }
}
</script>

<style scoped>
	.setView div span{
		display: inline-block;
		vertical-align: middle;
		width: 20rpx;
		height: 20rpx;
		margin-right: 10rpx;
		margin-top: -3rpx;
	}

	.setView div{
		display: inline-block;
		vertical-align: middle;
		font-size: 24rpx;
		color: #666666;
	}
	.setView{
		height: 50rpx;
		line-height: 50rpx;
		font-size: 0;
		padding: 0 2%;
		text-align: right;
	}
	.addBtm .list{
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		color: #333333;
		font-size: 28rpx;
		margin-bottom: 24rpx;
		background-color: #F7F7F7;
	}
	.addBtm .add{
		color: #5B0E12;
	}
	.addBtm{
		position: fixed;
		bottom: 0;
		width: 96%;
		padding: 0 2%;
		background-color: white;
		padding-top: 20rpx;
		z-index: 3;
	}
	.list .L .cb_sel{
		width: 39rpx !important;
	}
	.Msg .btm{
		color: #666666;
		font-size: 24rpx;
		margin-top: 20rpx;
		line-height: 35rpx;
	}
	.Msg .top{
		font-size: 0;
	}
	.addView .list .default{
		width: 56rpx;
		height: 28rpx;
		text-align: center;
		line-height: 28rpx;
		border: 2rpx solid #5b0e12;
		color: #5B0E12;
		font-size: 20rpx;
		padding: 3rpx 8rpx;
		margin-left: 27rpx;
	}
	.addView .list  .phone{
		color: #666666;
		font-size: 24rpx;
		font-weight: bold;
		margin-left: 44rpx;
	}
	.addView .list  .name{
		color: #333333;
		font-size: 28rpx;
		font-weight: bold;
	}
	.addView .list  .top span{
		display: inline-block;
		vertical-align: middle;
	}
	.addView .list .Msg{
		display: inline-block;
		vertical-align: middle;
		width: 85%;
		margin-left: 20rpx;
		line-height: 40rpx;
	}
	.addView .list .L span{
		width: 28rpx;
		height: 28rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.addView .list .L{
		display: inline-block;
		vertical-align: middle;
		width: 50rpx;
		line-height: 130rpx;
	}
	.sub{
		height: 130rpx;
		line-height: 130rpx;
		border-bottom: 2rpx solid #E5E5E5;
		padding: 0 2%;
		font-size: 0;
	}
	.addView .list{
		margin-bottom: 20rpx;
		background-color: white;
	}
	.addView{
		padding-bottom: 470rpx;
		background-color: #F7F7F7;
	}
</style>
