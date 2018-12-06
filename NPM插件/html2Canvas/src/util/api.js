import requestAll from './request.js';

const apiUrl =  process.env.BASE_URL; 
const webUrl =  process.env.BASE_URL; 
const baseUrl = apiUrl + '?act=';

const api= {
	
	//获取url补充静态资源
	getUrl(){
		return webUrl;
	},

	//获取 微信 授权地址   url:回调地址
  	login(url){
	  	let data = {
	  		url
	  	}
	  	return requestAll.postRequest(apiUrl + '/api/gashapon/Login/crm_get_code', data);
  	},
  	
  	//获取accessToken   code:微信登陆返回的code   platform:操作系统
  	getAccessToken(code,platform){
	  	let data = {
	  		code,
	  		platform
	  	}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Login/get_wechat_code', data);
  	},

	//获取微信配置信息  url：当前页面u'r'l
  	setWxConfig(url){
  		let data = {
  			url
  		}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Login/getSignPackage', data);
  	},

  	//获取活动规则
  	getGameInfo(){
  		let data = {}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/GameInfo', data);
  	},
  	
	//获取省份
	getProvince(){
		let data = {}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/get_province', data);
	},
	
	//获取城市    province：省份
	getCity(province){
		let data = {
			province
		}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/get_city', data);
	},
	
	//获取门店    city：城市
	getStore(city){
		let data = {
			city
		}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/get_store', data);
	},
	

	
	//统计用户操作   position:页面位置,openid, action:用户操作行为  user_agent:浏览器User-Agent字符串 ,platform:操作系统
	postOper(position,openid,action,user_agent,platform){
		let data = {
			position,
			openid,
			action,
			user_agent,
			platform
		}                               
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/statis', data);
	},
	
	//请求UV接口
	getUV(openid){
		let data = {
			openid
		} 
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/uv_statis', data);
	},

	//判断用户是否注册
	isRegister(openid){
		let data = {
			openid
		}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Login/isRegist', data);
	},
	
	//请求分享内容
	getShare(){
		let data = {}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/wx_share', data);
	},
	
	//本周游戏机会
	palyChance(openid){
		let data = {
			openid
		}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/isPlay', data);
	},
	
	//我获得的奖品
	myPrize(openid){
		let data = {
			openid
		}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/myAward', data);
	},
	
	//外链
	externalLink(){
		let data = {}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/get_gotourl', data);
	},
	
	//消耗机会   openid：用户openid  post_id：	奖品id  name：领取人姓名    mobile：领取人手机  store_id：	门店id
	consumeChance(openid){
		let data = {
			openid,
		}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/decPlay', data);
	},
	
	//提交信息领取奖品     openid：用户openid  post_id：	奖品id  name：领取人姓名    mobile：领取人手机  store_id：	门店id
	postPrizeMsg(openid,post_id,name,mobile,store_id){
		let data = {
			openid,
			post_id,
			name,
			mobile,
			store_id
		}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/LuckyPost', data);
	},
	
	//获取当前积分
	getScore(openid){
		let data = {
			openid
		}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/getScore', data);
	},
	
	//获取第一关奖品
	firstPass(openid){
		let data = {
			openid
		}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/drawOne', data);
	},
	
	//获取第二关产品
	twoPass(openid){
		let data = {
			openid
		}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/drawTwo', data);
	},
	
	//获取第三关产品
	thirdPass(openid){
		let data = {
			openid
		}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/drawThree', data);
	},
	
	//第三关扣除积分
	decutScore(openid){
		let data = {
			openid
		}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/decScore', data);
	},
	
	//分享信息
	shareMsg(){
		let data = {}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/wx_share', data);
	},
	
	//音乐
	getMusic(){
		let data = {}
	  	return requestAll.postRequest(apiUrl + 'api/gashapon/Api/getMusic', data);
	}
	
}
 
export default api
