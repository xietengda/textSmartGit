/*语言*/
import sc from '../../static/language/sc.json'
import jp from '../../static/language/jp.json'
import kr from '../../static/language/kr.json'

import api from './api.js'

import manba from 'manba'

class util {

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

	//将时间戳转换成时间
	timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，
		//var date = new Date(timestamp);  // 时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = date.getDate() + ' ';
		var h = date.getHours() + ':';
		var m = date.getMinutes() + ':';
		var s = date.getSeconds();
		return Y + M + D + h + m + s;
	}

	//将网络图片改成本地图片
	downLoadImg(netUrl) {
		return new Promise((resolve, reject) => {
			wx.getImageInfo({
				src: netUrl, //请求的网络图片路径
				success: function(res) {
					resolve(res.path)
				}
			})
		})
	}
	
	//获取图片信息
	getImgInfo(ImgUrl){
		 return new Promise((resolve, reject) => {
			wx.getImageInfo({
				src:ImgUrl,
				success:rs =>{
					var sType = '';
					if(rs.width>rs.height){
						sType = 'cro';
					}else if(rs.width<rs.height){
						sType = 'row';
					}else{
						sType = 'squ';
					}
					resolve(sType)
				}
			})
		})
	}

	//回首页
	goHome() {
		wx.reLaunch({
			url: '../index/main'
		})
	}

	//切换语言  chooiseLang:选中的语言
	changeLanguage(chooiseLang = wx.getStorageSync('hasLanguage')){
		var showLang = '';
		//判断语种
		//中文
		if(chooiseLang == 'china'){
			showLang = sc;
		}
		//韩文
		else if(chooiseLang == 'korea'){
			showLang = kr;
		}
		//日文
		else if(chooiseLang == 'japan'){
			showLang = jp;
		}
//		console.log(sc);
//		console.log(jp);
//		console.log(kr);
		return showLang;
	}
	
	//转换json格式
	converJSON(jsonString){
		return  JSON.parse(JSON.stringify(jsonString))
	}
	
	
	//获取sessionkey和openid
	getSessionKey(){
		var that = this;
		return new Promise((resolve,reject) => {
			wx.login({
				success: res => {
					// 发送 res.code 到后台换取 openId, sessionKey
					if(res.code) {
						api.api.prototype.login(res.code)
							.then(res => {
								console.log(res)
								if(res.code == 200){
									wx.setStorageSync('sessionkey', res.data.session);
									wx.setStorageSync('openid', res.data.openid);
									console.log(wx.getStorageSync('sessionkey'))
								}
								
							})
					} else {
						console.log('登录失败！' + res.errMsg)
					}
				}
			});
		})
	}
		
	//去登录页面
	goLogin() {
		wx.navigateTo({
			url: '../login/main'
		})
	}	
	
	//判断是否登陆
	judgeLogin(){
		var that = this;
		return new ((resolve, reject) => {
			wx.checkSession({
				fail:function(){
					console.log('过期')
					that.getSessionKey();
				}
			});
			if(!wx.getStorageSync('userInfo')){
				wx.navigateTo({
					url: '../login/main'
				})
				resolve(false);
			}
		})
	}
	
	
	//更改时间显示格式
	//显示规则  当天10:12    昨天和之前的才显示9-13  去年就显示17-12-15
	changeTimeFormat(timestamp){
		
		
//		 return new Promise((resolve, reject) => {
				var dateTime = new Date(timestamp * 1000);//时间戳为10位需*1000，
		//		var date = new Date(timestamp);  // 时间戳为13位的话不需乘1000
		
				var showTime = '';
				//用插件将'发帖'时间转成对象
//				manba.config({
//				     now: dateTime
//				})
				
//				console.log(dateTime+'旧')
//				console.log(manba(dateTime).format())
				
				var nTime = new Date();
				var nYear  = nTime.getFullYear();
				var nMonth = (nTime.getMonth()+1);
				var nDay = nTime.getDate();
				
				
//				console.log(manba(dateTime).year()+'-'+manba(dateTime).month()+'-'+manba(dateTime).date())
				
				//显示规则  当天10:12    昨天和之前的才显示9-13  去年就显示17-12-15
				//当天显示发布时间  10:22
				if(manba(dateTime).year() == nYear && manba(dateTime).month() == nMonth && manba(dateTime).date() == nDay){
					showTime = manba(dateTime).format("HH")+':'+manba(dateTime).format("mm");
				}
				//昨天或者之前
				else if(manba(dateTime).year() == nYear && manba(dateTime).month() <= nMonth){
					showTime = manba(dateTime).format("MM")+'-'+manba(dateTime).format("DD");
				}
				//去年的
				else if(manba(dateTime).year() < nYear){
					showTime = manba(dateTime).format("YYYY")+'-'+manba(dateTime).format("MM")+'-'+manba(dateTime).format("DD");
				}
				
				
//				console.log(showTime)
				return showTime;
		
//		})
	}
		
		
}

export default {
	util: util
}