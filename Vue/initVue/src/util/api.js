import requestAll from './request.js';

const apiUrl =  process.env.BASE_URL; 
const webUrl =  process.env.BASE_URL; 
const baseUrl = apiUrl + '?act=';

const api= {
	
	//获取url补充静态资源
	getUrl(){
		return webUrl;
	},

	//模拟接口
	getList(dataModel){
		return requestAll.postRequest(apiUrl + 'api/v1/region/regionTreeByActivity',dataModel);
	}

  	

}
 
export default api
