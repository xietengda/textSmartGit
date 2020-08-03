// request.js
import axios from 'axios';
import qs from 'qs';
import Cookies from 'js-cookie';
import { Loading, Message } from 'element-ui';

axios.defaults.timeout = 200000;         //响应时间

// axios请求拦截
axios.interceptors.request.use(
    config => {
		// token处理
		if (Cookies.get('token')) {
			config.headers.Authorization = 'Bearer '+ Cookies.get('token')
		}
		// 公共请求头设置
		config.headers.terminal = 'PC'
        return config;
    },
    error => {
        return Promise.reject(error);
	}
);

// axios响应拦截
axios.interceptors.response.use(
	(config) => {
		if (config.data.code != "000000" && config.config.responseType !== "blob") {
			Message.warning(config.data.data || config.data.mesg || '')
		}
		return config;
	}, 
	error => { // error 
		let msgText = JSON.stringify(error).includes('404') 
			? 'API Not Found' 
			: JSON.stringify(error).includes('401') 
				? '无访问权限, 请联系管理员！' 
				: 'Internal Server Error';
		Message.error(msgText)
		return Promise.reject(error) //接口500抛出异常（不走页面逻辑）
	}
);

/**
 * 请求
 * @param {String} url 			请求地址
 * @param {Any} data 			请求数据
 * @param {String} method 		请求方法
 * @param {Object} setting 		其他设置
 */
const _request = (url, data = {}, method = 'GET', setting = {needLoading: true}) => {
	return new Promise((resolve, reject) => {
		// 加载设置
		let loadingInstance = "";
		if (setting.needLoading) {
			loadingInstance = Loading.service({
				lock: true,
				text: '加载中...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
		}
		//请求头
		let header = {};
		switch (setting.header) {
			case 'XWWW': // x-www-form-urlencoded
				header['content-type'] = 'application/x-www-form-urlencoded'
				data = qs.stringify(data);
				break;
			case 'formData': // multipart/form-data
				header['content-type'] = 'multipart/form-data'
				break;
			default: // json
				header['content-type'] = 'application/json'
				break;
		}

		// 请求相关
		let requestParams = {
			url: url,
			method: method,
			headers: header,
			data: data
		}
		// 文件下载
		if (setting.type == 'downLoad') {
			requestParams.responseType = 'blob'
		}

		axios(requestParams)
			.then(res => { // 成功
				resolve(res.data)
				// 关闭loading
				if (loadingInstance) { setTimeout(() => { loadingInstance.close(); }, 500); }
			})
			.catch(res => { // 失败
				reject(res);
				// 关闭loading
				if (loadingInstance) { setTimeout(() => { loadingInstance.close(); }, 500); }
			})
	})
}
const apiUrl =  process.env.HOST_ENVNAME == 'test' ? "/requestApi/" : process.env.BASE_URL; 
const webUrl =  process.env.HOST_ENVNAME == 'test' ? "/requestApi/" : process.env.BASE_URL; 

export default {
	_request,
	apiUrl,
	webUrl
}
