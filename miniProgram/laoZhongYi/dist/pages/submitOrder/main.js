require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([2],{

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__submitOrder__ = __webpack_require__(177);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__submitOrder__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_submitOrder_vue__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_bb586454_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_submitOrder_vue__ = __webpack_require__(180);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(178)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-bb586454"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_submitOrder_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_bb586454_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_submitOrder_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\submitOrder\\submitOrder.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] submitOrder.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bb586454", Component.options)
  } else {
    hotAPI.reload("data-v-bb586454", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 178:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 179:
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
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {};
  },


  components: {},

  methods: {},

  created: function created() {}
});

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "odMsg"
  }, [_vm._m(2), _vm._v(" "), _vm._m(3), _vm._v(" "), _vm._m(4), _vm._v(" "), _c('div', [_c('label', [_vm._v("客户留言：")]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "text",
      "placeholder": "选填：订单的备注说明，建议与商家协商后填写",
      "placeholder-class": "placeClass"
    }
  })], 1)]), _vm._v(" "), _vm._m(5), _vm._v(" "), _vm._m(6)])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "adrMsg div_float"
  }, [_c('div', {
    staticClass: "L"
  }, [_c('span', {
    staticClass: "adrIcon"
  })]), _vm._v(" "), _c('div', {
    staticClass: "R"
  }, [_c('div', {
    staticClass: "sub"
  }, [_c('div', [_c('span', [_vm._v("张婕")]), _vm._v("15915804116")]), _vm._v(" "), _c('div', [_vm._v("广州市海珠区昌岗中路166号富盈国际大厦2505室")])])]), _vm._v(" "), _c('div', {
    staticClass: "arr_g"
  })])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "proList"
  }, [_c('div', {
    staticClass: "top"
  }, [_c('img', {
    attrs: {
      "src": "../../../static/img/list1.png"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "Msg"
  }, [_c('div', {
    staticClass: "til"
  }, [_vm._v("呼唤晒后修复精华焕新版")]), _vm._v(" "), _c('div', {
    staticClass: "ml"
  }, [_vm._v("规格：15ml")]), _vm._v(" "), _c('div', {
    staticClass: "price"
  }, [_vm._v("¥600.00")])]), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_vm._v("x1")])]), _vm._v(" "), _c('div', {
    staticClass: "btm"
  }, [_c('div', {
    staticClass: "L"
  }, [_vm._v("配送方式")]), _vm._v(" "), _c('div', {
    staticClass: "R"
  }, [_vm._v("商家配送")])])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "div_float"
  }, [_c('div', {
    staticClass: "L"
  }, [_vm._v("发票信息")]), _vm._v(" "), _c('div', {
    staticClass: "R"
  }, [_vm._v("不开发票 >")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "div_float"
  }, [_c('div', {
    staticClass: "L"
  }, [_vm._v("商城活动")]), _vm._v(" "), _c('div', {
    staticClass: "R"
  }, [_vm._v("满150.00减5 >")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "div_float"
  }, [_c('div', {
    staticClass: "L"
  }, [_vm._v("优惠券")]), _vm._v(" "), _c('div', {
    staticClass: "R"
  }, [_vm._v("无可用券 >")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "priceView"
  }, [_c('div', {
    staticClass: "div_float"
  }, [_c('div', {
    staticClass: "L"
  }, [_vm._v("商品总额")]), _vm._v(" "), _c('div', {
    staticClass: "R"
  }, [_vm._v("¥3200.00")])]), _vm._v(" "), _c('div', {
    staticClass: "div_float"
  }, [_c('div', {
    staticClass: "L"
  }, [_vm._v("运费")]), _vm._v(" "), _c('div', {
    staticClass: "R"
  }, [_vm._v("¥0.00")])]), _vm._v(" "), _c('div', {
    staticClass: "div_float"
  }, [_c('div', {
    staticClass: "L"
  }, [_vm._v("减免")]), _vm._v(" "), _c('div', {
    staticClass: "R"
  }, [_vm._v("-¥0.00")])]), _vm._v(" "), _c('div', {
    staticClass: "div_float"
  }, [_c('div', {
    staticClass: "L"
  }, [_vm._v("优惠券")]), _vm._v(" "), _c('div', {
    staticClass: "R"
  }, [_vm._v("-¥10.00")])])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "submitBtn"
  }, [_c('span', [_vm._v("应付金额：￥3200.00")]), _vm._v(" "), _c('span', [_vm._v("提交订单")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-bb586454", esExports)
  }
}

/***/ })

},[176]);
//# sourceMappingURL=main.js.map