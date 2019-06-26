import requestAll from './request.js';

const apiUrl =  process.env.BASE_URL;  //process.env.BASE_URL  //后台处理跨域使用
const webUrl =  process.env.BASE_URL; 
const baseUrl = apiUrl + '?act=';

const api= {
	
	//获取url补充静态资源
	getUrl(){
		return webUrl;
	},

	//获取 微信 授权地址   url:回调地址
	weChatLogin(redirectUri ){
		let data = {
			redirectUri 
		}
		return requestAll.postRequest(apiUrl + '/app/user/login/loginUrl', data);
	},

	//获取 微信 code:登录回调的code  type类型（0表示安卓和苹果，1表示H5）
	getAccessToken(code,type = 1){
		let data = {
			code,
			type 
		}
		return requestAll.postRequest(apiUrl + '/app/user/login/accessToken', data);
	},

	//获取微信环境配置参数
	weChatConfig(url ,type = 1){
		let data = {
			url,
			type
		}
		return requestAll.postRequest(apiUrl + '/app/user/login/config', data);
	},


	//获取本地本地服务器token
	getUserToken(openid,){
		let data = {
			openid,
		}
		return requestAll.postRequest(apiUrl + '/app/user/login/login', data);
	},

	
	//查询店铺信息
	queryShopInfo(shopId){
		let data = {
			shopId,
		}
		return requestAll.postRequest(apiUrl + '/app/shop/info/queryShopInfo', data);
	},
	

	//查询会员课程列表
	queryMemberCourse(){
		let data = {
			shopId,
		}
		return requestAll.postRequest(apiUrl + '/app/shop/info/queryMemberProducts', data);
	}
  	

}
 
export default api
