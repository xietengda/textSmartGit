require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([12],{

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__orderDatail__ = __webpack_require__(132);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__orderDatail__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_orderDatail_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_5eea73a0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_orderDatail_vue__ = __webpack_require__(135);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(133)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5eea73a0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_orderDatail_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_5eea73a0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_orderDatail_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\orderDatail\\orderDatail.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] orderDatail.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5eea73a0", Component.options)
  } else {
    hotAPI.reload("data-v-5eea73a0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 133:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 134:
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
      reList: [1, 1, 1],
      showExpress: false //显示物流信息
    };
  },


  components: {},

  methods: {
    //展开物流信息
    openExpress: function openExpress() {
      var sign = true;
      if (this.showExpress) {
        sign = false;
      }
      this.showExpress = sign;
    }
  },

  created: function created() {}
});

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "reMsg"
  }, [_c('div', {
    staticClass: "reCn"
  }, _vm._l((_vm.reList), function(item, key) {
    return _c('div', {
      key: item.id,
      staticClass: "list div_float"
    }, [_c('img', {
      attrs: {
        "src": "../../../static/img/list1.png"
      }
    }), _vm._v(" "), _vm._m(2, true), _vm._v(" "), _c('div', {
      staticClass: "num"
    }, [_vm._v("¥600.00")])])
  }))]), _vm._v(" "), _vm._m(3), _vm._v(" "), _vm._m(4), _vm._v(" "), _vm._m(5), _vm._v(" "), _c('div', {
    staticClass: "express"
  }, [_c('div', {
    staticClass: "head",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.openExpress
    }
  }, [_vm._m(6), _vm._v(" "), _c('div', {
    staticClass: "R arr_g",
    class: [_vm.showExpress ? 'expOpen' : '']
  })]), _vm._v(" "), (_vm.showExpress) ? _c('div', {
    staticClass: "expressCn"
  }, [_vm._m(7), _vm._v(" "), _vm._m(8)]) : _vm._e()]), _vm._v(" "), _vm._m(9), _vm._v(" "), _vm._m(10), _vm._v(" "), _vm._m(11), _vm._v(" "), _vm._m(12), _vm._v(" "), _vm._m(13)])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "odHead"
  }, [_c('div', {
    staticClass: "sub"
  }, [_c('div', [_c('span', {
    staticClass: "gouIcon"
  }), _vm._v("已付款")])])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
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
  }, [_c('div', [_c('span', [_vm._v("张婕")]), _vm._v("15915804116")]), _vm._v(" "), _c('div', [_vm._v("广州市海珠区昌岗中路166号富盈国际大厦2505室")])])])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "R"
  }, [_c('div', {
    staticClass: "til"
  }, [_vm._v("呼唤晒后修复精华焕新版")]), _vm._v(" "), _c('div', {
    staticClass: "ml"
  }, [_vm._v("数量：2")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "odMsg"
  }, [_c('div', [_vm._v("订单编号：13238047")]), _vm._v(" "), _c('div', [_vm._v("下单时间：2018-10-10  17:12")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "payType"
  }, [_c('div', [_vm._v("付款方式：在线付款")]), _vm._v(" "), _c('div', [_vm._v("配送方式：商家配送")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "invoice"
  }, [_c('div', {
    staticClass: "no"
  }, [_vm._v("发票类型：不开发票")]), _vm._v(" "), _c('div', {
    staticClass: "yes"
  }, [_c('div', [_vm._v("发票类型：电子发票")]), _vm._v(" "), _c('div', [_vm._v("发票抬头：广州市惟诚网络科技有限公司")]), _vm._v(" "), _c('div', [_vm._v("发票内容：商品明细")]), _vm._v(" "), _c('div', [_vm._v("纳税人识别号：916553525533555")])])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "L"
  }, [_c('div', {
    staticClass: "til"
  }, [_vm._v("物流信息")]), _vm._v(" "), _c('div', [_vm._v("运单号：申通快递   910025412684155")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', [_vm._v("仓库已发货，快递揽件中")]), _vm._v(" "), _c('div', [_vm._v("2018-10-13 10：41：33")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', [_vm._v("仓库已发货，快递揽件中")]), _vm._v(" "), _c('div', [_vm._v("2018-10-13 10：41：33")])])
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
    staticClass: "payment"
  }, [_c('div', [_vm._v("需付款："), _c('span', [_vm._v("¥3200.00")])])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "odBtm div"
  }, [_c('div', [_vm._v("联系客服")]), _vm._v(" "), _c('div', [_vm._v("取消订单")]), _vm._v(" "), _c('div', {
    staticClass: "sel"
  }, [_vm._v("去支付")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "odBtm"
  }, [_c('div', [_vm._v("联系客服")]), _vm._v(" "), _c('div', {
    staticClass: "sel"
  }, [_vm._v("退款")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "odBtm"
  }, [_c('div', [_vm._v("删除订单")]), _vm._v(" "), _c('div', {
    staticClass: "sel"
  }, [_vm._v("联系客服")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5eea73a0", esExports)
  }
}

/***/ })

},[131]);
//# sourceMappingURL=main.js.map