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
	login(code){
		let data ={
			code
		};
		return requestAll.getRequest(apiUrl + 'api/login/getsessionkey?source=2', data);
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
	getIndexAll(debug = 0,device,version = '1.0.3'){
		let data = {
			debug,
			device,
			version
		}
		return requestAll.getRequest(apiUrl + 'index/all', data);
	}
	
	
	
}

export default {
	api:api
}