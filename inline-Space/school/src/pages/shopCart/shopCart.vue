<template>
	<div class="container">
		<div class="cartHead div_float">
			<div class="L"  @click="allSelFun">
				<span class="cb_no" :class="[allSel ? 'cb_sel':'']"></span>全选
			</div>
			<div class="R">
				<span v-if="!editBtn" @click="editBtnCart">编辑</span>
				<span v-else  @click="editBtnCart">完成</span>
			</div>
		</div>
		
		
		<div class="cartView">
			<div class="proListView">
				<!--商品-->
				<div class="proList" v-for="(item,key) in cartList" :key="item.id">
					<div class="L"><span class="cb_no" :class="[item.sel ? 'cb_sel':'']" @click="selChange" :data-sel-index='key'></span></div>
					<div class="M">
						<img :src="item.img" />
						<div class="Msg">
							<div class="til">{{item.til}}</div>
							<div class="ml">规格：{{item.ml}}</div>
							<div class="price">¥{{item.price}}</div>
						</div>
					</div>
					<div class="num">
						<span @click='changeToatl' data-c-type="cut" :data-c-index="key">-</span>
						<input type="number" :value="item.num" disabled="disabled" />
						<span @click='changeToatl' data-c-type="add" :data-c-index="key">+</span>
					</div>
				</div>
			</div>
		</div>

		<!--底部-->
		<div class="cartBtm div_float">
			<div class="R" v-if="!editBtn">
				<div class="rl">
					<div>总计：¥{{countPrice}}</div>
					<div class="freight">运费：¥0.00</div>
					<div>全场满128包邮</div>
				</div>
				<div class="rr">结算（{{countToatl}}）</div>
			</div>
			<div class="delR" v-else>
				<div class="del">删除</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				cartList: [{
						img: '/static/images/list1.png',
						til: '呼唤晒后修复精华焕新版',
						ml: '15ml',
						price: '6.9',
						num: 1,
						sel: false,
						txtStyle: ''
					},
					{
						img: '/static/images/list1.png',
						til: '呼唤晒后修复精华焕新版',
						ml: '15ml',
						price: '6.9',
						num: 1,
						sel: false,
						txtStyle: ''
					},
					{
						img: '/static/images/list1.png',
						til: '呼唤晒后修复精华焕新版',
						ml: '15ml',
						price: '6.9',
						num: 1,
						sel: false,
						txtStyle: ''
					}
				],
				selArr: [],
				allSel: false,
				editBtn:false,
				countPrice: 0.00,
				countToatl: 0,
			}
		},

		components: {

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
			changeToatl: function(e) {
				var cType = e.currentTarget.dataset.cType;
				var cIndex = e.currentTarget.dataset.cIndex;
				var cartList = this.cartList;

				if(cType == 'cut' && cartList[cIndex].num != 1) {
					cartList[cIndex].num = parseInt(cartList[cIndex].num) - 1;
				} else if(cType == 'add') {
					cartList[cIndex].num = parseInt(cartList[cIndex].num) + 1;
				}
				
				//计算总价
				this.allCount();

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
			editBtnCart:function(){
				console.log(111)
		    var editBtn = this.editBtn;
		    var sign = true;
		
		    if (editBtn){
		      sign = false;
		    }
		
		    this.editBtn = sign;
		  },
		},

		created() {

		}
	}
</script>

<style scoped>
	.cartBtm .del{
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
	.cartBtm .delR{
		line-height: 118rpx;
		height: 118rpx;
		text-align: right;
	}
	.cartHead{
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 2rpx solid #E5E5E5;
		padding:0 2%;
		font-size: 24rpx;
		color: #666666;
	}
	.cartHead .R{
		float: right;
	}
	.cartHead .R span{
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
	
	.cartHead .L .cb_sel{
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
	
	.proList .L .cb_sel{
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
	}
</style>