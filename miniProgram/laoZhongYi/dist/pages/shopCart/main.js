require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([3],{

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shopCart__ = __webpack_require__(172);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__shopCart__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_shopCart_vue__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_6f33a7e8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_shopCart_vue__ = __webpack_require__(175);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(173)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6f33a7e8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_shopCart_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_6f33a7e8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_shopCart_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\shopCart\\shopCart.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] shopCart.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f33a7e8", Component.options)
  } else {
    hotAPI.reload("data-v-6f33a7e8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 173:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 174:
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

/* harmony default export */ __webpack_exports__["a"] = ({
	data: function data() {
		return {
			cartList: [{
				img: '../../../static/img/list1.png',
				til: '呼唤晒后修复精华焕新版',
				ml: '15ml',
				price: '6.9',
				num: 1,
				sel: false,
				txtStyle: ''
			}, {
				img: '../../../static/img/list1.png',
				til: '呼唤晒后修复精华焕新版',
				ml: '15ml',
				price: '6.9',
				num: 1,
				sel: false,
				txtStyle: ''
			}, {
				img: '../../../static/img/list1.png',
				til: '呼唤晒后修复精华焕新版',
				ml: '15ml',
				price: '6.9',
				num: 1,
				sel: false,
				txtStyle: ''
			}],
			selArr: [],
			allSel: false,
			editBtn: false,
			countPrice: 0.00,
			countToatl: 0
		};
	},


	components: {},

	methods: {
		selChange: function selChange(e) {
			var selIndex = e.currentTarget.dataset.selIndex;
			var cartList = this.cartList;
			var check = true;

			if (cartList[selIndex].sel) {
				check = false;
			}

			cartList[selIndex].sel = check;

			this.cartList = cartList;

			//计算总数
			this.allCount();
			//判断是否全选
			this.checkAllSel();
		},
		allSelFun: function allSelFun(e) {
			var allSel = this.allSel;
			var cartList = this.cartList;
			var check = true;

			if (allSel) {
				check = false;
			}
			for (var x in cartList) {
				cartList[x].sel = check;
			}

			this.allCount();

			this.allSel = check;
			this.cartList = cartList;
		},
		/*是否全选 para:传入选择后的数组*/
		checkAllSel: function checkAllSel() {
			var cartList = this.cartList;
			var check = true;

			for (var x in cartList) {
				if (cartList[x].sel == false) {
					check = false;
				}
			}

			this.allSel = check;
		},
		changeToatl: function changeToatl(e) {
			var cType = e.currentTarget.dataset.cType;
			var cIndex = e.currentTarget.dataset.cIndex;
			var cartList = this.cartList;

			if (cType == 'cut' && cartList[cIndex].num != 1) {
				cartList[cIndex].num = parseInt(cartList[cIndex].num) - 1;
			} else if (cType == 'add') {
				cartList[cIndex].num = parseInt(cartList[cIndex].num) + 1;
			}

			//计算总价
			this.allCount();

			this.cartList = cartList;
		},
		/*计算总价，总数*/
		allCount: function allCount() {
			var countPrice = 0;
			var countToatl = 0;
			var cartList = this.cartList;

			for (var x in cartList) {
				if (cartList[x].sel) {
					countToatl += 1;
					countPrice += cartList[x].price * cartList[x].num;
				}
			}

			this.countToatl = countToatl;
			this.countPrice = countPrice.toFixed(2);
		},
		editBtnCart: function editBtnCart() {
			console.log(111);
			var editBtn = this.editBtn;
			var sign = true;

			if (editBtn) {
				sign = false;
			}

			this.editBtn = sign;
		}
	},

	created: function created() {}
});

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "cartHead div_float"
  }, [_c('div', {
    staticClass: "L",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.allSelFun
    }
  }, [_c('span', {
    staticClass: "cb_no",
    class: [_vm.allSel ? 'cb_sel' : '']
  }), _vm._v("全选\n\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "R"
  }, [(!_vm.editBtn) ? _c('span', {
    attrs: {
      "eventid": '2'
    },
    on: {
      "click": _vm.editBtnCart
    }
  }, [_vm._v("编辑")]) : _c('span', {
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.editBtnCart
    }
  }, [_vm._v("完成")])])]), _vm._v(" "), _c('div', {
    staticClass: "cartView"
  }, [_c('div', {
    staticClass: "proListView"
  }, _vm._l((_vm.cartList), function(item, key) {
    return _c('div', {
      key: item.id,
      staticClass: "proList"
    }, [_c('div', {
      staticClass: "L"
    }, [_c('span', {
      staticClass: "cb_no",
      class: [item.sel ? 'cb_sel' : ''],
      attrs: {
        "data-sel-index": key,
        "eventid": '3-' + key
      },
      on: {
        "click": _vm.selChange
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "M"
    }, [_c('img', {
      attrs: {
        "src": item.img
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "Msg"
    }, [_c('div', {
      staticClass: "til"
    }, [_vm._v(_vm._s(item.til))]), _vm._v(" "), _c('div', {
      staticClass: "ml"
    }, [_vm._v("规格：" + _vm._s(item.ml))]), _vm._v(" "), _c('div', {
      staticClass: "price"
    }, [_vm._v("¥" + _vm._s(item.price))])])]), _vm._v(" "), _c('div', {
      staticClass: "num"
    }, [_c('span', {
      attrs: {
        "data-c-type": "cut",
        "data-c-index": key,
        "eventid": '4-' + key
      },
      on: {
        "click": _vm.changeToatl
      }
    }, [_vm._v("-")]), _vm._v(" "), _c('input', {
      attrs: {
        "type": "number",
        "value": item.num,
        "disabled": "disabled"
      }
    }), _vm._v(" "), _c('span', {
      attrs: {
        "data-c-type": "add",
        "data-c-index": key,
        "eventid": '5-' + key
      },
      on: {
        "click": _vm.changeToatl
      }
    }, [_vm._v("+")])])])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "cartBtm div_float"
  }, [(!_vm.editBtn) ? _c('div', {
    staticClass: "R"
  }, [_c('div', {
    staticClass: "rl"
  }, [_c('div', [_vm._v("总计：¥" + _vm._s(_vm.countPrice))]), _vm._v(" "), _c('div', {
    staticClass: "freight"
  }, [_vm._v("运费：¥0.00")]), _vm._v(" "), _c('div', [_vm._v("全场满128包邮")])]), _vm._v(" "), _c('div', {
    staticClass: "rr"
  }, [_vm._v("结算（" + _vm._s(_vm.countToatl) + "）")])]) : _c('div', {
    staticClass: "delR"
  }, [_c('div', {
    staticClass: "del"
  }, [_vm._v("删除")])])])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6f33a7e8", esExports)
  }
}

/***/ })

},[171]);
//# sourceMappingURL=main.js.map