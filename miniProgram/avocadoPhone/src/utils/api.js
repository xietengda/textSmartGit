import requestAll from './request' // 此处，引入存放对promise处理的文件


const apiUrl = 'http://niuyouguo.webapp.lmh5.com/api/'
const webUrl = 'https://nyg.oss-cn-shenzhen.aliyuncs.com/'
const baseUrl = apiUrl + '?act='

class api {
	
	//获取url补充静态资源
	getUrl() {
		return webUrl;
	}
	
	//获取轮播图
	getBanner() {
		let data = {};
		return requestAll.getRequest(apiUrl + 'video/banner', data);
	}
	
}

export default {
	api:api
}