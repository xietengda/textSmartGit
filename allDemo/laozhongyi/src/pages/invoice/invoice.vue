<template>
  <div class="container">
			<div class="inView">
				<div class="inCn">
					<div class="til">发票类型</div>
					<div class="inList">
						<div class="list" :class="[selType == 1?'sel':'']" data-s-type='1' @click="changeType" >不开发票</div>
						<div class="list" :class="[selType == 2?'sel':'']" data-s-type='2' @click="changeType">电子发票</div>
					</div>
				</div>
				<!--空白-->
				<div class="btnView" v-if="selType == 1"></div>
				<!--选择开票-->
				<div class="invoType" v-if="selType == 2">
					<div class="inTil">发票抬头</div>
					<div class="selInvoice">
						<div class="list" data-invoice='1' @click="selInvoice">
							 <span class="no_sel" :class="[invoType == 1 ?'is_sel':'']"></span>个人
						</div>
						<div class="list" data-invoice='2' @click="selInvoice">
							<span class="no_sel" :class="[invoType == 2 ?'is_sel':'']"></span>单位
						</div>
					</div>
					<div class="inputView">
						<!--个人-->
						<div class="subView" v-if="invoType == 1">
							<input type="text" v-model.lazy="psEmail" placeholder="请填写电子邮箱" placeholder-class="placeClass" />
						</div>
						<!--单位-->
						<div class="subView" v-if="invoType == 2">
							<input type="text" v-model.lazy="unName" placeholder="请填写单位名称" placeholder-class="placeClass" />
							<input type="text" v-model.lazy="unNum" placeholder="请填写纳税人识别号" placeholder-class="placeClass" />
							<input type="text" v-model.lazy="unEmail" placeholder="请填写电子邮箱" placeholder-class="placeClass" />
						</div>
					</div>
				</div>
				<div class="btn">
					<div class="subBtn" @click="okBtnFun">确定</div>
				</div>
			</div>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
	    util: this.$util.util.prototype, //工具类
	    selType:1,//是否开票 1：不开，2：电子票
	    invoType:1,//1：个人发票，2：单位
	    psEmail:'',//个人邮箱
	    unNum:'',//税号
	    unName:'',//单位名称
	    unEmail:'',//单位邮箱
    }
  },

  components: {
    
  },

  methods: {
  	//改变类型
    changeType(e){
    	this.selType = e.currentTarget.dataset.sType;
    },
    //选择发票类型
    selInvoice(e){
    	this.invoType =e.currentTarget.dataset.invoice;
    },
    //点击OK按钮
    okBtnFun(){
    	
    	//判断是否开票
    	if(this.selType == 1){
    		wx.setStorageSync('invoice',null);
    		wx.navigateBack();
    	}else{
    		//判断是个人发票还是单位发票
    		if(this.invoType == 1){
    			if(!this.util.isEmail(this.psEmail)){
						wx.showToast({
    					title:'电子邮箱不正确',
    					icon:'none'
    				})
    				return;
					}
    			
    			var sign = {
    				type:'individual',
    				email:this.psEmail
    			}
    			
    			//存进本地
    			wx.setStorageSync('invoice',sign);
    			wx.navigateBack();
    		}else{
    			//单位
    			if(this.unName == ''){
    				wx.showToast({
    					title:'请输入单位名称',
    					icon:'none'
    				})
    				return;
    			}
    			
    			if(this.unNum == ''){
    				wx.showToast({
    					title:'请输入税号',
    					icon:'none'
    				})
    				return;
    			}
    			
    			if(!this.util.isEmail(this.unEmail)){
						wx.showToast({
    					title:'电子邮箱不正确',
    					icon:'none'
    				})
    				return;
					}
    			
    			var sign = {
    				type:'unit',
    				name:this.unName,
    				num:this.unNum,
    				email:this.unEmail,
    			}
    			
    			//存进本地
    			wx.setStorageSync('invoice',sign);
    			wx.navigateBack();
    		}
    	}
    	
    }
  },

  created () {
   
  }
}
</script>

<style scoped>
	.inputView{
		background-color: white;
	}
	.btn{
		background-color: white;
		padding: 0.01rpx 2%;
	}
	.subView input{
		height: 64rpx;
		background-color: #f2f2f2;
		border-radius: 8rpx;
		line-height: 64rpx;
		font-size: 24rpx;
		color: #232323;
		padding-left: 20rpx;
		margin-bottom: 20rpx;
	}
	.subView{
		padding: 0 2%;
		background-color: white;
		border: 1rpx solid white;
	}
	.selInvoice .list:nth-child(1){
		margin-right: 87rpx;
	}
	.selInvoice .list span{
		display: inline-block;
		vertical-align: middle;
		width: 25rpx;
		height: 25rpx;
		margin-right: 12rpx;
		margin-top: -5rpx;
	}
	.selInvoice .list{
		color: #333333;
		font-size: 24rpx;
		display: inline-block;
		vertical-align: middle;
		line-height: 50rpx;
	}
	.selInvoice{
		background-color: white;
		font-size: 0;
		padding: 0 2%;
		padding-bottom: 20rpx;
	}
	.invoType .inTil{
		height: 60rpx;
		line-height: 60rpx;
		padding-top: 10rpx;
		background-color: white;
		color: #666666;
		font-size: 28rpx;
		padding: 0 2%;
	}
	.invoType{
		background-color: #F7F7F7;
		padding-top: 20rpx;
	}
	.inList .sel{
		border-color: #5B0E12 !important;
		color: #5B0E12 !important;
	}
	.btnView{
		background-color: white;
		padding-top: 0.01rpx;
		height: 300rpx;
	}
	.subBtn{
		margin-top: 20rpx;
		height: 80rpx;
		background-color: #5b0e12;
		border-radius: 8rpx;
		color: #fffefe;
		font-size: 28rpx;
		text-align: center;
		line-height: 80rpx;
	}
	.inCn .inList .list{
		display: inline-block;
		vertical-align: middle;
		padding: 0 32rpx;
		border-radius: 8rpx;
		border: 2rpx solid #E5E5E5;
		text-align: center;
		height: 64rpx;
		line-height: 64rpx;
		color: #333333;
		font-size: 24rpx;
		margin: 10rpx;
	}
	.inCn .inList{
		padding: 2% 0;
		font-size: 0;
	}
	.inCn .til{
		height: 90rpx;
		line-height: 90rpx;
		color: #666666;
		font-size: 28rpx;
	}
	.inView .inCn{
		margin-top: 10rpx;
		background-color: white;
		padding: 0 2%;
	}
	.inView{
		background-color: #F7F7F7;
		padding-top: 0.01rpx;
	}
</style>
