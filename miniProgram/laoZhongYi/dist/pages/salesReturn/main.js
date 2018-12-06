require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([7],{

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__salesReturn__ = __webpack_require__(152);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__salesReturn__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_salesReturn_vue__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_09271562_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_salesReturn_vue__ = __webpack_require__(155);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(153)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-09271562"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_salesReturn_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_09271562_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_salesReturn_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\salesReturn\\salesReturn.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] salesReturn.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-09271562", Component.options)
  } else {
    hotAPI.reload("data-v-09271562", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 153:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
	data: function data() {
		return {
			util: this.$util.util.prototype, //工具类
			diyImg: [], //上传图片
			cause: ['七天无理由退货', '一毛钱不要退货'],
			cIndex: 0
		};
	},


	components: {},

	methods: {

		//更改退款原因
		causeChange: function causeChange(e) {
			this.cIndex = e.mp.detail.value;
		},

		//添加相片
		addPhoto: function addPhoto() {
			var that = this;
			var oldArr = that.diyImg;
			wx.chooseImage({
				count: 6, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function success(res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					var tempFilePaths = res.tempFilePaths;

					if (oldArr.length + tempFilePaths.length > 6) {
						wx.showToast({
							title: '最多上传6张',
							icon: 'none'
						});
					}

					for (var x in tempFilePaths) {
						if (oldArr.length < 6) {
							oldArr.push(tempFilePaths[x]);
						}
					}

					that.diyImg = that.util.converJSON(oldArr);
				}
			});
		},

		//删除照片
		delPhoto: function delPhoto(e) {
			var that = this;
			var oldArr = that.diyImg;
			var newArr = [];
			var sIndex = e.currentTarget.dataset.sIndex;
			for (var x in oldArr) {
				if (x != sIndex) {
					newArr.push(oldArr[x]);
				}
			}
			that.diyImg = that.util.converJSON(newArr);
		},

		//预览图片
		previewPhoto: function previewPhoto(e) {
			var sIndex = e.currentTarget.dataset.sIndex;
			var that = this;
			var diyImg = that.diyImg;
			wx.previewImage({
				current: diyImg[sIndex], // 当前显示图片的http链接
				urls: diyImg // 需要预览的图片http链接列表
			});
		}
	},

	created: function created() {}
});

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "sub"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "saView"
  }, [_c('div', {
    staticClass: "saTil div_float"
  }, [_c('div', {
    staticClass: "L"
  }, [_vm._v("退款原因")]), _vm._v(" "), _c('div', {
    staticClass: "R"
  }, [_c('div', {
    staticClass: "sel"
  }, [_vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.cause[_vm.cIndex])), _c('span', {
    staticClass: "downIcon"
  }), _vm._v(" "), _c('picker', {
    attrs: {
      "value": _vm.cIndex,
      "range": _vm.cause,
      "eventid": '0'
    },
    on: {
      "change": _vm.causeChange
    }
  }, [_c('view', {
    staticClass: "picker"
  })])], 1), _vm._v(" "), _c('span', {
    staticClass: "arr_g"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "saTil div_float"
  }, [_c('label', [_vm._v("退款金额：")]), _c('span', {
    staticClass: "price"
  }, [_vm._v("¥600.00")])], 1), _vm._v(" "), _c('div', {
    staticClass: "saRemark"
  }, [_vm._v("最多￥600.00，含发货邮费￥0.00")]), _vm._v(" "), _c('div', {
    staticClass: "saInput"
  }, [_c('label', [_vm._v("退款说明：")]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "text",
      "placeholder": "选填",
      "placeholder-class": "placeClass"
    }
  })], 1)]), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "takePhoto"
  }, [_vm._l((_vm.diyImg), function(item, key) {
    return _c('div', {
      key: _vm.diyImg,
      staticClass: "photoList"
    }, [_c('span', {
      attrs: {
        "data-s-index": key,
        "eventid": '1-' + key
      },
      on: {
        "click": _vm.delPhoto
      }
    }, [_vm._v("×")]), _vm._v(" "), _c('img', {
      attrs: {
        "src": item,
        "data-s-index": key,
        "eventid": '2-' + key
      },
      on: {
        "click": _vm.previewPhoto
      }
    })])
  }), _vm._v(" "), _c('div', {
    staticClass: "addPhoto",
    attrs: {
      "eventid": '3'
    },
    on: {
      "click": _vm.addPhoto
    }
  }, [_c('span', {
    staticClass: "cameraIcon"
  }), _vm._v(" "), _c('div', [_vm._v("上传凭证")]), _vm._v(" "), _c('div', [_vm._v("（最多6张）")])])], 2), _vm._v(" "), _vm._m(2), _vm._v(" "), _vm._m(3)])])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "saHead"
  }, [_c('div', {
    staticClass: "sub"
  }, [_c('img', {
    attrs: {
      "src": "../../../static/img/list1.png"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "Msg"
  }, [_c('div', {
    staticClass: "til"
  }, [_vm._v("呼唤晒后修复精华焕新版")]), _vm._v(" "), _c('div', {
    staticClass: "price"
  }, [_vm._v("¥600.00")])])])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "photoTil"
  }, [_vm._v("上传凭证："), _c('span', [_vm._v("最少上传1张")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "returnRemark"
  }, [_c('div', {
    staticClass: "rTil"
  }, [_c('span', {
    staticClass: "issueIcon"
  }), _vm._v("退货须知：")]), _vm._v(" "), _c('div', {
    staticClass: "rCn"
  }, [_c('div', [_vm._v("申请前请务必联系商城客服进行沟通，方可通过申请")]), _vm._v(" "), _c('div', [_vm._v("1、未签收情况下 :")]), _vm._v(" "), _c('div', [_vm._v("请在快递派件时拒收该订单包裹 , 并告知本商城客服。")]), _vm._v(" "), _c('div', [_vm._v("2、已签收情况下 :")]), _vm._v(" "), _c('div', [_vm._v("请将申请退货产品寄回后 , 返回本页面填写退货单号。")]), _vm._v(" "), _c('div', [_vm._v("*未按系统提示拒收包裹或寄回产品并填写运单号，将视为自动取消退货申请。")])])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "subBtn"
  }, [_c('div', [_vm._v("提交申请")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-09271562", esExports)
  }
}

/***/ })

},[151]);
//# sourceMappingURL=main.js.map