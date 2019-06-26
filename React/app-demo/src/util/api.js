import requestAll from './request.js';

const apiUrl =  'https://www.helpyou100.com/'; 
const webUrl =  'https://www.helpyou100.com/'; 

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

	  
	//获取首页推荐
	indexCommend(session,language,lat,lng){
			let data = {
				session,
				language,
				lat,
				lng
			}
			return requestAll.postRequest(apiUrl + 'portal/index/goods_recommend', data);
	},

	//商家详情
	shopDetail(session,language,goods_id){
		let data = {
			session,
			language,
			goods_id
		}
		return requestAll.postRequest(apiUrl + 'goods/list/detail', data);
},
  	
}
 
export default api
