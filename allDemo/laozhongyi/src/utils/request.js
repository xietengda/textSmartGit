const Promise = require('es6-promise').Promise

const util = require('./util.js');
const utils = util.default.util.prototype;

//签名参数
const key = 'cdbbf90ec69b7f9df6ff301e58bbff1b';
const secret = 'e2f3efdd889e1bab39c981ad46993fda';

function wxPromisify(fn) {
	return function(obj = {}) {
		return new Promise((resolve, reject) => {
			obj.success = function(res) {
				//成功 (只返回res.data)
				resolve(res.data)
				setTimeout(function(){
					wx.hideLoading();
				},200)
			}
			obj.fail = function(res) {
				//失败
				reject(res)
				setTimeout(function(){
					wx.hideLoading();
				},200)
			}
			fn(obj)
		})
	}
}
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function(callback) {
	let P = this.constructor;
	return this.then(
		value => P.resolve(callback()).then(() => value),
		reason => P.resolve(callback()).then(() => {
			throw reason
		})
	);
};
/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url, data) {
	data.device = 'xcx';
	data.version = 'v1.0.3';
    data.timestamp = Date.parse(new Date()) / 1000;
    data.api_key = key;
	data.api_sign = utils.sign(data,key,secret);
	var getRequest = wxPromisify(wx.request)
	return getRequest({
		url: url,
		method: 'GET',
		data: data,
		header: {
			'Content-Type': 'application/json'
		}
	})
}

/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, data) {
	data.device = 'xcx';
	data.version = 'v1.0.3';
    data.timestamp = Date.parse(new Date()) / 1000;
    data.api_key = key;
	data.api_sign = utils.sign(data,key,secret);
	var postRequest = wxPromisify(wx.request)
	return postRequest({
		url: url,
		method: 'POST',
		data: data,
		header: {
			"content-type": "application/x-www-form-urlencoded"
		},
	})
}



/**
   * 获取get的URL
   */
 function  getRquestUrl(url, data) {
	var signArr = [];
	for(var x in data){
		let signStr = x +'='+ data[x];
		signArr.push(signStr)
	}
	
	var signString = '';
	for(var x in signArr){
		if(parseInt(x)+1 == 1){
			signString += signArr[x].toString();
		}
		else{
			signString += "&"+signArr[x].toString();
		}
	}
    return url + "?"+signString;
  }


	


module.exports = {
	postRequest: postRequest,
	getRequest: getRequest,
	getRquestUrl:getRquestUrl
}