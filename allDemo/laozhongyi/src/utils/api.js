import requestAll from './request' // 此处，引入存放对promise处理的文件


const apiUrl = process.env.BASE_URL+'qdapi/?act=';
const webUrl = process.env.BASE_URL;
const baseUrl = apiUrl + '?act=';
class api {
	
	//获取url补充静态资源
	getUrl() {
		return webUrl;
	}
	
	
	//登录
	xcxLogin_phone(code,encryptedData,iv){
		let data ={
			code,
			encryptedData,
			iv
		};
		return requestAll.getRequest(apiUrl + 'passport/xcxLogin_phone', data);
	}
	
	//登录
	login(code,encryptedData,iv,phone){
		let data ={
			code,
			encryptedData,
			iv,
			phone
		};
		return requestAll.getRequest(apiUrl + 'passport/xcxLogin', data);
	}
	
	
	//获取验证码登陆  //send_type  1为注册 2为找回密码 3为绑定手机 4为手机验证码快捷登录
	getCode(mobile_phone,send_type = 4){
		let data ={
			mobile_phone,
			send_type
		};
		return requestAll.getRequest(apiUrl + 'passport/sendMessage', data);
	}
	
	//验证码登陆
	codeLogin(mobile_phone,mobile_code){
		let data ={
			mobile_phone,
			mobile_code
		};
		return requestAll.getRequest(apiUrl + 'passport/login_mobile_info', data);
	}
	
	//验证sessionkey
	checkSessionKey(sessionkey,openid){ 
		let data = {
			sessionkey,
			openid
		}
		return requestAll.getRequest(apiUrl + 'api/login/validatekey?source=2', data);
	}
	
	//获取首页商品
	getIndexAll(){
		let data = {}
		return requestAll.getRequest(apiUrl + 'index/all', data);
	}
	
	//商品详情
	getProDetail(goods_id,user_id){
		let data = {
			goods_id,
			user_id
		}
		return requestAll.getRequest(apiUrl + 'goods/getGoodsInfo', data);
	}
	
	//获取购物车物品
	getShopCart(user_id){
		let data = {
			user_id,
		}
		return requestAll.postRequest(apiUrl + 'cart/get_cart_goods', data);
	}
	
	//加入购物车
	addShopCart(user_id,goods){
		let data = {
			user_id,
			goods
		}
		return requestAll.postRequest(apiUrl + 'cart/addToCart', data);
	}
	
	//更改购物车商品数量
	cagCartNum(user_id,rec_id,goods_id,number){
		let data = {
			user_id,
			rec_id,
			goods_id,
			number
		}
		return requestAll.postRequest(apiUrl + 'cart/updateCart', data);
	}
	
	//删除购物车商品
	delShopCart(user_id,rec_id){
		let data = {
			user_id,
			rec_id
		}
		return requestAll.postRequest(apiUrl + 'cart/dropCart', data);
	}
	
	//获取我的优惠券
	myDiscount(user_id,page,page_size = 10,is_used = 0){
		let data = {
			user_id,
			page,
			page_size,
			is_used,//是否已使用 0 为全部 1为未使用 2为已过期 3为已使用 4为未开始
		}
		return requestAll.postRequest(apiUrl + 'user/getUserBonus', data);
	}
	
	
	//收货地址列表
	addressList(user_id,page,page_size = 10){
		let data = {
			user_id,
			page,
			page_size,
		}
		return requestAll.postRequest(apiUrl + 'user/getUserAddress', data);
	}
	
	//增加、修改收货地址
	updateAddress(user_id,address_id,province,city,district,address,consignee,mobile,is_default){
		let data = {
			user_id,
			address_id, //地址ID 【 address_id为空则为添加地址，不为空为更新地址 】
			province,
			city,
			district,
			address,
			consignee,
			mobile,
			is_default,//是否设置为默认地址
		}
		return requestAll.postRequest(apiUrl + 'user/updateUserAddress', data);
	}
	
	//设置默认地址
	setDefaultAdd(user_id,address_id){
		let data = {
			user_id,
			address_id,
		}
		return requestAll.postRequest(apiUrl + 'user/setUserDefaultAddress', data);
	}
	
	//确认订单
	confirmOrder(user_id,sel_goods,flow_type = 0){
		let data = {
			user_id,
			sel_goods,//购物车商品（获取购物车接口的rec_id拼凑成 1,2,3 格式）
			flow_type, //商品类型，0（普通商品） 
		}
		return requestAll.postRequest(apiUrl + 'checkout/showProfile', data);
	}
	
	//获取省市区
	getPCR(){
		let data = {}
		return requestAll.postRequest(apiUrl + 'region/index', data);
	}
	
	//更新、新增地址
	updateAddress(user_id,address_id,province,city,district,address,consignee,mobile,is_default = 0){
		let data = {
			user_id,
			address_id,// address_id为空则为添加地址，不为空为更新地址
			province,
			city,
			district,
			address,
			consignee,
			mobile,
			is_default,//是否设置为默认地址  1是 0否
		}
		return requestAll.postRequest(apiUrl + 'user/updateUserAddress', data);
	}
	
	//获取地址详细信息
	getAddMsg(user_id,address_id){
		let data = {
			user_id,
			address_id,
		}
		return requestAll.postRequest(apiUrl + 'user/getUserAddressInfo', data);
	}
	
	//删除地址
	removeAddress(user_id,address_id){
		let data = {
			user_id,
			address_id,
		}
		return requestAll.postRequest(apiUrl + 'user/dropUserAddress', data);
	}
	
	
	//获取商品列表
	getProduct(keywords,cat_id,page,sort,filter_attr,order = 'desc',size = 10){
		let data = {
			keywords,
			cat_id,
			page,
			order,
			sort,
			filter_attr,
			size
		}
		return requestAll.postRequest(apiUrl + 'goods/query', data);
	}
	
	//提交订单
	submitOrder(user_id,sel_goods,supplier,address_id,pay_id = '17',flow_type = '0'){
		let data = {
			user_id,
			sel_goods,
			supplier,
			address_id,
			pay_id,
			flow_type
		}
		return requestAll.postRequest(apiUrl + 'checkout/addOrder', data);
	}
	
	//获取商品分类
	getProClass(cat_id = 0,supplier_id = '-1'){
		let data = {
			cat_id,
			supplier_id
		}
		return requestAll.postRequest(apiUrl + 'category/query', data);
	}
	
	//获取订单列表
	getOrderList(user_id,status,page,page_size = 10){
		let data = {
			user_id,
			status,
			page,
			page_size
		}
		return requestAll.postRequest(apiUrl + 'user/getUserOrder', data);
	}
	
	//获取订单详情
	orderDetail(user_id,order_id){
		let data = {
			user_id,
			order_id,
		}
		return requestAll.postRequest(apiUrl + 'user/getUserOrderDetail', data);
	}
	
	//取消订单
	cancelOrder(user_id,order_id){
		let data = {
			user_id,
			order_id,
		}
		return requestAll.postRequest(apiUrl + 'user/cancelUserOrder', data);
	}
	
	//删除订单
	delOrder(user_id,order_id){
		let data = {
			user_id,
			order_id,
		}
		return requestAll.postRequest(apiUrl + 'user/delUserOrder', data);
	}
	
	//获取热门搜索
	getHotSearch(){
		let data = {}
		return requestAll.postRequest(apiUrl + 'goods/getHotSearch', data);
	}
	
	//获取用户信息
	getUserInfo(user_id){
		let data = {
			user_id
		}
		return requestAll.postRequest(apiUrl + 'user/getUserInfo', data);
	}
	
	//领取优惠券
	getDiscount(user_id,type_id){
		let data = {
			user_id,
			type_id
		}
		return requestAll.postRequest(apiUrl + 'goods/get_bonus', data);
	}
	
	//获取退款商品信息
	getRefundMsg(user_id,order_id){
		let data = {
			user_id,
			order_id
		}
		return requestAll.postRequest(apiUrl + 'user/ToCreateUserBackOrder', data);
	}
	
	//提交申请退款申请
	refundSubmit(user_id,order_id,back_type,tui_goods_number,tui_goods_price,back_reason,back_postscript,back_imgs){
		let data = {
			user_id,
			order_id,
			back_type,
			tui_goods_number,
			tui_goods_price,
			back_reason,
			back_postscript,
			back_imgs,
		}
		return requestAll.postRequest(apiUrl + 'user/apply_back_order', data);
	}
	
	
	//获取退款商品列表
	getRefundList(user_id,page,page_size = 10){
		let data = {
			user_id,
			page,
			page_size
		}
		return requestAll.postRequest(apiUrl + 'user/refundList', data);
	}
	
	//获取退款订单详情
	getRefundDetail(user_id,back_id){
		let data = {
			user_id,
			back_id,
		}
		return requestAll.postRequest(apiUrl + 'user/refundDetails', data);
	}
	
	//寄回商品物流信息提交
	refundLogistics(user_id,back_id,shipping_name,invoice_no){
		let data = {
			user_id,
			back_id,
			shipping_name,
			invoice_no
		}
		return requestAll.postRequest(apiUrl + 'user/UserRefundLogistics', data);
	}
	
	
	//获取物流信息
	deliveryDetail(order_id){
		let data = {
			order_id
		}
		return requestAll.postRequest(apiUrl + 'user/delivery_history', data);
	}
	
	
	//重新支付
	repetitionPay(user_id,order_id){
		let data = {
			user_id,
			order_id
		}
		return requestAll.postRequest(apiUrl + 'payment/repay', data);
	}
	
	
	//确认收货
	comfirmGetPro(user_id,order_id){
		let data = {
			user_id,
			order_id
		}
		return requestAll.getRequest(apiUrl + 'user/arrivedUserOrder', data);
	}
	
}

export default {
	api:api
}