<template>
	<div class="container CnTop">

		<!--公共头部-->
		<allHeand :headTil='headTil' :hiddenBack='hiddenBack' />

		<div v-if="hasProduct" class='hasProduct'>
			<div class='Cart_head div_flaot'>
				<div class='Cart_head_L div_float'>
					<div>购物车</div>
				</div>
				<div class='Cart_head_R'>
					<div v-if="editBtn" @click='editCart'>管理</div>
					<div v-else @click='editCart'>完成</div>
				</div>
			</div>

			<div class='cart_cont'>
				<block v-for="(item,oneIndex) in cartList" :key='item'>
					<div class='cart_list div_float'>
						<div class='cart_list_L div_float'>
							<div class='cart_sel' :class='[item.sel ? "checkboxSel" : "checkbox"]' :data-sel-index="oneIndex" @click='selChange'></div>
							<navigator url='../proDetails/proDetails?proType=1' hover-class='none'>
								<image class='cart_img' :src='item.img' />
							</navigator>
						</div>
						<div class='cart_list_R'>
							<div class='cart_til eli_one'>{{item.til}}</div>
							<div class='cart_subTil eli_two'>{{item.subTil}}</div>
							<div class='cart_price'>会员专享:￥<text>{{item.price}}</text></div>
							<div class='cart_count div_float'>
								<div @click='changeToatl' data-c-type="cut" :data-c-index="oneIndex">-</div>
								<input type='number' :value='item.num'  disabled="true"/>
								<div @click='changeToatl' data-c-type="add" :data-c-index="oneIndex">+</div>
							</div>
						</div>
					</div>
				</block>
			</div>

			<div class='cart_btm div_float'>
				<div class='cart_btm_L'>
					<div class='cart_all_sel' :class='allSel ? "checkboxSel" : "checkbox"' @click='allSelFun'></div>
					<div>全选</div>
				</div>
				<div v-if="editBtn" class='cart_btm_R div_float'>
					<div class='cart_btm_R_L'>
						<div class='cart_c_price'>合计:<text>￥{{countPrice}}</text></div>
					</div>
					<div class='cart_btm_R_R' bindtap='clickTotal'>
						<div>结算({{countToatl}})</div>
					</div>
				</div>
				<div v-else class='delCart'>
					<button catchtap='delCart'>删除</button>
				</div>
			</div>

		</div>

		<div v-else class='noProduct'>
			<div class='nullCart'>
				<div class='nullCart_icon bigShopCart'></div>
				<div class='nullText'>购物车没有属于您的物品，快去首页瞧瞧</div>
			</div>

		</div>

	</div>
</template>

<script>
	import allHeand from '../../components/allHead'

	export default {
		data() {
				return {
					headTil: '购物车', //头部标题
					hiddenBack: true, //隐藏返回按钮
					hasProduct: true,
					editBtn: true,
					cartList: [{
						img: '../../../static/img/list2.png',
						til: '香满楼酸牛奶180克草莓味3盒',
						subTil: '采用巴氏杀菌，较大限度保留原奶的营养和鲜味',
						price: '6.9',
						num: 1,
						sel:false,
					}, {
						img: '../../../static/img/list2.png',
						til: '香满楼酸牛奶180克草莓味3盒',
						subTil: '采用巴氏杀菌，较大限度保留原奶的营养和鲜味',
						price: '6.9',
						num: 1,
						sel:false,
					}, {
						img: '../../../static/img/list2.png',
						til: '香满楼酸牛奶180克草莓味3盒',
						subTil: '采用巴氏杀菌，较大限度保留原奶的营养和鲜味',
						price: '6.9',
						num: 1,
						sel:false,
					}],
					selArr: [],
					allSel: false,
					countPrice: 0,
					countToatl: 0,
				}
			},

			components: {
				allHeand,
			},

			methods: {
				selChange: function(e) {
					console.log(e)
					var selIndex = e.currentTarget.dataset.selIndex;
					var cartList = this.cartList;
					var check = true;

					if(cartList[selIndex].sel) {
						check = false;
					}
					cartList[selIndex].sel = check;

					var allSel = this.checkAllSel(cartList);
					
					this.cartList = cartList;
					this.allSel = allSel;
					
					//计算总价格
					this.allCount();
				},
				allSelFun: function(e) {
					var cartList = this.cartList;
					var allSel = this.allSel;
					var selArr = this.selArr;
					var check = true;

					if(allSel) {
						check = false;
					}
					
					for(var x in cartList) {
						selArr[x] = check;
						cartList[x].sel = check;
					}

					this.allCount();

					this.allSel = check;
					this.selArr = selArr;
					this.cartList = cartList;
				},
				/*是否全选 para:传入选择后的数组*/
				checkAllSel: function(para) {
					var check = true;

					for(var x in para) {
						if(para[x].sel == false) {
							check = false;
						}
					}

					return check;
				},
				changeToatl: function(e) {
					var cType = e.currentTarget.dataset.cType;
					var cIndex = e.currentTarget.dataset.cIndex;
					var cartList = this.cartList;
					var selArr = this.selArr;

					if(cType == 'cut' && cartList[cIndex].num != 1) {
						cartList[cIndex].num = parseInt(cartList[cIndex].num) - 1;
					} else if(cType == 'add') {
						cartList[cIndex].num = parseInt(cartList[cIndex].num) + 1;
					}

					this.allCount(selArr);

					this.cartList = cartList;
				},
				/*计算总价，总数*/ 
				allCount: function() {
					var countPrice = 0;
					var countToatl = 0;
					var cartList = this.cartList;

					for(var x in cartList) {
						if(cartList[x].sel) {
							countToatl += 1;
							countPrice += cartList[x].price * cartList[x].num;
						}
					}
					
					this.countToatl = countToatl;
					this.countPrice = countPrice.toFixed(2);
				},
				editCart: function() {
					var editBtn = this.editBtn;
					var mark = true;

					if(editBtn) {
						mark = false;
					}

					this.editBtn = mark;
				},
				delCart: function() {
					var cartList = this.cartList;
					var selArr = this.selArr;
					var selMark = 0;

					for(var x in selArr) {
						if(selArr[x] == false) {

						} else {
							selMark += 1;
						}
					}

					if(selMark == 0) {
						wx.showToast({
							title: '请选择商品',
							icon: 'none',
							duration: 1000
						});
					} else {

					}
				},
			},

	}
</script>

<style scoped>
	.Cart_head {
		height: 68rpx;
		line-height: 68rpx;
		background-color: white;
		padding: 0rpx 30rpx;
		font-size: 34rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.Cart_head_L {
		float: left;
		color: #6b6b6b;
		width: 250rpx;
		line-height: 66rpx;
	}
	
	.Cart_head_R {
		float: right;
		color: #e50012;
	}
	
	.cart_cont {
		padding-bottom: 120rpx;
	}
	
	.cart_list {
		height: 240rpx;
		line-height: 240rpx;
		background-color: white;
		margin-top: 20rpx;
		border-bottom: 2rpx solid #E5E5E5;
		padding: 0 2%;
	}
	
	.cart_list_L navigator {
		display: inline-block;
	}
	
	.cart_list_L {
		display: inline-block;
		vertical-align: middle;
	}
	
	.cart_sel {
		width: 38rpx;
		height: 38rpx;
		background-size: 100% 100%;
		display: inline-block;
		vertical-align: middle;
	}
	
	.cart_img {
		width: 190rpx;
		height: 190rpx;
		margin-left: 10rpx;
		display: inline-block;
		vertical-align: middle;
	}
	
	.cart_list_R {
		display: inline-block;
		vertical-align: middle;
		width: 55%;
		min-height: 220rpx;
		line-height: 55rpx;
		margin-left: 30rpx;
		position: relative;
	}
	
	.cart_til {
		color: #353535;
		font-size: 32rpx;
		font-weight: bold;
	}
	
	.cart_subTil {
		font-size: 26rpx;
		color: #232323;
		line-height: 45rpx;
	}
	
	.cart_price {
		color: #3e403f;
		font-size: 26rpx;
		position: absolute;
		bottom: 10rpx;
	}
	
	.cart_price>text {
		font-size: 46rpx;
		color: #e50012;
	}
	
	.cart_count {
		position: absolute;
		right: 0;
		bottom: 10rpx;
		color: #353535;
		background-color: #f9f9f9;
	}
	
	.cart_count>div {
		width: 50rpx;
		height: 54rpx;
		font-size: 22rpx;
		float: left;
		text-align: center;
		line-height: 54rpx;
	}
	
	.cart_count>input {
		width: 60rpx;
		float: left;
		font-size: 20rpx;
		min-height: 42rpx !important;
		height: 42rpx !important;
		text-align: center;
	}
	
	.cart_btm {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		background-color: white;
		z-index: 2;
		border-top: 2rpx solid #e5e5e5;
	}
	
	.cart_btm_L {
		float: left;
		text-align: center;
		color: #353535;
		font-size: 28rpx;
		margin-left: 30rpx;
		margin-top: 20rpx;
	}
	
	.cart_all_sel {
		width: 38rpx;
		height: 38rpx;
		margin-bottom: 5rpx;
	}
	
	.cart_btm_R {
		float: right;
		line-height: 100rpx;
	}
	
	.cart_btm_R_L {
		float: left;
		margin-right: 30rpx;
		text-align: right;
	}
	
	.cart_c_price {
		color: #353535;
		font-size: 30rpx;
		font-weight: bold;
	}
	
	.cart_c_price>text {
		color: #e50012;
	}
	
	.cart_dis {
		font-size: 18rpx;
		color: #353535;
		margin-top: 10rpx;
	}
	
	.cart_btm_R_R {
		float: left;
		width: 230rpx;
		height: 108rpx;
		background-color: #e50012;
		color: white;
		font-size: 30rpx;
		text-align: center;
		vertical-align: middle;
	}
	
	.delCart {
		float: right;
		height: 100%;
	}
	
	.delCart>button {
		width: 195rpx;
		height: 60rpx;
		color: white;
		font-size: 24rpx;
		background-color: #e50012;
		border-radius: 50rpx;
		margin-top: 20rpx;
		margin-right: 30rpx;
	}
	/*空购物车*/
	
	.nullCart {
		width: 100%;
		height: 475rpx;
		border-bottom: 1rpx solid #e5e5e5;
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
	/*购物车*/
	
	.bigShopCart {
		background: url('data:image/png;base64,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') center center no-repeat;
		background-size: 100% 100%;
	}
</style>