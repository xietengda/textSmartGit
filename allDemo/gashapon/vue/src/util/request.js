// request.js
import axios from 'axios';
//将JSON数据改为为form类型
import qs from 'qs'

// post请求
function getRequest(url, data = {}, method = 'get') {
	return new Promise((resolve, reject) => {
		axios({
				url: url,
				method: method,
				headers: {
					'Content-Type': 'application/json'
				},
				data: data
			})
			.then(res => {
				//成功
				resolve(res.data)
			})
			.catch(res => {
				//失败
				reject(res)
			})

	})
}


// post请求
function postRequest(url, data = {}, method = 'post') {
	return new Promise((resolve, reject) => {
		axios({
				url: url,
				method: method,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'   //application/json,
				},
				data: qs.stringify(data)
			})
			.then(res => {
				//成功
				resolve(res.data)
			})
			.catch(res => {
				//失败
				reject(res)
			})

	})
}

export default {
	postRequest: postRequest,
	getRequest:getRequest
}





//import axios from 'axios'
//import qs from 'qs'
// 
////import * as _from '../util/tool'
// 
//axios.defaults.timeout = 5000;                        //响应时间
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
////axios.defaults.baseURL = 'http://www.h5cms.com/';   //配置接口地址
// 
////POST传参序列化(添加请求拦截器)
//axios.interceptors.request.use((config) => {
//  //在发送请求之前做某件事
//  if(config.method  === 'post'){
//      config.data = qs.stringify(config.data);
//  }
//  return config;
//},(error) =>{
//   _.toast("错误的传参", 'fail');
//  return Promise.reject(error);
//});
// 
////返回状态判断(添加响应拦截器)
//axios.interceptors.response.use((res) =>{
//  //对响应数据做些事
//  if(!res.data.success){
//      // _.toast(res.data.msg);
//      return Promise.reject(res);
//  }
//  return res;
//}, (error) => {
//  _.toast("网络异常", 'fail');
//  return Promise.reject(error);
//});
// 
////返回一个Promise(发送post请求)
//function fetchPost(url, params) {
//  return new Promise((resolve, reject) => {
//      axios.post(url, params)
//          .then(response => {
//              resolve(response.data);
//          }, err => {
//              reject(err);
//          })
//          .catch((error) => {
//             reject(error)
//          })
//  })
//}
//////返回一个Promise(发送get请求)
//function fetchGet(url, param) {
//  return new Promise((resolve, reject) => {
//      axios.get(url, {params: param})
//          .then(response => {
//              resolve(response.data)
//          }, err => {
//              reject(err)
//          })
//          .catch((error) => {
//              reject(error)
//          })
//  })
//}
//
//export default {
//	fetchPost: fetchPost,
//	fetchGet:fetchGet
//}
