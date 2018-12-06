require("common/manifest.js");
require("common/vendor.js");
global.webpackJsonp([1],{

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_api__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_util__ = __webpack_require__(54);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */].mpType = 'app';

//接口

__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$api = __WEBPACK_IMPORTED_MODULE_2__utils_api__["a" /* default */];


__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$util = __WEBPACK_IMPORTED_MODULE_3__utils_util__["a" /* default */];

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(44);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(42)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4ce19905", Component.options)
  } else {
    hotAPI.reload("data-v-4ce19905", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 42:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
	data: function data() {
		return {
			Request: this.$api.api.prototype //请求头
		};
	},

	methods: {},
	onShow: function onShow() {
		console.log('hha ');
		wx.getSystemInfo({
			success: function success(res) {
				console.log(res.model);
				console.log(res.pixelRatio);
				console.log(res.windowWidth);
				console.log(res.windowHeight);
				console.log(res.language);
				console.log(res.version);
				console.log(res.platform);
			}
		});
	}
});

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__request__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__request__);


 // 此处，引入存放对promise处理的文件


var apiUrl = "https://www.viplzy.com/" + 'qdapi/?act=';
var webUrl = "https://www.viplzy.com/";
var baseUrl = apiUrl + '?act=';

var api = function () {
	function api() {
		__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, api);
	}

	__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(api, [{
		key: 'getUrl',


		//获取url补充静态资源
		value: function getUrl() {
			return webUrl;
		}

		//登录

	}, {
		key: 'login',
		value: function login(code) {
			var data = {
				code: code
			};
			return __WEBPACK_IMPORTED_MODULE_2__request___default.a.getRequest(apiUrl + 'api/login/getsessionkey?source=2', data);
		}

		//验证sessionkey

	}, {
		key: 'checkSessionKey',
		value: function checkSessionKey(sessionkey, openid) {
			var data = {
				sessionkey: sessionkey,
				openid: openid
			};
			return __WEBPACK_IMPORTED_MODULE_2__request___default.a.getRequest(apiUrl + 'api/login/validatekey?source=2', data);
		}

		//获取首页商品

	}, {
		key: 'getIndexAll',
		value: function getIndexAll() {
			var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
			var device = arguments[1];
			var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1.0.3';

			var data = {
				debug: debug,
				device: device,
				version: version
			};
			return __WEBPACK_IMPORTED_MODULE_2__request___default.a.getRequest(apiUrl + 'index/all', data);
		}
	}]);

	return api;
}();

/* harmony default export */ __webpack_exports__["a"] = ({
	api: api
});

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

var Promise = __webpack_require__(52).Promise;

function wxPromisify(fn) {
	return function () {
		var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		return new Promise(function (resolve, reject) {
			obj.success = function (res) {
				//成功 (只返回res.data)
				resolve(res.data);
				setTimeout(function () {
					wx.hideLoading();
				}, 200);
			};
			obj.fail = function (res) {
				//失败
				reject(res);
				setTimeout(function () {
					wx.hideLoading();
				}, 200);
			};
			fn(obj);
		});
	};
}
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
	var P = this.constructor;
	return this.then(function (value) {
		return P.resolve(callback()).then(function () {
			return value;
		});
	}, function (reason) {
		return P.resolve(callback()).then(function () {
			throw reason;
		});
	});
};
/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url, data) {
	var getRequest = wxPromisify(wx.request);
	return getRequest({
		url: url,
		method: 'GET',
		data: data,
		header: {
			'Content-Type': 'application/json'
		}
	});
}

/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, data) {
	var postRequest = wxPromisify(wx.request);
	return postRequest({
		url: url,
		method: 'POST',
		data: data,
		header: {
			"content-type": "application/x-www-form-urlencoded"
		}
	});
}

/**
   * 获取get的URL
   */
function getRquestUrl(url, data) {
	var signArr = [];
	for (var x in data) {
		var sign = x + '=' + data[x];
		signArr.push(sign);
	}

	var signString = '';
	for (var x in signArr) {
		if (parseInt(x) + 1 == 1) {
			signString += signArr[x].toString();
		} else {
			signString += "&" + signArr[x].toString();
		}
	}
	return url + "?" + signString;
}

module.exports = {
	postRequest: postRequest,
	getRequest: getRequest,
	getRquestUrl: getRquestUrl
};

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);





//import manba from 'manba'

var util = function () {
	function util() {
		__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, util);
	}

	__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(util, [{
		key: 'pastTime',


		//获取当天最晚的时间 （设置24小时过期） 
		value: function pastTime() {
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

	}, {
		key: 'timestampToTime',
		value: function timestampToTime(timestamp) {
			var date = new Date(timestamp * 1000); //时间戳为10位需*1000，
			//		var date = new Date(timestamp);  // 时间戳为13位的话不需乘1000
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			var D = date.getDate() + ' ';
			var h = date.getHours() + ':';
			var m = date.getMinutes() + ':';
			var s = date.getSeconds();
			return Y + M + D + h + m + s;
		}

		//将网络图片改成本地图片

	}, {
		key: 'downLoadImg',
		value: function downLoadImg(netUrl) {
			return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
				wx.getImageInfo({
					src: netUrl, //请求的网络图片路径
					success: function success(res) {
						resolve(res.path);
					}
				});
			});
		}

		//获取图片信息

	}, {
		key: 'getImgInfo',
		value: function getImgInfo(ImgUrl) {
			return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
				wx.getImageInfo({
					src: ImgUrl,
					success: function success(rs) {
						var sType = '';
						if (rs.width > rs.height) {
							sType = 'cro';
						} else if (rs.width < rs.height) {
							sType = 'row';
						} else {
							sType = 'squ';
						}
						resolve(sType);
					}
				});
			});
		}

		//回首页

	}, {
		key: 'goHome',
		value: function goHome() {
			wx.reLaunch({
				url: '../index/main'
			});
		}

		//转换json格式

	}, {
		key: 'converJSON',
		value: function converJSON(jsonString) {
			return JSON.parse(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(jsonString));
		}

		//去登录页面

	}, {
		key: 'goLogin',
		value: function goLogin() {
			wx.navigateTo({
				url: '../login/main'
			});
		}

		//更改时间显示格式
		//显示规则  当天10:12    昨天和之前的才显示9-13  去年就显示17-12-15

	}, {
		key: 'changeTimeFormat',
		value: function changeTimeFormat(timestamp) {

			//		 return new Promise((resolve, reject) => {
			var dateTime = new Date(timestamp * 1000); //时间戳为10位需*1000，
			//		var date = new Date(timestamp);  // 时间戳为13位的话不需乘1000

			var showTime = '';
			//用插件将'发帖'时间转成对象
			//				manba.config({
			//				     now: dateTime
			//				})

			//				console.log(dateTime+'旧')
			//				console.log(manba(dateTime).format())

			var nTime = new Date();
			var nYear = nTime.getFullYear();
			var nMonth = nTime.getMonth() + 1;
			var nDay = nTime.getDate();

			//				console.log(manba(dateTime).year()+'-'+manba(dateTime).month()+'-'+manba(dateTime).date())

			//显示规则  当天10:12    昨天和之前的才显示9-13  去年就显示17-12-15
			//当天显示发布时间  10:22
			if (manba(dateTime).year() == nYear && manba(dateTime).month() == nMonth && manba(dateTime).date() == nDay) {
				showTime = manba(dateTime).format("HH") + ':' + manba(dateTime).format("mm");
			}
			//昨天或者之前
			else if (manba(dateTime).year() == nYear && manba(dateTime).month() <= nMonth) {
					showTime = manba(dateTime).format("MM") + '-' + manba(dateTime).format("DD");
				}
				//去年的
				else if (manba(dateTime).year() < nYear) {
						showTime = manba(dateTime).format("YYYY") + '-' + manba(dateTime).format("MM") + '-' + manba(dateTime).format("DD");
					}

			//				console.log(showTime)
			return showTime;

			//		})
		}
	}]);

	return util;
}();

/* harmony default export */ __webpack_exports__["a"] = ({
	util: util
});

/***/ })

},[40]);
//# sourceMappingURL=app.js.map