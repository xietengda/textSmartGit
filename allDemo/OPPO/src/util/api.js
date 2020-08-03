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
  	

}
 
export default api
