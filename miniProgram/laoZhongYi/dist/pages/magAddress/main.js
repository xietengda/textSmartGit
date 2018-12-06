require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([14],{

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__magAddress__ = __webpack_require__(117);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__magAddress__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_magAddress_vue__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_44850448_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_magAddress_vue__ = __webpack_require__(120);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(118)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-44850448"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_magAddress_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_44850448_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_magAddress_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\magAddress\\magAddress.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] magAddress.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-44850448", Component.options)
  } else {
    hotAPI.reload("data-v-44850448", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 118:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 119:
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


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      adrList: [{ id: 1, sel: false }, { id: 2, sel: false }]
    };
  },


  components: {},

  methods: {
    //选择地址
    selAddres: function selAddres(e) {
      var adrList = this.adrList;
      var sIndex = e.currentTarget.dataset.sIndex;

      for (var x in adrList) {
        adrList[x].sel = false;
      }

      adrList[sIndex].sel = true;
      this.adrList = adrList;
    }
  },

  created: function created() {}
});

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "addView"
  }, _vm._l((_vm.adrList), function(item, index) {
    return _c('div', {
      key: item.id,
      staticClass: "list"
    }, [_c('div', {
      staticClass: "sub"
    }, [_c('div', {
      staticClass: "L"
    }, [_c('span', {
      staticClass: "cb_no",
      class: [item.sel ? 'cb_sel' : ''],
      attrs: {
        "data-s-index": index,
        "eventid": '0-' + index
      },
      on: {
        "click": _vm.selAddres
      }
    })]), _vm._v(" "), _vm._m(0, true)]), _vm._v(" "), _vm._m(1, true)])
  })), _vm._v(" "), _vm._m(2)])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "Msg"
  }, [_c('div', {
    staticClass: "top"
  }, [_c('span', {
    staticClass: "name"
  }, [_vm._v("张婕 ")]), _vm._v(" "), _c('span', {
    staticClass: "phone"
  }, [_vm._v("15915804116")]), _vm._v(" "), _c('span', {
    staticClass: "default"
  }, [_vm._v("默认")])]), _vm._v(" "), _c('div', {
    staticClass: "btm"
  }, [_vm._v("广州市海珠区昌岗中路166号富盈国际大厦2505室")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "setView"
  }, [_c('div', [_c('span', {
    staticClass: "no_sel"
  }), _vm._v("设置为默认地址")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "addBtm"
  }, [_c('div', {
    staticClass: "list"
  }, [_vm._v("编辑")]), _vm._v(" "), _c('div', {
    staticClass: "list add"
  }, [_vm._v("新增收货地址")]), _vm._v(" "), _c('div', {
    staticClass: "list"
  }, [_vm._v("删除")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-44850448", esExports)
  }
}

/***/ })

},[116]);
//# sourceMappingURL=main.js.map