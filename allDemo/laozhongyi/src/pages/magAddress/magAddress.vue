<template>
  <div class="container">
    	<scroll-view scroll-y class="addView" @scrolltolower='pullUpdate'>
    		<div class="list" v-for='(item,index) in adrList' :key='item.id'>
    			<div class="sub">
    				<div class="L">
	    				<span class="cb_no" :class="[item.sel ?'cb_sel':'']" :data-s-index='index' @click="selAddres"></span>
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
    			<div class="setView">
    				<div  v-if='item.def_addr == 0' :data-s-index='index'  :data-a-id='item.address_id' @click="setDefault"><span class="no_sel"></span>设置为默认地址</div>
    			</div>
    		</div>
    	</scroll-view>
    	
    	
    	<!--底部操作-->
    	<div class="addBtm">
    		<div class="list" @click="editAddress">编辑</div>
    		<div class="list add" @click="addAddress">新增收货地址</div>
    		<div class="list" @click="delAddress">删除</div>
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
    //设置成默认地址
    setDefault(e){
    	var that = this;
    	var aId = e.currentTarget.dataset.aId;
    	var sIndex = e.currentTarget.dataset.sIndex;
    	
    	that.Request.setDefaultAdd(wx.getStorageSync('userId'),aId)
    		.then(res =>{
    			console.log(res)
    			if(res.code == 200){
    				var adrList = that.adrList;
    				for(var x in adrList){
    					adrList[x].def_addr = 0;
    				}
    				//设置成默认地址，改变页面数据
    				adrList[sIndex].def_addr = 1;
    				
    				wx.showToast({ 
		    			title:'设置成功',
		    		})
    			}else{
    				wx.showToast({ 
		    			title:'网络出错',
		    			icon:'none'
		    		})
    			}
    		})
    		.catch(res =>{
    			console.log(res)
    		})
    },
    //上拉加载
    pullUpdate(){
    	if(this.page != 'end'){
    		this.addressListFun();
    	}else{
    		wx.showToast({ 
    			title:'没有更多了',
    			icon:'none'
    		})
    	}
    },
    //点击增加新地址
    addAddress(){
    	wx.navigateTo({
    		url:'/pages/address/main'
    	})
    },
    //修改地址
    editAddress(e){
    	 var adrList = this.adrList;
    	 var addressId = '';
    	 for(var x in adrList){
    	 		if(adrList[x].sel){
    	 			addressId = adrList[x].address_id;
    	 		}
    	 }
    	 
    	if(addressId == ''){
    		wx.showToast({ 
    			title:'请选择地址',
    			icon:'none'
    		})
    		return;
    	}
    	
    	wx.navigateTo({
    		url:'/pages/address/main?addressId='+addressId
    	})
    	 
    },
    //删除地址
    delAddress(){
    	var that = this;
    	var adrList = this.adrList;
    	 var addressId = '';
    	 for(var x in adrList){
    	 		if(adrList[x].sel){
    	 			addressId = adrList[x].address_id;
    	 		}
    	 }
    	 
    	if(addressId == ''){
    		wx.showToast({ 
    			title:'请选择地址',
    			icon:'none'
    		})
    		return;
    	}
    	
    	that.Request.removeAddress(wx.getStorageSync('userId'),addressId)
    		.then(res =>{
    			console.log(res)
    			if(res.code == 200){
    				that.page = 1;
    				that.addressListFun();
    			}
    		})
    	
    }
  },

  onShow () {
  	this.page = 1;
   	this.addressListFun();
  },
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
	.addView{
		height: 895rpx;
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
		background-color: #F7F7F7;
	}
</style>
