<template>
  <div class="container">
			<div class="seaView"  @click="skipSearch">
				<span class="seaIcon"></span>{{seaText}}
			</div>
			
			<div :class="[isFixed ? 'cdtView':'']">
				<div class="condiTion_1">
						<div class="list" @click="selCtOne" data-s-type='add_time'><span :class="[ctOne == 'add_time' ?'sel':'']">时间</span></div>
						<div class="list" @click="selCtOne" data-s-type='sold_count'><span :class="[ctOne == 'sold_count' ?'sel':'']">销量</span></div>
						<div class="list" @click="selCtOne" data-s-type='shop_price'><span :class="[ctOne == 'shop_price' ?'sel':'']">价格</span></div>
				</div>
				
				<div class="condiTion_2" :hidden="hideCnTwo">
					<div class="list">
						<div>
							{{cdt_one[c_one].name}}<span class="downIcon"></span>
							<picker  @change="cdtOneChange" :value="c_one" :range="cdt_one" :range-key="'name'">
						    <view class="picker"></view>
						  </picker>
						</div>
					</div>
					<div class="list">
						<div>
							{{cdt_two[c_two].attr_value}}<span class="downIcon"></span>
							<picker  @change="cdtTwoChange" :value="c_two" :range="cdt_two" :range-key="'attr_value'">
						    <view class="picker"></view>
						  </picker>
						</div>
					</div>
					<div class="list">
						<div>
							{{cdt_third[c_third].attr_value}}<span class="downIcon"></span>
							<picker  @change="cdtThirdChange" :value="c_third" :range="cdt_third" :range-key="'attr_value'">
						    <view class="picker"></view>
						  </picker>
						</div>
					</div>
				</div>
			</div>
			
			<div class="seaCn div_float" :class="[isFixed ? 'pdgTop':'',proList.length == 1?'seaCnWhite':'']">
				<div class="div_float"  v-if="proList.length != 0">
					<div class="sList" v-for="(item,index) in proList" :key='item.id'>
						<div class="sub"  :class="[index % 2 == 0 ?'rBorder':'']" :data-goods-id='item.goods_id' @click="skipDetail">
							<img :src="item.goods_thumb" />
							<div class="til eli_one">{{item.goods_name}}</div>
							<div class="price">
								<span class="rp">¥{{item.shop_price}}</span>
								<span class="op">¥{{item.market_price}}</span>
							</div>
						</div>
					</div>
				</div>
				
				
				<div class='noProduct' v-else>
				    <div class='nullCart'>
				      <div class='nullIcon nullOrder'></div>
				      <div class='nullText'>没有相关商品</div>
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
      cdt_one:[{name:''}],//条件2  选项1
      c_one:0,
      cdt_two:[{attr_value:''}],//条件2  选项2
      c_two:0, 
      cdt_third:[{attr_value:''}],//条件2  选项3
      c_third:0,
      proList:[],
      ctOne:'add_time',// 第一个条件，1:时间 2:销量 3:价格
      hideCnTwo:false,//是否隐藏第二个条件
      page:1,//页码
      clsId:'',//分类id
      attr2:'',//第2个属性
      attr3:'',//第3个属性
      isFixed:false,//固定条件
      seaText:'',//搜索关键字
    }
  },

  components: {
    
  },

  methods: {
    //第一个下拉条件
    cdtOneChange(e){
    	console.log(e);
    	this.c_one = e.mp.detail.value;
    	
    	//设置分类id
    	this.clsId = this.cdt_one[this.c_one].id;
    	
    	//重置2.3条件
    	this.c_two = 0;
    	this.c_third = 0;
    	this.attr2 = '';
    	this.attr3 = '';
    	
    	//设置页码回到第一页
			this.page = 1;
			//重新请求商品列表
			this.getProductFun();
    	
    },
    //第二个下拉条件
    cdtTwoChange(e){
    	var sIndex = e.mp.detail.value;
    	this.c_two = sIndex;
    	
    	//重置3条件
    	this.c_third = 0;
    	this.attr3 = '';
    	
    	//设置选中属性
    	if(sIndex >= 1){
				this.attr2 = this.cdt_two[sIndex].attr_id;
			}else{
    		this.attr2 = '';
    	}
			
			//设置页码回到第一页
			this.page = 1;
			//重新请求商品列表
			this.getProductFun();

    	
    },
    //第三个下拉条件
    cdtThirdChange(e){
    	var sIndex = e.mp.detail.value;
    	this.c_third = sIndex;
    	
    	//设置选中属性
    	if(sIndex >= 1){
				this.attr3 = this.cdt_third[sIndex].attr_id;
			}else{
    		this.attr3 = '';
    	}
    	
			//设置页码回到第一页
			this.page = 1;
			//重新请求商品列表
			this.getProductFun();
    },
    //第一排选择条件
    selCtOne(e){
    	var type = e.currentTarget.dataset.sType;
    	this.ctOne = type;
    	
    	//设置页码回到第一页
		  this.page = 1;
		  //重新请求商品列表
		  this.getProductFun();
    },
    //跳转详情
    skipDetail(e){
    	var goodsId = e.currentTarget.dataset.goodsId;
    	wx.navigateTo({
    		url:'/pages/proDetail/main?goodsId='+goodsId,
    	})
    },
    //获取商品列表
    getProductFun(){
    	var that = this; 
    	//加载动画
    	wx.showLoading({
    		mask:true
    	});
    	
    	//设置2，3属性
    	var signAttr = '';
    	if(that.attr2 != '' && that.attr3 != '' ){
    		signAttr = that.attr2 +'.'+that.attr3;
    	}else if(that.attr2 != ''  && that.attr3 == ''){
    		signAttr = that.attr2;
    	}else if(that.attr2 == ''  && that.attr3 != ''){
    		signAttr = that.attr3;
    	}
    	
    	var paixu  = 'desc';
    	
    	//如果选择的是价格，按照升序排序
    	if(that.ctOne == 'shop_price'){
    		paixu = 'asc';
    	}
    	
    	that.Request.getProduct(that.seaText,that.clsId,that.page,that.ctOne,signAttr,paixu)
    		.then(res =>{
    			console.log(res)
    			if(res.code == 200){
    				
    				//设置条件2的第一个选项
    				if(res.data.childcat){
    					console.log('1111',res.data.childcat)
    					that.cdt_one = that.util.conJson(res.data.childcat);
    					
    					//设置选中的那个
    					for(let x in res.data.childcat){
    						if(res.data.childcat[x].id == that.clsId){
    							//设置选中小下标
    							that.c_one = x;
    						}
    					}
    				}
    				
    				if(res.data.filter_attr_list){
    					var attList1 = res.data.filter_attr_list[0].attr_list
	    				//设置条件2的第二个选项
	    				if(attList1 != undefined){
	    					that.cdt_two = that.util.conJson(attList1);
	    				}
	    				
	    				if(res.data.filter_attr_list[1]){
	    					var attList2 = res.data.filter_attr_list[1].attr_list
		    				//设置条件2的第三个选项
		    				if(attList2 != undefined){
		    					that.cdt_third = that.util.conJson(attList2);
		    				}
	    				}else{
	    					var sign3 = [{
	    						attr_value:'全部肌肤需求'
	    					}]
	    					that.cdt_third = sign3;
	    				}
    				}else{
    					var sign2 = [{
    						attr_value:'全部产品分类'
    					}]
    					var sign3 = [{
    						attr_value:'全部肌肤需求'
    					}]
    					that.cdt_two = sign2;
	    				that.cdt_third = sign3;
    				}
    				
    				
    				if(res.data.list.length != 0){
    					
    					//只有（page == 1）才重新渲染条件2
	    				if(that.page == 1 && res.data.list.length != 0){
	    					
	    				}else{
	    					var sign2 = [{
	    						attr_value:'全部产品分类'
	    					}]
	    					var sign3 = [{
	    						attr_value:'全部肌肤需求'
	    					}]
	    					that.cdt_two = sign2;
		    				that.cdt_third = sign3;
	    				}
    					
    					var goodsList = that.util.conJson(res.data.list);
    				
	    				for(let y in goodsList){
	    					goodsList[y].goods_thumb = that.Request.getUrl() + goodsList[y].goods_thumb;
	    				}
	    				
	    				if(that.page != 1 && that.page != 'end'){
								that.proList =  that.proList.concat(goodsList);	
	    				}else{
	    					that.proList = goodsList;
	    				}
	    				
	    				
	    				if(parseInt(res.data.pager.page) < parseInt(res.data.pager.page_count)){
	    					that.page = parseInt(that.page) + 1;
	    				}else{
	    					that.page = 'end'
	    				}
	    				
	    				console.log('进')
	    				
    				}else{
    					that.proList = [];
    					var sign2 = [{
    						attr_value:'全部产品分类'
    					}]
    					var sign3 = [{
    						attr_value:'全部肌肤需求'
    					}]
    					that.cdt_two = sign2;
	    				that.cdt_third = sign3;
    				}
    				
    				//隐藏加载
    				setTimeout(function(){
    					wx.hideLoading();
    				},1000)
    			}
    		})
    		.catch(res =>{
    			console.log(res)
    		})
    },
    //跳转搜索页
    skipSearch(){
    	
    	//如果是有搜索关键字就返回上一页，如果没有就跳转到搜索页面
    	if(wx.getStorageSync('seaText') != '' && wx.getStorageSync('seaText') != undefined){
    		wx.navigateBack();
    	}else{
    		wx.navigateTo({
    			url:'/pages/search/main'
    		})
    	}
    }
  },

  onLoad(){
  	console.log(this.$root.$mp.query)
  	this.page = 1;
  	
  	this.proList = [];
  	
  	
  	this.cdt_one = [{name:''}];//条件2  选项1
	  this.c_one = 0;
	  this.cdt_two = [{attr_value:''}];//条件2  选项2
	  this.c_two = 0;
	  this.cdt_third = [{attr_value:''}];//条件2  选项3
	  this.c_third = 0;
  	
  	this.clsId = this.$root.$mp.query.clsId;
  	
  	//如果是有搜索关键字，并拿不到clsId
  	if(this.clsId != undefined){
  		//如果是0即全部商品
	  	if(this.clsId == 0){
	  		//隐藏第二个条件
	  		this.hideCnTwo = true;
	  	}else{
	  		this.hideCnTwo = false;
	  	}
	  	
	  	this.seaText = '';
	  	
	  	this.getProductFun();
	  	
	  	//设置标题
			wx.setNavigationBarTitle({
			  title: wx.getStorageSync('seaTil')
			})
  	}else{
  		//根据关键字搜索
  		this.seaText = wx.getStorageSync('seaText');
  		//隐藏第二个条件
  		this.hideCnTwo = true;
  		//设置搜索类型
	  	this.clsId = 0;
	  	this.getProductFun();
  	}
    
  },
  onReachBottom(){
  	if(this.page != 'end'){
  		this.getProductFun();
  	}else{
  		wx.showToast({
  			title:'暂无更多商品',
  			icon:'none'
  		})
  	}
  },
  onPageScroll(e){
  	if(e.scrollTop >=37){
  		this.isFixed = true;
  	}else{
  		this.isFixed = false;
  	}
  },
  onPullDownRefresh(){
			var that = this;
		    //模拟加载
		    setTimeout(function()
		    {
		      	wx.stopPullDownRefresh() //停止下拉刷新
		      	that.page = 1;
		      	that.getProductFun();
		    },500);
		},
		onUnload(){
			wx.removeStorageSync('seaTil');
			wx.removeStorageSync('selClass');
			
			this.ctOne = 'add_time';// 第一个条件，1:时间 2:销量 3:价格
      this.hideCnTwo = false;//是否隐藏第二个条件
      this.page = 1,//页码
      this.clsId = "";//分类id
      this.attr2 = "";//第2个属性
      this.attr3 = "";//第3个属性
			this.isFixed = false;
		}
}
</script>

<style scoped>
	
	/*固定条件*/
	.cdtView{
		position:fixed;
		width:100%;
		background-color:white;
		top:0;
		z-index:2;
	}
	.pdgTop{
		padding-top: 180rpx;
	}

	
	.rBorder{
		border-right: 2rpx solid #E5E5E5;
	}
	.seaCn .sList:nth-last-child(1),.seaCn .sList:nth-last-child(2){
		margin-bottom: 0rpx;
	}
	.seaCn .sList .op{
		color: #999999;
		font-size: 24rpx;
		margin-left: 10rpx;
		text-decoration: line-through;
	}
	.seaCn .sList .rp{
		color: #5b0e12;
		font-size: 36rpx;
	}
	.seaCn .sList .price{
		margin-top: 22rpx;
		padding: 0 20rpx;
	}
	.seaCn .sList .til{
		color: #333333;
		font-size: 28rpx;
		padding: 0 20rpx;
	}
	.seaCn .sList img{
		width: 345rpx;
		height: 345rpx;
		display: block;
		margin: 0 auto;
	}
	.seaCn .sList .sub{
		padding:0 2%;
		width: 95%;
		/*margin: 0 auto;*/
		/*border: 1px solid red;*/
	}
	.seaCn .sList:last-child .sub{
		border: none;
	}
	.seaCn .sList{
		display: inline-block;
		vertical-align: top;
		width: 50%;
		height: 455rpx;
		padding: 10rpx 0;
		margin-bottom: 20rpx;
		background-color: white;
	}
	.seaCn>div{
		background-color: #F7F7F7;
	}
	.seaCn{
		padding-bottom: 100rpx;
		font-size: 0;
	}
	.seaCnWhite{
		background-color: white;
	}
	.condiTion_2 .list  .picker{
		position: absolute;
		margin: auto;
		top: 0;
		left: 0;
		
		bottom: 0;
		height: 72rpx;
		width: 100%;
		height: 100%;
	}
	/*.condiTion_2 .list picker{
		position: absolute;
		margin: auto;
		top: 0;
		bottom: 0;
		height: 72rpx;
		width: 100%;
		height: 100%;
		left: 0;
		
	}*/
	.condiTion_2 .list>div span{
		display: inline-block;
		vertical-align: middle;
		width: 16rpx;
		height: 14rpx;
		margin-left: 5rpx;
	}
	.condiTion_2 .list>div{
		display: inline-block;
		vertical-align: middle;
		width: 92%;
		height: 72rpx;
		line-height: 72rpx;
		background-color: #f2f2f2;
		border-radius: 8rpx;
		overflow: hidden;
	}
	.condiTion_2 .list{
		display: inline-block;
		vertical-align: middle;
		width: 33.33%;
		text-align: center;
		color: #666666;
		font-size: 28rpx;
		position: relative;
	}
	.condiTion_2{
		height: 132rpx;
		line-height: 132rpx;
		font-size: 0;
	}
	.condiTion_1 .list .sel{
		color: #5b0e12 !important;
		border-bottom: 4rpx solid #5b0e12;
	}
	.condiTion_1 .list span{
		display: inline-block;
		vertical-align: top;
		padding: 0 10rpx;
		line-height: 86rpx;
		color: #333333;
		font-size: 32rpx;
	}
	.condiTion_1 .list:nth-child(2){
		width: 40%;
	}
	.condiTion_1 .list{
		display: inline-block;
		vertical-align: middle;
		line-height: 90rpx;
		text-align: center;
		width: 30%;
	}
	.condiTion_1{
		height: 90rpx;
		line-height: 90rpx;
		margin-top: 20rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.container{
		padding-bottom: 68rpx;
	}
	
	
	
</style>
