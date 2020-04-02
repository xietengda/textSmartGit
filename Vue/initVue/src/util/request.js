// request.js
import axios from 'axios';
//将JSON数据改为为form类型
import qs from 'qs';

import { Toast } from 'vant';

import Cookies from 'js-cookie';

axios.defaults.timeout = 200000;         //响应时间

// get请求
function getRequest(url, data = {}, method = 'get') {
	return new Promise((resolve, reject) => {

		let loading = "";

		//如果 不匹配就出现loading
		if (!url.includes('admin/v1/region/province') && !url.includes('admin/v1/region/city') && !url.includes('admin/v1/region/area')) {
			loading = Toast.loading({
				message: '加载中...',
				forbidClick: true
			});
		}

		//请求头
		let header = {};
		//登录接口不用传token
		if (url.includes('api/v1/user/signIn')) {
			header = {
				'content-type': 'application/json',
			}
		} else {
			header = {
				'content-type': 'application/json',
				'Authorization': 'Bearer ' + Cookies.get('token'),
				'terminal': 'PC'
			}
		}

		//如果 匹配 就换content-type 类型
		if (url.includes('TestApi/v1/user/signIn')) {
			header['content-type'] = 'application/x-www-form-urlencoded';
			header['Authorization'] = 'Bearer ' + Cookies.get('token');
			header['terminal'] = 'PC';
		}


		axios({
			url: url,
			method: method,
			headers: header,
			data: data
		})
			.then(res => {
				//成功
				resolve(res.data);

				//如果 不匹配就出现loading
				if (!url.includes('admin/v1/region/province')) {
					loading.clear();
				}
			})
			.catch(res => {
				//失败
				reject(res);

				//如果 不匹配就出现loading
				if (!url.includes('admin/v1/region/province')) {
					loading.clear();
				}
			})

	})
}


// post请求
function postRequest(url, data = {}, method = 'post') {
	return new Promise((resolve, reject) => {

		let loading = '';
		if(!url.includes('api/v1/user/getVerifyCode')){
			loading = Toast.loading({
				message: '加载中...',
				forbidClick: true
			});
		}


		//请求头
		let header = {};
		//登录接口不用传token
		if (url.includes('api/v1/user/signIn')) {
			header = {
				'content-type': 'application/json',
			}
		} else if (url.includes('admin/v1/upload')) {
			header = {
				'content-type': 'multipart/form-data',
				'Authorization': 'Bearer ' + Cookies.get('token'),
				'terminal': 'AGENT'
			}
		}
		else if (url.includes('/region/regionTreeByActivity')) {
			header['content-type'] = 'application/x-www-form-urlencoded';
			header['Authorization'] = 'Bearer ' + Cookies.get('token');
			header['terminal'] = 'AGENT';
			data = qs.stringify(data);
		}
		else {
			header = {
				'content-type': 'application/json',
				'Authorization': 'Bearer ' + Cookies.get('token'),
				'terminal': 'AGENT'
			}
		}

		axios({
			url: url,
			method: method,
			headers: header,
			data: data
		})
			.then(res => {
				//成功
				resolve(res.data);

				//如果 不匹配就出现loading
				if (!url.includes('admin/v1/region/province')) {
					loading.clear();
				}
			})
			.catch(res => {
				//失败
				reject(res)

				//如果 不匹配就出现loading
				if (!url.includes('admin/v1/region/province')) {
					loading.clear();
				}
			})

	})
}

//下载文件(二进制流形式)
function downLoadRequest(url, data = {}, method = 'get') {
	return new Promise((resolve, reject) => {

		let loading = '';
		if(!url.includes('api/v1/user/getVerifyCode')){
			//加载
			loading = Toast.loading({
				message: '加载中...',
				forbidClick: true
			});
		}

		let header = {
			'content-type': 'application/json',
			'Authorization':'Bearer '+ Cookies.get('token'),
		}
		


		if(url.includes('admin/v1/agent/export') ){
			method = 'post';
		}

		let subObj = {};

		//get方式
		if(method == 'get'){
			subObj={
				url: url,
				method: method, 
				headers: header,
				params:data,
				responseType: 'blob',
			};
		}
		//post方式
		else{
			subObj={
				url: url,
				method: method, 
				headers: header,
				data:data,
				responseType: 'blob',
			};
		}


		axios(subObj)
		.then(res => {
			//成功
			resolve(res.data)


			if(!url.includes('api/v1/user/getVerifyCode')){
				loading.clear();
			}
		})
		.catch(res => {
			//失败
			reject(res)
			if(!url.includes('api/v1/user/getVerifyCode')){
				loading.clear();
			}
		})
	})
}



// 
/** 添加请求拦截器*/
axios.interceptors.request.use((config) => {

	/** 例如说添加一些固定参数 */
	if (config.params) { // query形势传递
		config.params.companyId = Cookies.get('Token');
	}
	/** 在发送请求之前做某件事 */
	if (config.method === 'post') {
		// config.data = qs.stringify(config.data);
	}
	return config;
}, (error) => {
	_.toast("错误的传参", 'fail');
	return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
	/** 例如如果请求不通过，直接提示 */
	if (res.data.code != 0) {
		// _.toast(res.data.msg);
		return Promise.reject(res);
	}
	return res;
}, (error) => {
	_.toast("网络异常", 'fail');
	return Promise.reject(error);
});



export default {
	postRequest: postRequest,
	getRequest: getRequest
}


