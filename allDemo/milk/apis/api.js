import request from './request.js'
class api {
  constructor() {
    this._apiUrl = 'https://xml.51itmap.com/qdapi/'
    this._webUrl = 'https://wechatxml.51itmap.com/'
    this._baseUrl = this._apiUrl + '?act='
    this._request = new request
    this._request.setErrorHandler(this.errorHander)
    this._request.setSignSecret('e2f3efdd889e1bab39c981ad46993fda')
    this._request.setSignKey('cdbbf90ec69b7f9df6ff301e58bbff1b')
    var obj = {}
    obj.version = 'v1.0.3'
    this._request.setSignParam(obj)
  }

  /**
   * 统一的异常处理方法 
   */
  errorHander(res) {
    console.error(res)
  }

  //获取url补充静态资源
  getUrl() {
    return this._webUrl
  }

  //检查用户是否存在
  checkUserExist(openid) {
    let data = {
      openid
    }
    return this._request.getRequest(this._baseUrl + 'user/checkUserExist', data).then(res => res.data)
  }

  //检查用户登录状态是否正常
  checkSession(openid) {
    let data = {
      openid
    }
    return this._request.getRequest(this._baseUrl + 'passport/checkSession', data).then(res => res.data)
  }

  //登录
  login(username, password, openid = '') {
    let data = {
      username: username,
      password: password,
      openid: openid
    }
    return this._request.postRequest(this._baseUrl + 'passport/act_login', data).then(res => res.data)
  }

  //注册
  register(mobile, code, password, userinfo, openid) {
    let data = {
      mobile_phone: mobile,
      mobile_code: code,
      password: password,
      agreement: 1,
      userinfo: JSON.stringify(userinfo),
      openid: openid
    }
    return this._request.postRequest(this._baseUrl + 'passport/act_register', data).then(res => res.data)
  }

  //收藏 
  collect(user_id, goods_id) {
    let data = {
      user_id: user_id,
      goods_id: goods_id
    }
    return this._request.postRequest(this._baseUrl + 'user/addCollect', data).then(res => res.data)
  }

  //获取用户信息
  getUserInfo(userid, tuijian = 0, nickName = '') {
    let data = {
      user_id: userid,
      tuijian,
      nickName
    }
    return this._request.postRequest(this._baseUrl + 'user/getUserInfo', data).then(res => res.data)
  }

  //快速登录
  thirdLogin(code) {
    let data = {
      code: code
    }
    return this._request.postRequest(this._baseUrl + 'passport/getSession', data).then(res => res.data)
  }

  //首页
  getIndex() {
    let data = {}
    return this._request.getRequest(this._baseUrl + 'index/all', data).then(res => res.data)
  }

  //商品列表
  getGoods(cat_id, filter = '', keywords = '', user_id = 0, page = 1) {
    let data = {
      user_id,
      cat_id: cat_id,
      supplier_id: '-1',
      filter: filter,
      keywords: keywords, page
    }
    return this._request.getRequest(this._baseUrl + 'goods/query', data).then(res => res.data)
  }

  //获取分类商品
  getCategory(cat_id, is_ex = 0) {
    let data = {
      cat_id: cat_id,
      supplier_id: '-1',
      is_ex
    }
    return this._request.getRequest(this._baseUrl + 'Category/query', data).then(res => res.data)
  }

  //商品详情
  getGoodsInfo(goods_id, user_id = 0) {
    let data = {
      goods_id: goods_id,
      user_id: user_id
    }
    return this._request.getRequest(this._baseUrl + 'goods/getGoodsInfo', data).then(res => res.data)
  }
  //获取商品评论
  getGoodsComment(goods_id, page = 1) {
    let data = {
      goods_id: goods_id,
      page_size: 50,
      page: page
    }
    return this._request.getRequest(this._baseUrl + 'goods/getGoodsComment', data).then(res => res.data)
  }

  //热门搜索
  getSearch() {
    let data = {}
    return this._request.getRequest(this._baseUrl + 'goods/getHotSearch', data).then(res => res.data);
  }

  //获取订单
  getOrderList(userid = 0, status = 0, extension_code = '', page = 1, diy = 0, search = '') {
    let data = {
      user_id: userid,
      status: status,
      extension_code,
      page,
      diy,
      search
    };
    return this._request.getRequest(this._baseUrl + 'user/getUserOrder', data).then(res => res.data);
  }

  //订单详情
  getUserOrderDetail(userid = 0, order_id) {
    let data = {
      user_id: userid,
      order_id
    };
    return this._request.getRequest(this._baseUrl + 'user/getUserOrderDetail', data).then(res => res.data);
  }

  //获取购物车商品
  getShopCart(userid = 0) {
    let data = {
      user_id: userid
    };
    return this._request.getRequest(this._baseUrl + 'cart/get_cart_goods', data).then(res => res.data);
  }

  //改变购物车数量
  setCartNum(userid = 0, rec_id, number, goods_id) {
    let data = {
      user_id: userid,
      rec_id: rec_id,
      number: number,
      goods_id: goods_id
    };
    return this._request.getRequest(this._baseUrl + 'cart/updateCart', data).then(res => res.data);
  }

  //会员中心积分
  getUserIntegral(userid = 0, page = 1) {
    let data = {
      user_id: userid,
      account_type: 'pay_points',
      page_size: 50,
      page: page
    };
    return this._request.getRequest(this._baseUrl + 'user/getUserIntegral', data).then(res => res.data);
  }

  //优惠券列表
  getUserBonus(userid = 0, is_used = 0) {
    let data = {
      user_id: userid,
      page_size: 50,
      is_used: is_used
    };
    return this._request.getRequest(this._baseUrl + 'user/getUserBonus', data).then(res => res.data);
  }

  //获取用户的收藏商品列表
  getUserCollect(userid = 0, page = 1) {
    let data = {
      user_id: userid,
      page_size: 10,
      page: page,
    };
    return this._request.getRequest(this._baseUrl + 'user/getUserCollect', data).then(res => res.data);
  }

  //移除收藏
  dropUserCollect(userid = 0, rec_id) {
    let data = {
      user_id: userid,
      collection_id: rec_id
    };
    return this._request.getRequest(this._baseUrl + 'user/dropUserCollect', data).then(res => res.data);
  }

  //获取会员指定地址
  getUserAddressInfo(userid = 0, address_id = 0) {
    let data = {
      user_id: userid,
      address_id: address_id,
      page_size: 50
    };
    return this._request.getRequest(this._baseUrl + 'user/getUserAddressInfo', data).then(res => res.data);
  }

  //获取会员地址
  getUserAddress(userid = 0) {
    let data = {
      user_id: userid,
      page_size: 50
    };
    return this._request.getRequest(this._baseUrl + 'user/getUserAddress', data).then(res => res.data);
  }

  //设置会员默认地址
  setUserDefaultAddress(userid = 0, addressid) {
    let data = {
      user_id: userid,
      address_id: addressid
    };
    return this._request.getRequest(this._baseUrl + 'user/setUserDefaultAddress', data).then(res => res.data);
  }

  //删除会员地址
  dropUserAddress(userid = 0, addressid) {
    let data = {
      user_id: userid,
      address_id: addressid
    };
    return this._request.getRequest(this._baseUrl + 'user/dropUserAddress', data).then(res => res.data);
  }

  //发送验证码
  sendMessage(mobile_phone) {
    let data = {
      mobile_phone: mobile_phone,
      send_type: 1
    };
    return this._request.getRequest(this._baseUrl + 'passport/sendMessage', data).then(res => res.data);
  }

  //加入购物车
  addToCart(userid, goods) {
    let data = {
      user_id: userid,
      goods: JSON.stringify(goods),
    };
    return this._request.getRequest(this._baseUrl + 'cart/addToCart', data).then(res => res.data);
  }

  //删除购物车
  dropCart(userid, rec_id) {
    let data = {
      user_id: userid,
      rec_id: rec_id,
    };
    return this._request.getRequest(this._baseUrl + 'cart/dropCart', data).then(res => res.data);
  }

  //获取二维码
  getReQrcode(userid = 0) {
    let data = {
      scene: userid,
      page: 'pages/index/index',
    };
    return this._request.getRquestUrl(this._baseUrl + 'passport/qrCode', data);
  }

  //积分商城列表
  getExchange(cat_id) {
    let data = {
      cat_id: cat_id,
      page: '1',
      page_size: 50,
    };
    return this._request.getRequest(this._baseUrl + 'Exchange/query', data).then(res => res.data);
  }

  //积分商城详情表
  getExchangeInfo(goods_id) {
    let data = {
      goods_id: goods_id,
    };
    return this._request.getRequest(this._baseUrl + 'Exchange/getExchangeInfo', data).then(res => res.data);
  }

  //订单确认页
  checkout(userid, rec_id = '') {
    let data = {
      user_id: userid,
      sel_goods: rec_id
    };
    return this._request.postRequest(this._baseUrl + 'Checkout/showProfile', data).then(res => res.data);
  }

  //积分提交确认页
  exCheckout(userid, goods_id = '', specs = 0) {
    let data = {
      user_id: userid,
      goods_id: goods_id,
      specs: specs
    };
    return this._request.postRequest(this._baseUrl + 'Exchange/showProfile', data).then(res => res.data);
  }

  //添加/更新地址
  updateUserAddress(userid, address_id = 0, country, province, city, district, address, consignee, mobile, is_default, locationString) {
    let data = {
      user_id: userid,
      address_id: address_id,
      country: country,
      province: province,
      city: city,
      district: district,
      address: address,
      consignee: consignee,
      mobile: mobile,
      is_default: is_default,
      locationString
    };
    return this._request.postRequest(this._baseUrl + 'User/updateUserAddress', data).then(res => res.data);
  }

  //根据经纬度获取地址信息
  getAddress(locationString) {
    let data = {
      locationString: locationString
    };
    return this._request.getRequest(this._baseUrl + 'User/getAddress', data).then(res => res.data);
  }

  //获取会员站内信
  getMyNews(userid, page = 1) {
    let data = {
      user_id: userid,
      page_size: 10,
      page: page
    };
    return this._request.postRequest(this._baseUrl + 'User/getMyNews', data).then(res => res.data);
  }

  //获取站内信详情
  getMyNewsDetail(userid, l_id) {
    let data = {
      user_id: userid,
      l_id: l_id
    };
    return this._request.postRequest(this._baseUrl + 'User/getMyNewsDetail', data).then(res => res.data);
  }

  //删除站内信
  delMyNews(userid, l_id) {
    let data = {
      user_id: userid,
      l_id: l_id
    };
    return this._request.postRequest(this._baseUrl + 'User/delMyNews', data).then(res => res.data);
  }

  //文章列表
  getArticleList(cat_id, page = 1) {
    let data = {
      cat_id: cat_id,
      page: page,
      page_size: 10
    };
    return this._request.getRequest(this._baseUrl + 'Article/getArticleList', data).then(res => res.data);
  }

  //文章详细
  getArticleDefault(id) {
    let data = {
      id: id
    };
    return this._request.postRequest(this._baseUrl + 'Article/getArticleDefault', data).then(res => res.data);
  }

  //获取套餐
  getPackageList(typeid, search = '') {
    let data = {
      typeid,
      search
    };
    return this._request.getRequest(this._baseUrl + 'goods/getPackageList', data).then(res => res.data);
  }

  //获取套餐详情
  getPackageDetail(package_id) {
    let data = {
      package_id: package_id
    };
    return this._request.getRequest(this._baseUrl + 'goods/getPackageDetail', data).then(res => res.data);
  }

  //获取秒杀商品
  getSeckill() {
    let data = {};
    return this._request.getRequest(this._baseUrl + 'Seckill/query', data).then(res => res.data);
  }

  //获取优惠券
  getALLBonus(user_id = 0) {
    let data = { user_id };
    return this._request.getRequest(this._baseUrl + 'index/getALLBonus', data).then(res => res.data);
  }

  //获取指定优惠券
  getBonusType(type_id) {
    let data = { type_id };
    return this._request.getRequest(this._baseUrl + 'index/getBonusType', data).then(res => res.data);
  }

  //领取优惠券
  getBonus(user_id, type_id) {
    let data = {
      user_id,
      type_id: type_id
    };
    return this._request.getRequest(this._baseUrl + 'index/get_bonus', data).then(res => res.data);
  }

  //添加固定套餐商品到购物车
  add_package_to_cart(user_id, package_id) {
    let data = {
      user_id,
      package_id: package_id
    };
    return this._request.getRequest(this._baseUrl + 'Cart/add_package_to_cart', data).then(res => res.data);
  }

  //添加自选套餐商品到购物车
  addDiyPackage(user_id, product_ids, act_id) {
    let data = {
      user_id,
      product_ids: product_ids,
      act_id,
    };
    return this._request.getRequest(this._baseUrl + 'Cart/addDiyPackage', data).then(res => res.data);
  }

  //添加固定套餐商品到购物车
  add_package_to_cart(user_id, package_id) {
    let data = {
      user_id,
      package_id: package_id
    };
    return this._request.getRequest(this._baseUrl + 'Cart/add_package_to_cart', data).then(res => res.data);
  }

  //添加自选套餐商品到购物车
  addDiyPackage(user_id, product_ids, act_id) {
    let data = {
      user_id,
      product_ids: product_ids,
      act_id,
    };
    return this._request.getRequest(this._baseUrl + 'Cart/addDiyPackage', data).then(res => res.data);
  }

  //提交订单
  addOrder(user_id, supplier, sel_goods, openid, address_id, integral = 0, flow_type = 0) {
    let data = {
      user_id,
      supplier,
      openid,
      sel_goods,
      address_id,
      pay_id: 8,
      integral,
      flow_type
    };
    return this._request.postRequest(this._baseUrl + 'checkout/addOrder', data).then(res => res.data);
  }

  //留言
  advise(user_id, msg_content, msg_title) {
    let data = {
      user_id,
      msg_type: 0,
      msg_content,
      msg_title
    };
    return this._request.postRequest(this._baseUrl + 'user/advise', data).then(res => res.data);
  }

  //投诉
  tousu(user_id, msg_content, msg_title, order_id) {
    let data = {
      user_id,
      msg_type: 1,
      msg_content,
      msg_title,
      order_id
    };
    return this._request.postRequest(this._baseUrl + 'user/advise', data).then(res => res.data);
  }

  //更新个人资料
  updateUserInfo(user_id, user_name, sex, birthday, real_name, headimg, man_num) {
    let data = {
      user_id,
      user_name,
      sex,
      birthday,
      real_name,
      headimg,
      man_num
    };
    return this._request.postRequest(this._baseUrl + 'user/updateUserInfo', data).then(res => res.data);
  }

  //文章评论
  comment(article_id, openid, content) {
    let data = {
      id: article_id,
      openid,
      content
    };
    return this._request.postRequest(this._baseUrl + 'article/comment', data).then(res => res.data);
  }

  //文章评论列表
  comment_list(article_id) {
    let data = {
      id: article_id,
    };
    return this._request.getRequest(this._baseUrl + 'article/comment_list', data).then(res => res.data);
  }

  //文章点赞
  doArticlePraise(user_id, article_id) {
    let data = {
      user_id,
      article_id,
    };
    return this._request.getRequest(this._baseUrl + 'article/doArticlePraise', data).then(res => res.data);
  }

  //获取二维码
  getQrcode(content) {
    let data = {
      content
    };
    return this._request.getRquestUrl(this._baseUrl + 'index/qrcode', data)
  }

  //更改密码
  updateUserPWD(user_id, old_password, new_password) {
    let data = {
      user_id,
      old_password,
      new_password
    };
    return this._request.postRequest(this._baseUrl + 'passport/updateUserPWD', data).then(res => res.data);
  }

  //重新支付
  repay(user_id, order_id, openid) {
    let data = {
      openid,
      user_id,
      order_id
    };
    return this._request.postRequest(this._baseUrl + 'Payment/repay', data).then(res => res.data);
  }

  //提交评论
  addUserComment(user_id, rec_id, order_id, goods_id, comment_rank, content, file, name) {
    let data = {
      user_id,
      order_id,
      rec_id,
      goods_id,
      comment_rank,
      content,
      debug: 1
    };
    return this._request.uploadImage(this._baseUrl + 'user/addUserComment', file, data, name).then(res => res.data);
  }
  //提交评论无图
  addUserCommentNoPic(user_id, rec_id, order_id, goods_id, comment_rank, content) {
    let data = {
      user_id,
      order_id,
      rec_id,
      goods_id,
      comment_rank,
      content,
    };
    return this._request.postRequest(this._baseUrl + 'user/addUserComment', data).then(res => res.data);
  }

  //签到 
  qiandao(user_id) {
    let data = {
      user_id
    };
    return this._request.getRequest(this._baseUrl + 'Exchange/qiandao', data).then(res => res.data);
  }

  //获取签到列表
  qiandaoList(user_id) {
    let data = {
      user_id
    };
    return this._request.getRequest(this._baseUrl + 'Exchange/qiandaoList', data).then(res => res.data);
  }

  //切换属性变换价格
  getGoodsPrice(user_id, goods_id, number, attr_id) {
    let data = {
      user_id,
      goods_id,
      number,
      attr_id
    };
    return this._request.getRequest(this._baseUrl + 'goods/getGoodsPrice', data).then(res => res.data);
  }

  //可选取奶列表
  getUserPackage(user_id, order_id) {
    let data = {
      user_id,
      order_id
    };
    return this._request.getRequest(this._baseUrl + 'user/getUserPackage', data).then(res => res.data);
  }

  //加入队列
  postPickUpGoods(user_id, goods_list) {
    let data = {
      goods_list,
      user_id,
    };
    return this._request.postRequest(this._baseUrl + 'user/postPickUpGoods', data).then(res => res.data);
  }

  //删除用户订单
  delUserOrder(user_id, order_id) {
    let data = {
      order_id,
      user_id
    };
    return this._request.postRequest(this._baseUrl + 'user/delUserOrder', data).then(res => res.data);
  }

  //再次购买
  buyAgain(user_id, order_id) {
    let data = {
      order_id,
      user_id
    };
    return this._request.postRequest(this._baseUrl + 'user/one_more_order', data).then(res => res.data);
  }

  //提交中奖列表
  lottery(user_id) {
    let data = {
      user_id,
    };
    return this._request.postRequest(this._baseUrl + 'Exchange/lottery', data).then(res => res.data);
  }

  //提交中奖列表
  lottery_add(user_id, name, tel, address, prize) {
    let data = {
      user_id,
      name,
      tel,
      address,
      prize
    };
    return this._request.postRequest(this._baseUrl + 'Exchange/lottery_add', data).then(res => res.data);
  }

  //中奖列表
  getLottery() {
    let data = {};
    return this._request.getRequest(this._baseUrl + 'Exchange/lottery_list', data).then(res => res.data);
  }

  //获取广告图
  getAd(position_id = 0, show_num = 1) {
    let data = {
      position_id,
      show_num
    };
    return this._request.getRequest(this._baseUrl + 'index/ad', data).then(res => res.data);
  }

  //协议
  getXieyi() {
    let data = {};
    return this._request.getRequest(this._baseUrl + 'index/xieyi', data).then(res => res.data);
  }

  //兑换积分或者优惠券
  exchange(user_id, type = 1, card = 0) {
    let data = {
      user_id,
      type,
      card
    };
    return this._request.postRequest(this._baseUrl + 'Exchange/exchange', data).then(res => res.data);
  }

  //获取距离
  getDistance() {
    let data = {};
    return this._request.getRequest(this._baseUrl + 'User/getDistance', data).then(res => res.data);
  }

}
export default api