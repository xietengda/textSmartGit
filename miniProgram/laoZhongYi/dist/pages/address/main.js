require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([19],{

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__address__ = __webpack_require__(92);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__address__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_address_vue__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_0d3e8a12_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_address_vue__ = __webpack_require__(95);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(93)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0d3e8a12"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_address_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_0d3e8a12_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_address_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\address\\address.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] address.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0d3e8a12", Component.options)
  } else {
    hotAPI.reload("data-v-0d3e8a12", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 93:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 94:
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
      province: ['请选择', '广东省'],
      pIndex: 0,
      city: ['请选择', '广州市', '珠海市'],
      cIndex: 0,
      sanjak: ['请选择', '海珠区', '白云区'],
      sIndex: 0
    };
  },


  components: {},

  methods: {
    //省份选择
    provinceChange: function provinceChange(e) {
      this.pIndex = e.mp.detail.value;
    },

    //城市选择
    cityChange: function cityChange(e) {
      this.cIndex = e.mp.detail.value;
    },

    //区域选择
    sanjakChange: function sanjakChange(e) {
      this.sIndex = e.mp.detail.value;
    }
  },

  created: function created() {}
});

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "inputView"
  }, [_c('div', {
    staticClass: "list"
  }, [_c('label', [_vm._v("联系人：")]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "text",
      "placeholder": "请填写收货人姓名",
      "placeholder-class": "placeClass"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "list"
  }, [_c('label', [_vm._v("手机号码：")]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "text",
      "placeholder": "请填写收货人手机号码",
      "placeholder-class": "placeClass"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "list"
  }, [_c('label', [_vm._v("所在地区：")]), _vm._v(" "), _c('div', {
    staticClass: "R"
  }, [_c('div', {
    staticClass: "sList"
  }, [_vm._v("\n\t\t\t\t\t\t\t" + _vm._s(_vm.province[_vm.pIndex])), _c('span', {
    staticClass: "arr_g"
  }), _vm._v(" "), _c('picker', {
    attrs: {
      "value": _vm.pIndex,
      "range": _vm.province,
      "eventid": '0'
    },
    on: {
      "change": _vm.provinceChange
    }
  }, [_c('view', {
    staticClass: "picker"
  })])], 1), _vm._v(" "), _c('div', {
    staticClass: "sList"
  }, [_vm._v("\n\t\t\t\t\t\t\t" + _vm._s(_vm.city[_vm.cIndex])), _c('span', {
    staticClass: "arr_g"
  }), _vm._v(" "), _c('picker', {
    attrs: {
      "value": _vm.cIndex,
      "range": _vm.city,
      "eventid": '1'
    },
    on: {
      "change": _vm.cityChange
    }
  }, [_c('view', {
    staticClass: "picker"
  })])], 1), _vm._v(" "), _c('div', {
    staticClass: "sList"
  }, [_vm._v("\n\t\t\t\t\t\t\t" + _vm._s(_vm.sanjak[_vm.sIndex])), _c('span', {
    staticClass: "arr_g"
  }), _vm._v(" "), _c('picker', {
    attrs: {
      "value": _vm.sIndex,
      "range": _vm.sanjak,
      "eventid": '2'
    },
    on: {
      "change": _vm.sanjakChange
    }
  }, [_c('view', {
    staticClass: "picker"
  })])], 1)])], 1), _vm._v(" "), _c('div', {
    staticClass: "list"
  }, [_c('label', [_vm._v("详细地址：")]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "text",
      "placeholder": "请输入街道、楼牌号等",
      "placeholder-class": "placeClass"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "subBtn"
  }, [_vm._v("保存地址")])])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0d3e8a12", esExports)
  }
}

/***/ })

},[91]);
//# sourceMappingURL=main.js.map