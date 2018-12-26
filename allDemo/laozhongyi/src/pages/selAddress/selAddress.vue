<template>
  <div class="container">
    	<div scroll-y class="addView">
    		<div class="list" v-for='(item,index) in adrList' :key='item.id'>
    			<div class="sub">
    				<div class="L">
	    				<span class="cb_no" :class="[item.sel ?'cb_sel':'']" :data-s-index='index' :data-s-id='item.address_id' @click="selAddres"></span>
	    			</div>
	    			<div class="Msg">
	    				<div class="top">
	    					<span class="name">{{item.consignee}}</span>
	    					<span class="phone">{{item.mobile}}</span>
	    					<span class="default" v-if='item.def_addr == 1'>默认</span>
	    				</div> 
	    				<div class="btm">{{item.address_short_name}}</div>
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
      adrList:[],
      page:1,//页码
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
    	
    	//将选中地址存进sessionStorage
    	wx.setStorageSync('adrId',e.currentTarget.dataset.sId);
    	
    	//返回上一页
    	wx.navigateBack();
    	
    },
    //获取收货地址
    addressListFun(){
    	var that = this;
    	that.Request.addressList(wx.getStorageSync('userId'),that.page)
    		.then(res =>{
    			console.log(res);
    			if(res.code == 200){
    				for(var x in res.data.list){
    					res.data.list[x].sel = false;
    				}
    				var signArr = that.util.conJson(res.data.list);
    				
    				if(that.page  != 1 && that.page != 'end'){
    					signArr.concat(that.adrList);
    				}
    				
    				if(res.data.pager.page < res.data.pager.page_count){
    					that.page = parseInt(that.page) + 1;
    				}else{
    					that.page = 'end'
    				}
    				
    				that.adrList = signArr;
    			}
    		})
    },
  },

  onShow () {
  	this.page = 1;
   	this.addressListFun();
  },
  onReachBottom(){
  	if(this.page != 'end'){
			this.addressListFun();
		}else{
			wx.showToast({ 
				title:'没有更多了',
				icon:'none'
			})
		}
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
	.addView{
		height: 100%;
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
		border-top: 2rpx solid #E5E5E5;
		border-bottom: 2rpx solid #E5E5E5;
		padding: 0 2%;
		font-size: 0;
	}
	.addView .list{
		margin-bottom: 20rpx;
		background-color: white;
	}
	.addView{
		background-color: #F7F7F7;
	}
</style>
