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
		//      var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var date = new Date(timestamp);
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

	//回首页
	goHome() {
		wx.reLaunch({
			url: '../index/main'
		})
	}


}

export default {
	util: util
}