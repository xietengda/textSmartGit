require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([15],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__invoice__ = __webpack_require__(112);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__invoice__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_invoice_vue__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_e6c4f2f8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_invoice_vue__ = __webpack_require__(115);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(113)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-e6c4f2f8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_invoice_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_e6c4f2f8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_invoice_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\invoice\\invoice.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] invoice.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e6c4f2f8", Component.options)
  } else {
    hotAPI.reload("data-v-e6c4f2f8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 113:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 114:
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


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      selType: 2, //是否开票 1：否，2：电子票
      invoType: 1 //1：个人发票，2：单位
    };
  },


  components: {},

  methods: {
    //改变类型
    changeType: function changeType(e) {
      this.selType = e.currentTarget.dataset.sType;
    },

    //选择发票类型
    selInvoice: function selInvoice(e) {
      this.invoType = e.currentTarget.dataset.invoice;
    }
  },

  created: function created() {}
});

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "inView"
  }, [_c('div', {
    staticClass: "inCn"
  }, [_c('div', {
    staticClass: "til"
  }, [_vm._v("发票类型")]), _vm._v(" "), _c('div', {
    staticClass: "inList"
  }, [_c('div', {
    staticClass: "list",
    class: [_vm.selType == 1 ? 'sel' : ''],
    attrs: {
      "data-s-type": "1",
      "eventid": '0'
    },
    on: {
      "click": _vm.changeType
    }
  }, [_vm._v("不开发票")]), _vm._v(" "), _c('div', {
    staticClass: "list",
    class: [_vm.selType == 2 ? 'sel' : ''],
    attrs: {
      "data-s-type": "2",
      "eventid": '1'
    },
    on: {
      "click": _vm.changeType
    }
  }, [_vm._v("电子发票")])])]), _vm._v(" "), (_vm.selType == 1) ? _c('div', {
    staticClass: "btnView"
  }) : _vm._e(), _vm._v(" "), (_vm.selType == 2) ? _c('div', {
    staticClass: "invoType"
  }, [_c('div', {
    staticClass: "inTil"
  }, [_vm._v("发票抬头")]), _vm._v(" "), _c('div', {
    staticClass: "selInvoice"
  }, [_c('div', {
    staticClass: "list",
    attrs: {
      "data-invoice": "1",
      "eventid": '2'
    },
    on: {
      "click": _vm.selInvoice
    }
  }, [_c('span', {
    staticClass: "no_sel",
    class: [_vm.invoType == 1 ? 'is_sel' : '']
  }), _vm._v("个人\n\t\t\t\t\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "list",
    attrs: {
      "data-invoice": "2",
      "eventid": '3'
    },
    on: {
      "click": _vm.selInvoice
    }
  }, [_c('span', {
    staticClass: "no_sel",
    class: [_vm.invoType == 2 ? 'is_sel' : '']
  }), _vm._v("单位\n\t\t\t\t\t\t")])]), _vm._v(" "), _c('div', {
    staticClass: "inputView"
  }, [(_vm.invoType == 1) ? _c('div', {
    staticClass: "subView"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "placeholder": "请填写电子邮箱",
      "placeholder-class": "placeClass"
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.invoType == 2) ? _c('div', {
    staticClass: "subView"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "placeholder": "请填写单位名称",
      "placeholder-class": "placeClass"
    }
  }), _vm._v(" "), _c('input', {
    attrs: {
      "type": "text",
      "placeholder": "请填写纳税人识别号",
      "placeholder-class": "placeClass"
    }
  }), _vm._v(" "), _c('input', {
    attrs: {
      "type": "text",
      "placeholder": "请填写电子邮箱",
      "placeholder-class": "placeClass"
    }
  })]) : _vm._e()])]) : _vm._e(), _vm._v(" "), _vm._m(0)])])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "btn"
  }, [_c('div', {
    staticClass: "subBtn"
  }, [_vm._v("确定")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e6c4f2f8", esExports)
  }
}

/***/ })

},[111]);
//# sourceMappingURL=main.js.map