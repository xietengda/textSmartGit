<template>
	<div class="container">
		<!--购物车不为空-->
		<div v-if='cartList.length != 0'>
			<div class="cartHead div_float">
				<div class="L" @click="allSelFun">
					<span class="cb_no" :class="[allSel ? 'cb_sel':'']"></span>全选
				</div>
				<div class="R">
					<span v-if="!editBtn" @click="editBtnCart">编辑</span>
					<span v-else @click="editBtnCart">完成</span>
				</div>
			</div>
	
			<div class="cartView" ><!-- :class="[isIphonex ? 'cartViewBtm':'']"-->
				<div class="proListView">
					<!--商品-->
					<div class="proList" v-for="(item,key) in cartList" :key="item.id">
						<div class="L" @click="selChange" :data-sel-index='key'><span class="cb_no" :class="[item.sel ? 'cb_sel':'']"></span></div>
						<div class="M">
							<img :src="item.goods_thumb" />
							<div class="Msg">
								<div class="til">{{item.goods_name}}</div>
								<div class="ml" v-if="item.goods_attr">{{item.goods_attr}}</div>
								<div class="price">¥{{item.market_price}}</div>
							</div>
						</div>
						<div class="num">
							<span @click='changeToatl' data-c-type="cut" :data-c-index="key">-</span>
							<input type="number" :value="item.goods_number" disabled="disabled" />
							<span @click='changeToatl' data-c-type="add" :data-c-index="key">+</span>
						</div>
					</div>
				</div>
			</div>
	
			<!--底部-->
			<div class="cartBtm div_float" > <!--:class="[isIphonex ? 'cartBtmIX':'']"-->
				<div class="R" v-if="!editBtn">
					<div class="rl">
						<div>总计：¥{{countPrice}}</div>
						<div class="freight">运费：¥0.00</div>
						<div>全场满98包邮</div>
					</div>
					<div class="rr" @click="butBillFun">结算（{{countToatl}}）</div>
				</div>
				<div class="delR" v-else>
					<div class="del" @click="delCartFun">删除</div>
				</div>
			</div>
		</div>
		
		<!--空购物车-->
		<div v-else>
			<div  class='noProduct'>
			    <div class='nullCart'>
			      <div class='nullCart_icon bigShopCart'></div>
			      <div class='nullText'>购物车没有属于您的物品，快去首页瞧瞧</div>
			    </div>
			</div>
		</div>
		
		<!--公共底部-->
		<!--<allFooter :selType='3'  :shopNum='proLength'/>-->

	</div>
</template>

<script>
	import allFooter from '../../components/footer'
	
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				cartList: [],//购物车列表
				allSel: false,//全选
				editBtn: false,
				countPrice: '0.00',//总价格
				countToatl: '0.00',//总数量
				recId:'',//购物车id
				adrLegnth:0,//收货地址长度
				proLength:0,//购物车数量
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
			selChange: function(e) {
				var selIndex = e.currentTarget.dataset.selIndex;
				var cartList = this.cartList;
				var check = true;

				if(cartList[selIndex].sel) {
					check = false;
				}

				cartList[selIndex].sel = check;

				this.cartList = cartList;

				//计算总数
				this.allCount();
				//判断是否全选
				this.checkAllSel();
			},
			allSelFun: function(e) {
				var allSel = this.allSel;
				var cartList = this.cartList;
				var check = true;

				if(allSel) {
					check = false;
				}
				for(var x in cartList) {
					cartList[x].sel = check;
				}

				this.allCount();

				this.allSel = check;
				this.cartList = cartList;
			},
			/*是否全选 para:传入选择后的数组*/
			checkAllSel: function() {
				var cartList = this.cartList;
				var check = true;

				for(var x in cartList) {
					if(cartList[x].sel == false) {
						check = false;
					}
				}

				this.allSel = check;
			},
			async changeToatl(e) {
				var that = this;
				var cType = e.currentTarget.dataset.cType;
				var cIndex = e.currentTarget.dataset.cIndex;
				var cartList = this.cartList;
				var signNum = cartList[cIndex].goods_number;
			
				var signProLength = that.proLength;

				if(cType == 'cut' && signNum != 1) {
					signNum = parseInt(signNum) - 1;
					signProLength = parseInt(signProLength) - 1;
				} else if(cType == 'add') {
					signNum = parseInt(signNum) + 1;
					signProLength = parseInt(signProLength) + 1;
				}
				
				
				//加载动画
				wx.showLoading({
					mask:true
				});
				
				//提交后台记录更改数量
				await that.Request.cagCartNum(wx.getStorageSync('userId'),cartList[cIndex].rec_id,cartList[cIndex].goods_id,signNum)
					.then(res =>{
						console.log(res)
						//关闭加载
						wx.hideLoading();
						
						if(res.code == 200){
							//更改数量
							cartList[cIndex].goods_number = signNum;
							//计算总价
							that.allCount();
							that.cartList = cartList;
							
							//设置购物车数量
							that.proLength = signProLength;
							
							//购物车数量
							wx.setTabBarBadge({
							  index: 2,
							  text: signProLength.toString()
							})
							
						}else{
							wx.showToast({
								title:res.message,
								icon:'none'
							});
						}
					})
					.catch(res =>{
						console.log(res)
					})

			},
			/*计算总价，总数*/
			allCount: function() {
				var countPrice = 0.00;
				var countToatl = 0.00;
				var cartList = this.cartList;

				for(var x in cartList) {
					if(cartList[x].sel) {
						countToatl += 1;
						countPrice += cartList[x].market_price * cartList[x].goods_number;
					}
				}

				this.countToatl = countToatl;
				this.countPrice = countPrice.toFixed(2);
			},
			editBtnCart: function() {
				var editBtn = this.editBtn;
				var sign = true;

				if(editBtn) {
					sign = false;
				}

				this.editBtn = sign;
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
						console.log(res);
						if(res.code == 200){
							if(res.data.supplier_list.length != 0){
								var goodsList = res.data.supplier_list[0].goods_list;
								var signLength = 0;
								for(var x in goodsList){
									goodsList[x].goods_thumb = that.Request.getUrl()+ goodsList[x].goods_thumb;
									//设置未选中
									goodsList[x].sel = false;
									
									signLength = parseInt(goodsList[x].goods_number) + signLength;
								}
								
								//设置购物车数量
								that.proLength = signLength;
								
								//购物车数量
								wx.setTabBarBadge({
								  index: 2,
								  text: signLength.toString()
								})
								
								//设置未全选
								that.allSel = false;
								//设置购物车列表
								that.cartList = that.util.conJson(goodsList);
								//设置购物车id
								that.recId = res.data.supplier_list[0].goods_list[0].rec_id;
								
								
							}else{
								//设置购物车列表
								that.cartList = [];
								//购物车数量
								wx.setTabBarBadge({
								  index: 2,
								  text: '0'
								})
								//设置购物车数量
								that.proLength = 0;
							}
							
						}
					})
			},
			//删除购物车商品
			delCartFun(){
				var that = this;
				var cartList = that.cartList;
				var signArr = [];
				var surplusArr = [];
				var signLength = 0;
				for(var x in cartList){
					if(cartList[x].sel){
						signArr.push(cartList[x].rec_id);
					}else{
						surplusArr.push(cartList[x]);
						signLength = parseInt(signLength) + parseInt(cartList[x].goods_number)
					}
				}
				
				if(signArr.length == 0){
					wx.showToast({
						title:'请选择商品',
						icon:'none'
					});
					return;
				}
				
				
				wx.showModal({
				  title: '',
				  content: '是否删除商品',
				  success(res) {
				    if (res.confirm) {
				      that.Request.delShopCart(wx.getStorageSync('userId'),signArr)
						.then(res =>{
							console.log(res)
							if(res.code == 200){
								wx.showToast({
									title:'删除成功'
								});
								//刷新购物车列表
								that.cartList = surplusArr;
								
								//重新计算价格
								that.allCount();
								
								//购物车数量
								wx.setTabBarBadge({
								  index: 2,
								  text: signLength.toString()
								})
							}
						})
				    }
				  }
				})
				
				
			},
			//结算
			butBillFun(){
				var that = this;
				var cartList = that.cartList;
				var signArr = [];
				for(var x in cartList){
					if(cartList[x].sel){
						signArr.push(parseInt(cartList[x].rec_id));
					}
				}
				
				if(signArr.length == 0){
					wx.showToast({
						title:'请选择商品',
						icon:'none'
					});
					return;
				}
				
				console.log(signArr)
				
				//判断是否有收货地址
				if(that.adrLegnth  != 0){
					//跳转结算页
					wx.navigateTo({
						url:'/pages/submitOrder/main?selPro='+signArr
					})
				}else{
					//否则跳转添加收货地址
					wx.showToast({
						title:'请先添加收货地址',
						icon:'none'
					})
					setTimeout(function(){
						//跳转地址管理页面
						wx.navigateTo({
							url:'/pages/magAddress/main'
						})
					},1000)
				}
				
				
				
				
			},
			//获取收货地址
		    addressListFun(){
		    	var that = this;
		    	that.Request.addressList(wx.getStorageSync('userId'),1)
		    		.then(res =>{
		    			console.log(res);
		    			if(res.code == 200){
		    				that.adrLegnth = res.data.list.length;
		    			}
		    		})
		    },
		},
		async onShow() {
			await this.util.checkLogin()
			.then(res =>{
				this.getShopCartFun();
				this.countToatl = 0;
				this.addressListFun();
			});
			
		}
	}
</script>

<style scoped>
	.cartBtm .del {
		width: 160rpx;
		height: 60rpx;
		border-radius: 30rpx;
		color: white;
		font-size: 24rpx;
		line-height: 60rpx;
		background-color: #5B0E12;
		text-align: center;
		display: inline-block;
		vertical-align: middle;
	}
	
	.cartBtm .delR {
		line-height: 118rpx;
		height: 118rpx;
		text-align: right;
	}
	
	.cartHead {
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 2rpx solid #E5E5E5;
		padding: 0 2%;
		font-size: 24rpx;
		color: #666666;
	}
	
	.cartHead .R {
		float: right;
	}
	
	.cartHead .R span {
		display: inline-block;
		vertical-align: middle;
		width: 120rpx;
		height: 60rpx;
		line-height: 60rpx;
		background-color: #F7F7F7;
		text-align: center;
		border-radius: 30rpx;
	}
	
	.cartHead .L {
		float: left;
		color: #666666;
		font-size: 24rpx;
		width: 20%;
	}
	
	.cartHead .L span {
		display: inline-block;
		vertical-align: middle;
		width: 30rpx;
		height: 30rpx;
		margin-right: 15rpx;
		margin-top: -5rpx;
	}
	
	.cartHead .L .cb_sel {
		width: 36rpx;
	}
	
	.cartBtm {
		height: 118rpx;
		line-height: 118rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: white;
		border-top: 2rpx solid #E5E5E5;
		z-index: 2;
	}
	.cartBtmIX{
		bottom: 180rpx;
	}
	
	.cartBtm .R {
		float: right;
		font-size: 0;
	}
	
	.cartBtm .R>div {
		display: inline-block;
		vertical-align: middle;
	}
	
	.cartBtm .freight {
		font-size: 24rpx;
	}
	
	.cartBtm .rl {
		color: #333333;
		font-size: 26rpx;
		line-height: 36rpx;
		margin-right: 20rpx;
		text-align: right;
	}
	
	.cartBtm .rr {
		width: 260rpx;
		height: 118rpx;
		background-color: #5B0E12;
		font-size: 26rpx;
		color: white;
		text-align: center;
	}
	
	.proList .L span {
		display: inline-block;
		vertical-align: middle;
		width: 30rpx;
		height: 30rpx;
	}
	
	.proList .L {
		width: 60rpx;
		display: inline-block;
		vertical-align: middle;
	}
	
	.proList .L .cb_sel {
		width: 36rpx;
	}
	
	.proList .M .Msg {
		display: inline-block;
		vertical-align: middle;
		width: 70%;
		line-height: 30rpx;
		margin-left: 25rpx;
		color: #333333;
		font-size: 24rpx;
	}
	
	.proList .M .Msg .price {
		color: #5b0e12;
		margin-top: 30rpx;
	}
	
	.proList .M .Msg .ml {
		font-size: 20rpx;
	}
	
	.proList .num {
		position: absolute;
		right: 2%;
		bottom: 24rpx;
		line-height: 40rpx;
		color: #333333;
		font-size: 24rpx;
		font-size: 0;
	}
	
	.proList .num span,
	.proList .num input {
		display: inline-block;
		vertical-align: middle;
		text-align: center;
	}
	
	.proList .num span {
		width: 48rpx;
		height: 48rpx;
		font-size: 24rpx;
		color: #666666;
		border: 2rpx solid #E5E5E5;
	}
	
	.proList .num input {
		width: 80rpx;
		height: 48rpx;
		font-size: 26rpx;
		color: #666666;
		border-top: 2rpx solid #E5E5E5;
		border-bottom: 2rpx solid #E5E5E5;
		min-height: 48rpx;
		line-height: 48rpx !important;
	}
	
	.proList .M img {
		width: 120rpx;
		height: 120rpx;
		display: inline-block;
		vertical-align: middle;
	}
	
	.proList .M {
		display: inline-block;
		vertical-align: middle;
		width: 80%;
	}
	
	.proList {
		height: 185rpx;
		line-height: 185rpx;
		border-bottom: 2rpx solid #E5E5E5;
		position: relative;
	}
	.cartView {
		padding: 0 2%;
		/*padding-bottom: 250rpx;*/
	}
	.cartViewBtm{
		padding-bottom: 318rpx;
	}
	
	
	/*空购物车*/
	.nullCart {
	  width: 100%;
	  height: 475rpx;
	  text-align: center;
	  padding-top: 1rpx;
	}
	
	.nullCart_icon {
	  width: 230rpx;
	  height: 225rpx;
	  margin: 0 auto;
	  margin-top: 95rpx;
	}
	
	.nullText {
	  color: #6b6b6b;
	  font-size: 24rpx;
	  margin-top: 30rpx;
	}
	
	.position {
	  overflow: hidden;
	}
	
	/*购物车*/
	
	.bigShopCart {
	  background: url('data:image/png;base64,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') center center no-repeat;
	  background-size: 100% 100%;
	}

</style>