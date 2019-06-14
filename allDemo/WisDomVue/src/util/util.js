import manba from 'manba'

import { MessageBox } from 'mint-ui'

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
		// var dateTime = new Date(time * 1000);//时间戳为10位需*1000，
				var dateTime = new Date(time);  // 时间戳为13位的话不需乘1000
//		manba.config({
//		    now:dateTime
//		})
		
//		console.log(manba().format("f"))
		return manba(dateTime).format("k")
	}


	//分割时间函数    秒换成分   
	timeStamp( second_time ){  
		var time1 = ((parseInt(second_time)/100)).toString();
		var time2 = time1.split(".")[1]? (time1.split(".")[1].length == 1 ? time1.split(".")[1]+'0' : time1.split(".")[1]) :'00';       
		var time ="00" + ':' + time2;  
		if( parseInt(second_time )>= 60){
			var second = ((parseInt(second_time) % 60)/100).toString();  
			var min = (parseInt(second_time / 60)/100).toString();
			var time3 = second.split(".")[1]? (second.split(".")[1].length == 1 ? second.split(".")[1]+'0' : second.split(".")[1]) :'00'; 
			var time4 = min.split(".")[1]? (min.split(".")[1].length == 1 ? min.split(".")[1]+'0' : min.split(".")[1]) :'00'; 
			time = time4 + ":" + time3;       
		}  
		return time;          
	}

	//将时间转成分xx钟xx小时xx秒
	MillisecondToTime(msd) {
		var time = parseFloat(msd) / 1000;   //先将毫秒转化成秒
		if (null != time && "" != time) {
			if (time > 60 && time < 60 * 60) {
				time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
					parseInt(time / 60.0)) * 60) + "秒";
			}
			else if (time >= 60 * 60 && time >= 60 * 60 * 1) {
				time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
					parseInt(time / 3600.0)) * 60) + "分钟" +
					parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
					parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
			}
			else {
				time = parseInt(time) + "秒";
			}
		}
		return time;
	}

  	
  	//转换json格式
	conJson(jsonString){
		return  JSON.parse(JSON.stringify(jsonString))
	}
	
	//验证电话号码
	isTel(a){
		return /^(\d3,4|\d{3,4}-)?\d{7,8}$/.test(a);
	}
	
	//手机号码
	isMobile(a){
		return /^[1][0-9]{10}$/.test(a);
	}
	
	//邮箱
	isEmail(a){
		return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(a);
	}
	

	//切换真假值 initValue：传入值
	exchangeFun(initValue){
		let state = initValue;
		let temp = true;
		if(state){
			temp = false;
		}
		return temp;
	}

	// 页面平滑滚动
	//平滑滚动
	jump (targetNum) {
		// 用 class="d_jump" 添加锚点
		// let jump = document.querySelectorAll('.d_jump')
		// let total = jump[index].offsetTop
		let total = targetNum;
		let distance = document.documentElement.scrollTop || document.body.scrollTop
		// 平滑滚动，时长500ms，每10ms一跳，共20跳
		let step = total / 20
		if (total > distance) {
			smoothDown()
		} else {
			let newTotal = distance - total
			step = newTotal / 20
			smoothUp()
		}
		function smoothDown () {
			if (distance < total) {
				distance += step
	　　　　　　　document.body.scrollTop = distance
				document.documentElement.scrollTop = distance
				setTimeout(smoothDown, 10)
			} else {
				document.body.scrollTop = total
				document.documentElement.scrollTop = total
			}
		}
		function smoothUp () {
			if (distance > total) {
				distance -= step
	　　　　　　　document.body.scrollTop = distance
				document.documentElement.scrollTop = distance
				setTimeout(smoothUp, 10)
			} else {
				document.body.scrollTop = total
				document.documentElement.scrollTop = total
			}
		} 
	}

	//页面滚动顶部
	scrolleTop(){
		document.body.scrollTop = 0;
		window.scroll(0, 0);
	}


	//提示下载App
	downloadApp(){
		MessageBox('提示','更多精彩请下载App');
	}




	 //获得角度
	getAngle(angx, angy) {
		return Math.atan2(angy, angx) * 180 / Math.PI;
	}
	//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
	getDirection(startx, starty, endx, endy) {
		var angx = endx - startx;
		var angy = endy - starty;
		var result = 0;

		//如果滑动距离太短
		if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
			return result;
		}

		var angle = this.getAngle(angx, angy);
		if (angle >= -135 && angle <= -45) {
			result = 1;
		} else if (angle > 45 && angle < 135) {
			result = 2;
		} else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
			result = 3;
		} else if (angle >= -45 && angle <= 45) {
			result = 4;
		}

		return result;
	}
}

export default {
	util: util
}

