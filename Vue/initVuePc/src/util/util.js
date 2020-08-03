/**
 * 获取url参数
 * @param {String} name Url
 */
const getQueryString = (name) => {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
/**
 * 获取当前操作系统
 */
const getOS = () => {
	var os;
	if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1) {
		os = 'Android';
	} else if (navigator.userAgent.indexOf('iPhone') > -1) {
		os = 'iOS';
	} else if (navigator.userAgent.indexOf('Windows Phone') > -1) {
		os = 'WP';
	} else {
		os = 'Others';
	}
	return os;
}
/**
 * 获取当天最晚的时间 （设置24小时过期） 
 */
const pastTime = () => {
	var curDate = new Date();
	//当前时间戳  
	var curTamp = curDate.getTime();
	//当前日期
	var curDay = curDate.toLocaleDateString() + ' 23:59:59';
	//最大时间
	var curWeeHours = new Date(curDay).getTime();

	//      console.log('当天日期'+curDay)
	//      console.log('当天日期时间戳'+new Date(curDay))
	//      console.log('当日最大时间戳'+curWeeHours)
	//      console.log('再将时间戳换成时间'+this.timestampToTime(curWeeHours))
	return curWeeHours;
}
/**
 * 转换json格式
 * @param {Any} jsonString 需要转换的数据
 */
const conJson = (jsonString) => {
	return  JSON.parse(JSON.stringify(jsonString))
}
//js正则表达式验证码输入密码（密码至少为8位的字母、数字和特殊符号的组合）
const isPassword = (a) => {
	return /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/.test(a);
}
/**
 * 深拷贝
 * @param {Any} obj 传入拷贝目标 
 */
const deepClone = (obj) => {
	var o, i, j
	if (typeof (obj) !== 'object' || obj == null) return obj
	if (obj instanceof (Array)) {
		o = []
		i = 0; j = obj.length
		for (; i < j; i++) {
		if (typeof (obj[i]) === 'object' && obj[i] != null) {
			o[i] = this.deepClone(obj[i])
		} else {
			o[i] = obj[i]
		}
		}
	} else {
		o = {}
		for (i in obj) {
		if (typeof (obj[i]) === 'object' && obj[i] != null) {
			o[i] = this.deepClone(obj[i])
		} else {
			o[i] = obj[i]
		}
		}
	}
	return o
}
/**
 * 下载文件
 * @param {Blob} res excel ==> Blob
 * @param {String} fileName 文件名字
 */
const downloadFile = (res, fileName='export.xlsx') => {
	const type='application/vnd.ms-excel';//excel文件     
	const blob = new Blob([res], { type: type });
	const downloadElement = document.createElement('a');
	const href = window.URL.createObjectURL(blob);
	//后台再header中传文件名
	// const  name = decodeURI(res.headers['content-disposition'].split('=')[1]);
	const name = fileName;
	downloadElement.href = href;
	downloadElement.download = name;
	document.body.appendChild(downloadElement);
	downloadElement.click();
	document.body.removeChild(downloadElement); // 下载完成移除元素
	window.URL.revokeObjectURL(href); // 释放掉blob对象
}
/**
 * 加载js
 * @param {String} url js地址
 * @param {Function} callback 回调函数
 */
const loadJs = (url, callback) => {
	var script=document.createElement('script');
	script.type="text/javascript";
	if(typeof(callback)!="undefined"){
		if(script.readyState){
		script.onreadystatechange=function() {
			if(script.readyState == "loaded" || script.readyState == "complete"){
			script.onreadystatechange=null;
			callback();
			}
		}
		} else {
		script.onload=function(){
			callback();
		}
		}
	}
	script.src=url;
	document.body.appendChild(script);
}
/**
 * 获取当天日期
 */
const getToday = () => {
	let day = new Date();
	let y = day.getFullYear();
	let m = day.getMonth() + 1;
	let d = day.getDate();
	return `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`;
}



export default {
	getQueryString,
	getOS,
	pastTime,
	conJson,
	deepClone,
	downloadFile,
	loadJs,
	isPassword,
	getToday
}

