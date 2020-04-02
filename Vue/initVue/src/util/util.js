import manba from 'manba'

class util {

	//获取url参数
	getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	
	// 获取当前操作系统
	getOS() { 
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
	
	//获取当天最晚的时间 （设置24小时过期） 
	pastTime() {
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
	
	
	//转换时间   将时间戳 换成时间
  	tranTime(time){
		var dateTime = new Date(time * 1000);//时间戳为10位需*1000，
		//		var date = new Date(timestamp);  // 时间戳为13位的话不需乘1000
		return manba(dateTime).format("l")
	}
  	
  	//转换json格式
	conJson(jsonString){
		return  JSON.parse(JSON.stringify(jsonString))
	}
	
	//验证手机号码/电话号码/邮箱
	isTel(a){
		return /^(\d3,4|\d{3,4}-)?\d{7,8}$/.test(a);
	}
	
	isMobile(a){
		return /^[1][0-9]{10}$/.test(a);
	}
	
	isEmail(a){
		return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(a);
	}
	
}

export default {
	util: util
}

